import { supabase } from '@/lib/supabaseClient';

export default async function getSocialMediaModels() {
  const { data, error } = await supabase.from('socialMediaModels').select('*');
  if (error) {
    console.error('Error fetching socialMediaModels:', error);
    return [];
  }
  return data;
}