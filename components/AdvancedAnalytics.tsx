import Link from 'next/link';
import { canViewAdvancedAnalytics } from '@/lib/subscription';

const AdvancedAnalytics = async () => {
  const hasAccess = await canViewAdvancedAnalytics();

  if (!hasAccess) {
    return (
      <div className="bg-card/80 backdrop-blur-sm border-2 border-warning/30 rounded-2xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-6xl">📊</span>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-muted-foreground max-w-md">
            Unlock detailed insights, usage trends, and AI-powered recommendations with Premium.
          </p>
          <Link href="/subscription" className="btn-primary">
            Upgrade to Premium
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-8 relative">
      {/* Coming Soon Badge */}
      <div className="absolute -top-3 -right-3 bg-warning text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 flex items-center gap-1">
        <span>🚧</span>
        <span>COMING SOON</span>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">📊</span>
          Advanced Analytics
        </h2>
        <span className="text-xs bg-gradient-to-r from-warning to-highlight text-white px-3 py-1 rounded-full font-semibold">
          PREMIUM
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Usage Over Time */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground">Usage This Month</h3>
          <div className="h-32 bg-gradient-to-t from-primary/20 to-transparent rounded-lg flex items-end justify-around p-4 gap-2">
            {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-primary to-accent rounded-t w-full"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center">Last 7 days</p>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground">Category Usage</h3>
          <div className="space-y-2">
            {[
              { name: 'Career', percent: 45, color: '#0ea5e9' },
              { name: 'Wellness', percent: 30, color: '#10b981' },
              { name: 'Spiritual', percent: 15, color: '#8b5cf6' },
              { name: 'Academic', percent: 10, color: '#f43f5e' },
            ].map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{cat.name}</span>
                  <span className="font-semibold">{cat.percent}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="md:col-span-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span>💡</span>
            AI-Powered Insights
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>You're most active on weekday mornings - great consistency!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info">→</span>
              <span>Career advisors are your go-to. Consider exploring wellness for balance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">⚡</span>
              <span>Your average session length increased 25% this month - deeper conversations!</span>
            </li>
          </ul>
        </div>
      </div>
      
      <p className="text-xs text-center text-muted-foreground mt-6 italic">
        Real-time analytics with live data coming soon
      </p>
    </div>
  );
};

export default AdvancedAnalytics;
