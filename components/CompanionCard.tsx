"use client";
import React from 'react';
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategoryById } from "@/constants/categories";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  category: string;
  voice: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  category,
  voice,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const categoryInfo = getCategoryById(category);
  
  const [isBookmarking, setIsBookmarking] = React.useState(false);

  const handleBookmark = async () => {
    setIsBookmarking(true);
    try {
      if (bookmarked) {
        await removeBookmark(id, pathname);
      } else {
        await addBookmark(id, pathname);
      }
    } catch (error: any) {
      // Show error message to user
      alert(error.message || 'Failed to bookmark advisor');
    } finally {
      setIsBookmarking(false);
    }
  };

  // Determine avatar based on voice field
  const getAvatarIcon = () => {
    if (voice === 'female' || voice.includes('female')) return '/icons/female-avatar.svg';
    if (voice === 'male' || voice.includes('male')) return '/icons/male-avatar.svg';
    if (voice === 'quran') return '/icons/male-avatar.svg'; // Default for Quran reciters
    return '/icons/male-avatar.svg'; // Default fallback
  };

  // Get light color for background
  const categoryData = getCategoryById(category);
  const lightColor = categoryData?.lightColor || '#f0f9ff';

  return (
    <article className="companion-card group">
      {/* Header with Avatar and Bookmark */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center p-2 shadow-sm group-hover:shadow-md transition-all relative"
            style={{ backgroundColor: lightColor }}
          >
            <Image
              src={getAvatarIcon()}
              alt={`${name} avatar`}
              width={40}
              height={40}
              className="rounded-full opacity-90"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card shadow-sm"></div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="category-badge" style={{ backgroundColor: color }}>
              {categoryInfo?.icon} {categoryInfo?.name.split(' ')[0]}
            </div>
            <div className="subject-badge">{subject}</div>
          </div>
        </div>
        <button 
          className="companion-bookmark group-hover:scale-110 transition-transform" 
          onClick={handleBookmark}
          disabled={isBookmarking}
        >
          {isBookmarking ? (
            <span className="animate-spin text-sm">⏳</span>
          ) : (
            <Image
              src={
                bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
              }
              alt="bookmark"
              width={16}
              height={16}
            />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-grow">
        <h2 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">{name}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{topic}</p>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Image
                src="/icons/clock.svg"
                alt="duration"
                width={14}
                height={14}
              />
            </div>
            <p className="text-sm font-medium">{duration} min</p>
          </div>
          <div className="flex items-center gap-1 text-warning text-xs">
            <span>★</span>
            <span className="font-semibold">4.9</span>
          </div>
        </div>

        <Link href={`/companions/${id}`} className="w-full">
          <button className="btn-primary w-full justify-center group-hover:shadow-lg">
            <span>Start Session</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </Link>
      </div>
    </article>
  );
};

export default CompanionCard;