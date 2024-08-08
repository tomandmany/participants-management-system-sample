// /data/participants.ts
// @filename: /data/participants.ts

import { supabase } from '@/lib/supabaseClient';

export async function getParticipants() {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .order('createdAt', { ascending: true }); // 例としてcreated_atで昇順に並び替え
  if (error) {
    console.error('Error fetching participants:', error);
    return [];
  }

  return data;
}