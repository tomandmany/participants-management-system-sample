import { supabase } from '@/lib/supabaseClient';

export async function getParticipantSocialMedias() {
  const { data, error } = await supabase
    .from('participantSocialMedias')
    .select('*');
  if (error) {
    console.error('Error fetching participantSocialMedias:', error);
    return [];
  }
  return data;
}