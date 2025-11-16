'use client';

import { SavedMessage } from '@/types';
import Image from 'next/image';

interface DownloadTranscriptProps {
  messages: SavedMessage[];
  advisorName: string;
}

const DownloadTranscript = ({ messages, advisorName }: DownloadTranscriptProps) => {
  const handleDownload = () => {
    if (messages.length === 0) return;

    // Create transcript text
    const transcript = messages
      .reverse()
      .map((msg) => {
        const speaker = msg.role === 'assistant' ? advisorName : 'You';
        return `${speaker}: ${msg.content}`;
      })
      .join('\n\n');

    const header = `Articulate - Conversation Transcript\nAdvisor: ${advisorName}\nDate: ${new Date().toLocaleString()}\n\n---\n\n`;
    const fullText = header + transcript;

    // Create and download file
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${advisorName.replace(/\s+/g, '_')}_transcript_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (messages.length === 0) return null;

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium shadow-md hover:shadow-lg"
      title="Download transcript"
    >
      <Image src="/icons/check.svg" alt="download" width={16} height={16} />
      <span>Download Transcript</span>
    </button>
  );
};

export default DownloadTranscript;
