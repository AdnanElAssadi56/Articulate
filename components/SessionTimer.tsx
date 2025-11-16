'use client';

import { useEffect, useState } from 'react';

interface SessionTimerProps {
  isActive: boolean;
}

const SessionTimer = ({ isActive }: SessionTimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive && seconds === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border-2 border-border rounded-xl shadow-sm">
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-destructive animate-pulse' : 'bg-muted-foreground'}`}></div>
      <span className="text-sm font-mono font-semibold">{formatTime(seconds)}</span>
    </div>
  );
};

export default SessionTimer;
