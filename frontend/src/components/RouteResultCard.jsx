import React, { useState } from 'react';
import { Award, Compass, Timer, Layers, Copy, Check, Info } from 'lucide-react';

export default function RouteResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const { algorithm, path, cost, visitedNodesCount, executionTime, isOffline } = result;

  const handleCopy = () => {
    navigator.clipboard.writeText(path.join(' -> '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pathDisplay = path && path.length > 0 ? path.join(' → ') : 'No path calculated';

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-custom shadow-xl relative overflow-hidden text-left">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Compass className="w-5 h-5 text-primary-orange animate-spin-slow" />
          <span>Calculation Results</span>
        </h3>
        
        {isOffline ? (
          <span className="text-[10px] tracking-wide font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            Preview Mode (Dynamic Local Solver)
          </span>
        ) : (
          <span className="text-[10px] tracking-wide font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            FastAPI Connected (Live API)
          </span>
        )}
      </div>

      {/* Main Path display card */}
      <div className="bg-bg-main/60 p-4.5 rounded-xl border border-border-custom/80 mb-6 flex items-center justify-between group">
        <div className="space-y-1 overflow-x-auto">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Calculated Route Path</span>
          <p className="text-base font-extrabold text-white font-mono leading-none tracking-wide">
            {pathDisplay}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-card-bg hover:bg-border-custom border border-border-custom text-text-muted hover:text-primary-orange transition-colors cursor-pointer"
          title="Copy path string"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Path visual dots workflow */}
      {path && path.length > 0 && (
        <div className="mb-8">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-3.5">
            Path Breakdown
          </span>
          <div className="flex items-center space-x-2 overflow-x-auto py-2">
            {path.map((node, index) => (
              <React.Fragment key={node}>
                <div className="flex flex-col items-center justify-center bg-card-bg border border-border-custom w-10 h-10 rounded-xl font-bold font-mono text-sm text-white shadow-sm ring-1 ring-black/40 relative group-hover:border-primary-orange">
                  <span className="text-primary-orange">{node}</span>
                  {index === 0 && (
                    <span className="absolute -bottom-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[8px] font-extrabold px-1 rounded transform translate-y-2 uppercase scale-75 tracking-tighter">
                      Start
                    </span>
                  )}
                  {index === path.length - 1 && (
                    <span className="absolute -bottom-1 bg-primary-orange/20 border border-primary-orange/40 text-primary-orange text-[8px] font-extrabold px-1 rounded transform translate-y-2 uppercase scale-75 tracking-tighter">
                      Goal
                    </span>
                  )}
                </div>
                {index < path.length - 1 && (
                  <span className="text-text-muted font-bold text-lg animate-pulse">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Metric: Cost */}
        <div className="bg-card-bg p-4 rounded-2xl border border-border-custom/60 flex flex-col items-start space-y-2.5 hover:border-primary-orange/30 transition-colors duration-300">
          <div className="bg-primary-orange/10 p-2.5 rounded-xl border border-primary-orange/20 text-primary-orange">
            <Award className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 text-left w-full">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Total Distance</span>
            <span className="text-base sm:text-lg font-black text-white font-mono truncate block">
              {cost === -1 ? 'N/A' : `${cost.toFixed(1)} km`}
            </span>
          </div>
        </div>

        {/* Metric: Algorithm */}
        <div className="bg-card-bg p-4 rounded-2xl border border-border-custom/60 flex flex-col items-start space-y-2.5 hover:border-cyan-500/30 transition-colors duration-300">
          <div className="bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/20 text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 text-left w-full">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Solver Method</span>
            <span className="text-base sm:text-lg font-black text-white truncate block">
              {algorithm}
            </span>
          </div>
        </div>

        {/* Metric: Visited Nodes */}
        <div className="bg-card-bg p-4 rounded-2xl border border-border-custom/60 flex flex-col items-start space-y-2.5 hover:border-amber-500/30 transition-colors duration-300">
          <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-400">
            <Compass className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 text-left w-full">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Visited Nodes</span>
            <span className="text-base sm:text-lg font-black text-white font-mono truncate block">
              {visitedNodesCount} / 5
            </span>
          </div>
        </div>

        {/* Metric: Time */}
        <div className="bg-card-bg p-4 rounded-2xl border border-border-custom/60 flex flex-col items-start space-y-2.5 hover:border-purple-500/30 transition-colors duration-300">
          <div className="bg-purple-500/10 p-2.5 rounded-xl border border-purple-500/20 text-purple-400">
            <Timer className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 text-left w-full">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Solver Speed</span>
            <span className="text-base sm:text-lg font-black text-white font-mono truncate block">
              {executionTime !== undefined ? `${executionTime} ms` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Info notice explaining metrics */}
      <div className="mt-6 flex items-start space-x-2 text-[11px] text-text-muted leading-relaxed bg-bg-main/30 p-3 rounded-lg border border-border-custom/50">
        <Info className="w-3.5 h-3.5 text-primary-orange shrink-0 mt-0.5 animate-bounce-slow" />
        <span>
          <strong>Optimizer insight:</strong> {algorithm} calculated this route. The total distance represents the cumulative weight of traversed graph edges. Visited nodes display the number of graph hubs evaluated before identifying the absolute goal.
        </span>
      </div>
    </div>
  );
}
