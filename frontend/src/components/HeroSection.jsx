import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Route, Play, GitCompare, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Dynamic Background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-primary-orange/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text content (Left side) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-orange/10 text-primary-orange border border-primary-orange/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Route className="w-4 h-4 animate-spin-slow" />
              <span>Interactive Graph Solvers</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Smart Route Planning with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-hover">
                Graph Algorithms
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed">
              Find, calculate, and evaluate the mathematical shortest paths across network topologies. Compare Dijkstra's optimality, A* heuristic efficiency, and Greedy Best-First speed instantly through high-fidelity visual simulations.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/find-route')}
                className="group relative inline-flex items-center justify-center bg-primary-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded-xl border border-primary-orange/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                <span>Find Route</span>
                <Play className="ml-2 w-4 h-4 fill-white group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => navigate('/compare')}
                className="inline-flex items-center justify-center bg-card-bg hover:bg-border-custom text-white hover:text-primary-orange font-semibold px-6 py-3 rounded-xl border border-border-custom hover:border-primary-orange/30 transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                <span>Compare Algorithms</span>
                <GitCompare className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side Visual Node Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square glass-panel p-6 rounded-3xl border border-border-custom/80 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-primary-orange/20 transition-colors duration-500 animate-float">
              
              {/* Header metrics */}
              <div className="flex justify-between items-center z-10">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-primary-orange rounded-full animate-ping" />
                  <span className="text-[11px] uppercase tracking-wider text-primary-orange font-bold font-mono">Simulating Solvers</span>
                </div>
                <div className="text-[11px] font-mono text-text-muted bg-bg-main/60 px-2.5 py-1 rounded-lg border border-border-custom">
                  Active Links: 7
                </div>
              </div>

              {/* Central Graph Render */}
              <div className="relative w-full h-[240px] my-4 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 350 220">
                  {/* Edges */}
                  <g className="stroke-border-custom stroke-[2.5]" strokeLinecap="round">
                    <line x1="60" y1="110" x2="160" y2="50" />
                    <line x1="60" y1="110" x2="150" y2="170" strokeDasharray="4 4" />
                    <line x1="160" y1="50" x2="150" y2="170" />
                    <line x1="160" y1="50" x2="280" y2="90" />
                    <line x1="150" y1="170" x2="280" y2="90" />
                    <line x1="150" y1="170" x2="260" y2="180" />
                    <line x1="280" y1="90" x2="260" y2="180" />
                  </g>

                  {/* Active flow animations */}
                  <g className="stroke-primary-orange stroke-[3] fill-none" strokeLinecap="round">
                    {/* Path A -> C -> D */}
                    <path 
                      d="M 60 110 L 150 170 L 280 90" 
                      className="animated-draw-line"
                    />
                  </g>

                  {/* Nodes */}
                  <g>
                    {/* Node A (Start) */}
                    <g transform="translate(60, 110)">
                      <circle r="12" className="fill-bg-main stroke-primary-orange stroke-[2]" />
                      <circle r="4" className="fill-primary-orange" />
                      <circle r="20" className="stroke-primary-orange/20 stroke-1 fill-none animate-ping" />
                      <text y="-18" textAnchor="middle" className="fill-text-main text-[10px] font-bold font-mono">A</text>
                    </g>

                    {/* Node B */}
                    <g transform="translate(160, 50)">
                      <circle r="10" className="fill-bg-main stroke-border-custom stroke-[2] group-hover:stroke-text-muted transition-colors" />
                      <circle r="3" className="fill-text-muted" />
                      <text y="-16" textAnchor="middle" className="fill-text-muted text-[10px] font-mono">B</text>
                    </g>

                    {/* Node C */}
                    <g transform="translate(150, 170)">
                      <circle r="10" className="fill-bg-main stroke-primary-orange stroke-[2]" />
                      <circle r="3" className="fill-primary-orange" />
                      <text y="20" textAnchor="middle" className="fill-text-main text-[10px] font-bold font-mono">C</text>
                    </g>

                    {/* Node D */}
                    <g transform="translate(280, 90)">
                      <circle r="12" className="fill-bg-main stroke-primary-orange stroke-[2]" />
                      <circle r="4" className="fill-primary-orange" />
                      <circle r="20" className="stroke-primary-orange/20 stroke-1 fill-none animate-ping" />
                      <text y="-18" textAnchor="middle" className="fill-text-main text-[10px] font-bold font-mono">D</text>
                    </g>

                    {/* Node E */}
                    <g transform="translate(260, 180)">
                      <circle r="8" className="fill-bg-main stroke-border-custom stroke-[2]" />
                      <circle r="2.5" className="fill-text-muted" />
                      <text y="18" textAnchor="middle" className="fill-text-muted text-[9px] font-mono">E</text>
                    </g>
                  </g>
                </svg>
              </div>

              {/* Bottom statistics panel */}
              <div className="flex justify-between items-center bg-bg-main/40 px-4 py-2.5 rounded-2xl border border-border-custom/60 z-10">
                <div className="text-left">
                  <p className="text-[10px] text-text-muted">Calculated Path</p>
                  <p className="text-xs font-bold font-mono text-primary-orange">A &rarr; C &rarr; D</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-text-muted">Optimal Cost</p>
                  <p className="text-xs font-bold font-mono text-white">5.00 km</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
