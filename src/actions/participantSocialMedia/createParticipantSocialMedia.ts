// src/actions/participantSocialMedia/createParticipantSocialMedia.ts
'use server';
import { supabase } from '@/lib/supabaseClient';
import { TablesInsert } from '@/types/supabase.types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

interface Response {
  success: boolean;
  data?: TablesInsert<'participantSocialMedias'> | null;
  error?: any;
}

// zodを使ったバリデーションスキーマ
const newParticipantSocialMediaSchema = z.object({
  socialMediaModelId: z.string(),
  participantId: z.string(),
  url: z.string().min(1, 'URL cannot be empty'),
});

export default async function createParticipantSocialMedia(
  formData: FormData,
  // target?: Target
): Promise<Response> {
  const newParticipantSocialMedia: Omit<
    TablesInsert<'participantSocialMedias'>,
    'id' | 'createdAt'
  > = {
    socialMediaModelId: formData.get('socialMediaModelId') as string,
    participantId: formData.get('participantId') as string,
    url: formData.get('url') as string,
  };

  // サーバー側でのバリデーション
  const validationResult = newParticipantSocialMediaSchema.safeParse(
    newParticipantSocialMedia
  );
  if (!validationResult.success) {
    console.error('Validation failed:', validationResult.error);
    return { success: false, error: validationResult.error, data: null };
  }

  console.log(
    'Creating new Participant Social Media:',
    newParticipantSocialMedia
  );

  const { data, error } = await supabase
    .from('participantSocialMedias')
    .insert([newParticipantSocialMedia])
    .select()
    .single();

  if (error) {
    console.error('Error creating participantSocialMedia:', error);
    return { success: false, error, data: null };
  }

  console.log('Inserted data:', data);

  revalidatePath('/');

  return { success: true, data };
}
