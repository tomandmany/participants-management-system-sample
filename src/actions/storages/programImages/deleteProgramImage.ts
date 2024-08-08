// @filename: /actions/storages/programImages/deleteProgramImage.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface Response<T> {
  success: boolean;
  error?: any;
}

export default async function deleteProgramImage(
  id: string,
  fileName: string,
  department: Department
): Promise<Response<typeof tableName>> {
  if (!department) {
    console.error('Invalid department:', department);
    return { success: false, error: 'Invalid department' };
  }

  const tableName: TableName = `${department}Programs` as const;

  if (!fileName) {
    console.error('No ID or fileName provided');
    return { success: false, error: 'No ID or fileName provided' };
  }

  const filePath = `${id}/${fileName}`;
  const { error: removeError } = await supabase.storage
    .from('programImages')
    .remove([filePath]);

  console.log(`Deleting file: ${filePath}`);

  if (removeError) {
    console.error('Error deleting file:', removeError);
    return { success: false, error: removeError };
  }

  const { data, error: updateError } = await supabase
    .from(tableName)
    .update({ programImage: null })
    .eq('id', id)
    .single();

  if (updateError) {
    console.error('Error updating program:', updateError);
    return { success: false, error: updateError };
  }

  revalidatePath('/');

  return { success: true };
}
