export interface Concert {
    id: number;
    date: string;
    time: string;
    location: string;
    venue: string;
    description: string;
    isPast: boolean;
}

export const upcomingConcerts: Concert[] = [
    {
        id: 1,
        date: "2026-04-15",
        time: "19:30",
        location: "Berlin",
        venue: "Kulturkirche Berlin",
        description: "Frühlingskonzert mit einer Mischung aus klassischen und modernen Chorstücken.",
        isPast: false,
    },
    {
        id: 2,
        date: "2026-05-20",
        time: "20:00",
        location: "Potsdam",
        venue: "St. Nikolai Kirche",
        description: "Sommernachtskonzert mit besonderen Solisten und Orchesterbegleitung.",
        isPast: false,
    },
    {
        id: 3,
        date: "2026-06-10",
        time: "18:00",
        location: "Berlin",
        venue: "Gedenkkirche",
        description: "Jahresabschlusskonzert mit einem umfangreichen Programm von Bach bis Pop.",
        isPast: false,
    },
];

export const pastConcerts: Concert[] = [
    {
        id: 4,
        date: "2025-12-18",
        time: "19:00",
        location: "Berlin",
        venue: "Weihnachtsmarkt am Alexanderplatz",
        description: "Weihnachtskonzert mit traditionellen und modernen Weihnachtsliedern.",
        isPast: true,
    },
    {
        id: 5,
        date: "2025-10-31",
        time: "20:00",
        location: "Berlin",
        venue: "Kulturkirche Berlin",
        description: "Halloween-Spezialkonzert mit gruseligen Chorstücken.",
        isPast: true,
    },
];
