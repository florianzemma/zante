export interface Flight {
  number: string;
  from: { code: string; city: string; airport: string };
  to: { code: string; city: string; airport: string };
  date: string;
  departure: string;
  arrival: string;
  terminal: string;
  cabin: string;
  operator: string;
  airline: string;
}

export const FLIGHTS: Flight[] = [
  {
    number: "LH 2249",
    from: { code: "LYS", city: "Lyon", airport: "Saint-Exupéry" },
    to:   { code: "MUC", city: "Munich", airport: "Munich" },
    date: "27 août 2026",
    departure: "13:00",
    arrival: "14:20",
    terminal: "T1",
    cabin: "Economy Light",
    operator: "Lufthansa",
    airline: "Lufthansa",
  },
  {
    number: "LH 4334",
    from: { code: "MUC", city: "Munich", airport: "Munich" },
    to:   { code: "ZTH", city: "Zakynthos", airport: "Dionysios Solomos" },
    date: "27 août 2026",
    departure: "17:05",
    arrival: "20:20",
    terminal: "T2",
    cabin: "Economy Light",
    operator: "Discover Airlines",
    airline: "Lufthansa",
  },
];

export const LAYOVER = { airport: "Munich", duration: "2h 45min" };
