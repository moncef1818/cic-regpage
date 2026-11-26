import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { cloudinaryUrl } from '../../assets/data/cloudinaryUrls';

const CITY_CATALOG = [
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Johannesburg', lat: -26.2041, lon: 28.0473 },
  { name: 'Rio', lat: -22.9068, lon: -43.1729 },
  { name: 'Berlin', lat: 52.52, lon: 13.405 },
];

const ROUTES = [
  ['Paris', 'New York'],
  ['Paris', 'Tokyo'],
  ['New York', 'Dubai'],
  ['Dubai', 'Singapore'],
  ['Singapore', 'Tokyo'],
  ['Berlin', 'Johannesburg'],
  ['Rio', 'New York'],
  ['Berlin', 'Paris'],
];

function latLongToVec3(lat, lon, radius = 1.25) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function GlobeVisual() {
  const globeGroup = useRef(null);
  const [logoTexture, setLogoTexture] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = cloudinaryUrl('/CIC1.png');

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      const pad = 70;
      const size = 360;
      const x = (canvas.width - size) / 2;
      const y = (canvas.height - size) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(9, 14, 21, 0.9)';
      ctx.beginPath();
      ctx.roundRect(x - 22, y - 22, size + 44, size + 44, 36);
      ctx.fill();
      ctx.drawImage(image, x, y, size, size);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      setLogoTexture(texture);
    };
  }, []);

  useFrame(() => {
    if (globeGroup.current) {
      globeGroup.current.rotation.y += 0.0025;
    }
  });

  const routeSegments = useMemo(
    () =>
      ROUTES.map(([from, to]) => {
        const fromCity = CITY_CATALOG.find((city) => city.name === from);
        const toCity = CITY_CATALOG.find((city) => city.name === to);

        if (!fromCity || !toCity) return null;

        const start = latLongToVec3(fromCity.lat, fromCity.lon, 1.2);
        const end = latLongToVec3(toCity.lat, toCity.lon, 1.2);
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.5);

        return [start, mid, end];
      }).filter(Boolean),
    [],
  );

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={1.7} color="#dff7ff" />

      <group ref={globeGroup}>
        <mesh>
          <sphereGeometry args={[1.38, 64, 64]} />
          <meshPhysicalMaterial
            color="#9fe7ff"
            transparent
            opacity={0.23}
            transmission={0.9}
            thickness={0.9}
            roughness={0.1}
            metalness={0.08}
            ior={1.24}
            clearcoat={1}
          />
        </mesh>

        <mesh scale={1.05}>
          <sphereGeometry args={[1.42, 24, 24]} />
          <meshBasicMaterial color="#8eddfd" wireframe transparent opacity={0.28} />
        </mesh>

        {CITY_CATALOG.map((city) => {
          const point = latLongToVec3(city.lat, city.lon, 1.26);

          return (
            <mesh key={city.name} position={[point.x, point.y, point.z]}>
              <sphereGeometry args={[0.024, 12, 12]} />
              <meshBasicMaterial color="#8ae9ff" />
            </mesh>
          );
        })}

        {routeSegments.map((points, index) => (
          <Line
            key={`route-${index}`}
            points={points}
            color="#8ae9ff"
            transparent
            opacity={0.78}
            lineWidth={0.8}
          />
        ))}
      </group>

      {logoTexture && (
        <sprite position={[0, 0, 1.7]} scale={[0.72, 0.72, 1]}>
          <spriteMaterial map={logoTexture} transparent opacity={0.96} depthWrite={false} />
        </sprite>
      )}
    </>
  );
}

export default function GlobeHero() {
  return (
    <div className="hero-globe-shell" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 30 }} dpr={[1, 2]}>
        <GlobeVisual />
      </Canvas>
    </div>
  );
}
