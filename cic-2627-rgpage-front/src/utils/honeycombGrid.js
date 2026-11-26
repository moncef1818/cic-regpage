/**
 * Honeycomb Grid Layout & Adjacency Generator
 * Maps an array of workshops into a continuous interlocking hex beehive grid.
 */

export const DEPARTMENT_COLORS = {
  'Ethical Hacking': '#e05c6a',
  'Cybersecurity': '#4dc9e6',
  'Development': '#3ecf88',
  'Artificial Intelligence': '#fbbf24',
  'Design & Media': '#b5a0f5',
  'Design and Media': '#b5a0f5',
  'HR': '#fb7185',
  'Logistics': '#f97316',
  'External Relations (ER)': '#7dd3fc',
  'Organization': '#8a9bb0',
  'Aura': '#fb7185',
};

/**
 * Builds honeycomb grid nodes with exact interlocking (row, col) coordinates and adjacency matrix.
 */
export function buildHoneycombGrid(workshops = []) {
  if (!workshops || workshops.length === 0) {
    return { gridNodes: [], nodeMap: {}, adjacencyMap: {} };
  }

  // Row pattern for natural beehive silhouette: alternating 4 and 5 items per row
  const rowPattern = [4, 5, 4, 5, 4, 5, 4];
  
  let workshopIdx = 0;
  const gridNodes = [];
  const nodeMap = {}; // Key: "r-c" -> node

  for (let r = 0; r < rowPattern.length && workshopIdx < workshops.length; r++) {
    const colCount = rowPattern[r];
    for (let c = 0; c < colCount && workshopIdx < workshops.length; c++) {
      const w = workshops[workshopIdx];
      const id = `hex-${r}-${c}`;
      const color = DEPARTMENT_COLORS[w.department] || '#4dc9e6';

      const node = {
        ...w,
        id,
        row: r,
        col: c,
        isEvenRow: r % 2 === 0,
        color,
        index: workshopIdx,
      };

      gridNodes.push(node);
      nodeMap[`${r}-${c}`] = node;
      workshopIdx++;
    }
  }

  // Calculate adjacent neighbors for every hexagon in the beehive
  const adjacencyMap = {};

  gridNodes.forEach((node) => {
    const { row: r, col: c, isEvenRow } = node;
    const neighborKeys = [];

    // Left and Right on same row
    neighborKeys.push(`${r}-${c - 1}`);
    neighborKeys.push(`${r}-${c + 1}`);

    if (isEvenRow) {
      // Even rows offset relative to odd rows above and below
      neighborKeys.push(`${r - 1}-${c}`);
      neighborKeys.push(`${r - 1}-${c + 1}`);
      neighborKeys.push(`${r + 1}-${c}`);
      neighborKeys.push(`${r + 1}-${c + 1}`);
    } else {
      // Odd rows offset
      neighborKeys.push(`${r - 1}-${c - 1}`);
      neighborKeys.push(`${r - 1}-${c}`);
      neighborKeys.push(`${r + 1}-${c - 1}`);
      neighborKeys.push(`${r + 1}-${c}`);
    }

    // Filter valid adjacent neighbors existing in the grid
    const validNeighbors = neighborKeys
      .map((key) => nodeMap[key]?.id)
      .filter(Boolean);

    adjacencyMap[node.id] = validNeighbors;
  });

  return {
    gridNodes,
    nodeMap,
    adjacencyMap,
    rowCount: Math.max(...gridNodes.map((n) => n.row)) + 1,
  };
}
