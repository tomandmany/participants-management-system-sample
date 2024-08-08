import { supabase } from '@/lib/supabaseClient';

export async function getBoothPrograms(): Promise<BoothProgram[]> {
  const { data, error } = await supabase
    .from('boothPrograms')
    .select('*')
    .order('createdAt', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as BoothProgram[];
}
