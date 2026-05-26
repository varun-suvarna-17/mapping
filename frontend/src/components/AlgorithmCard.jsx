import React from 'react';
import { Timer, Award, Eye, Navigation } from 'lucide-react';

export default function AlgorithmCard({ result, isOptimalCost }) {
  if (!result) return null;

  const { algorithm, path, cost, visitedNodesCount, executionTime } = result;

  // Determine design configurations based on algorithm type
  let themeColor = 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
  let badgeColor = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
  let focusBorder = 'hover:border-cyan-500/30';
  let accentName = 'Dijkstra';
  let descText = 'Explores uniformly in all directions. Always identifies mathematically optimal path.';

  if (algorithm.includes('A*') || algorithm.includes('astar')) {
    themeColor = 'text-primary-orange border-primary-orange/20 bg-primary-orange/5';
    badgeColor = 'bg-primary-orange/20 text-primary-orange border-primary-orange/30';
    focusBorder = 'hover:border-primary-orange/30';
    accentName = 'A* Search';
    descText = 'Employs Euclidean heuristics. Balances distance traversed with remaining distance to goal.';
  } else if (algorithm.toLowerCase().includes('greedy')) {
    themeColor = 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5';
    badgeColor = 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
    focusBorder = 'hover:border-indigo-500/30';
    accentName = 'Greedy Best-First';
    descText = 'Prioritizes immediate heading towards the goal. Blazing speeds but may compromise path cost.';
  }

  // Determine Badge Status
  let statusText = 'Optimal Path';
  let statusBadge = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  
  if (cost === -1) {
    statusText = 'Unreachable';
    statusBadge = 'bg-red-500/10 text-red-400 border-red-500/20';
  } else if (!isOptimalCost) {
    statusText = 'Sub-optimal Path';
    statusBadge = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  }

  return (
    <div className={`glass-panel p-6 rounded-2xl border border-border-custom transition-all duration-300 ${focusBorder} flex flex-col justify-between text-left h-full relative`}>
      {/* Accent Top Border */}
      <div className={`absolute top-0 left-0 w-full h-[3px] rounded-t-2xl ${themeColor.split(' ')[0] === 'text-cyan-400' ? 'bg-cyan-500' : themeColor.split(' ')[0] === 'text-primary-orange' ? 'bg-primary-orange' : 'bg-indigo-500'}`} />

      <div className="space-y-5">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold text-white tracking-wide">{accentName}</h4>
            <span className="text-[10px] text-text-muted mt-0.5 block font-medium uppercase tracking-wide">Graph Solver</span>
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusBadge}`}>
            {statusText}
          </span>
        </div>

        {/* Algorithm description */}
        <p className="text-xs text-text-muted leading-relaxed">
          {descText}
        </p>

        {/* Path highlight display */}
        <div className="bg-bg-main/50 p-3 rounded-xl border border-border-custom/80">
          <span className="text-[9px] uppercase tracking-wider font-bold text-text-muted block mb-1">
            Calculated Route
          </span>
          <p className="text-sm font-extrabold text-white font-mono tracking-wide truncate">
            {path && path.length > 0 ? path.join(' → ') : 'No path found'}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Metric: Cost */}
          <div className="bg-bg-main/30 p-2.5 rounded-lg border border-border-custom/40 text-center">
            <span className="text-[8px] text-text-muted font-bold uppercase tracking-wider block mb-1">Distance</span>
            <span className="text-xs font-black text-white font-mono flex items-center justify-center space-x-1">
              <Award className="w-3 h-3 text-primary-orange shrink-0" />
              <span>{cost === -1 ? 'N/A' : `${cost.toFixed(1)} km`}</span>
            </span>
          </div>

          {/* Metric: Visited */}
          <div className="bg-bg-main/30 p-2.5 rounded-lg border border-border-custom/40 text-center">
            <span className="text-[8px] text-text-muted font-bold uppercase tracking-wider block mb-1">Visited</span>
            <span className="text-xs font-black text-white font-mono flex items-center justify-center space-x-1">
              <Eye className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>{visitedNodesCount} / 5</span>
            </span>
          </div>

          {/* Metric: Time */}
          <div className="bg-bg-main/30 p-2.5 rounded-lg border border-border-custom/40 text-center">
            <span className="text-[8px] text-text-muted font-bold uppercase tracking-wider block mb-1">Speed</span>
            <span className="text-xs font-black text-white font-mono flex items-center justify-center space-x-1">
              <Timer className="w-3 h-3 text-purple-400 shrink-0" />
              <span>{executionTime !== undefined ? `${executionTime} ms` : 'N/A'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer sequence link */}
      <div className={`mt-6 pt-4 border-t border-border-custom/50 flex items-center justify-between text-[11px] ${themeColor.split(' ')[0]}`}>
        <span className="flex items-center space-x-1">
          <Navigation className="w-3.5 h-3.5 stroke-2 shrink-0 animate-pulse" />
          <span className="font-semibold uppercase tracking-wider">Active Path Highlighted</span>
        </span>
        <span className="text-text-muted font-mono font-bold">Steps: {path ? path.length : 0}</span>
      </div>
    </div>
  );
}
