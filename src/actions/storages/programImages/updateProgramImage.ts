// // app/actions/storages/programImages/updateProgramImage.ts

// // ファイルのパス
// 'use server';

// import { supabase } from '@/lib/supabaseClient';
// import { TablesInsert } from '@/types/supabase.types';
// import { revalidatePath } from 'next/cache';

// interface Response<T> {
//   success: boolean;
//   data?: T | null;
//   error?: any;
//   url?: string;
// }

// export default async function updateProgramImage(
//   formData: FormData,
//   target: Target
// ): Promise<Response<TablesInsert<typeof tableName>>> {
//   const id = formData.get('id') as string;
//   const programName = formData.get('programName') as string;
//   const file = formData.get('file') as File;

//   if (target === 'participant') {
//     console.error('Invalid target:', target);
//     return { success: false, error: 'Invalid target', data: null };
//   }

//   const tableName: TableName = `${target}Programs` as const;

//   if (!file) {
//     console.error('No ID or file provided');
//     return { success: false, error: 'No ID or file provided', data: null };
//   }

//   const fileName = `${programName}/${file.name}`;
//   const { error: uploadError } = await supabase.storage
//     .from('programImages')
//     .upload(fileName, file, {
//       upsert: true,
//     });

//   if (uploadError) {
//     console.error('Error uploading file:', uploadError);
//     return { success: false, error: uploadError, data: null };
//   }

//   const { data: urlData } = supabase.storage
//     .from('programImages')
//     .getPublicUrl(fileName);

//   const publicUrl = urlData.publicUrl;

//   const { data: existingProgram, error: fetchError } = await supabase
//     .from(tableName)
//     .select('id')
//     .eq('id', id)
//     .single();

//   if (fetchError && fetchError.code !== 'PGRST116') {
//     console.error('Error fetching program:', fetchError);
//     return { success: false, error: fetchError, data: null };
//   }

//   let insertOrUpdateResponse;
//   if (existingProgram) {
//     const updatedProgram: TablesInsert<typeof tableName> = {
//       programImage: publicUrl,
//     };

//     insertOrUpdateResponse = await supabase
//       .from(tableName)
//       .update(updatedProgram)
//       .eq('id', id)
//       .single();
//   } else {
//     const newProgram: TablesInsert<typeof tableName> = {
//       id,
//       programImage: publicUrl,
//     };

//     insertOrUpdateResponse = await supabase
//       .from(tableName)
//       .insert(newProgram)
//       .single();
//   }

//   const { data: insertOrUpdateData, error: insertOrUpdateError } =
//     insertOrUpdateResponse;

//   if (insertOrUpdateError) {
//     console.error('Error inserting/updating program:', insertOrUpdateError);
//     return { success: false, error: insertOrUpdateError, data: null };
//   }

//   revalidatePath('/');

//   return { success: true, data: insertOrUpdateData, url: publicUrl };
// }
