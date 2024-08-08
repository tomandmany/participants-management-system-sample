// 'use client'

// import createProgram from "@/actions/programs/createProgram";
// import { Button } from "@/components/ui/button";
// import { PlusIcon } from "lucide-react";
// import { MouseEvent } from 'react';

// export default function AddColumnButton() {
//     const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();

//         const formData = new FormData();
//         formData.append('name', '新しい企画');
//         formData.append('releaseMonth', '1');
//         formData.append('releaseDay', '1');
//         formData.append('startHour', '00');
//         formData.append('startMinutes', '00');
//         formData.append('endHour', '00');
//         formData.append('endMinutes', '00');
//         formData.append('venue', '');
//         formData.append('message', '');

//         await createProgram(formData);
//     };

//     return (
//         <Button
//             variant="default"
//             className="flex justify-center items-center gap-3 mx-auto mt-6"
//             // className="flex justify-center items-center gap-3 border rounded p-2 mx-auto mt-6 bg-white hover:border-gray-600 transition"
//             onClick={handleClick}
//         >
//             <PlusIcon />
//             <span>行を追加する</span>
//         </Button>
//     );
// }
