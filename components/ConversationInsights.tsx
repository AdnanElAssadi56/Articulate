'use client';

import { SavedMessage } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ConversationInsightsProps {
  messages: SavedMessage[];
  hasProAccess?: boolean;
}

const ConversationInsights = ({ messages, hasProAccess = false }: ConversationInsightsProps) => {
  const [insights, setInsights] = useState({
    keyTopics: [] as string[],
    sentiment: 'neutral' as 'positive' | 'neutral' | 'negative',
    actionItems: [] as string[],
  });

  useEffect(() => {
    if (messages.length === 0) return;

    // Simple keyword extraction (in real app, use AI)
    const allText = messages.map(m => m.content).join(' ').toLowerCase();
    const topics: string[] = [];
    
    if (allText.includes('career') || allText.includes('job')) topics.push('Career Planning');
    if (allText.includes('interview')) topics.push('Interview Prep');
    if (allText.includes('stress') || allText.includes('anxiety')) topics.push('Stress Management');
    if (allText.includes('meditation') || allText.includes('mindful')) topics.push('Mindfulness');
    if (allText.includes('quran') || allText.includes('prayer')) topics.push('Spiritual Practice');
    if (allText.includes('study') || allText.includes('learn')) topics.push('Learning Strategy');

    // Simple sentiment (in real app, use AI)
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'better', 'improve'];
    const negativeWords = ['difficult', 'hard', 'struggle', 'problem', 'worried'];
    const posCount = positiveWords.filter(w => allText.includes(w)).length;
    const negCount = negativeWords.filter(w => allText.includes(w)).length;
    
    const sentiment = posCount > negCount ? 'positive' : negCount > posCount ? 'negative' : 'neutral';

    // Extract potential action items (questions from advisor)
    const advisorMessages = messages.filter(m => m.role === 'assistant');
    const actions = advisorMessages
      .filter(m => m.content.includes('?') || m.content.toLowerCase().includes('try') || m.content.toLowerCase().includes('consider'))
      .slice(0, 3)
      .map(m => m.content.split('.')[0]);

    setInsights({
      keyTopics: topics.slice(0, 4),
      sentiment,
      actionItems: actions,
    });
  }, [messages]);

  if (messages.length < 5) return null;

  if (!hasProAccess) {
    return (
      <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl">🔍</span>
          <h3 className="text-lg font-bold">Conversation Insights</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Get AI-powered insights about your conversations with Pro or Premium.
          </p>
          <Link href="/subscription" className="btn-primary text-sm">
            Upgrade Now
          </Link>
        </div>
      </div>
    );
  }

  const sentimentColors = {
    positive: 'bg-success/10 text-success border-success/20',
    neutral: 'bg-info/10 text-info border-info/20',
    negative: 'bg-warning/10 text-warning border-warning/20',
  };

  const sentimentEmoji = {
    positive: '😊',
    neutral: '😐',
    negative: '😟',
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🔍</span>
        Conversation Insights
        <span className="text-xs bg-gradient-to-r from-primary to-accent text-white px-2 py-1 rounded-full">PRO</span>
      </h3>

      <div className="space-y-4">
        {/* Key Topics */}
        {insights.keyTopics.length > 0 && (
          <div>
            <p className="text-sm font-semibold mb-2">Key Topics Discussed:</p>
            <div className="flex flex-wrap gap-2">
              {insights.keyTopics.map((topic, i) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sentiment */}
        <div>
          <p className="text-sm font-semibold mb-2">Conversation Tone:</p>
          <div className={`px-4 py-2 rounded-lg border-2 ${sentimentColors[insights.sentiment]} inline-flex items-center gap-2`}>
            <span className="text-xl">{sentimentEmoji[insights.sentiment]}</span>
            <span className="font-medium capitalize">{insights.sentiment}</span>
          </div>
        </div>

        {/* Action Items */}
        {insights.actionItems.length > 0 && (
          <div>
            <p className="text-sm font-semibold mb-2">Suggested Actions:</p>
            <ul className="space-y-2">
              {insights.actionItems.map((action, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">→</span>
                  <span className="text-muted-foreground">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationInsights;
