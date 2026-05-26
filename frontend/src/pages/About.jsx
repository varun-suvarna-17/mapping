import React from 'react';
import { BookOpen, Cpu, ShieldCheck, HelpCircle, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

export default function About() {
  const stack = [
    { category: 'Frontend Core', items: ['React 19', 'Vite Bundler', 'React Router DOM'] },
    { category: 'Design & Visuals', items: ['Tailwind CSS v4', 'SVG Node Canvas', 'Lucide React Icons'] },
    { category: 'Backend & Engine', items: ['FastAPI (Python)', 'NetworkX Analytics', 'Uvicorn Server'] }
  ];

  return (
    <div className="bg-bg-main min-h-screen text-text-main pt-24 pb-20 fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Introduction */}
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-primary-orange/10 text-primary-orange border border-primary-orange/20 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Theoretical Documentation</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
            Inside the <span className="text-primary-orange">Smart Route System</span>
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-3xl leading-relaxed">
            Discover the graph traversal engines, mathematical principles, and technology layers powering our premium interactive route-planning system.
          </p>
        </div>

        {/* Section Grid: Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
          
          {/* Column Left (Main Content) */}
          <div className="md:col-span-8 space-y-10">
            
            {/* Topic 1 */}
            <div className="glass-panel p-8 rounded-3xl border border-border-custom relative overflow-hidden space-y-4">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-primary-orange" />
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <Layers className="w-5 h-5 text-primary-orange" />
                <span>What is the Smart Route System?</span>
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                The **Smart Route System** is an interactive, analytical graph routing optimizer designed to evaluate navigation paths across pre-configured networks. By representing geography as vertices (nodes) and transport paths as connections (edges), the system computes paths dynamically, reflecting absolute distance costs, evaluated nodes, and heuristic speed bounds.
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Rather than treating pathfinding as a black box, this system exposes standard comparative indicators in real-time, matching exact mathematical solvers with elegant vector SVG flow visualizations.
              </p>
            </div>

            {/* Topic 2 */}
            <div className="glass-panel p-8 rounded-3xl border border-border-custom relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-primary-orange" />
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <Cpu className="w-5 h-5 text-primary-orange animate-pulse" />
                <span>Pathfinding Solvers Decoded</span>
              </h2>
              
              <div className="space-y-6 divide-y divide-border-custom/50">
                {/* Dijkstra */}
                <div className="space-y-2 pt-0">
                  <h3 className="text-base font-extrabold text-cyan-400">1. Dijkstra's Algorithm (Uniform Cost Search)</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Designed by Edsger W. Dijkstra in 1956, this algorithm explores the graph systematically, evaluating neighboring edges in expanding concentric rings. By maintaining an indexed list of absolute shortest distances from the start, it guarantees that when the target vertex is popped off its priority queue, the discovered path is mathematically optimal.
                  </p>
                  <span className="inline-block text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded font-mono font-bold">
                    Complexity: O((V + E) log V) | Heuristic: None
                  </span>
                </div>

                {/* A* Search */}
                <div className="space-y-2 pt-6">
                  <h3 className="text-base font-extrabold text-primary-orange">2. A* Search (Heuristically Informed)</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Widely utilized in map directions and game AI, A* refines search direction using a cost estimate function: <code>f(n) = g(n) + h(n)</code>, where <code>g(n)</code> is the exact distance from the start, and <code>h(n)</code> is the predicted straight-line Euclidean distance to the destination. Since it prioritizes nodes pointing directly toward the goal, it limits unnecessary explorations.
                  </p>
                  <span className="inline-block text-[10px] bg-primary-orange/10 text-primary-orange border border-primary-orange/20 px-2.5 py-0.5 rounded font-mono font-bold">
                    Complexity: O(E log V) | Heuristic: Euclidean Coordinate Bounds
                  </span>
                </div>

                {/* Greedy Best-First */}
                <div className="space-y-2 pt-6">
                  <h3 className="text-base font-extrabold text-indigo-400">3. Greedy Best-First Search</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Greedy search evaluates paths purely based on the heuristic function: <code>f(n) = h(n)</code>. It makes immediate decisions to step closer to the destination, ignoring the cumulative cost of edges traversed to get there. While this reduces vertex exploration sizes, it can get trapped in sub-optimal detours.
                  </p>
                  <span className="inline-block text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded font-mono font-bold">
                    Complexity: O(E log V) | Heuristic: Aggressive Goal Distance
                  </span>
                </div>
              </div>
            </div>

            {/* Topic 3 */}
            <div className="glass-panel p-8 rounded-3xl border border-border-custom relative overflow-hidden space-y-4">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-primary-orange" />
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-primary-orange" />
                <span>Advantages of Graph Routing Solvers</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-text-muted leading-snug">
                    <strong className="text-white">Precision Routing:</strong> Finds paths down to exact metric weights.
                  </p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-text-muted leading-snug">
                    <strong className="text-white">Dynamic Flexibility:</strong> Modifies path choices in real time as obstacles emerge.
                  </p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-text-muted leading-snug">
                    <strong className="text-white">Analytical Auditing:</strong> Compares efficiency metrics across multiple solvers.
                  </p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-text-muted leading-snug">
                    <strong className="text-white">Scalable Architecture:</strong> Fits varied topologies, hubs, and networks easily.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Column Right (Sidebar Stats & Stack) */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Tech stack card */}
            <div className="glass-panel p-6 rounded-3xl border border-border-custom relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-orange to-orange-hover" />
              <div>
                <h3 className="text-base font-extrabold text-white">System Tech Stack</h3>
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold">Dependencies Audit</span>
              </div>

              <div className="space-y-4">
                {stack.map((group, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-xs font-bold text-primary-orange">{group.category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span 
                          key={item} 
                          className="text-[10px] font-semibold font-mono text-white bg-bg-main/60 px-2.5 py-1 rounded-lg border border-border-custom"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Math Summary */}
            <div className="glass-panel p-6 rounded-3xl border border-border-custom relative overflow-hidden space-y-4 text-left">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-primary-orange" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-primary-orange shrink-0" />
                <span>Graph Theory 101</span>
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                A graph is defined as a pair <code>G = (V, E)</code>, where <code>V</code> is a set of vertices (nodes) representing key locations, and <code>E</code> is a set of edges representing connecting routes. 
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                Each edge possesses a cost metric <code>w(u, v)</code> representing distance or speed. Pathfinding algorithms minimize the sum of <code>w</code> along calculated path links.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
