export interface Rehearsal {
  dayOfWeek: string;
  time: string;
  location: string;
  venue: string;
  notes: string;
}

export const regularRehearsals: Rehearsal[] = [
  {
    dayOfWeek: "Dienstag",
    time: "19:00 - 21:00",
    location: "Wichertstraße 24, Berlin",
    venue: "W24 Jugendzentrum",
    notes: "Wöchentlicher Probentermin, neue Mitglieder sind herzlich willkommen",
  },
];

export const rehearsalInfo = {
  welcomeText: "Unser Chor probt regelmäßig und freut sich über neue Mitglieder. Egal ob erfahrener Sänger oder Anfänger - bei uns findest du deine Stimme!",
  contactForNewMembers: "Bei Interesse an einer Probeteilnahme oder weiteren Informationen kontaktiere uns gerne!",
};
