import React, { useState } from 'react';
import { Play, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import { graphData } from '../data/graphData';

export default function RouteForm({ onSubmit, loading }) {
  const [source, setSource] = useState('A');
  const [destination, setDestination] = useState('D');
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [error, setError] = useState('');

  const nodeOptions = graphData.nodes;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (source === destination) {
      setError('Start and destination nodes must be different.');
      return;
    }

    onSubmit({ source, destination, algorithm });
  };

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
    setError('');
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-custom shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-orange via-orange-hover to-transparent" />
      
      <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <span>Routing Parameters</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
          {/* Source node */}
          <div className="md:col-span-3 space-y-2">
            <label htmlFor="source" className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Start Location
            </label>
            <select
              id="source"
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                setError('');
              }}
              className="w-full bg-bg-main text-white text-sm font-semibold rounded-xl border border-border-custom focus:border-primary-orange/60 focus:ring-1 focus:ring-primary-orange/60 p-3 outline-none cursor-pointer transition-colors duration-200"
            >
              {nodeOptions.map((node) => (
                <option key={node.id} value={node.id}>
                  Node {node.id} ({node.label})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-5 md:pt-0">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2.5 rounded-xl bg-card-bg hover:bg-border-custom border border-border-custom text-text-muted hover:text-primary-orange transition-colors duration-200 cursor-pointer active:scale-95 shadow"
              title="Swap Start & Destination"
            >
              <ArrowRightLeft className="w-4 h-4 transform rotate-90 md:rotate-0" />
            </button>
          </div>

          {/* Destination node */}
          <div className="md:col-span-3 space-y-2">
            <label htmlFor="destination" className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Destination Location
            </label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setError('');
              }}
              className="w-full bg-bg-main text-white text-sm font-semibold rounded-xl border border-border-custom focus:border-primary-orange/60 focus:ring-1 focus:ring-primary-orange/60 p-3 outline-none cursor-pointer transition-colors duration-200"
            >
              {nodeOptions.map((node) => (
                <option key={node.id} value={node.id}>
                  Node {node.id} ({node.label})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Algorithm selector */}
        <div className="space-y-2">
          <label htmlFor="algorithm" className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
            Algorithm Solver
          </label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full bg-bg-main text-white text-sm font-semibold rounded-xl border border-border-custom focus:border-primary-orange/60 focus:ring-1 focus:ring-primary-orange/60 p-3 outline-none cursor-pointer transition-colors duration-200"
          >
            <option value="dijkstra">Dijkstra's Algorithm (Guarantees Shortest Path)</option>
            <option value="astar">A* Heuristic Search (Optimal & Targeted)</option>
            <option value="greedy">Greedy Best-First Search (Fastest Traversal)</option>
          </select>
        </div>

        {/* Error notification */}
        {error && (
          <div className="flex items-center space-x-2 text-xs bg-red-500/10 text-red-400 p-3.5 rounded-xl border border-red-500/20">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full group inline-flex items-center justify-center bg-primary-orange hover:bg-orange-hover text-white text-sm font-bold p-3.5 rounded-xl border border-primary-orange/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Calculating Optimal Route...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Calculate Route</span>
              <Play className="w-3.5 h-3.5 fill-white group-hover:translate-x-0.5 transition-transform" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
