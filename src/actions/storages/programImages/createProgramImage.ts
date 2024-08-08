// @filename: /app/actions/storages/programImages/createProgramImage.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

interface Response {
  success: boolean;
  error?: any;
  url?: string;
}

export default async function createProgramImage(
  formData: FormData,
  target?: Target,
  department?: Department
): Promise<Response> {
  const file = formData.get('file') as File;
  let id = formData.get('id') as string;

  if (department) {
    const tableName: TableName = `${department}Programs`;
    
    if (!id) {
      id = uuidv4();
    }

    if (!file) {
      console.error('No file provided');
      return { success: false, error: 'No file provided' };
    }

    const fileName = `${id}/${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('programImages')
      .upload(fileName, file, {
        upsert: true,
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return { success: false, error: uploadError };
    }

    const { data: urlData } = supabase.storage
      .from('programImages')
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from(tableName)
      .update({ programImage: publicUrl })
      .eq('id', id)
      .single();

    if (updateError) {
      console.error('Error updating database:', updateError);
      return { success: false, error: updateError };
    }

    revalidatePath('/');

    return { success: true, url: publicUrl };
  } else {
    return { success: false, error: 'No department provided' };
  }
}
