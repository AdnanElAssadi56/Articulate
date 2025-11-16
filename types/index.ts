import { CategoryId } from '@/constants/categories';

export interface Companion {
  id: string;
  name: string;
  category: CategoryId;
  subject: string;
  topic: string;
  duration: number;
  voice: string;
  style: string;
  author: string;
  description?: string;
  rating?: number;
  total_sessions?: number;
  bookmarked?: boolean;
  created_at?: string;
}

export interface CreateCompanion {
  name: string;
  category: CategoryId;
  subject: string;
  topic: string;
  duration: number;
  voice: string;
  style: string;
  description?: string;
}

export interface GetAllCompanions {
  limit?: number;
  page?: number;
  category?: string;
  subject?: string;
  topic?: string;
}

export interface SearchParams {
  searchParams: Promise<{
    category?: string;
    subject?: string;
    topic?: string;
    page?: string;
  }>;
}

export interface Message {
  type: string;
  role: 'user' | 'assistant';
  transcript: string;
  transcriptType?: 'partial' | 'final';
}

export interface SavedMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CompanionComponentProps {
  companionId: string;
  category: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  style: string;
  voice: string;
  description?: string;
  hasProAccess?: boolean;
}
