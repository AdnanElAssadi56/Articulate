'use client';

import { useEffect, useState, useRef } from 'react';

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  color: string;
}

const AnimatedStat = ({ end, label, suffix = '', color }: StatProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div 
      ref={ref}
      className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-6 text-center hover:border-primary hover:shadow-lg transition-all group"
    >
      <div 
        className="text-5xl font-bold mb-2 bg-gradient-to-br bg-clip-text text-transparent"
        style={{ 
          backgroundImage: `linear-gradient(135deg, ${color}, ${color}dd)` 
        }}
      >
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
};

const AnimatedStats = () => {
  const stats = [
    { end: 16, label: 'Expert Advisors', suffix: '+', color: '#0ea5e9' },
    { end: 4, label: 'Categories', suffix: '', color: '#2563eb' },
    { end: 24, label: 'Hours Available', suffix: '/7', color: '#16a34a' },
    { end: 100, label: 'Satisfaction Rate', suffix: '%', color: '#9333ea' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <AnimatedStat key={index} {...stat} />
      ))}
    </div>
  );
};

export default AnimatedStats;
