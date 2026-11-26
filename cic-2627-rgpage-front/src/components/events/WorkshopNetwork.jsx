import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { buildHoneycombGrid, DEPARTMENT_COLORS } from '../../utils/honeycombGrid';

const EASE = [0.22, 1, 0.36, 1];

export default function WorkshopNetwork({ workshops = [] }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Build interconnected beehive honeycomb grid and adjacency map
  const { gridNodes, adjacencyMap, rowCount } = useMemo(() => {
    return buildHoneycombGrid(workshops);
  }, [workshops]);

  // Compute adjacent neighbor node IDs for the currently hovered node
  const adjacentNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set();
    const neighbors = adjacencyMap[hoveredNodeId] || [];
    return new Set(neighbors);
  }, [hoveredNodeId, adjacencyMap]);

  // Group nodes by row to build the interlocking beehive rows
  const rows = useMemo(() => {
    const rMap = {};
    for (let r = 0; r < rowCount; r++) rMap[r] = [];
    gridNodes.forEach((node) => {
      if (rMap[node.row]) rMap[node.row].push(node);
    });
    return Object.values(rMap);
  }, [gridNodes, rowCount]);

  const departmentsList = ['All', ...Object.keys(DEPARTMENT_COLORS)];

  return (
    <section className="wn-section" id="workshops-honeycomb">
      {/* Header & Filter Controls */}
      <div className="wn-header">
        <motion.div
          className="wn-title-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="section-eyebrow">Digital Knowledge Beehive</p>
          <h2 className="section-title" style={{ marginBottom: 8 }}>
            Workshop Programme
          </h2>
          <p style={{ fontSize: '0.94rem', color: 'var(--grey)', maxWidth: '600px', lineHeight: 1.7 }}>
            Every workshop in our season connected in a single geometric beehive structure. Hover to illuminate adjacent knowledge paths or click to pin your selection.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="wn-filter-bar">
          {departmentsList.map((dept) => {
            const color = DEPARTMENT_COLORS[dept] || 'var(--cyan)';
            const isActive = selectedFilter === dept;
            return (
              <button
                key={dept}
                className={`wn-filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedFilter(dept)}
              >
                {dept !== 'All' && (
                  <span className="wn-filter-dot" style={{ background: color }} />
                )}
                <span>{dept}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Beehive Container */}
      <div className="wn-beehive-container">
        {/* Subtle Technical Backdrop */}
        <div className="wn-cyber-grid" />
        <div className="wn-ambient-glow" />

        {/* Continuous Interlocking Honeycomb Rows */}
        <div className="wn-honeycomb-grid">
          {rows.map((rowNodes, rIdx) => (
            <div key={`row-${rIdx}`} className="wn-honeycomb-row">
              {rowNodes.map((node) => {
                const isHovered = hoveredNodeId === node.id;
                const isSelected = selectedNodeId === node.id;
                const isAdjacent = adjacentNodeIds.has(node.id);
                const isFilterMatch =
                  selectedFilter === 'All' || node.department === selectedFilter;

                let stateClass = '';
                if (isSelected) stateClass = 'selected';
                else if (isHovered) stateClass = 'hovered';
                else if (isAdjacent) stateClass = 'adjacent';
                else if (hoveredNodeId || !isFilterMatch) stateClass = 'dimmed';

                return (
                  <div
                    key={node.id}
                    className={`wn-hex-wrapper ${stateClass}`}
                    style={{
                      '--accent-color': node.color,
                    }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onClick={() =>
                      setSelectedNodeId(selectedNodeId === node.id ? null : node.id)
                    }
                  >
                    {/* Outer Department Color Accent Border */}
                    <div
                      className="wn-hex-border"
                      style={{
                        background:
                          isSelected || isHovered
                            ? node.color
                            : isAdjacent
                            ? `${node.color}90`
                            : 'rgba(255, 255, 255, 0.12)',
                      }}
                    />

                    {/* Dark Glass Cell Content (Only Title, Instructor, Department, Date) */}
                    <div className="wn-hex-card">
                      <div className="wn-hex-dept-tag" style={{ color: node.color }}>
                        <span className="wn-filter-dot" style={{ background: node.color }} />
                        <span>{node.department}</span>
                      </div>

                      <h4 className="wn-hex-title">{node.title}</h4>

                      <p className="wn-hex-instructor">
                        {node.speaker || 'CIC Team'}
                      </p>

                      <span className="wn-hex-date">{node.dateLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Beehive HUD Footer */}
        <div className="wn-beehive-hud">
          <span>CIC // {gridNodes.length} WORKSHOPS </span>
        </div>
      </div>
    </section>
  );
}
