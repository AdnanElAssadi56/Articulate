'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ShareAdvisorProps {
  advisorId: string;
  advisorName: string;
}

const ShareAdvisor = ({ advisorId, advisorName }: ShareAdvisorProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/companions/${advisorId}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
      title="Share advisor"
    >
      {copied ? (
        <>
          <Image src="/icons/check.svg" alt="copied" width={16} height={16} />
          <span className="text-success">Link Copied!</span>
        </>
      ) : (
        <>
          <span className="text-xl">🔗</span>
          <span>Share Advisor</span>
        </>
      )}
    </button>
  );
};

export default ShareAdvisor;
