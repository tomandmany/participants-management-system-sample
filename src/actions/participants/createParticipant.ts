// パス: /actions/participants/createParticipant.ts
'use server';
import { supabase } from '@/lib/supabaseClient';
import { TablesInsert } from '@/types/supabase.types';
import { revalidatePath } from 'next/cache';

interface Response {
  success: boolean;
  data?: TablesInsert<'participants'> | null;
  error?: any;
}

export default async function createParticipant(
  formData: FormData
): Promise<Response> {
  const newParticipant: TablesInsert<'participants'> = {
    participantName: '', // 必須フィールドの初期化
    ruby: '', // 必須フィールドの初期化
  };

  formData.forEach((value, key) => {
    // キーがparticipantsテーブルのカラム名であるかを確認
    if (key in newParticipant) {
      newParticipant[key as keyof TablesInsert<'participants'>] = value as any;
    }
  });

  // 必須フィールドがセットされているか確認
  if (!newParticipant.participantName || !newParticipant.ruby) {
    return {
      success: false,
      data: null,
      error: 'Participant name and ruby are required.',
    };
  }

  console.log('Creating new participant with data:', newParticipant);

  const { data, error } = await supabase
    .from('participants')
    .insert(newParticipant) // 配列ではなくオブジェクトを渡す
    .select()
    .single();

  if (error) {
    console.error('Error creating participant:', error);
    return { success: false, error, data: null };
  }

  console.log('Inserted participant:', data);

  revalidatePath('/');

  return { success: true, data };
}
