// // パス: /actions/programs/deleteProgram.ts
// import { supabase } from '@/lib/supabaseClient';
// import { revalidatePath } from 'next/cache';

// interface Response {
//   success: boolean;
//   error?: any;
// }

// export default async function deleteProgram(
//   id: string,
//   target: Target
// ): Promise<Response> {
//   const { error } = await supabase.from('programs').delete().eq('id', id);

//   if (error) {
//     console.error('Error deleting Program:', error);
//     return { success: false, error };
//   }

//   revalidatePath('/');

//   return { success: true };
// }
