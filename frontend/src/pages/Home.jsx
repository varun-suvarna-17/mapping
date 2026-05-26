import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Route, GitCompare, BookOpen, Navigation, ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Dijkstra's Algorithm",
      description: "The gold standard of pathfinding. Explores vertices uniformly in radial waves, mathematically guaranteeing the absolute shortest possible distance on any weighted network.",
      badge: "Guaranteed Shortest",
      icon: Cpu,
      path: "/find-route"
    },
    {
      title: "A* Heuristic Search",
      description: "Combines actual distance traveled with Euclidean heuristics predicting remaining distance. Explores highly focused sectors, balancing speed with path accuracy.",
      badge: "Optimally Focused",
      icon: Route,
      path: "/find-route"
    },
    {
      title: "Greedy Best-First",
      description: "An aggressive pathfinding technique looking purely at heuristic coordinates. Blazing speed that skips node calculations, although path cost may be compromised.",
      badge: "Speed Oriented",
      icon: Navigation,
      path: "/find-route"
    },
    {
      title: "Algorithm Comparisons",
      description: "Run all search solvers in parallel. Compare distances, execution durations, visited nodes density, and mathematical accuracy percentages side-by-side on interactive grids.",
      badge: "Analytics Hub",
      icon: GitCompare,
      path: "/compare"
    }
  ];

  return (
    <div className="bg-bg-main min-h-screen text-text-main fade-in">
      {/* Hero Entrance Section */}
      <HeroSection />

      {/* Numerical Stats Segment */}
      <StatsSection />

      {/* Feature Grid Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary-orange bg-primary-orange/10 px-3 py-1.5 rounded-full border border-primary-orange/20">
            Pathfinding Toolkit
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Sophisticated Graph Resolvers
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Select and execute custom algorithms designed to resolve shortest routes. Our engine processes nodes instantly, returning complete comparative parameters.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
              onClick={() => navigate(feature.path)}
            />
          ))}
        </div>

        {/* CTA section at bottom */}
        <div className="mt-20 bg-card-bg p-8 sm:p-12 rounded-3xl border border-border-custom relative overflow-hidden text-center max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-primary-orange/[0.02] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary-orange/5 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary-orange/5 blur-3xl" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to find the most efficient path?
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Launch the routing engine to visualize node traversal. Check paths visually on our coordinate graph canvas or compare speeds and accuracies instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => navigate('/find-route')}
                className="inline-flex items-center justify-center bg-primary-orange hover:bg-orange-hover text-white text-sm font-bold px-6 py-3 rounded-xl border border-primary-orange/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 cursor-pointer"
              >
                <span>Launch Route Finder</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center justify-center bg-bg-main hover:bg-border-custom text-white text-sm font-semibold px-6 py-3 rounded-xl border border-border-custom transition-all duration-300 cursor-pointer"
              >
                <span>Read Documentation</span>
                <BookOpen className="ml-2 w-4 h-4 text-text-muted" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
