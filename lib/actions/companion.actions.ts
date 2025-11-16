'use server';

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { GetAllCompanions } from "@/types";
import { CreateCompanion } from "@/types";

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .insert({...formData, author })
        .select();

    if(error || !data) throw new Error(error?.message || 'Failed to create a companion');

    return data[0];
}

export const getAllCompanions = async ({ limit = 10, page = 1, category, subject, topic }: GetAllCompanions) => {
    const { userId } = await auth(); // Get current logged-in user
    const supabase = createSupabaseClient();

    // Fetch companions with filters
    let query = supabase.from('companions').select();

    // Filter by category if provided
    if(category) {
        query = query.eq('category', category);
    }

    // Filter by subject and/or topic
    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if(error) throw new Error(error.message);

    // If user is logged in, check which companions they've bookmarked
    if (userId && companions) {
        // Fetch all bookmarks for this user in one query
        const { data: bookmarks } = await supabase
            .from('bookmarks')
            .select('companion_id')
            .eq('user_id', userId);
        
        // Create a Set for O(1) lookup performance
        const bookmarkedIds = new Set(bookmarks?.map(b => b.companion_id) || []);
        
        // Add 'bookmarked' field to each companion
        return companions.map(companion => ({
            ...companion,
            bookmarked: bookmarkedIds.has(companion.id) // true if bookmarked, false otherwise
        }));
    }

    // If user is not logged in, return companions with bookmarked = false
    return companions?.map(companion => ({
        ...companion,
        bookmarked: false
    })) || [];
}

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id);

    if(error) return console.log(error);

    return data[0];
}

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if(error) throw new Error(error.message);

    return data;
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    
    // Fetch session history with companion details
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    // Get user's bookmarks to check which companions are bookmarked
    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('companion_id')
        .eq('user_id', userId);
    
    const bookmarkedIds = new Set(bookmarks?.map(b => b.companion_id) || []);

    // Add bookmarked status to each companion
    return data?.map(({ companions }: any) => ({
        ...companions,
        bookmarked: bookmarkedIds.has(companions?.id || '')
    })) || [];
}

export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();
    
    // Fetch companions created by this user
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)

    if(error) throw new Error(error.message);

    // Get user's bookmarks to check which of their own companions they've bookmarked
    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('companion_id')
        .eq('user_id', userId);
    
    const bookmarkedIds = new Set(bookmarks?.map(b => b.companion_id) || []);

    // Add bookmarked status to each companion
    return data?.map(companion => ({
        ...companion,
        bookmarked: bookmarkedIds.has(companion.id)
    })) || [];
}

export const newCompanionPermissions = async () => {
    const { userId } = await auth();
    if (!userId) return false;
    
    const supabase = createSupabaseClient();

    // Get current companion count
    const { data, error } = await supabase
        .from('companions')
        .select('id')
        .eq('author', userId);

    if(error) throw new Error(error.message);

    const companionCount = data?.length || 0;

    // Import subscription utilities
    const { canCreateCustomAdvisor } = await import('@/lib/subscription');
    
    return await canCreateCustomAdvisor(companionCount);
}

export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  
  const supabase = createSupabaseClient();
  
  // Check if this companion is already bookmarked by this user
  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("companion_id", companionId)
    .eq("user_id", userId)
    .single();
  
  // If already bookmarked, return the existing bookmark (no error)
  if (existing) {
    return existing;
  }
  
  // Check bookmark limit
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId);
  
  const bookmarkCount = bookmarks?.length || 0;
  const { canBookmarkAdvisor } = await import('@/lib/subscription');
  const canBookmark = await canBookmarkAdvisor(bookmarkCount);
  
  if (!canBookmark) {
    throw new Error('Bookmark limit reached. Upgrade to Pro for unlimited bookmarks!');
  }
  
  // Not bookmarked yet, create new bookmark
  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      companion_id: companionId,
      user_id: userId,
    })
    .select();
  
  if (error) {
    throw new Error(error.message);
  }

  // Refresh the page data to show updated bookmark status
  revalidatePath(path);
  return data?.[0];
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  // Add bookmarked: true to all companions (they're all bookmarked by definition)
  return data.map(({ companions }) => ({
    ...companions,
    bookmarked: true
  }));
}