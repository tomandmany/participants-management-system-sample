// /app/page.tsx
// @filename: /app/page.tsx

// import { getParticipants } from "@/data/participants";
// import { getOutstagePrograms } from "@/data/programs/outstagePrograms";
// import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "検索ページ",
//   description: "検索ページのサンプルです。",
// };

type PageLinkProps = {
  link: string;
  children: React.ReactNode;
}

function PageLink({ link, children }: PageLinkProps) {
  return (
    <Link
      href={link}
      className="w-64 h-32 rounded-md flex gap-4 items-center border-4 justify-center hover:bg-gray-400 hover:text-white transition"
    >
      {children}
      <ChevronRight />
    </Link>
  )
}

export default async function Home() {
  // const programs = await getOutstagePrograms();
  // const participants = await getParticipants();

  // return (
  //   <main className="flex flex-col items-center justify-between p-24 gap-20 flex-wrap">
  //     {programs.map((program) => {
  //       const filteredParticipant = participants.find((participant) => participant.id === program.participantId);
  //       return (
  //         <Link key={program.id} className="overflow-hidden relative" href={`/programs/${program.id}`}>
  //           <div className="bg-[#F8BB36] p-4 border-2 border-[#EC6A44]">
  //             <div className="overflow-hidden relative">
  //               <div className="bg-white px-6 pt-6 pb-8 border-2 border-[#EC6A44] flex gap-4 relative">
  //                 <div className="flex flex-col justify-between">
  //                   <div className="bg-gray-400 w-full aspect-square rounded-xl" />
  //                   <div className="flex gap-2">
  //                     <div className="w-[50px] h-[50px] rounded-xl border border-gray-700" />
  //                     <div className="w-[50px] h-[50px] rounded-xl border border-gray-700" />
  //                     <div className="w-[50px] h-[50px] rounded-xl border border-gray-700" />
  //                   </div>
  //                 </div>
  //                 <div>
  //                   <div className="border-b-2 border-[#EC6A44] p-2 flex items-center gap-10 before:content-[''] relative before:absolute before:bg-[#EC6A44] before:rounded-full before:w-2 before:aspect-square before:-left-1 before:-bottom-[5px] after:absolute after:bg-[#EF886A] after:rounded-full after:w-2 after:aspect-square after:-right-1 after:-bottom-[5px]">
  //                     <div>
  //                       <h4 className="text-xl font-bold">{program.programName}</h4>
  //                       <h5 className="text-sm">{filteredParticipant?.participantName}</h5>
  //                     </div>
  //                     <div className="bg-gray-400 min-w-[45px] aspect-square rounded-lg" />
  //                   </div>
  //                   <div className="flex flex-col gap-1 px-2 py-4 border-b-2 border-dotted border-[#EC6A44]">
  //                     {/* <span>日時　11月{program.eventDate} {program.startHour}:{program.startMinutes} ~ {program.endHour}:{program.endMinutes}</span> */}
  //                     <span>場所　{program.outstageVenue}</span>
  //                   </div>
  //                   <div className="mt-3 p-2 bg-[#FDE9C3] border-2 border-[#F9BB38] rounded-2xl">
  //                     <span>Message</span>
  //                     <p className="text-sm">{program.catchphrase}</p>
  //                   </div>
  //                 </div>
  //                 <span className="absolute bottom-1 right-8">Read more→</span>
  //               </div>
  //               <div className="bg-[#F8BB36] rounded-full border-2 border-[#EC6A44] w-10 aspect-square absolute -left-6 -top-6" />
  //               <div className="bg-[#F8BB36] rounded-full border-2 border-[#EC6A44] w-10 aspect-square absolute -right-6 -top-6" />
  //               <div className="bg-[#F8BB36] rounded-full border-2 border-[#EC6A44] w-10 aspect-square absolute -left-6 -bottom-6" />
  //               <div className="bg-[#F8BB36] rounded-full border-2 border-[#EC6A44] w-10 aspect-square absolute -right-6 -bottom-6" />
  //             </div>
  //           </div>
  //           <div className="bg-[#FFFCE6] rounded-full border-2 border-[#EC6A44] w-7 aspect-square absolute -left-3 -top-3" />
  //           <div className="bg-[#FFFCE6] rounded-full border-2 border-[#EC6A44] w-7 aspect-square absolute -right-3 -top-3" />
  //           <div className="bg-[#FFFCE6] rounded-full border-2 border-[#EC6A44] w-7 aspect-square absolute -left-3 -bottom-3" />
  //           <div className="bg-[#FFFCE6] rounded-full border-2 border-[#EC6A44] w-7 aspect-square absolute -right-3 -bottom-3" />
  //         </Link>
  //       );
  //     })}
  //   </main>
  // );
  return (
    <div className="flex flex-col items-center justify-center gap-12 min-h-full">
      <PageLink link='/participants'>参加団体</PageLink>
      <PageLink link='/programs/booth'>模擬店</PageLink>
      <PageLink link='/programs/outstage'>屋外ステージ</PageLink>
      <PageLink link='/programs/room'>教室</PageLink>
    </div>
  )
}