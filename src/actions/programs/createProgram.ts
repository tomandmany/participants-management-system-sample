// @filename: /app/actions/programs/createProgram.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { TablesInsert } from '@/types/supabase.types';
import { revalidatePath } from 'next/cache';

interface Response<T> {
  success: boolean;
  data?: T | null;
  error?: any;
}

export default async function createProgram(
  formData: FormData,
  target: Target
): Promise<Response<TablesInsert<TableName>>> {
  if (target === 'participant') {
    console.error('Invalid target:', target);
    return { success: false, error: 'Invalid target', data: null };
  }

  const tableName: TableName = `${target}Programs` as const;

  const newProgram: TablesInsert<TableName> = {} as TablesInsert<TableName>;

  formData.forEach((value, key) => {
    if (key !== 'id') {
      newProgram[key as keyof TablesInsert<TableName>] = value as any;
    }
  });

  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert([newProgram])
      .single();

    console.log('Insert result:', { data, error });

    if (error) {
      console.error('Error creating program:', error);
      throw new Error('Failed to create program');
    }

    revalidatePath('/');

    return { success: true, data };
  } catch (error) {
    console.error('Error in createProgram:', error);
    return { success: false, error, data: null };
  }
}
