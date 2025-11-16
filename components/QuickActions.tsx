'use client';

import Link from 'next/link';
import { useState } from 'react';

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: '🎯',
      label: 'Find Advisor',
      href: '/companions',
      color: 'from-primary to-accent'
    },
    {
      icon: '➕',
      label: 'Create Custom',
      href: '/companions/new',
      color: 'from-success to-info'
    },
    {
      icon: '📊',
      label: 'My Journey',
      href: '/journey',
      color: 'from-warning to-highlight'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40 max-sm:bottom-4 max-sm:right-4">
      {/* Action buttons */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`bg-gradient-to-r ${action.color} text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="font-semibold whitespace-nowrap">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center text-3xl hover:scale-110 ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? '✕' : '⚡'}
      </button>
    </div>
  );
};

export default QuickActions;
