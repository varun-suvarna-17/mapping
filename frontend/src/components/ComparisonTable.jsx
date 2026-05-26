import React from 'react';
import { ShieldCheck, Crosshair, HelpCircle } from 'lucide-react';

export default function ComparisonTable({ results }) {
  if (!results) return null;

  const { dijkstra, astar, greedy } = results;

  // Since Dijkstra guarantees shortest path, we use it as the optimal benchmark
  const optimalCost = dijkstra && dijkstra.cost > 0 ? dijkstra.cost : 0;

  const calculateAccuracy = (cost) => {
    if (cost === -1 || cost === undefined) return 0;
    if (optimalCost === 0) return 100;
    
    // Accuracy = (optimalCost / currentCost) * 100
    // If current cost is exactly optimal, accuracy is 100%. If current cost is larger, accuracy goes down.
    if (cost === optimalCost) return 100;
    const ratio = (optimalCost / cost) * 100;
    return parseFloat(ratio.toFixed(1));
  };

  const rows = [
    {
      name: 'Dijkstra',
      path: dijkstra?.path || [],
      distance: dijkstra?.cost !== -1 ? `${dijkstra?.cost.toFixed(1)} km` : 'N/A',
      visited: `${dijkstra?.visitedNodesCount || 0} nodes`,
      time: `${dijkstra?.executionTime || 0} ms`,
      accuracy: 100, // Always 100% since it is the benchmark
      labelColor: 'text-cyan-400 font-bold',
      rowBg: 'hover:bg-cyan-500/5'
    },
    {
      name: 'A* Search',
      path: astar?.path || [],
      distance: astar?.cost !== -1 ? `${astar?.cost.toFixed(1)} km` : 'N/A',
      visited: `${astar?.visitedNodesCount || 0} nodes`,
      time: `${astar?.executionTime || 0} ms`,
      accuracy: calculateAccuracy(astar?.cost),
      labelColor: 'text-primary-orange font-bold',
      rowBg: 'hover:bg-primary-orange/5'
    },
    {
      name: 'Greedy Best-First',
      path: greedy?.path || [],
      distance: greedy?.cost !== -1 ? `${greedy?.cost.toFixed(1)} km` : 'N/A',
      visited: `${greedy?.visitedNodesCount || 0} nodes`,
      time: `${greedy?.executionTime || 0} ms`,
      accuracy: calculateAccuracy(greedy?.cost),
      labelColor: 'text-indigo-400 font-bold',
      rowBg: 'hover:bg-indigo-500/5'
    }
  ];

  return (
    <div className="glass-panel rounded-2xl border border-border-custom shadow-xl overflow-hidden text-left relative">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-orange to-indigo-500" />
      
      <div className="p-6 border-b border-border-custom/60 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Crosshair className="w-5 h-5 text-primary-orange" />
            <span>Solvers Comparative Audit</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Performance assessment calculated dynamically relative to Dijkstra's mathematically optimal path.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-bg-main/60 border-b border-border-custom text-text-muted text-xs font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">Algorithm</th>
              <th className="py-4 px-6">Route Path</th>
              <th className="py-4 px-6">Distance</th>
              <th className="py-4 px-6">Visited Nodes</th>
              <th className="py-4 px-6">Speed (Time)</th>
              <th className="py-4 px-6 text-right">Accuracy Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-custom/50">
            {rows.map((row) => (
              <tr 
                key={row.name} 
                className={`transition-colors duration-200 ${row.rowBg}`}
              >
                <td className="py-4 px-6 font-semibold text-white">
                  <span className={row.labelColor}>{row.name}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-mono text-xs font-bold text-white bg-bg-main/40 px-2.5 py-1 rounded-lg border border-border-custom">
                    {row.path.length > 0 ? row.path.join(' → ') : 'No path'}
                  </span>
                </td>
                <td className="py-4 px-6 font-mono text-white">
                  {row.distance}
                </td>
                <td className="py-4 px-6 text-text-muted">
                  {row.visited}
                </td>
                <td className="py-4 px-6 font-mono text-white">
                  {row.time}
                </td>
                <td className="py-4 px-6 text-right">
                  <span 
                    className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-xs font-extrabold ${
                      row.accuracy === 100
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : row.accuracy >= 75
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{row.accuracy}%</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
