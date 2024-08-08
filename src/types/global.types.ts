import { Tables } from './supabase.types';

declare global {
  type BoothProgram = Tables<'boothPrograms'>;
  type OutstageProgram = Tables<'outstagePrograms'>;
  type RoomProgram = Tables<'roomPrograms'>;
  type UnionProgram = BoothProgram | OutstageProgram | RoomProgram;
  type Participant = Tables<'participants'>;
  type ParticipantSocialMedia = Tables<'participantSocialMedias'>;
  type SocialMediaModel = Tables<'socialMediaModels'>;
  type Department = 'booth' | 'outstage' | 'room';
  type Target = 'participant' | Department;
  type TableName = 'boothPrograms' | 'outstagePrograms' | 'roomPrograms';
  type Column = { label: string; key: string };
}
