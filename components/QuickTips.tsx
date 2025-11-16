'use client';

import { useState } from 'react';

const tips = [
  "💡 Speak naturally - the AI understands conversational language",
  "🎯 Be specific about what you need help with",
  "⏸️ Take your time - there's no rush in the conversation",
  "🔄 Feel free to ask follow-up questions",
  "📝 Your conversation is automatically saved",
  "🎤 Make sure you're in a quiet environment for best results",
  "✨ Try different advisors to find your favorite style",
];

const QuickTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
      >
        <span>💡</span>
        <span>Show tips</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-xl p-4 flex items-start gap-3">
      <div className="flex-1">
        <p className="text-sm font-medium">{tips[currentTip]}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={nextTip}
          className="text-xs text-primary hover:text-primary-dark font-semibold"
        >
          Next
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default QuickTips;
