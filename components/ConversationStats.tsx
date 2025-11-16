'use client';

import { SavedMessage } from '@/types';
import { useEffect, useState } from 'react';

interface ConversationStatsProps {
  messages: SavedMessage[];
}

const ConversationStats = ({ messages }: ConversationStatsProps) => {
  const [stats, setStats] = useState({
    totalMessages: 0,
    userMessages: 0,
    advisorMessages: 0,
    avgMessageLength: 0,
  });

  useEffect(() => {
    if (messages.length === 0) return;

    const userMsgs = messages.filter(m => m.role === 'user');
    const advisorMsgs = messages.filter(m => m.role === 'assistant');
    const totalWords = messages.reduce((sum, m) => sum + m.content.split(' ').length, 0);

    setStats({
      totalMessages: messages.length,
      userMessages: userMsgs.length,
      advisorMessages: advisorMsgs.length,
      avgMessageLength: Math.round(totalWords / messages.length),
    });
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-primary">{stats.totalMessages}</div>
        <div className="text-xs text-muted-foreground">Total Messages</div>
      </div>
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-info">{stats.userMessages}</div>
        <div className="text-xs text-muted-foreground">Your Messages</div>
      </div>
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-success">{stats.advisorMessages}</div>
        <div className="text-xs text-muted-foreground">Advisor Replies</div>
      </div>
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 text-center">
        <div className="text-2xl font-bold text-warning">{stats.avgMessageLength}</div>
        <div className="text-xs text-muted-foreground">Avg Words</div>
      </div>
    </div>
  );
};

export default ConversationStats;
