import concertsData from '../../public/data/concerts.json';

export interface Concert {
    id: number;
    date: string;
    time: string;
    location: string;
    venue: string;
    description: string;
    isPast: boolean;
}

const allConcerts: Concert[] = concertsData as Concert[];

export const upcomingConcerts: Concert[] = allConcerts.filter((concert: Concert) => !concert.isPast);
export const pastConcerts: Concert[] = allConcerts.filter((concert: Concert) => concert.isPast);
