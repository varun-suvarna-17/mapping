import React from 'react';

export default function FeatureCard({ icon: Icon, title, description, badge, onClick }) {
  return (
    <div 
      className="glass-panel glow-card p-6 rounded-2xl border border-border-custom hover:border-primary-orange/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
      onClick={onClick}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="bg-primary-orange/10 p-3 rounded-xl border border-primary-orange/20 text-primary-orange group-hover:bg-primary-orange group-hover:text-white transition-all duration-300">
            {Icon && <Icon className="h-6 w-6" />}
          </div>
          {badge && (
            <span className="text-[10px] uppercase tracking-wider font-semibold bg-primary-orange/20 text-primary-orange px-2 py-0.5 rounded-full border border-primary-orange/30">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-orange transition-colors">
          {title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="mt-6 flex items-center text-xs font-semibold text-primary-orange group-hover:translate-x-1 transition-transform">
        <span>Explore details &rarr;</span>
      </div>
    </div>
  );
}
