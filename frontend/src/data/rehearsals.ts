import rehearsalsData from '../../public/data/rehearsals.json';

export interface Rehearsal {
  dayOfWeek: string;
  time: string;
  location: string;
  venue: string;
  notes: string;
}

export interface RehearsalInfo {
  welcomeText: string;
  contactForNewMembers: string;
}

const data = rehearsalsData as {
  regularRehearsals: Rehearsal[];
  rehearsalInfo: RehearsalInfo;
};

export const regularRehearsals: Rehearsal[] = data.regularRehearsals;
export const rehearsalInfo: RehearsalInfo = data.rehearsalInfo;

