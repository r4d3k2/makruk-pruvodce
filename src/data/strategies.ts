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

  {
    id: "khon-wall",
    name: "Stěna z Khon",
    intro:
      "Hluboce defenzivní formace, ve které bílý postaví oba Khony před krále a Met. Vznikne 'stěna' na druhé řadě — extrémně těžko proniknutelná pro lehké figury soupeře. Cena: pomalý rozvoj a omezené možnosti aktivity.",
    history:
      "Stěna z Khon je oblíbená u opatrnějších hráčů a v partiích, kde černý hraje agresivně. Khon je v makruku nejlepším obráncem krátkých diagonál a stěna využívá tento atribut maximálně.",
    variants: [
      {
        id: "central-khon-wall",
        name: "Centrum + Khon-wall",
        description:
          "Bílý nejprve uvolní c-pěšcem cestu koni, pak vystaví dvojici Khon kolem krále.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Centrální d-pěšec. Bílý začíná rozvoj klasicky a získává prostor.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý odpovídá symetricky — d6 chrání centrum.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "Klíčový přípravný tah — c-pěšec uvolňuje cestu pro koně b1 i pro Khona c1. Bez tohoto kroku nelze ze stávající pozice vyvíjet figury z queenside.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment: "Černý dělá totéž — symetrická příprava.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Kůň přichází na c3, právě uvolněné c-pěšcem. Útočí na centrální pole d5 a e4.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment: "Černý rozvíjí koně na c6 — zrcadlová struktura.",
          },
          {
            from: [7, 2],
            to: [6, 3],
            comment:
              "První Khon postupuje na d2 (krok diagonálně vpřed). Je teď přímo před králem a začíná tvořit stěnu.",
          },
          {
            from: [0, 2],
            to: [1, 3],
            comment: "Černý reaguje stejně — Khon na d7.",
          },
          {
            from: [7, 5],
            to: [6, 4],
            comment:
              "Druhý Khon na e2. Dvojice d2/e2 vytváří kompletní stěnu mezi pěšci a vlastním králem. Met (e1) a Khun (d1) jsou bezpečně schovaní.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý dokončuje vlastní Khon-wall na d7/e7. Obě strany teď mají defenzivní strukturu — partie zpomalí a rozhodne se až po dlouhé poziční hře.",
          },
        ],
      },
    ],
  },

  {
    id: "met-attack",
    name: "Met-útok",
    intro:
      "Met je sice slabá figura (krok diagonálně), ale na otevřených diagonálách dokáže být nepříjemně aktivní v rané fázi. V tomto plánu bílý vyjede Met brzy z domovské pozice a snaží se jí narušit klid v centru.",
    history:
      "Vyjet Met brzy je v makruku riskantnější než vyjet dámu v šachu, protože Met se hýbe jen po jednom poli. Útok proto musí být dobře podpořený — jinak Met snadno padne za pěšce.",
    variants: [
      {
        id: "early-sortie",
        name: "Brzký výpad",
        description:
          "Bílý uvolní d-pěšcem cestu Met a vyjede ji k centru, kde haraší přes diagonály.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Otevírá d-pěšec pole pro Met. Met na e1 se dostane diagonálou na d2 jen pokud je pole volné.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý vyvíjí koně asymetricky — varuje, že nebude jen kopírovat. Kůň na f6 brání pole e4 i d5.",
          },
          {
            from: [7, 4],
            to: [6, 3],
            comment:
              "Met opouští základní pole brzy! Skok diagonálně vpřed na d2 — Met je teď aktivně připravená.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý buduje centrum, ignoruje výpad Met.",
          },
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "Bílý e-pěšec postupuje — uvolňuje další diagonálu Met a posiluje centrum.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment:
              "Černý rozvíjí druhého koně. Kůň c6 brání d4 i b4 — případný protiútok bude komplikovaný.",
          },
          {
            from: [6, 3],
            to: [5, 4],
            comment:
              "Met se posunuje diagonálně na e3 — vstupuje do prázdného pole po pohybu e-pěšce. Postupuje hlouběji.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "Černý udeří v centru — d5 napadá bílý e4 a otevírá další pole pro vývoj.",
          },
          {
            from: [5, 4],
            to: [4, 5],
            comment:
              "Met na f4! Skok dále diagonálně. Met je teď daleko ze své základny — útočí na pole f5 a g5, ale je vystavená. Tento tah ukazuje, proč brzký výpad vyžaduje opatrnost: Met je drahá figura riskovaná pro tempo.",
          },
          {
            from: [0, 3],
            to: [1, 4],
            comment:
              "Černý zvyká si na výpad: vlastní Met aktivuje obranně na e7. Drží diagonálu k poli f4, kde stojí bílá Met. Hrozba symetrického protiútoku.",
          },
        ],
      },
    ],
  },

  {
    id: "rua-on-7th",
    name: "Rua na 7. řadě",
    intro:
      "Klasický strategický motiv: dostat věž (Rua) na poslední rank před soupeřem, kde napadá soupeřovy pěšce a omezuje krále. V makruku je to zvlášť cenné, protože Rua je zdaleka nejsilnější figura.",
    history:
      "Otevřít sloupec pro Rua se v makruku dělá obvykle přes krajního pěšce — méně rizikové než výměny v centru. Klasický plán: a-pěšec útočí, pak Rua jede skrz.",
    variants: [
      {
        id: "open-a-file",
        name: "Otevření a-sloupce",
        description:
          "Bílý nabídne výměnu krajních pěšců, otevře a-sloupec a vede Rua hluboko do soupeřovy poloviny.",
        moves: [
          {
            from: [5, 0],
            to: [4, 0],
            comment:
              "Krajní pěšec se posunuje vpřed. Bílý plánuje výměnu, ne tlak — chce otevřený a-sloupec pro Rua.",
          },
          {
            from: [2, 1],
            to: [3, 1],
            comment:
              "Černý nabízí výměnu skrz b-pěšce. Pokud bílý vezme, černý vrací — typický plán pro otevření okrajových sloupců.",
          },
          {
            from: [4, 0],
            to: [3, 1],
            comment:
              "Bílý bere diagonálně. Pamatuj: Bia bere jen diagonálně vpřed — to je jediný způsob, jak v makruku pěšec vezme figuru.",
          },
          {
            from: [2, 0],
            to: [3, 1],
            comment:
              "Černý vrací bílého pěšce vlastním a-pěšcem. Po této výměně je a-sloupec úplně otevřený pro obě věže.",
          },
          {
            from: [7, 0],
            to: [4, 0],
            comment:
              "Bílá Rua vykračuje na a4 po prázdném sloupci. Tři pole najednou — Rua se hýbe ortogonálně jako šachová věž.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment:
              "Černý spěchá s rozvojem — kůň na c6. Musí zabrzdit postup bílé Rua, dokud je čas.",
          },
          {
            from: [4, 0],
            to: [2, 0],
            comment:
              "Bílá Rua zaujímá 6. řadu (rank 6 z bílého pohledu). Napadá černé pěšce a má za sebou volný sloupec.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "Černý se snaží odvést pozornost — pohybuje d-pěšcem k centru. Riziko: a-sloupec dál nebrání.",
          },
          {
            from: [2, 0],
            to: [1, 0],
            comment:
              "Rua na 7. řadě! Kontaktuje černou Rua a a8. Toto je vrchol celého plánu — Rua hluboko v soupeřově táboře, omezující krále a vyhrožující jeho figurám.",
          },
          {
            from: [0, 2],
            to: [1, 1],
            comment:
              "Černý odpovídá Khon na b7. Brání věž a zároveň napadá bílou Rua diagonálně. Bílý teď bude muset zvážit, zda se stáhnout, nebo věž vyměnit.",
          },
        ],
      },
    ],
  },

  {
    id: "promo-prep",
    name: "Příprava promoce",
    intro:
      "Promoce Bia na Met je v makruku silný motiv — povýšený pěšec získá hodnotu blízkou dámě v šachu. Plán: dostat pěšec na 6. řadu (z postupujícího pohledu = rank 6), kde se automaticky povýší.",
    history:
      "Protože v makruku nejsou dvojkroky, trvá pěšci dosáhnout 6. řady mnohem déle než v šachu — typicky 8 a více tahů. Hráči proto plánují promoci dlouho předem a vyměňují figury tak, aby pro pěšce vznikla volná cesta.",
    variants: [
      {
        id: "e-file-push",
        name: "Tlak po e-sloupci",
        description:
          "Bílý postupuje e-pěšcem a využije středové výměny k jeho průchodu na 6. řadu.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Příprava: d-pěšec vpřed. Bude potřebovat udeřit, až se black vydá s e-pěšcem.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý zrcadlí — d6 stojí proti d4.",
          },
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "E-pěšec přichází. Bílý buduje dvojici pěšců v centru — typická příprava pro promoci jednoho z nich.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment:
              "Černý rozvíjí koně — důležitý obránce centrálních polí.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Bílý kůň na c3 — podporuje pole d5, kam pěšec smí postoupit (a kde teď stojí černý d-pěšec).",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "Černý e-pěšec postupuje na e5. Dva ofenzivní pěšci stojí proti dvěma — napětí v centru je nejvyšší.",
          },
          {
            from: [4, 3],
            to: [3, 4],
            comment:
              "Bílý d-pěšec bere černého e-pěšce diagonálně! Po této výměně se otevírá průchod pro promoci.",
          },
          {
            from: [3, 3],
            to: [4, 4],
            comment:
              "Černý protibere bílého e-pěšce diagonálně vpřed. Bílý ztratil e-pěšce, ale jeho 'původně d-pěšec' stojí teď na e5 — jeden krok od 6. řady.",
          },
          {
            from: [3, 4],
            to: [2, 4],
            promotes: true,
            comment:
              "Promoce! Bílý pěšec dosáhne 6. řady (z bílého pohledu) a automaticky se mění na Met — silnější figuru s diagonálním pohybem. Toto je vrchol celého plánu.",
          },
          {
            from: [0, 3],
            to: [1, 4],
            comment:
              "Černá Met spěchá uzavřít diagonálu povýšenému pěšci. Z e7 brání pole f6 i d6 — povýšený pěšec je teď uzamčen, ale stojí hluboko v soupeřově táboře a černý bude muset hrát opatrně, aby ho nevyměnil za cennější figuru.",
          },
        ],
      },
    ],
  },
];
