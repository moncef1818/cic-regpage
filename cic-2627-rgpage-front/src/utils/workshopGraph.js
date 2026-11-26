/**
 * Dynamic Workshop Graph Generator
 * Computes organic 2D layout coordinates, department color tokens,
 * and semantic relationship edges between workshops.
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

// Department clusters default positions across a 1000x650 viewport canvas
const DEPT_CENTERS = {
  'Ethical Hacking':       { cx: 240, cy: 180 },
  'Cybersecurity':         { cx: 480, cy: 140 },
  'Development':           { cx: 760, cy: 220 },
  'Design and Media':      { cx: 200, cy: 460 },
  'Artificial Intelligence': { cx: 780, cy: 480 },
  'Organization':          { cx: 480, cy: 520 },
  'Aura':                  { cx: 500, cy: 320 },
};

/**
 * Builds nodes, connections (edges), and adjacency matrix dynamically from workshop data.
 */
export function buildWorkshopGraph(workshops = []) {
  if (!workshops || workshops.length === 0) {
    return { nodes: [], edges: [], adjacencyMap: {} };
  }

  // Count items per department to offset nodes organically
  const deptCounters = {};

  const nodes = workshops.map((w, idx) => {
    const dept = w.department || 'Organization';
    const color = DEPARTMENT_COLORS[dept] || '#4dc9e6';
    const count = deptCounters[dept] || 0;
    deptCounters[dept] = count + 1;

    // Organic offset algorithm (honeycomb golden spiral distribution around department center)
    const center = DEPT_CENTERS[dept] || { cx: 500, cy: 300 };
    const angle = count * 1.8 + (idx % 3) * 0.5;
    const radius = 65 + count * 38;

    // Calculate (x, y) coordinates clamped within viewport bounds
    const rawX = center.cx + Math.cos(angle) * radius;
    const rawY = center.cy + Math.sin(angle) * (radius * 0.75);

    const x = Math.max(90, Math.min(910, rawX));
    const y = Math.max(80, Math.min(570, rawY));

    return {
      ...w,
      id: `node-${idx}`,
      index: idx,
      color,
      x,
      y,
      // Subtle float offsets for fluid motion engine
      floatDx: (idx % 2 === 0 ? 1 : -1) * (3 + (idx % 4) * 2),
      floatDy: (idx % 3 === 0 ? -1 : 1) * (4 + (idx % 3) * 2),
      floatDuration: 4 + (idx % 3) * 1.5,
    };
  });

  // Calculate dynamic connections (edges)
  const edges = [];
  const edgeSet = new Set();
  const adjacencyMap = {};

  nodes.forEach((n) => {
    adjacencyMap[n.id] = new Set();
  });

  const addEdge = (sourceId, targetId, reason = 'related') => {
    if (sourceId === targetId) return;
    const key = sourceId < targetId ? `${sourceId}-${targetId}` : `${targetId}-${sourceId}`;
    if (edgeSet.has(key)) return;

    edgeSet.add(key);
    adjacencyMap[sourceId].add(targetId);
    adjacencyMap[targetId].add(sourceId);

    const sourceNode = nodes.find((n) => n.id === sourceId);
    const targetNode = nodes.find((n) => n.id === targetId);

    edges.push({
      id: key,
      source: sourceId,
      target: targetId,
      sourceNode,
      targetNode,
      reason,
      color: sourceNode?.color || '#4dc9e6',
    });
  };

  // 1. Connect sequential workshops in the same department
  const deptGroups = {};
  nodes.forEach((node) => {
    if (!deptGroups[node.department]) deptGroups[node.department] = [];
    deptGroups[node.department].push(node);
  });

  Object.values(deptGroups).forEach((group) => {
    for (let i = 0; i < group.length - 1; i++) {
      addEdge(group[i].id, group[i + 1].id, 'department');
    }
  });

  // 2. Connect Learning Track / Topic Relationships across departments
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const n1 = nodes[i];
      const n2 = nodes[j];

      const t1 = n1.title.toLowerCase();
      const t2 = n2.title.toLowerCase();

      // Speaker connection
      if (n1.speaker && n2.speaker && n1.speaker === n2.speaker) {
        addEdge(n1.id, n2.id, 'speaker');
      }
      // Hacking & Security Learning Track
      else if (
        (t1.includes('hacking') || t1.includes('exploitation') || t1.includes('cryptography') || t1.includes('forensics')) &&
        (t2.includes('hacking') || t2.includes('exploitation') || t2.includes('cryptography') || t2.includes('forensics'))
      ) {
        if (Math.abs(n1.index - n2.index) <= 6) {
          addEdge(n1.id, n2.id, 'learning-track');
        }
      }
      // Dev & Design Track
      else if (
        (t1.includes('frontend') || t1.includes('backend') || t1.includes('design') || t1.includes('game') || t1.includes('oop')) &&
        (t2.includes('frontend') || t2.includes('backend') || t2.includes('design') || t2.includes('game') || t2.includes('oop'))
      ) {
        if (Math.abs(n1.index - n2.index) <= 5) {
          addEdge(n1.id, n2.id, 'learning-track');
        }
      }
      // AI & Data Track
      else if ((t1.includes('ai') || t1.includes('machine learning')) && (t2.includes('ai') || t2.includes('machine learning'))) {
        addEdge(n1.id, n2.id, 'learning-track');
      }
    }
  }

  // Convert adjacency sets to arrays
  const formattedAdjacency = {};
  Object.keys(adjacencyMap).forEach((key) => {
    formattedAdjacency[key] = Array.from(adjacencyMap[key]);
  });

  return {
    nodes,
    edges,
    adjacencyMap: formattedAdjacency,
  };
}
