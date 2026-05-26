import React, { useState } from 'react';
import { graphData } from '../data/graphData';
import { Info, HelpCircle } from 'lucide-react';

export default function GraphPreview({ activePath = [], visitedOrder = [] }) {
  const { nodes, edges } = graphData;
  const [hoveredNode, setHoveredNode] = useState(null);

  // Helper to check if a specific edge is part of the calculated path
  const isEdgeActive = (source, target) => {
    if (!activePath || activePath.length < 2) return false;
    for (let i = 0; i < activePath.length - 1; i++) {
      const u = activePath[i];
      const v = activePath[i + 1];
      if ((u === source && v === target) || (u === target && v === source)) {
        return true;
      }
    }
    return false;
  };

  // Helper to check if a specific node is part of the calculated path
  const isNodeActive = (nodeId) => {
    return activePath && activePath.includes(nodeId);
  };

  // Helper to check if a node was visited during calculation
  const isNodeVisited = (nodeId) => {
    return visitedOrder && visitedOrder.includes(nodeId);
  };

  // Generate SVG path string from calculated nodes list
  const getActivePathD = () => {
    if (!activePath || activePath.length < 2) return '';
    return activePath
      .map((nodeId, idx) => {
        const node = nodes.find((n) => n.id === nodeId);
        if (!node) return '';
        return `${idx === 0 ? 'M' : 'L'} ${node.x} ${node.y}`;
      })
      .join(' ');
  };

  const pathD = getActivePathD();

  return (
    <div className="glass-panel p-6 rounded-2xl border border-border-custom shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]">
      {/* Visual Header */}
      <div className="flex justify-between items-center mb-4 border-b border-border-custom/50 pb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <span className="w-2.5 h-2.5 bg-primary-orange rounded-full animate-ping" />
          <span>Interactive Graph Network</span>
        </h3>
        
        <div className="flex items-center space-x-3 text-[10px] text-text-muted">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-border-custom" />
            <span>Edges</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-primary-orange" />
            <span>Path</span>
          </span>
        </div>
      </div>

      {/* SVG Canvas Frame */}
      <div className="relative w-full flex-grow flex items-center justify-center bg-bg-main/30 rounded-xl border border-border-custom/50 overflow-hidden py-4">
        <svg 
          className="w-full h-full max-h-[350px] aspect-[4/3] select-none"
          viewBox="0 0 520 400"
        >
          {/* Filters for glow effects */}
          <defs>
            <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-pulse" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feColorMatrix type="matrix" values="1 0 0 0 0.97  0 1 0 0 0.45  0 0 1 0 0.08  0 0 0 0.8 0"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Default Edges / Paths */}
          <g strokeLinecap="round">
            {edges.map((edge, idx) => {
              const u = nodes.find(n => n.id === edge.source);
              const v = nodes.find(n => n.id === edge.target);
              if (!u || !v) return null;

              const active = isEdgeActive(edge.source, edge.target);

              return (
                <line
                  key={`edge-${idx}`}
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  className={`transition-all duration-300 ${
                    active 
                      ? 'stroke-primary-orange stroke-[4]' 
                      : 'stroke-border-custom stroke-[2.5] hover:stroke-text-muted'
                  }`}
                  style={active ? { filter: 'url(#glow-orange)' } : {}}
                />
              );
            })}
          </g>

          {/* Render Highlighted Moving Particle Overlay */}
          {pathD && (
            <g>
              {/* Core animated trail line */}
              <path
                d={pathD}
                fill="none"
                stroke="#F97316"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="animated-draw-line"
              />

              {/* Dynamic traveling data flow particle */}
              <circle r="6" fill="#F97316" style={{ filter: 'url(#glow-pulse)' }}>
                <animateMotion 
                  dur="2.5s" 
                  repeatCount="indefinite" 
                  path={pathD} 
                />
              </circle>
            </g>
          )}

          {/* Render Edge Weights badge placements */}
          <g>
            {edges.map((edge, idx) => {
              const u = nodes.find(n => n.id === edge.source);
              const v = nodes.find(n => n.id === edge.target);
              if (!u || !v) return null;

              const active = isEdgeActive(edge.source, edge.target);
              
              // Calculate midpoint of the connection edge
              const mx = (u.x + v.x) / 2;
              const my = (u.y + v.y) / 2;

              return (
                <g key={`weight-${idx}`} transform={`translate(${mx}, ${my})`}>
                  <rect
                    x="-12"
                    y="-9"
                    width="24"
                    height="18"
                    rx="6"
                    className={`transition-colors duration-200 ${
                      active 
                        ? 'fill-primary-orange stroke-primary-orange/50 stroke' 
                        : 'fill-card-bg stroke-border-custom stroke'
                    }`}
                  />
                  <text
                    y="3"
                    textAnchor="middle"
                    className={`text-[9px] font-extrabold font-mono ${
                      active ? 'fill-white' : 'fill-text-muted'
                    }`}
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Render Vertices / Nodes */}
          <g>
            {nodes.map((node) => {
              const active = isNodeActive(node.id);
              const visited = isNodeVisited(node.id);
              const hovered = hoveredNode === node.id;
              
              // Start node marker on active path
              const isStart = activePath && activePath[0] === node.id;
              // Target node marker on active path
              const isEnd = activePath && activePath[activePath.length - 1] === node.id;

              return (
                <g 
                  key={`node-${node.id}`} 
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer pulsating rings for active nodes */}
                  {active && (
                    <circle 
                      r="22" 
                      className="fill-none stroke-primary-orange/20 stroke-1 animate-ping" 
                    />
                  )}
                  {visited && !active && (
                    <circle 
                      r="18" 
                      className="fill-none stroke-cyan-500/10 stroke-1 animate-pulse-slow" 
                    />
                  )}

                  {/* Main Node bubble */}
                  <circle
                    r={hovered ? 17 : 14}
                    className={`transition-all duration-300 ${
                      isStart 
                        ? 'fill-bg-main stroke-emerald-500 stroke-[3]' 
                        : isEnd 
                        ? 'fill-bg-main stroke-primary-orange stroke-[3]' 
                        : active 
                        ? 'fill-bg-main stroke-primary-orange stroke-[2.5]' 
                        : visited
                        ? 'fill-bg-main stroke-cyan-500 stroke-[2]'
                        : 'fill-bg-main stroke-border-custom stroke-[2.5]'
                    }`}
                    style={active || visited ? { filter: 'url(#glow-orange)' } : {}}
                  />

                  {/* Inner center core */}
                  <circle
                    r={hovered ? 5 : 3.5}
                    className={`transition-all duration-300 ${
                      isStart
                        ? 'fill-emerald-400'
                        : isEnd || active
                        ? 'fill-primary-orange'
                        : visited
                        ? 'fill-cyan-400'
                        : 'fill-text-muted'
                    }`}
                  />

                  {/* Text Label */}
                  <text
                    y="-22"
                    textAnchor="middle"
                    className={`text-[11px] font-bold font-mono tracking-wide ${
                      active ? 'fill-primary-orange' : visited ? 'fill-cyan-400' : 'fill-text-main'
                    }`}
                  >
                    {node.id}
                  </text>

                  {/* Subtext description tooltip indicator */}
                  {hovered && (
                    <g transform="translate(0, 32)" className="z-50">
                      <rect
                        x="-50"
                        y="-15"
                        width="100"
                        height="22"
                        rx="6"
                        className="fill-card-bg stroke-border-custom stroke shadow-lg"
                      />
                      <text
                        y="-1"
                        textAnchor="middle"
                        className="fill-white text-[9px] font-semibold"
                      >
                        {node.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* SVG Canvas Footer Status Panel */}
      <div className="mt-4 bg-bg-main/50 p-3 rounded-xl border border-border-custom/50 text-left flex items-start space-x-2 text-[11px] text-text-muted">
        <Info className="w-3.5 h-3.5 text-primary-orange shrink-0 mt-0.5" />
        <div>
          {activePath && activePath.length > 0 ? (
            <span>
              Calculated path is actively highlighted in <strong className="text-primary-orange">orange</strong>. Solid lines represent the final optimal route, and the glowing pulse tracks flow directions.
            </span>
          ) : (
            <span>
              Select locations on the left panel to calculate an optimal route. Vertices are mapped using coordinate bounds, displaying connections and weight costs.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
