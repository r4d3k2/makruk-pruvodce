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
      "Tato rozestavba je výchozí pozicí v drtivé většině zaznamenaných makruk partií. Pomalé tempo hry znamená, že agresivní výpady v zahájení jsou neefektivní — místo toho se hráči soustředí na koordinaci a strukturu pěšců.\n\nSymetrie prvních tahů je v makruku přirozeným důsledkem pomalého tempa. Vladimir Kramnik, bývalý mistr světa v šachu, který si makruk vyzkoušel, popsal hru takto: 'Makruk Thai je strategičtější než mezinárodní šachy — musíte plánovat operace s naprostou opatrností, protože makruk lze přirovnat k anticipovanému koncovce mezinárodních šachů.' Strategie se začnou rozcházet typicky až po 10. tahu, kdy některá ze stran udělá první nesymetrický výpad.",
    variants: [
      {
        id: "symmetric",
        name: "Symetrická hra",
        description:
          "Oba hráči zrcadlově budují centrum a rozvíjejí lehké figury dovnitř ke králi.",
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
            to: [6, 3],
            comment:
              "Rozvoj koně. V makruku stojí Bia na 3./6. řadě, takže pole c3 i a3 jsou ze startu obsazená vlastními pěšáky — jediný legální skok koně z b1 je dovnitř na d2. Centralizace je v makruku pomalejší než v šachu.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý kůň ze stejných důvodů míří jen na d7. Stejná logika, jen z opačné strany desky.",
          },
          {
            from: [7, 6],
            to: [6, 4],
            comment:
              "Druhý kůň. Stejné omezení platí i napravo — h3 a f3 jsou obsazená vlastními pěšáky, kůň skáče dovnitř na e2.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Černý dokončuje symetrický rozvoj koní na e7.",
          },
          {
            from: [7, 2],
            to: [6, 2],
            comment:
              "Khon dělá krok rovně dopředu — jeden z pěti legálních pohybů (4 diagonály + 1 dopředu). Diagonála na d2 už je zabraná vlastním koněm, takže Khon volí přímý postup na c2.",
          },
          {
            from: [0, 2],
            to: [1, 2],
            comment:
              "Černý pokračuje v zrcadlení — Khon na c7.",
          },
          {
            from: [7, 5],
            to: [6, 5],
            comment:
              "Druhý Khon dopředu. Bílý má teď koně na d2/e2 a Khony na c2/f2 — kompaktní formace připravená na střední fázi hry.",
          },
          {
            from: [0, 5],
            to: [1, 5],
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
      "Stěna z Khon je oblíbená u opatrnějších hráčů a v partiích, kde černý hraje agresivně. Khon je v makruku nejlepším obráncem krátkých diagonál a stěna využívá tento atribut maximálně.\n\nPomalý rozvoj a vysoká symetrie v zahájení nejsou v makruku slabostí — je to autentický rys hry, kde absence dvojkroku pěšců a slabá Met znamenají, že obě strany musí budovat pozici postupně. Strategie 'jen reaguj' v makruku selhává (viz Partie 4), ale ani 'zaútoč hned' nefunguje proti pevné Khon-stěně.",
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
            comment: "Černý odpovídá symetricky — d6 stojí proti d4.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "Klíčový přípravný tah — c-pěšec uvolňuje cestu pro koně b1 i pro Khona c1. Bez tohoto kroku není kůň schopen vyrazit na c3 (jediné legální cíle b1 jsou jinak omezené).",
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
            from: [2, 3],
            to: [3, 3],
            comment: "Černý zrcadlí — d6 stojí proti d4.",
          },
          {
            from: [7, 4],
            to: [6, 3],
            comment:
              "Met opouští základní pole brzy! Skok diagonálně vpřed na d2 — Met je teď aktivně připravená.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý vyvíjí levého koně. V makruku stojí Bia na 3./6. řadě, takže pole a6 i c6 jsou obsazená vlastními pěšáky — jediný legální skok koně z b8 je dovnitř na d7.",
          },
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "Bílý e-pěšec postupuje — uvolňuje další diagonálu Met a posiluje centrum.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý buduje vlastní centrum a brání e6.",
          },
          {
            from: [6, 3],
            to: [5, 4],
            comment:
              "Met se posunuje diagonálně na e3 — vstupuje do prázdného pole po pohybu e-pěšce. Postupuje hlouběji.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Černý druhý kůň — opět jediný legální skok dovnitř, na e7. f6 i h6 jsou obsazená vlastními pěšáky.",
          },
          {
            from: [5, 4],
            to: [4, 5],
            comment:
              "Met na f4! Skok dále diagonálně. Met je teď daleko ze své základny — útočí na pole f5 a g5, ale je vystavená. Brzký výpad vyžaduje opatrnost: Met je drahá figura riskovaná pro tempo.",
          },
          {
            from: [0, 3],
            to: [1, 2],
            comment:
              "Černý zvyká si na výpad: vlastní Met aktivuje obranně na c7 (e7 už zabírá kůň). Drží diagonálu k centru a chystá protihru.",
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
            to: [1, 3],
            comment:
              "Černý spěchá s rozvojem — kůň na d7. Z b8 je to jediný legální skok do vnitra desky (a6 i c6 jsou obsazené vlastními pěšáky). Kůň by mohl po teoretickém uvolnění a-sloupce skočit i na a6, ale d7 je centrálnější.",
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
            to: [1, 3],
            comment:
              "Černý rozvíjí koně. V makruku stojí Bia na 3./6. řadě, takže c6 a a6 jsou obsazené — jediný legální skok černého koně z b8 je dovnitř na d7.",
          },
          {
            from: [7, 1],
            to: [6, 3],
            comment:
              "Bílý kůň analogicky míří na d2 — c3 a a3 jsou zaplněné vlastními pěšáky. Kůň na d2 podporuje pozdější centrální průlom.",
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
