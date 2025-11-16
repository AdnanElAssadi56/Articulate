'use client';

import { useEffect, useState } from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
  isSpeaking: boolean;
}

const VoiceVisualizer = ({ isActive, isSpeaking }: VoiceVisualizerProps) => {
  const [bars, setBars] = useState<number[]>([30, 50, 40, 60, 35, 55, 45]);

  useEffect(() => {
    if (!isActive || !isSpeaking) {
      setBars([30, 50, 40, 60, 35, 55, 45]);
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 70 + 30));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isSpeaking]);

  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-2 bg-gradient-to-t from-primary to-accent rounded-full transition-all duration-100"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;
