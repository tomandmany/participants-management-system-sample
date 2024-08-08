// // @filename: /actions/storages/programImages/createProgramImage.ts
// 'use server';

// import { supabase } from '@/lib/supabaseClient';
// import { TablesInsert } from '@/types/supabase.types';

// interface Response {
//   success: boolean;
//   data?: TablesInsert<'programs'> | null;
//   error?: any;
//   url?: string; // パブリックURLを返すためにフィールドを追加
// }

// export default async function createProgramImage(
//   formData: FormData
// ): Promise<Response> {
//   const id = formData.get('id') as string;
//   const file = formData.get('file') as File;

//   if (!id || !file) {
//     console.error('No ID or file provided');
//     return { success: false, error: 'No ID or file provided', data: null };
//   }

//   const fileName = `${id}/${file.name}`;
//   const { error: uploadError } = await supabase.storage
//     .from('programImages')
//     .upload(fileName, file, {
//       upsert: true,
//     });

//   if (uploadError) {
//     console.error('Error uploading file:', uploadError);
//     return { success: false, error: uploadError, data: null };
//   }

//   // Get the public URL
//   const { data: urlData } = supabase.storage
//     .from('programImages')
//     .getPublicUrl(fileName);

//   const publicUrl = urlData.publicUrl;

//   // Check if the program already exists
//   const { data: existingProgram, error: fetchError } = await supabase
//     .from('programs')
//     .select('id')
//     .eq('id', id)
//     .single();

//   if (fetchError && fetchError.code !== 'PGRST116') {
//     // 'PGRST116' means no row found
//     console.error('Error fetching program:', fetchError);
//     return { success: false, error: fetchError, data: null };
//   }

//   let insertOrUpdateResponse;
//   if (existingProgram) {
//     // Update existing program
//     const updatedProgram: TablesInsert<'programs'> = {
//       image: publicUrl,
//     };

//     insertOrUpdateResponse = await supabase
//       .from('programs')
//       .update(updatedProgram)
//       .eq('id', id)
//       .single();
//   } else {
//     // Insert new program
//     const newProgram: TablesInsert<'programs'> = {
//       id, // idを含める
//       image: publicUrl,
//     };

//     insertOrUpdateResponse = await supabase
//       .from('programs')
//       .insert(newProgram)
//       .single();
//   }

//   const { data: insertOrUpdateData, error: insertOrUpdateError } =
//     insertOrUpdateResponse;

//   if (insertOrUpdateError) {
//     console.error('Error inserting/updating program:', insertOrUpdateError);
//     return { success: false, error: insertOrUpdateError, data: null };
//   }

//   return { success: true, data: insertOrUpdateData, url: publicUrl };
// }
