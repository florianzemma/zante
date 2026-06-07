export interface Flight {
  number: string;
  from: { code: string; city: string; airport: string };
  to: { code: string; city: string; airport: string };
  date: string;
  dateShort: { day: string; month: string };
  departure: string;
  arrival: string;
  terminal?: string;
  cabin: string;
  airline: string;
  operator?: string;
}

export const ALLER: Flight[] = [
  {
    number: "LH2249",
    from: { code: "LYS", city: "Lyon", airport: "Lyon Saint-Exupéry" },
    to:   { code: "MUC", city: "Munich", airport: "Munich" },
    date: "27 août 2026",
    dateShort: { day: "27", month: "AOÛT" },
    departure: "13:00",
    arrival: "14:20",
    terminal: "1",
    cabin: "Economy Light",
    airline: "Lufthansa",
  },
  {
    number: "LH4334",
    from: { code: "MUC", city: "Munich", airport: "Munich" },
    to:   { code: "ZTH", city: "Zakynthos", airport: "Zakynthos" },
    date: "27 août 2026",
    dateShort: { day: "27", month: "AOÛT" },
    departure: "17:05",
    arrival: "20:20",
    terminal: "2",
    cabin: "Economy Light",
    airline: "Lufthansa",
    operator: "Discover Airlines",
  },
];

export const RETOUR: Flight[] = [
  {
    number: "SN3264",
    from: { code: "ZTH", city: "Zakynthos", airport: "Zakynthos" },
    to:   { code: "BRU", city: "Bruxelles", airport: "Brussels Airport" },
    date: "7 septembre 2026",
    dateShort: { day: "07", month: "SEPT" },
    departure: "18:00",
    arrival: "20:10",
    cabin: "Economy Light",
    airline: "Brussels Airlines",
  },
  {
    number: "SN3593",
    from: { code: "BRU", city: "Bruxelles", airport: "Brussels Airport" },
    to:   { code: "LYS", city: "Lyon", airport: "Lyon Saint-Exupéry" },
    date: "7 septembre 2026",
    dateShort: { day: "07", month: "SEPT" },
    departure: "20:55",
    arrival: "22:20",
    cabin: "Economy Light",
    airline: "Brussels Airlines",
    operator: "airBaltic",
  },
];

export const ALLER_LAYOVER  = { airport: "Munich",    duration: "2h45" };
export const RETOUR_LAYOVER = { airport: "Bruxelles", duration: "45 min" };
