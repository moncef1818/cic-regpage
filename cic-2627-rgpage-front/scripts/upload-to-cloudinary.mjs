#!/usr/bin/env node

/**
 * upload-to-cloudinary.mjs
 * 
 * Walks the public/ directory, uploads every image to Cloudinary,
 * and writes a JSON mapping file at scripts/cloudinary-map.json.
 * 
 * In-Memory & Robust Optimization Features:
 *  - In-memory buffer compression with `sharp` (zero temp files on disk).
 *  - `cloudinary.uploader.upload_stream` for streaming uploads directly from memory.
 *  - Automatic retry up to 3 times per image.
 *  - Idempotent (skips already uploaded images).
 */

import { v2 as cloudinary } from 'cloudinary';
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(PROJECT_ROOT, 'public');
const MAP_FILE = join(__dirname, 'cloudinary-map.json');

const CLOUD_FOLDER = 'cic-frontend';
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic', '.gif']);
const SKIP_FILES = new Set(['favicon.svg', 'icons.svg']);

async function walkImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkImages(fullPath)));
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (IMAGE_EXTS.has(ext) && !SKIP_FILES.has(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function toPublicId(filePath) {
  const rel = relative(PUBLIC_DIR, filePath);
  const withoutExt = rel.replace(/\.[^.]+$/, '');
  const posixPath = withoutExt.split('\\').join('/');
  return `${CLOUD_FOLDER}/${posixPath}`;
}

function toLocalUrl(filePath) {
  const rel = relative(PUBLIC_DIR, filePath);
  return '/' + rel.split('\\').join('/');
}

function uploadBufferStream(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
}

async function uploadSingleFile(filePath, publicId) {
  const fileStat = await stat(filePath);
  const fileSizeMB = fileStat.size / (1024 * 1024);

  // If file > 5MB, optimize in memory with sharp to guarantee fast & successful upload
  if (fileSizeMB > 5) {
    try {
      const sharpModule = await import('sharp');
      const sharp = sharpModule.default || sharpModule;
      console.log(`   📉 File size is ${fileSizeMB.toFixed(1)}MB (>5MB). Optimizing in memory...`);

      const buffer = await sharp(filePath)
        .resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true })
        .toBuffer();

      const newSizeMB = buffer.length / (1024 * 1024);
      console.log(`   ✨ Optimized to ${newSizeMB.toFixed(1)}MB`);

      return await uploadBufferStream(buffer, {
        public_id: publicId,
        resource_type: 'auto',
        overwrite: true,
        unique_filename: false,
        use_filename: false,
      });
    } catch (e) {
      console.log(`   ⚠️ In-memory optimization skipped (${e.message}). Uploading original...`);
    }
  }

  // Standard upload for normal size files or if sharp is not used
  return await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    resource_type: 'auto',
    overwrite: true,
    unique_filename: false,
    use_filename: false,
  });
}

async function uploadWithRetry(filePath, publicId, maxRetries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await uploadSingleFile(filePath, publicId);
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        console.log(`   🔄 Retry ${attempt}/${maxRetries} after error: ${err.message}`);
        await new Promise((r) => setTimeout(r, 2000 * attempt));
      }
    }
  }
  throw lastError;
}

async function main() {
  if (!process.env.CLOUDINARY_URL) {
    console.error('❌  CLOUDINARY_URL environment variable is not set.');
    console.error('   Set it before running:');
    console.error('   export CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME');
    process.exit(1);
  }

  console.log(`☁️  Cloud name: ${cloudinary.config().cloud_name}`);

  if (!existsSync(PUBLIC_DIR)) {
    console.error(`❌  public/ directory not found at: ${PUBLIC_DIR}`);
    console.error('   This script must be run on the machine that has the image files.');
    process.exit(1);
  }

  const images = await walkImages(PUBLIC_DIR);
  console.log(`📸  Found ${images.length} images to process.\n`);

  if (images.length === 0) {
    console.log('Nothing to upload.');
    return;
  }

  let existingMap = {};
  try {
    const raw = await readFile(MAP_FILE, 'utf-8');
    existingMap = JSON.parse(raw);
  } catch {
    // No existing map
  }

  const resultMap = { ...existingMap };
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < images.length; i++) {
    const filePath = images[i];
    const localUrl = toLocalUrl(filePath);
    const publicId = toPublicId(filePath);
    const progress = `[${i + 1}/${images.length}]`;

    if (resultMap[localUrl]) {
      console.log(`${progress} ⏭  Skipped (already uploaded): ${localUrl}`);
      skipped++;
      continue;
    }

    try {
      console.log(`${progress} ⬆  Uploading: ${localUrl} → ${publicId}`);

      const result = await uploadWithRetry(filePath, publicId);

      resultMap[localUrl] = result.secure_url;
      uploaded++;

      await writeFile(MAP_FILE, JSON.stringify(resultMap, null, 2), 'utf-8');
    } catch (err) {
      console.error(`${progress} ❌ Failed: ${localUrl} — ${err.message}`);
      failed++;
    }
  }

  await writeFile(MAP_FILE, JSON.stringify(resultMap, null, 2), 'utf-8');

  console.log('\n─────────────────────────────────────────');
  console.log(`✅  Done!`);
  console.log(`   Uploaded: ${uploaded}`);
  console.log(`   Skipped:  ${skipped}`);
  console.log(`   Failed:   ${failed}`);
  console.log(`   Map file: ${MAP_FILE}`);
  console.log('\n   Next step: node scripts/generate-image-urls.mjs');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
