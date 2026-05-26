import React, { useState, useEffect } from 'react';
import { compareRoutes } from '../services/api';
import { graphData } from '../data/graphData';
import AlgorithmCard from '../components/AlgorithmCard';
import ComparisonTable from '../components/ComparisonTable';
import GraphPreview from '../components/GraphPreview';
import { GitCompare, Play, ShieldAlert, Cpu } from 'lucide-react';

export default function AlgorithmComparison() {
  const [source, setSource] = useState('A');
  const [destination, setDestination] = useState('D');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [activeHighlight, setActiveHighlight] = useState('dijkstra'); // 'dijkstra', 'astar', 'greedy'

  const nodeOptions = graphData.nodes;

  useEffect(() => {
    // Initial comparison solve to engage visitor
    handleCompare();
  }, []);

  const handleCompare = async () => {
    setError('');
    
    if (source === destination) {
      setError('Start and destination nodes must be different.');
      return;
    }

    setLoading(true);
    try {
      const audit = await compareRoutes({ source, destination });
      setResults(audit);
    } catch (err) {
      console.error('[Smart Route Compare] Auditing failed:', err);
      setError('An error occurred during path calculations. Check backend server.');
    } finally {
      setLoading(false);
    }
  };

  const getActiveHighlightData = () => {
    if (!results) return { path: [], visitedOrder: [] };
    const activeData = results[activeHighlight];
    return {
      path: activeData?.path || [],
      visitedOrder: activeData?.visitedOrder || []
    };
  };

  const activeHighlightData = getActiveHighlightData();

  // Benchmark check for optimal costs
  const optimalCost = results?.dijkstra?.cost || 0;

  return (
    <div className="bg-bg-main min-h-screen text-text-main pt-24 pb-16 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title introduction */}
        <div className="text-left mb-10 space-y-2">
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-2.5">
            <GitCompare className="w-8 h-8 text-primary-orange" />
            <span>Algorithm Comparison Dashboard</span>
          </h1>
          <p className="text-sm text-text-muted max-w-2xl">
            Evaluate Dijkstra's Dijkstra Search, A* Heuristics, and Greedy Search in parallel. Measure distance, vertex explorations, timing speeds, and mathematical accuracy ratios.
          </p>
        </div>

        {/* Input parameters panel */}
        <div className="glass-panel p-6 rounded-2xl border border-border-custom shadow-xl mb-8 relative">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-orange to-indigo-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Start Node */}
            <div className="md:col-span-4 space-y-1.5 text-left">
              <label htmlFor="comp-source" className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Start Anchor
              </label>
              <select
                id="comp-source"
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  setError('');
                }}
                className="w-full bg-bg-main text-white text-sm font-semibold rounded-xl border border-border-custom focus:border-primary-orange/60 focus:ring-1 focus:ring-primary-orange/60 p-3 outline-none cursor-pointer"
              >
                {nodeOptions.map((node) => (
                  <option key={node.id} value={node.id}>
                    Node {node.id} ({node.label})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Node */}
            <div className="md:col-span-4 space-y-1.5 text-left">
              <label htmlFor="comp-destination" className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Destination Anchor
              </label>
              <select
                id="comp-destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setError('');
                }}
                className="w-full bg-bg-main text-white text-sm font-semibold rounded-xl border border-border-custom focus:border-primary-orange/60 focus:ring-1 focus:ring-primary-orange/60 p-3 outline-none cursor-pointer"
              >
                {nodeOptions.map((node) => (
                  <option key={node.id} value={node.id}>
                    Node {node.id} ({node.label})
                  </option>
                ))}
              </select>
            </div>

            {/* Trigger Button */}
            <div className="md:col-span-4 pt-5 md:pt-4">
              <button
                onClick={handleCompare}
                disabled={loading}
                className="w-full group inline-flex items-center justify-center bg-primary-orange hover:bg-orange-hover text-white text-sm font-bold p-3.5 rounded-xl border border-primary-orange/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Networks...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Audit Network Solvers</span>
                    <GitCompare className="w-4 h-4 text-white" />
                  </span>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-xs bg-red-500/10 text-red-400 p-3.5 rounded-xl border border-red-500/20 mt-4 text-left">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Audit results grids */}
        {results && !loading && (
          <div className="space-y-8">
            
            {/* Visualizer selector tabs overlay */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              
              {/* Left Column: Interactive Cards Grid */}
              <div className="lg:w-7/12 flex flex-col justify-between space-y-4">
                <div className="text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary-orange bg-primary-orange/10 px-2.5 py-1 rounded-full border border-primary-orange/20">
                    Calculated Outcomes
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">Compare Solvers</h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">
                    Click on any algorithm card below to dynamically paint its resolved shortest path on the visual canvas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 flex-grow">
                  {/* Dijkstra */}
                  <div 
                    onClick={() => setActiveHighlight('dijkstra')}
                    className={`cursor-pointer transform hover:-translate-y-0.5 transition-all duration-200 rounded-2xl ${
                      activeHighlight === 'dijkstra' 
                        ? 'ring-2 ring-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <AlgorithmCard 
                      result={results.dijkstra} 
                      isOptimalCost={true} // Dijkstra is always optimal
                    />
                  </div>

                  {/* A* Search */}
                  <div 
                    onClick={() => setActiveHighlight('astar')}
                    className={`cursor-pointer transform hover:-translate-y-0.5 transition-all duration-200 rounded-2xl ${
                      activeHighlight === 'astar' 
                        ? 'ring-2 ring-primary-orange/80 shadow-[0_0_15px_rgba(249,115,22,0.15)]' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <AlgorithmCard 
                      result={results.astar} 
                      isOptimalCost={results.astar?.cost === optimalCost} 
                    />
                  </div>

                  {/* Greedy Best-First */}
                  <div 
                    onClick={() => setActiveHighlight('greedy')}
                    className={`cursor-pointer transform hover:-translate-y-0.5 transition-all duration-200 rounded-2xl ${
                      activeHighlight === 'greedy' 
                        ? 'ring-2 ring-indigo-400/80 shadow-[0_0_15px_rgba(129,140,248,0.15)]' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <AlgorithmCard 
                      result={results.greedy} 
                      isOptimalCost={results.greedy?.cost === optimalCost} 
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Path Drawing Canvas */}
              <div className="lg:w-5/12 flex flex-col">
                <div className="text-left mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                    Live Highlight
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">Active: {activeHighlight === 'dijkstra' ? 'Dijkstra' : activeHighlight === 'astar' ? 'A* Search' : 'Greedy'}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Traversal sequence: {activeHighlightData.path.join(' → ')}
                  </p>
                </div>

                <div className="flex-grow">
                  <GraphPreview
                    activePath={activeHighlightData.path}
                    visitedOrder={activeHighlightData.visitedOrder}
                  />
                </div>
              </div>

            </div>

            {/* Audit Table */}
            <div className="pt-4">
              <ComparisonTable results={results} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
