// @filename: /src/components/TableRoot.tsx
'use client';

import TableColumn from './TableColumn';
import TableHeader from './TableHeader';
import TableCell from './TableCell';
import { participantColumns, boothProgramColumns, outstageProgramColumns, roomProgramColumns } from '@/data/columns';
import { useContext, useEffect, useState } from 'react';
import Context from '@/app/contexts/context';
import { supabase } from '@/lib/supabaseClient';

type TableRootProps = {
  programs?: UnionProgram[];
  participants: Participant[];
  participantSocialMedias: ParticipantSocialMedia[];
};

const programColumnsMap: { [key in Department]: { label: string, key: string }[] } = {
  booth: boothProgramColumns,
  outstage: outstageProgramColumns,
  room: roomProgramColumns,
};

export default function TableRoot({
  programs: initialPrograms,
  participants: initialParticipants,
  participantSocialMedias: initialParticipantSocialMedias,
}: TableRootProps) {
  const context = useContext(Context);
  if (!context) {
    throw new Error('TableRoot must be used within a Provider');
  }
  const { department } = context;

  const [programs, setPrograms] = useState<UnionProgram[] | undefined>(initialPrograms);
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [participantSocialMedias, setParticipantSocialMedias] = useState<ParticipantSocialMedia[]>(initialParticipantSocialMedias);
  const [programColumns, setProgramColumns] = useState<{ label: string; key: string }[]>([]);

  useEffect(() => {
    if (department) {
      setProgramColumns(programColumnsMap[department]);
    }
  }, [department]);

  useEffect(() => {
    if (department) {
      const tableName: TableName = `${department}Programs`;
      const programsChannel = supabase
        .channel(`public:${tableName}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, (payload) => {
          setPrograms((prevPrograms) => {
            if (!prevPrograms) return [];
            if (payload.eventType === 'INSERT') {
              if (prevPrograms.some(program => program.id === payload.new.id)) {
                return prevPrograms;
              }
              return [...prevPrograms, payload.new as UnionProgram];
            } else if (payload.eventType === 'UPDATE') {
              return prevPrograms.map((program) => (program.id === (payload.new as UnionProgram).id ? (payload.new as UnionProgram) : program));
            } else if (payload.eventType === 'DELETE') {
              return prevPrograms.filter((program) => program.id !== (payload.old as UnionProgram).id);
            }
            return prevPrograms;
          });
        })
        .subscribe();

      const participantsChannel = supabase
        .channel('public:participants')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'participants' }, (payload) => {
          setParticipants((prevParticipants) => {
            if (!prevParticipants) return [];
            if (payload.eventType === 'INSERT') {
              if (prevParticipants.some(participant => participant.id === payload.new.id)) {
                return prevParticipants;
              }
              return [...prevParticipants, payload.new as Participant];
            } else if (payload.eventType === 'UPDATE') {
              return prevParticipants.map((participant) => (participant.id === (payload.new as Participant).id ? (payload.new as Participant) : participant));
            } else if (payload.eventType === 'DELETE') {
              return prevParticipants.filter((participant) => participant.id !== (payload.old as Participant).id);
            }
            return prevParticipants;
          });
        })
        .subscribe();

      const participantSocialMediasChannel = supabase
        .channel('public:participantSocialMedias')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'participantSocialMedias' }, (payload) => {
          setParticipantSocialMedias((prevParticipantSocialMedias) => {
            if (!prevParticipantSocialMedias) return [];
            if (payload.eventType === 'INSERT') {
              if (prevParticipantSocialMedias.some(media => media.id === payload.new.id)) {
                return prevParticipantSocialMedias;
              }
              return [...prevParticipantSocialMedias, payload.new as ParticipantSocialMedia];
            } else if (payload.eventType === 'UPDATE') {
              return prevParticipantSocialMedias.map((participantSocialMedia) => (participantSocialMedia.id === (payload.new as ParticipantSocialMedia).id ? (payload.new as ParticipantSocialMedia) : participantSocialMedia));
            } else if (payload.eventType === 'DELETE') {
              return prevParticipantSocialMedias.filter((participantSocialMedia) => participantSocialMedia.id !== (payload.old as ParticipantSocialMedia).id);
            }
            return prevParticipantSocialMedias;
          });
        })
        .subscribe();

      return () => {
        programsChannel.unsubscribe();
        participantsChannel.unsubscribe();
        participantSocialMediasChannel.unsubscribe();
      };
    }


  }, [department]);

  return (
    <div className="flex max-w-fit mx-auto overflow-x-auto border-x border-t shadow-md rounded-md hidden-scrollbar">
      {programs ? (
        <>
          {participantColumns.map((column) => (
            <TableColumn key={column.key} isFixed={column.key === 'participantName'}>
              <TableHeader>{column.label}</TableHeader>
              {programs.map((program) => {
                const filteredParticipant = participants.find((participant) => participant.id === program.participantId)!;
                const filteredParticipantSocialMedias = participantSocialMedias.filter(
                  (participantSocialMedia) => participantSocialMedia.participantId === filteredParticipant.id
                );
                return (
                  <TableCell
                    key={`${program.id}-${column.key}-participant`}
                    program={program}
                    participant={filteredParticipant}
                    participantSocialMedias={filteredParticipantSocialMedias}
                    columnKey={column.key}
                    onParticipantSocialMediaChanges={setParticipantSocialMedias}
                  />
                );
              })}
            </TableColumn>
          ))}
          {programColumns.map((column) => (
            <TableColumn key={column.key}>
              <TableHeader>{column.label}</TableHeader>
              {programs.map((program) => {
                const participant = participants.find((participant) => participant.id === program.participantId)!;
                const filteredParticipantSocialMedias = participantSocialMedias.filter(
                  (participantSocialMedia) => participantSocialMedia.participantId === participant.id
                );
                return (
                  <TableCell
                    key={`${program.id}-${column.key}-program`}
                    program={program}
                    participant={participant}
                    participantSocialMedias={filteredParticipantSocialMedias}
                    columnKey={column.key}
                    onParticipantSocialMediaChanges={setParticipantSocialMedias}
                  />
                );
              })}
            </TableColumn>
          ))}
        </>
      ) : (
        <>
          {participantColumns.map((column) => (
            <TableColumn key={column.key} isFixed={column.key === 'participantName'}>
              <TableHeader>{column.label}</TableHeader>
              {participants.map((participant) => {
                const filteredParticipantSocialMedias = participantSocialMedias.filter(
                  (participantSocialMedia) => participantSocialMedia.participantId === participant.id
                );
                return (
                  <TableCell
                    key={`${participant.id}-${column.key}-participant`}
                    participant={participant}
                    participantSocialMedias={filteredParticipantSocialMedias}
                    columnKey={column.key}
                    onParticipantSocialMediaChanges={setParticipantSocialMedias}
                  />
                );
              })}
            </TableColumn>
          ))}
        </>
      )}
    </div>
  );
}
