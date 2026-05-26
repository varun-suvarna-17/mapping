import React from 'react';
import { Network, Zap, ShieldCheck, Database } from 'lucide-react';
import { graphData } from '../data/graphData';

export default function StatsSection() {
  const nodeCount = graphData.nodes.length;
  const edgeCount = graphData.edges.length;
  
  // Calculate average degree of the graph
  const avgDegree = ((edgeCount * 2) / nodeCount).toFixed(1);

  const stats = [
    {
      id: 1,
      name: 'Network Nodes',
      value: `${nodeCount} Anchors`,
      description: 'Preconfigured key vertices',
      icon: Network,
      color: 'text-primary-orange bg-primary-orange/10 border-primary-orange/20'
    },
    {
      id: 2,
      name: 'Adjacency Edges',
      value: `${edgeCount} Paths`,
      description: `Density ratio: ${avgDegree} paths/node`,
      icon: Database,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 3,
      name: 'Graph Solvers',
      value: '3 Engines',
      description: 'Dijkstra, A*, and Greedy',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 4,
      name: 'Execution Speeds',
      value: 'Microseconds',
      description: 'Runs dynamic local heuristics',
      icon: Zap,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <div className="py-12 bg-bg-main border-y border-border-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="glass-panel p-6 rounded-2xl border border-border-custom hover:border-primary-orange/20 transition-all duration-300 group flex items-center space-x-5"
              >
                <div className={`p-3.5 rounded-xl border ${stat.color} group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {stat.name}
                  </p>
                  <p className="text-xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-muted leading-tight">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
