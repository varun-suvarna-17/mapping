import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Heart, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-main border-t border-border-custom mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-primary-orange/10 p-1.5 rounded-lg border border-primary-orange/20">
                <Route className="h-5 w-5 text-primary-orange" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Smart Route <span className="text-primary-orange">System</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              An advanced visualization dashboard and routing engine executing Dijkstra, A*, and Greedy pathfinding algorithms to find mathematical shortest paths on graph networks.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Dashboard Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-text-muted hover:text-primary-orange transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/find-route" className="text-text-muted hover:text-primary-orange transition-colors">
                  Route Finder Engine
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-text-muted hover:text-primary-orange transition-colors">
                  Algorithm Comparisons
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-text-muted hover:text-primary-orange transition-colors">
                  Theoretical Details
                </Link>
              </li>
            </ul>
          </div>

          {/* System info */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-primary-orange" />
              <span>Engine Status</span>
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center justify-between text-text-muted">
                <span>Frontend:</span>
                <span className="text-primary-orange font-mono bg-card-bg px-2 py-0.5 rounded border border-border-custom">React 19 + Vite</span>
              </li>
              <li className="flex items-center justify-between text-text-muted">
                <span>Styling Engine:</span>
                <span className="text-white font-mono bg-card-bg px-2 py-0.5 rounded border border-border-custom">Tailwind v4</span>
              </li>
              <li className="flex items-center justify-between text-text-muted">
                <span>Backend Gateway:</span>
                <span className="text-emerald-400 font-mono bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">Active</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Smart Route System. All rights reserved.
          </p>
          <div className="flex items-center space-x-1.5 text-xs text-text-muted">
            <span>Built with precision for modern graph calculations</span>
            <Heart className="w-3.5 h-3.5 text-primary-orange fill-primary-orange" />
          </div>
        </div>
      </div>
    </footer>
  );
}
