import React, { useState, useEffect } from 'react';
import { findRoute } from '../services/api';
import RouteForm from '../components/RouteForm';
import RouteResultCard from '../components/RouteResultCard';
import GraphPreview from '../components/GraphPreview';
import { Compass, HelpCircle } from 'lucide-react';

export default function RouteFinder() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // Set default visual preview based on A -> C -> D
  useEffect(() => {
    // Standard initial load calculations to immediately engage user
    handleSolve({ source: 'A', destination: 'D', algorithm: 'dijkstra' });
  }, []);

  const handleSolve = async ({ source, destination, algorithm }) => {
    setLoading(true);
    try {
      const solverResult = await findRoute({ source, destination, algorithm });
      setResult(solverResult);
    } catch (error) {
      console.error('[Smart Route Finder] Calculation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-main min-h-screen text-text-main pt-24 pb-16 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Introduction */}
        <div className="text-left mb-10 space-y-2">
          <h1 className="text-3xl font-extrabold text-white flex items-center space-x-2.5">
            <Compass className="w-8 h-8 text-primary-orange animate-spin-slow" />
            <span>Pathfinding Routing Engine</span>
          </h1>
          <p className="text-sm text-text-muted max-w-2xl">
            Input a start and destination anchor. Choose Dijkstra, A*, or Greedy Best-First Search to solve optimal paths. Traverse and animate graph sequences visually.
          </p>
        </div>

        {/* Dashboard Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form parameter + Result display */}
          <div className="lg:col-span-5 space-y-6">
            <RouteForm onSubmit={handleSolve} loading={loading} />
            
            {result && !loading && (
              <RouteResultCard result={result} />
            )}
          </div>

          {/* Right Column: Dynamic SVG canvas graph visualization */}
          <div className="lg:col-span-7 h-full">
            <GraphPreview
              activePath={result?.path || []}
              visitedOrder={result?.visitedOrder || []}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
