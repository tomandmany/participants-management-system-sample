'use server';
import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface Response {
  success: boolean;
  error?: any;
}

export default async function deleteParticipantSocialMedia(
  id: string,
  target?: Target
): Promise<Response> {
  console.log('Deleting Participant Social Media ID:', id);

  const { error } = await supabase
    .from('participantSocialMedias')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting ParticipantSocialMedia:', error);
    return { success: false, error };
  }

  console.log('Deleted Participant Social Media ID:', id);

  revalidatePath('/');

  return { success: true };
}
