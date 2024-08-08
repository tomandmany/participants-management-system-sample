'use server';
import { supabase } from '@/lib/supabaseClient';
import { TablesUpdate } from '@/types/supabase.types';
import { revalidatePath } from 'next/cache';

interface Response {
  success: boolean;
  data?: TablesUpdate<'participantSocialMedias'> | null;
  error?: any;
}

export default async function updateParticipantSocialMedia(
  formData: FormData,
  target?: Target
): Promise<Response> {
  const id = formData.get('id') as string;

  if (!id) {
    console.error('No ID provided');
    return { success: false, error: 'No ID provided', data: null };
  }

  const updatedParticipantSocialMedia: TablesUpdate<'participantSocialMedias'> =
    {};
  formData.forEach((value, key) => {
    if (key !== 'id') {
      updatedParticipantSocialMedia[
        key as keyof TablesUpdate<'participantSocialMedias'>
      ] = value as any;
    }
  });

  console.log(
    'Updating Participant Social Media:',
    updatedParticipantSocialMedia
  );

  const { data, error } = await supabase
    .from('participantSocialMedias')
    .update(updatedParticipantSocialMedia)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error updating participantSocialMedia:', error);
    return { success: false, error, data: null };
  }

  console.log('Updated data:', data);

  revalidatePath('/');

  return { success: true, data };
}
