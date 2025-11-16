'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryColor, getCategoryLightColor } from '@/constants/categories';

interface RecentAdvisor {
  id: string;
  name: string;
  category: string;
  voice: string;
  lastUsed: string;
}

const RecentAdvisors = () => {
  const [recentAdvisors, setRecentAdvisors] = useState<RecentAdvisor[]>([]);

  useEffect(() => {
    // Get from localStorage
    const stored = localStorage.getItem('recentAdvisors');
    if (stored) {
      setRecentAdvisors(JSON.parse(stored));
    }
  }, []);

  if (recentAdvisors.length === 0) return null;

  return (
    <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        Recent Advisors
      </h3>
      <div className="flex flex-col gap-2">
        {recentAdvisors.slice(0, 5).map((advisor) => {
          const lightColor = getCategoryLightColor(advisor.category);
          const avatarIcon = advisor.voice?.includes('female') 
            ? '/icons/female-avatar.svg' 
            : '/icons/male-avatar.svg';

          return (
            <Link
              key={advisor.id}
              href={`/companions/${advisor.id}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: lightColor }}
              >
                <Image
                  src={avatarIcon}
                  alt={advisor.name}
                  width={24}
                  height={24}
                  className="rounded-full opacity-90"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {advisor.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(advisor.lastUsed).toLocaleDateString()}
                </p>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentAdvisors;
