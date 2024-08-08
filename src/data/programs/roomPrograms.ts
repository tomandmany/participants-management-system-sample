import { supabase } from '@/lib/supabaseClient';

export async function getRoomPrograms(): Promise<RoomProgram[]> {
  const { data, error } = await supabase
    .from('roomPrograms')
    .select('*')
    .order('createdAt', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as RoomProgram[];
}
