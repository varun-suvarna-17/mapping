import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Route, Menu, X, Share2 } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Route', path: '/find-route' },
    { name: 'Compare', path: '/compare' },
    { name: 'About', path: '/about' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-primary-orange/10 p-2 rounded-xl border border-primary-orange/30 group-hover:bg-primary-orange/20 transition-all duration-300">
              <Route className="h-6 w-6 text-primary-orange animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-orange transition-colors duration-300">
              Smart Route <span className="text-primary-orange">System</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-white ${
                    isActive ? 'text-primary-orange' : 'text-text-muted hover:text-text-main'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-orange rounded-full shadow-[0_0_8px_#F97316] animate-pulse" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Premium CTA / Status */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="flex items-center space-x-2 text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              <span>Core System Online</span>
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-text-muted hover:text-white hover:bg-card-bg border border-border-custom transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border-custom bg-bg-main/95 backdrop-blur-xl ${
          isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-orange/10 text-primary-orange border-l-4 border-primary-orange'
                    : 'text-text-muted hover:text-white hover:bg-card-bg'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-4 px-4">
            <span className="flex items-center space-x-2 text-xs bg-emerald-500/10 text-emerald-400 px-3 py-2 rounded-xl border border-emerald-500/20 font-medium w-full justify-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              <span>Core System Online</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
