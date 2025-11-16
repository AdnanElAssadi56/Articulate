'use server';

import { auth } from '@clerk/nextjs/server';

type SubscriptionTier = 'free' | 'pro' | 'premium';

// Get user's subscription tier using Clerk's has() method
export async function getUserTier(): Promise<SubscriptionTier> {
  const { has } = await auth();
  
  if (!has) return 'free';
  
  // Check for premium first (highest tier)
  if (has({ plan: 'premium' })) {
    return 'premium';
  }
  
  // Check for pro
  if (has({ plan: 'pro' })) {
    return 'pro';
  }
  
  // Default to free
  return 'free';
}

// Check if user can create more custom advisors using Clerk features
export async function canCreateCustomAdvisor(currentCount: number): Promise<boolean> {
  const { has } = await auth();
  
  if (!has) return currentCount < 5; // Free tier: 5 advisors
  
  // Premium: unlimited
  if (has({ plan: 'premium' })) {
    return true;
  }
  
  // Pro: 20 advisors
  if (has({ plan: 'pro' })) {
    return currentCount < 20;
  }
  
  // Check for specific feature limits
  if (has({ feature: '20_advisor_limit' })) {
    return currentCount < 20;
  }
  
  if (has({ feature: '10_advisor_limit' })) {
    return currentCount < 10;
  }
  
  if (has({ feature: '5_advisor_limit' })) {
    return currentCount < 5;
  }
  
  // Default free tier: 5 advisors
  return currentCount < 5;
}

// Check if user can bookmark more advisors using Clerk features
export async function canBookmarkAdvisor(currentCount: number): Promise<boolean> {
  const { has } = await auth();
  
  if (!has) return currentCount < 3; // Free tier: 3 bookmarks
  
  // Pro or Premium: unlimited
  if (has({ plan: 'pro' }) || has({ plan: 'premium' })) {
    return true;
  }
  
  // Check for unlimited bookmark feature
  if (has({ feature: 'unlimited_bookmarks' })) {
    return true;
  }
  
  // Default free tier: 3 bookmarks
  return currentCount < 3;
}

// Check if user has access to conversation insights (Pro/Premium)
export async function canViewInsights(): Promise<boolean> {
  const { has } = await auth();
  
  if (!has) return false;
  
  // Pro or Premium plans
  if (has({ plan: 'pro' }) || has({ plan: 'premium' })) {
    return true;
  }
  
  // Check for specific feature
  if (has({ feature: 'conversation_insights' })) {
    return true;
  }
  
  return false;
}

// Check if user has access to advanced analytics (Premium only)
export async function canViewAdvancedAnalytics(): Promise<boolean> {
  const { has } = await auth();
  
  if (!has) return false;
  
  // Premium plan only
  if (has({ plan: 'premium' })) {
    return true;
  }
  
  // Check for specific feature
  if (has({ feature: 'advanced_analytics' })) {
    return true;
  }
  
  return false;
}
