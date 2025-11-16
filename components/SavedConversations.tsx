import Link from 'next/link';
import { canViewInsights } from '@/lib/subscription';

const SavedConversations = async () => {
  const hasAccess = await canViewInsights();

  if (!hasAccess) {
    return (
      <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-6xl">💾</span>
          <h2 className="text-2xl font-bold">Unlimited Conversation History</h2>
          <p className="text-muted-foreground max-w-md">
            Save all your conversations and access detailed insights with Pro or Premium.
          </p>
          <Link href="/subscription" className="btn-primary">
            Upgrade to Pro
          </Link>
        </div>
      </div>
    );
  }

  // Mock data for demo (in real app, fetch from database)
  const conversations = [
    // {
    //   id: '1',
    //   advisorName: 'Dr. Sarah Chen',
    //   date: '2024-01-15',
    //   messageCount: 24,
    //   preview: 'Discussed career transition strategies and networking approaches...'
    // },
    // {
    //   id: '2',
    //   advisorName: 'Marcus Williams',
    //   date: '2024-01-14',
    //   messageCount: 18,
    //   preview: 'Explored mindfulness techniques and stress management...'
    // },
    // {
    //   id: '3',
    //   advisorName: 'Prof. Emily Rodriguez',
    //   date: '2024-01-12',
    //   messageCount: 31,
    //   preview: 'Deep dive into quantum physics concepts and applications...'
    // }
  ];

  return (
    <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-6 shadow-lg relative">
      {/* Coming Soon Badge */}
      <div className="absolute -top-3 -right-3 bg-warning text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1">
        <span>🚧</span>
        <span>COMING SOON</span>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="text-2xl">💾</span>
          Saved Conversations
        </h3>
        <span className="text-xs bg-gradient-to-r from-primary to-accent text-white px-2 py-1 rounded-full">
          PRO
        </span>
      </div>

      <div className="space-y-3 opacity-60">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="block p-4 rounded-lg border border-border bg-muted/30"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold">
                {conv.advisorName}
              </p>
              <span className="text-xs text-muted-foreground">
                {new Date(conv.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {conv.preview}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">
                {conv.messageCount} messages
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-center text-muted-foreground mt-4 italic">
        Full conversation history feature coming soon
      </p>
    </div>
  );
};

export default SavedConversations;
