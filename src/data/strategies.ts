import type { MoveDef } from "../lib/makruk";

export interface Variant {
  id: string;
  name: string;
  description: string;
  moves: MoveDef[];
}

export interface Strategy {
  id: string;
  name: string;
  intro: string;
  history?: string;
  variants: Variant[];
}

export const STRATEGIES: Strategy[] = [
  {
    id: "central-push",
    name: "Centrální postup pěšců",
    intro:
      "Nejzákladnější a nejpřirozenější rozjezd v makruku. Pomalý tlak v centru přes d a e pěšce, postupný rozvoj koní a slonů (Khon). Vzhledem k absenci dvojkroku trvá centrum zaplnit déle než v šachu — to dává oběma stranám prostor pro pevnou stavbu.",
    history:
      "Tato rozestavba je výchozí pozicí v drtivé většině zaznamenaných makruk partií. Pomalé tempo hry znamená, že agresivní výpady v zahájení jsou neefektivní — místo toho se hráči soustředí na koordinaci a strukturu pěšců.",
    variants: [
      {
        id: "symmetric",
        name: "Symetrická hra",
        description:
          "Oba hráči zrcadlově budují centrum a rozvíjejí lehké figury.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Centrální postup. Bílý tlačí d-pěšce kupředu — chce ovládnout centrum, ale jen po krocích, žádný dvojkrok jako v šachu.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "Černý odpovídá zrcadlově. V symetrické otevírací fázi je opakování bílých tahů bezpečnou volbou.",
          },
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "Druhý centrální pěšák. Bílý kontroluje pole d5 i f5 svými dvěma pěšáky.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý zachovává symetrii.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Rozvoj koně na přirozené pole. Ma je v makruku silná figura — centralizuj ji co nejdříve.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment: "Symetrický rozvoj koně.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Druhý kůň. Bílý má teď oba koně v aktivních pozicích a kontroluje klíčová centrální pole.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment: "Černý dokončuje rozvoj koní.",
          },
          {
            from: [7, 2],
            to: [6, 3],
            comment:
              "Khon udělá krok dopředu — jeden z pěti možných pohybů (4 diagonály + 1 dopředu). Buduje ochranu krále.",
          },
          {
            from: [0, 2],
            to: [1, 3],
            comment:
              "Černý pokračuje v zrcadlení. Pomalý strategický rytmus makruku.",
          },
          {
            from: [7, 5],
            to: [6, 4],
            comment:
              "Druhý Khon — bílý má teď stěnu dvou Khon kolem svého krále. Vysoce defenzivní formace.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý zakončuje symetrický rozvoj. V další fázi některý hráč nakonec naruší symetrii — typicky vyjetím Met nebo aktivací Rua.",
          },
        ],
      },
    ],
  },
  { id: "khon-wall", name: "Stěna z Khon", intro: "—", variants: [] },
  { id: "met-attack", name: "Met-útok", intro: "—", variants: [] },
  { id: "rua-on-7th", name: "Rua na 7. řadě", intro: "—", variants: [] },
  { id: "promo-prep", name: "Příprava promoce", intro: "—", variants: [] },
];
