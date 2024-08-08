import { supabase } from '@/lib/supabaseClient';

export async function getOutstagePrograms(): Promise<OutstageProgram[]> {
  const { data, error } = await supabase
    .from('outstagePrograms')
    .select('*')
    .order('createdAt', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as OutstageProgram[];
}
