import {
  emptyBoard,
  type Board,
  type MoveDef,
  type PieceType,
  type Side,
} from "../lib/makruk";

export interface GameSetupPiece {
  type: PieceType;
  side: Side;
  row: number;
  col: number;
}

export interface Game {
  id: string;
  title: string;
  /** 1-2 sentence tagline shown next to the difficulty / move counter. */
  topic: string;
  /** Long description used in the Téma tab. */
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  result: string;
  /** Optional custom starting position. If omitted, uses the full initial board. */
  setup?: GameSetupPiece[];
  moves: MoveDef[];
}

export function boardFromSetup(setup: GameSetupPiece[]): Board {
  const board = emptyBoard();
  for (const p of setup) {
    board[p.row][p.col] = { type: p.type, side: p.side };
  }
  return board;
}

export const GAMES: Game[] = [
  // ============================================================
  // PARTIE 1 — Mat věží proti samotnému králi (15 tahů, mate)
  // ============================================================
  {
    id: "rook-endgame",
    title: "Mat věží proti samotnému králi",
    topic: "Klasický endgame — Rua + Khun zatlačí osamělého soupeřova krále k okraji desky a tam ho zamatuje.",
    description:
      "Endgame s materiálovou převahou: bílý má krále a věž (Rua), černý jen krále. Technika 'žebřík' — věž odřízne soupeřova krále řadou, bílý král se přiblíží, soupeř ustupuje o jedno pole. Když je soupeřův král na poslední řadě, věž dorazí mat.",
    difficulty: 2,
    result: "Bílý matuje (R a8#)",
    setup: [
      { type: "K", side: "white", row: 5, col: 4 }, // Khun e3
      { type: "R", side: "white", row: 7, col: 0 }, // Rua a1
      { type: "K", side: "black", row: 3, col: 4 }, // Khun e5
    ],
    moves: [
      {
        from: [7, 0],
        to: [3, 0],
        comment:
          "Rua zaujímá řadu, na které stojí soupeřův král, a dává šach. Černý král musí ustoupit — pole na 4. řadě jsou pod kontrolou bílého krále, jediná cesta je nahoru.",
      },
      {
        from: [3, 4],
        to: [2, 4],
        comment:
          "Černý král ustupuje na e6. Pole d5/e5/f5 jsou pod kontrolou bílého krále, na 3. řadě útočí Rua. Jediný směr je nahoru.",
      },
      {
        from: [5, 4],
        to: [4, 4],
        comment:
          "Bílý král se přibližuje. Klíč k matování: král s věží spolupracují, sama věž matovat nedokáže — potřebuje krále jako pomocníka.",
      },
      {
        from: [2, 4],
        to: [1, 4],
        comment: "Černý král pokračuje v ústupu — pole na 4. řadě bílá Rua nedovolí, ostatní útočí bílý král.",
      },
      {
        from: [3, 0],
        to: [2, 0],
        comment:
          "Rua se posunuje za soupeřovým králem — postupně mu ubírá prostor. Klasický 'žebřík'.",
      },
      {
        from: [1, 4],
        to: [0, 4],
        comment:
          "Černý král vytlačen na poslední řadu. Tady už nemá kam dál — zbývá jen pohyb po 8. řadě.",
      },
      {
        from: [4, 4],
        to: [3, 4],
        comment: "Bílý král pokračuje v přibližování.",
      },
      {
        from: [0, 4],
        to: [0, 5],
        comment:
          "Černý král kličkuje po poslední řadě. Nakonec ho bílý zamatuje v rohu nebo poblíž rohu.",
      },
      {
        from: [3, 4],
        to: [2, 4],
        comment: "Bílý král sleduje černého — drží jednu řadu mezi sebou a soupeřem.",
      },
      {
        from: [0, 5],
        to: [0, 6],
        comment: "Černý se snaží dostat do rohu, kde by mohl mít víc úkrytu.",
      },
      {
        from: [2, 4],
        to: [2, 5],
        comment: "Bílý král se přesune bok po bok se soupeřem (vždy ob jednu řadu).",
      },
      {
        from: [0, 6],
        to: [0, 7],
        comment: "Černý král v rohu. Cesta zpět neexistuje — jen čeká na mat.",
      },
      {
        from: [2, 5],
        to: [2, 6],
        comment:
          "Bílý král těsně před matovacím tahem. Stojí dvě pole pod soupeřem na sousedním sloupci — pokrývá všechna úniková pole.",
      },
      {
        from: [0, 7],
        to: [0, 6],
        comment: "Zugzwang: černý král musí někam jít a všechny ostatní směry jsou zaplaceny bílým králem.",
      },
      {
        from: [2, 0],
        to: [0, 0],
        comment:
          "MAT! Rua dorazí na a8 a útočí celou 8. řadu. Černý král na g8 nemá kam — g7/h7/f7 pokrývá bílý král, f8/h8 napadá Rua. Klasický mat věží proti králi.",
      },
    ],
  },

  // ============================================================
  // PARTIE 2 — Síla povýšeného pěšce (9 tahů, mate via promo)
  // ============================================================
  {
    id: "promo-mate",
    title: "Síla povýšeného pěšce",
    topic: "Promoce Bia → P+ otevře matovací útok. Povýšený pěšec (vizuálně i pohybově Met) hraje roli klíčové figury v matové síti.",
    description:
      "Bílý má Khun, Rua a daleko postupujícího Bia. Černý jen krále v rohu. Bílý nejprve dotlačí krále blíž a uvolní pole pro pěšce, pak pěšec dosáhne 6. řady → automatická promoce na Met. Povýšený pěšec spolu s Rua a králem zamatuje černého na poslední řadě.",
    difficulty: 3,
    result: "Bílý matuje s pomocí promoce (R a8#)",
    setup: [
      { type: "K", side: "white", row: 3, col: 1 }, // Khun b5
      { type: "R", side: "white", row: 7, col: 7 }, // Rua h1
      { type: "P", side: "white", row: 4, col: 2 }, // Bia c4
      { type: "K", side: "black", row: 0, col: 0 }, // Khun a8
    ],
    moves: [
      {
        from: [3, 1],
        to: [2, 1],
        comment:
          "Bílý král se přibližuje. Aby pěšec mohl být později promován, potřebuje krytí krále — sám pěšec by ho černý král sebral.",
      },
      {
        from: [0, 0],
        to: [0, 1],
        comment:
          "Černý král musí na b8 — a7/b7 jsou pod kontrolou bílého krále. Pole nemá z čeho vybírat.",
      },
      {
        from: [4, 2],
        to: [3, 2],
        comment: "Bia postupuje na c5. Tempo má, neboť bílý král kryje pěšcovu cestu.",
      },
      {
        from: [0, 1],
        to: [0, 0],
        comment: "Černý král kličkuje zpět do rohu. Skutečnou volbu nemá.",
      },
      {
        from: [3, 2],
        to: [2, 2],
        promotes: true,
        comment:
          "PROMOCE! Bia dosáhne 6. řady (z bílého pohledu) a automaticky se mění na povýšený pěšec (P+). Vizuálně dostává silueta charakteristický 'pilový kotouč' s deseti ostrými zuby — jasně odlišný od běžného Bia (soustředné kruhy) i od Met (kupole). Pohybově se P+ chová jako Met (jedno pole diagonálně), ale zachovává si identitu 'povýšeného pěšce'.",
      },
      {
        from: [0, 0],
        to: [0, 1],
        comment:
          "Černý král opět na b8 — jediná legální cesta. P+ na c6 už pokrývá pole b7 a d7 diagonálou, takže ústup tam není možný.",
      },
      {
        from: [7, 7],
        to: [7, 0],
        comment:
          "Bílá Rua se přesune napříč deskou na a1. Připravuje finální tah po a-sloupci.",
      },
      {
        from: [0, 1],
        to: [0, 2],
        comment:
          "Černý král nemá kam — a8 je teď napadené Rua (sice ne přímo, ale v dalším tahu). Musí na c8.",
      },
      {
        from: [7, 0],
        to: [0, 0],
        comment:
          "MAT! Rua dorazí na a8 a šachuje 8. řadu. Černý král na c8 nemá únik: b8/d8 napadá Rua, b7/c7 napadá bílý král, d7 napadá povýšený Bia (P+). Krásná spolupráce tří figur — krále, Rua a P+.",
      },
    ],
  },

  // ============================================================
  // PARTIE 3 — Khon a Met spolu (16 tahů, materiální zisk)
  // Bílý kůň skočí na e6 s útokem na Met a padne Khonovi —
  // Khon útočí i na pole přímo před sebou. Tah 15 (Ne6??) je
  // záměrná chyba bílého, viz scripts/validate-allowlist.json.
  // ============================================================
  {
    id: "khon-met-coop",
    title: "Khon a Met spolu",
    topic: "Met a Khon si rozdělí pole 6. řady — a kůň, který skočí na e6 s útokem na Met, padne Khonovi, protože Khon útočí i rovně vpřed.",
    description:
      "Z výchozí pozice — oba hráči rozvinou koně, vymění si centrální pěšce a koně dostanou do centra. Černý Met na c7 a Khon na e7 společně hlídají d6, e6 a f6. Bílý kůň skočí na e6 s útokem na Met — a padne, protože Khon (na rozdíl od šachového střelce) útočí i na pole přímo před sebou. Černý získává Ma za nic.",
    difficulty: 4,
    result: "Černý vyhraje materiálem (zisk Ma za žádnou cenu)",
    moves: [
      {
        from: [5, 3],
        to: [4, 3],
        comment: "Standardní centrální postup — bílý začíná d-pěšcem.",
      },
      {
        from: [2, 3],
        to: [3, 3],
        comment: "Černý odpovídá symetricky.",
      },
      {
        from: [5, 4],
        to: [4, 4],
        comment: "Druhý centrální pěšec bílého. Klasická symetrická otevírací fáze.",
      },
      {
        from: [2, 4],
        to: [3, 4],
        comment: "Černý se taky neostýchá v centru. Pěšci d4/e4 a d5/e5 na sebe míří — napětí zatím obě strany drží.",
      },
      {
        from: [7, 1],
        to: [6, 3],
        comment:
          "Bílý rozvíjí koně na d2 — z výchozí pozice jediný legální skok. Kůň zároveň kryje e4 a f3.",
      },
      {
        from: [0, 1],
        to: [1, 3],
        comment:
          "Černý kůň na d7 — také jediný skok z b8. Kryje e5 a c5.",
      },
      {
        from: [7, 6],
        to: [6, 4],
        comment: "Bílý vyvíjí druhého koně na e2. Odtud může na f4 — až bude pole f4 bez dohledu černého pěšce.",
      },
      {
        from: [0, 5],
        to: [1, 4],
        comment:
          "Černý vyvíjí Khon na e7. Z e7 kryje d6, f6 i e6 — Khon útočí i na pole přímo před sebou, a to bude za chvíli klíčové.",
      },
      {
        from: [4, 3],
        to: [3, 4],
        comment:
          "Bílý otevírá centrum: d4×e5. Pěšec na e5 teď napadá d6 i f6 — a braní na 6. řadě by znamenalo promoci na P+.",
      },
      {
        from: [3, 3],
        to: [4, 4],
        comment:
          "Černý nevrací hned f6×e5, ale bere sám d5×e4. Materiál zůstane rovný a pěšce e5 si za chvíli vezme kůň z d7 — kůň v centru stojí lépe než pěšec.",
      },
      {
        from: [6, 3],
        to: [4, 4],
        comment:
          "Bílý kůň bere zpět na e4 a stojí v centru — odtud vidí na d6, f6 i g5.",
      },
      {
        from: [1, 3],
        to: [3, 4],
        comment:
          "Kůň bere pěšce e5. Materiál je rovný, oba koně stojí v centru. Všimni si: černý e-pěšec je pryč, takže pole f4 už žádný černý pěšec nehlídá.",
      },
      {
        from: [6, 4],
        to: [4, 5],
        comment:
          "Bílý kůň skáče na f4 — aktivní pole s výhledem na d5, e6, g6 i h5. Pěšce g6 kryje kůň z e5, e6 hlídá Khon.",
      },
      {
        from: [0, 3],
        to: [1, 2],
        comment:
          "Černý vytahuje Met na c7. Kryje d6 a b6 a uvolňuje d8 pro věž. Met a Khon si tak rozdělily 6. řadu: Met b6/d6, Khon d6/e6/f6.",
      },
      {
        from: [4, 5],
        to: [2, 4],
        comment:
          "Kůň na e6?? Vypadá lákavě — napadá Met c7 — jenže e6 hlídá Khon z e7: Khon v makruku útočí i na pole přímo před sebou, což šachová intuice snadno přehlédne. Správný byl klidný rozvoj (Khon f1-e2, Khun c2). Tahle chyba stojí bílého celého koně.",
      },
      {
        from: [1, 4],
        to: [2, 4],
        comment:
          "Khon krokem rovně vpřed bere koně na e6 — zadarmo. Bilance po 16 tazích: pěšci 6 : 6, ale černý má koně navíc, za nic. Partie je pro černého technicky vyhraná. Poučení: Khon kryje i pole přímo před sebou; než skočíš koněm hluboko do soupeřova tábora, spočítej, kdo tam na něj čeká.",
      },
    ],
  },

  // ============================================================
  // PARTIE 4 — Pasivní obrana proti aktivnímu útoku (19 tahů)
  // Pasivní rozestavení černého nekryje e6, c7 ani g7; kůň z f4
  // vezme e6 s dvojí hrozbou. Tah 16 (Nd7??) je záměrná chyba
  // černého, viz scripts/validate-allowlist.json.
  // ============================================================
  {
    id: "passive-vs-active",
    title: "Pasivní obrana proti aktivnímu útoku",
    topic: "Bez aktivního plánu nestačí jen reagovat — pasivní rozestavení nechává v pozici díry a aktivní soupeř je najde.",
    description:
      "Bílý hraje aktivně: centrum, rozvoj koní, plán Ne2-f4. Černý se opírá jen o krajní pěšce a pasivní rozestavení (Khony b7/g7, Met e7, koně g8-h6-f7 a b8-d7), které kryje vlastní pěšce, ale ne pole e6, c7 a g7. Kůň z f4 vezme e6 s dvojí hrozbou a Khon g7 padne. Lekce: 'nicnedělání' v makruku nestačí.",
    difficulty: 4,
    result: "Útočník (bílý) vyhraje materiálem — pasivně postavené figury nekryjí e6 a Khon g7 padne",
    moves: [
      {
        from: [5, 3],
        to: [4, 3],
        comment: "Bílý hned do centra — aktivní plán.",
      },
      {
        from: [2, 7],
        to: [3, 7],
        comment:
          "Černý hraje pasivně — h-pěšec o krok dopředu. Nezpochybňuje centrum ani nerozvíjí figury; krajní pěšec sám o sobě v makruku nic neohrožuje.",
      },
      {
        from: [5, 4],
        to: [4, 4],
        comment: "Bílý posiluje centrum druhým pěšcem. Plná kontrola nad d5/e5/f5.",
      },
      {
        from: [2, 0],
        to: [3, 0],
        comment: "Černý zrcadlí pasivitu na druhém křídle: a5. Opět bez kontaktu s bílým centrem.",
      },
      {
        from: [7, 1],
        to: [6, 3],
        comment: "Bílý rozvíjí koně dovnitř (jediná legální cesta z výchozí pozice).",
      },
      {
        from: [0, 2],
        to: [1, 1],
        comment:
          "Černý Khon na b7 — fianchetto vypadá solidně, ale z b7 Khon kryje jen a6, c6 a b6; k centru se odtud nedostane.",
      },
      {
        from: [7, 6],
        to: [6, 4],
        comment: "Druhý bílý kůň na e2. Oba koně jsou vyvinuté a míří dopředu — na f4 a c4.",
      },
      {
        from: [0, 5],
        to: [1, 6],
        comment:
          "Druhý černý Khon na g7. Zrcadlově — a opět jen za vlastními pěšci: z g7 kryje f6, h6 a g6, nic víc.",
      },
      {
        from: [7, 2],
        to: [6, 1],
        comment: "Bílý Khon c1 → b2: uvolňuje c1 pro věž a kryje a3 i c3.",
      },
      {
        from: [0, 3],
        to: [1, 4],
        comment:
          "Černá Met na e7 — před krále. Zdánlivě bezpečné, ale Met tím králi zabírá pole e7 a z e7 kryje jen d6 a f6, pole e6 ne.",
      },
      {
        from: [7, 5],
        to: [6, 6],
        comment: "Druhý bílý Khon na g2 — rozvoj lehkých figur hotový, věže se mohou spojit.",
      },
      {
        from: [0, 6],
        to: [2, 7],
        comment:
          "Kůň g8 → h6: jediný skok, který má (e7 obsadila Met, f6 vlastní pěšec). Kůň na kraji desky, bez vlivu na centrum.",
      },
      {
        from: [7, 4],
        to: [6, 5],
        comment: "Bílá Met na f2 — kryje e3 a g3 a uvolňuje e1 pro věž. Bílý dokončil rozvoj a může začít akci.",
      },
      {
        from: [2, 7],
        to: [1, 5],
        comment:
          "Kůň h6 → f7 vypadá jako solidní obranný manévr (kryje d6 i h6). Cena: kůň zabral pole f7, odkud by král mohl krýt e6 — a e6 tak dál nekryje nikdo.",
      },
      {
        from: [6, 4],
        to: [4, 5],
        comment:
          "Kůň e2 → f4! Napadá pěšce e6, kterého nekryje žádná černá figura (Met z e7 vidí jen d6/f6, Khony jen b6/c6 a f6/g6). Hrozí N×e6 s dvojí hrozbou N×g7 a Nc7+. Správná obrana byla e6-e5 nebo Nf7-d8.",
      },
      {
        from: [0, 1],
        to: [1, 3],
        comment:
          "Kůň b8 → d7?? Rozvoj o tah pozdě, a navíc chyba: kůň zabral králi i pole d7. Po N×e6 tak černý nemá, čím koně napadnout, a obojí — Khon g7 i věž a8 (Nc7+) — už neuhlídá.",
      },
      {
        from: [4, 5],
        to: [2, 4],
        comment:
          "Kůň bere e6 — pěšec zadarmo a dvojí hrozba: N×g7 (Khon g7 nikdo nekryje) a Nc7+ s vidličkou na krále a věž a8. Obojí najednou černý neubrání.",
      },
      {
        from: [1, 4],
        to: [0, 3],
        comment:
          "Met zpět na d8 kryje c7 a vidličku odvrací — ale Khon g7 tím padne. (Po Sg7-h8 by přišlo Nc7+ a N×a8.)",
      },
      {
        from: [2, 4],
        to: [1, 6],
        comment:
          "Kůň bere Khon. Bilance: bílý má Khon a pěšce navíc a jeho kůň stojí hluboko v soupeřově pozici, kde ho nikdo nenapadá. Lekce: pasivní rozestavení, v němž figury kryjí jen vlastní pěšce, nechává díry (e6, c7, g7) — a aktivní soupeř je najde.",
      },
    ],
  },

  // ============================================================
  // PARTIE 5 — Mat dvěma věžemi (endgame, 7 tahů)
  // Korekce vůči původní specifikaci: aby finální tah skutečně
  // matoval, věže se musely střídat na řadě soupeřova krále
  // (klasický 'žebřík' s šachem v každém bílém tahu).
  // ============================================================
  {
    id: "two-rooks-mate",
    title: "Mat dvěma věžemi",
    topic:
      "Klasická 'žebříková' technika dvou Rua proti samotnému králi. V makruku je tato koncovka stejně efektivní jako v šachu — věže pracují společně.",
    description:
      "Dvě věže umí matovat osamělého krále i bez pomoci vlastního krále — technikou tzv. 'žebříku': jedna Rua dává šach na řadě, kde stojí soupeřův král; druhá kryje sousední řadu, kam by král chtěl utéct. Po každém šachu se rua střídají — král je tlačen řada po řadě k poslední. Klíčové: každá Rua musí být dost daleko od soupeřova krále, aby nemohla být brána.",
    difficulty: 2,
    result: "Bílý matuje (R a8#)",
    setup: [
      { type: "K", side: "white", row: 7, col: 4 },
      { type: "R", side: "white", row: 7, col: 0 },
      { type: "R", side: "white", row: 7, col: 7 },
      { type: "K", side: "black", row: 3, col: 4 },
    ],
    moves: [
      {
        from: [7, 7],
        to: [3, 7],
        comment:
          "Rua skáče na h5 a šachuje černého krále po 5. řadě (rank 5). Klíč 'žebříku': první Rua se postaví přímo na řadu, kde stojí soupeřův král, a vyhání ho o jednu řadu výš.",
      },
      {
        from: [3, 4],
        to: [2, 4],
        comment:
          "Černý král musí pryč ze šachu. Jediný směr, který nevede zpět do dosahu Rua h5, je nahoru — na e6.",
      },
      {
        from: [7, 0],
        to: [2, 0],
        comment:
          "Druhá Rua se připojuje na a6 — šach na 6. řadě. Klasická 'žebříková' střídačka: jedna Rua šachuje, druhá kryje řadu, kam král právě utekl.",
      },
      {
        from: [2, 4],
        to: [1, 4],
        comment:
          "Černý král pokračuje v ústupu nahoru — 7. řada je jediný směr, kam Rua nedosahuje.",
      },
      {
        from: [3, 7],
        to: [1, 7],
        comment:
          "Rua h5 skáče na h7 — šach na 7. řadě. Žebřík funguje: každá Rua dává šach, druhá brání ústup zpět.",
      },
      {
        from: [1, 4],
        to: [0, 4],
        comment:
          "Černý král vytlačen na poslední řadu (e8). Tady už nemá kam dál — 8. řada je jeho konec.",
      },
      {
        from: [2, 0],
        to: [0, 0],
        comment:
          "MAT! Rua a6 → a8, šach na 8. řadě. Druhá Rua na h7 stále drží 7. řadu, takže král nemá kam utéct. Černý král na e8 je v matu po pouhých 7 tazích. Klasický 'žebřík' dvou věží.",
      },
    ],
  },

  // ============================================================
  // PARTIE 6 — Khon + Met mat (endgame, 7 tahů)
  // Korekce vůči původní specifikaci: původní sekvence obsahovala
  // nelegální tah Met (Met se hýbe jen diagonálně, nikdy rovně),
  // a finální pozice nebyla matem. Tato verze používá pevný
  // mat-vzor s Khun + Met + Khon proti samotnému králi.
  // ============================================================
  {
    id: "khon-met-mate",
    title: "Khon + Met mat",
    topic:
      "Klasická makruková koncovka — Khun + Khon + Met společně matuje samotnému králi. V šachu by stačila samotná dáma, ale slabá Met to potřebuje s pomocníky.",
    description:
      "Met (jedno pole diagonálně) je v makruku slabá — sama matovat nestačí. Potřebuje krytí krále a Khona, který kryje druhé barvy diagonál. Bílý postupně přibližuje krále, Met a Khon vstupují do koordinace, černý král je vytlačen do rohu a zamatován kombinací 'Khon dává šach forward + diagonála kryje únik'. Limit počítání pro tuto koncovku je 44 tahů, takže přesnost je nutná, ne rychlost.",
    difficulty: 4,
    result: "Bílý matuje (Khon d7# — krytý Khunem, Met zajišťuje diagonály)",
    setup: [
      { type: "K", side: "white", row: 3, col: 4 },
      { type: "M", side: "white", row: 3, col: 2 },
      { type: "B", side: "white", row: 3, col: 3 },
      { type: "K", side: "black", row: 0, col: 4 },
    ],
    moves: [
      {
        from: [3, 4],
        to: [2, 4],
        comment:
          "Bílý král postupuje na e6. Klíč mat-koncovek v makruku: silnější král musí pomáhat svým figurám — sama Met s Khonem matovat nedokáže.",
      },
      {
        from: [0, 4],
        to: [0, 3],
        comment:
          "Černý král ustupuje na d8. Pole e7/d7/f7 jsou pod kontrolou bílého krále — král se musí pohnout do strany po poslední řadě.",
      },
      {
        from: [3, 2],
        to: [2, 3],
        comment:
          "Met se posunuje diagonálně na d6. Met v makruku se hýbe jen jedno pole diagonálně — proto je každý její krok pozičně významný.",
      },
      {
        from: [0, 3],
        to: [0, 2],
        comment:
          "Černý král pokračuje v ústupu po 8. řadě — na c8. Pole na 7. řadě jsou kryta bílými figurami.",
      },
      {
        from: [3, 3],
        to: [2, 2],
        comment:
          "Khon postupuje diagonálně na c6. Khon má pět možných pohybů (4 diagonály + 1 dopředu), tady volíme diagonálu, abychom udrželi koordinaci s Met.",
      },
      {
        from: [0, 2],
        to: [0, 3],
        comment:
          "Černý král kličkuje zpátky na d8 — c8/b8 by ho dostalo dál od centra, ale ve skutečnosti by mu nepomohly. Tady ale udělá chybu, která vede přímo do matu.",
      },
      {
        from: [2, 2],
        to: [1, 3],
        comment:
          "MAT! Khon dělá diagonální skok na d7 — šach černému králi (Khon útočí dopředu na pole přímo před sebou, tedy d8). Khon je krytý bílým králem na e6. Černý král na d8 nemá únik: c8 a e8 napadá Khon diagonálně, c7 napadá Met na d6, e7 napadá bílý král i Met. Koordinace tří figur dokončila mat.",
      },
    ],
  },

  // ============================================================
  // PARTIE 7 — Fianchetto Khon (plná partie, 20 tahů)
  // Rekonstrukce inspirovaná Kramnikovým plánem z makruku
  // (fianchetto Khon, pomalá centralizace), NE přepis jeho partie.
  // Původní specifikace obsahovala nelegální tahy a závěr
  // s visícím Khonem na d5; tato verze je ověřená enginem.
  // ============================================================
  {
    id: "kramnik-fianchetto",
    title: "Fianchetto Khon",
    topic:
      "Strategický motiv inspirovaný Kramnikovým plánem z makruku: černý postaví Khona na b7 (fianchetto) a krok za krokem ho dostane do centra.",
    description:
      "Vladimir Kramnik, bývalý mistr světa v šachu, popsal makruk jako 'strategičtější než šachy — anticipovaná koncovka od prvního tahu'. Tato partie je rekonstrukce inspirovaná plánem z jeho analyzované makrukové partie (fianchetto Khon, útok po g-sloupci), ne přepis konkrétních tahů; ukázka sleduje první část plánu. Bílý hraje standardní centrální rozvoj, černý odpovídá fianchettem (c8 → b7), Khon posouvá krok za krokem k centru a průlomem d6-d5 ho dostane na d5. Po 20 tazích je pozice vyrovnaná, ale černý má hotový plán a aktivnější figury — typický makrukový výsledek: strategický zisk bez taktického zlomu.",
    difficulty: 5,
    result: "Vyrovnaná pozice — plán fianchetta splněn, Khon stojí v centru na d5",
    moves: [
      {
        from: [5, 3],
        to: [4, 3],
        comment:
          "Bílý: d-pěšec na d4. Standardní centralizační rozjezd v makruku.",
      },
      {
        from: [2, 6],
        to: [3, 6],
        comment:
          "Černý: g-pěšec na g5. Asymetrická odpověď — získává prostor na královském křídle a v Kramnikově plánu je to zárodek pozdější hry po g-sloupci.",
      },
      {
        from: [5, 4],
        to: [4, 4],
        comment:
          "Bílý: e-pěšec na e4. Dvojice centrálních pěšců — standardní makruková struktura.",
      },
      {
        from: [0, 2],
        to: [1, 1],
        comment:
          "Černý: Khon c8 → b7 — FIANCHETTO! Klíčový strategický tah. Khon se postaví na dlouhou diagonálu b7-h1 a začne dlouhodobou pouť ke centru. V šachu by tento manévr byl rychlý (střelec doletí), ale v makruku každý krok = 1 pole.",
      },
      {
        from: [7, 1],
        to: [6, 3],
        comment:
          "Bílý: rozvoj koně na d2 — jediný legální skok z b1 v makruku (a3/c3 obsazena vlastními pěšáky).",
      },
      {
        from: [0, 1],
        to: [1, 3],
        comment:
          "Černý: rozvoj koně na d7 — také jediný legální skok z b8.",
      },
      {
        from: [7, 6],
        to: [6, 4],
        comment:
          "Bílý: druhý kůň na e2.",
      },
      {
        from: [0, 6],
        to: [1, 4],
        comment:
          "Černý: druhý kůň na e7. Odtud kryje d5 — pole, na kterém má Khon jednou skončit.",
      },
      {
        from: [7, 2],
        to: [6, 1],
        comment:
          "Bílý: Khon c1 → b2 (diagonálně). Symetrický vývoj — vlastní fianchetto.",
      },
      {
        from: [0, 3],
        to: [1, 2],
        comment:
          "Černý: Met d8 → c7. Kryje pěšce d6 (kam by pěšec z e5 mohl jednou brát s promocí) a uvolňuje d8 pro věž.",
      },
      {
        from: [7, 5],
        to: [6, 6],
        comment:
          "Bílý: Khon f1 → g2. Druhý Khon na bok — symetrie zachována, ale ne na dlouhých diagonálách.",
      },
      {
        from: [2, 2],
        to: [3, 2],
        comment:
          "Černý: c-pěšec na c5. Otevírá Khonovi cestu z b7 dál diagonálou na c6.",
      },
      {
        from: [5, 5],
        to: [4, 5],
        comment:
          "Bílý: f-pěšec na f4 — rozšíření na královském křídle. Cena: pěšec f3 byl jedinou pěšcovou oporou e4; od teď drží e4 jen kůň d2 a černý plán dostane terč.",
      },
      {
        from: [1, 1],
        to: [2, 2],
        comment:
          "Černý: Khon b7 → c6. Krok za krokem po diagonále — v šachu by střelec z b7 mířil na e4 okamžitě, v makruku musí Khon dojít na dostřel; z c6 už kontroluje d5.",
      },
      {
        from: [7, 4],
        to: [6, 5],
        comment:
          "Bílý: Met e1 → f2. Uvolňuje e1 pro věž a kryje e3/g3 — pěšce e4 ale Met nekryje (táhne jen o jedno pole diagonálně), ten dál stojí jen na koni d2.",
      },
      {
        from: [2, 3],
        to: [3, 3],
        comment:
          "Černý: d6-d5! Pěšec napadá e4 — tah, kvůli kterému Khon došel na c6: po e4×d5 vezme zpět právě Khon a usadí se v centru.",
      },
      {
        from: [4, 4],
        to: [3, 3],
        comment:
          "Bílý: e4×d5. Nechat napětí stát znamenalo po d5×e4 brát zpět koněm; bílý raději vyměňuje sám. (Alternativou bylo Khon g2-f3 s krytím e4.)",
      },
      {
        from: [2, 2],
        to: [3, 3],
        comment:
          "Černý: Khon bere zpět na d5 — cíl plánu je splněn. Stojí v centru, kryje ho pěšec e6 i kůň e7 a žádná bílá figura ho nenapadá.",
      },
      {
        from: [4, 3],
        to: [3, 2],
        comment:
          "Bílý: d4×c5. Pěšec d4 byl napadený pěšcem c5 a po c5×d4 c3×d4 by na d4 zůstal osamocený pěšec, který Khon z d5 napadá (Khon útočí i na pole přímo před sebou). Bílý ho proto vymění sám.",
      },
      {
        from: [2, 1],
        to: [3, 2],
        comment:
          "Černý: b6×c5. Pěšec c5 hlídá d4 a b4, kůň d7 dál kryje e5 i c5. Bilance po 20 tazích: materiál rovný, pozice vyrovnaná — ale černý svůj plán dokončil: Khon z fianchetta stojí v centru na d5, zatímco oba bílé Khony b2 a g2 zůstaly za vlastními pěšci. Přesně tento typ pomalé, plánovité hry měl Kramnik na mysli.",
      },
    ],
  },

  // ============================================================
  // PARTIE 8 — Dva koně: mat jen s pomocí soupeře (endgame, 7 tahů)
  // Dva koně + král mat proti správné obraně NEVYNUTÍ (engine: 0).
  // Ukázka matového obrazce po chybě černého v 6. tahu (Kc8??
  // místo K×a6) — záměrná chyba, viz scripts/validate-allowlist.json.
  // ============================================================
  {
    id: "two-knights-mate",
    title: "Dva koně: mat jen s pomocí soupeře",
    topic:
      "Endgame dva koně + král proti samotnému králi. Dva koně mat proti správné obraně nevynutí — v makruku stejně jako v šachu. Matový obrazec se ale hodí znát.",
    description:
      "Dva bílí koně s králem tlačí černého krále do rohu. Pozor: tato koncovka je při správné obraně remíza — dva koně nedokážou vzít soupeřovu králi všechna pole zároveň a bránící král navíc může nekrytého koně prostě sebrat. V ukázce černý v 6. tahu chybuje: místo K×a6 (po němž zůstane K+Ma proti K, což je remíza) ustoupí na c8 a dovolí mat koněm z b5 na d6. Lekce: proti dvěma koním se braň aktivně — hlídej, který kůň není krytý.",
    difficulty: 4,
    result: "Bílý matuje (N d6#) — jen díky chybě černého v 6. tahu",
    setup: [
      { type: "K", side: "white", row: 3, col: 3 }, // Khun d5
      { type: "N", side: "white", row: 3, col: 2 }, // Ma c5
      { type: "N", side: "white", row: 3, col: 1 }, // Ma b5
      { type: "K", side: "black", row: 0, col: 0 }, // Khun a8
    ],
    moves: [
      {
        from: [3, 3],
        to: [2, 3],
        comment:
          "Bílý král postupuje na d6 a tlačí černého krále k okraji desky.",
      },
      {
        from: [0, 0],
        to: [0, 1],
        comment:
          "Černý král musí na b8 — a7 hlídá kůň b5, b7 kůň c5.",
      },
      {
        from: [3, 2],
        to: [2, 0],
        comment:
          "Kůň c5 → a6 bere králi pole b8 a c7. Koně na a6 ale nikdo nekryje — bílý sází na to, že si toho černý nevšimne, protože vynutit nic nemůže.",
      },
      {
        from: [0, 1],
        to: [1, 1],
        comment:
          "Černý král na b7 napadá nekrytého koně a6 — správná reakce: proti dvěma koním se braň aktivně a hledej, který kůň visí.",
      },
      {
        from: [2, 3],
        to: [1, 4],
        comment:
          "Bílý král na e7 hlídá d7 a d8 — úniková pole pro případ, že by černý král šel na c8 — a nastražuje past: kůň a6 dál visí, ale pokud ho černý nevezme a ustoupí na c8, přijde mat.",
      },
      {
        from: [1, 1],
        to: [0, 2],
        comment:
          "Král na c8?? Chyba, která rozhoduje. Černý měl vzít nekrytého koně K×a6 — zůstal by král a kůň proti králi, což je remíza. I ostatní ústupy (b6, c6, a8) drží remízu; jediné c8 dovolí mat.",
      },
      {
        from: [3, 1],
        to: [2, 3],
        comment:
          "MAT! Kůň z b5 na d6 dává šach. Král na c8 nemá kam: b8 a c7 hlídá kůň a6, b7 kůň d6, d7 a d8 bílý král. Obrazec si zapamatuj — ale proti správné obraně ho vynutit nejde.",
      },
    ],
  },

  // ============================================================
  // PARTIE 9 — Věž a kůň matují (endgame, 9 tahů)
  // Kombinace Rua + Ma + Khun proti samotnému Khunovi.
  // ============================================================
  {
    id: "rook-and-knight-mate",
    title: "Věž a kůň matují",
    topic:
      "Klasická výherná koncovka — věž a kůň společně s králem tlačí soupeřova krále do pasti.",
    description:
      "Věž se nejprve připraví na dlouhé řadě, král se přibližuje a kůň pomáhá odřezávat úniková pole. V poslední fázi věž přejde na matový sloupec a společně s králem uzavře mat. Tato koncovka je v makruku jednodušší než v šachu, protože král má menší pohyblivost.",
    difficulty: 3,
    result: "Bílý matuje (R h2#)",
    setup: [
      { type: "K", side: "white", row: 7, col: 4 }, // Khun e1
      { type: "N", side: "white", row: 7, col: 6 }, // Ma g1
      { type: "R", side: "white", row: 7, col: 0 }, // Rua a1
      { type: "K", side: "black", row: 0, col: 7 }, // Khun h8
    ],
    moves: [
      {
        from: [7, 0],
        to: [6, 0],
        comment:
          "Věž se posune na a2 a připraví se na útok po 2. řadě.",
      },
      {
        from: [0, 7],
        to: [1, 6],
        comment:
          "Černý král se přesune na g7, snaží se udržet na opačném křídle.",
      },
      {
        from: [7, 4],
        to: [6, 3],
        comment:
          "Bílý král postupuje na d2, začíná dlouhou pouť přes desku.",
      },
      {
        from: [1, 6],
        to: [2, 6],
        comment:
          "Černý král na g6, stále se snaží uniknout.",
      },
      {
        from: [6, 3],
        to: [5, 4],
        comment:
          "Bílý král na e3 — pomalé, ale jisté přibližování.",
      },
      {
        from: [2, 6],
        to: [3, 7],
        comment:
          "Černý král na h5, blíží se k okraji, kde bude matován.",
      },
      {
        from: [5, 4],
        to: [4, 5],
        comment:
          "Bílý král na f4, připravuje matovou síť kolem h-sloupce.",
      },
      {
        from: [3, 7],
        to: [4, 7],
        comment:
          "Černý král na h4 — zbývá jen poslední krok.",
      },
      {
        from: [6, 0],
        to: [6, 7],
        comment:
          "MAT! Věž z a2 na h2 šachuje po celém h-sloupci. Černý král na h4 nemá únik: g3 a h3 kryje bílý král, g5 kryje věž. Kombinace Rua + Khun + Ma je neodvratná.",
      },
    ],
  },

  // ============================================================
  // PARTIE 10 — Khon + Met mat z rohu (endgame, 7 tahů)
  // Jiná varianta Khon + Met matu než Partie 6 — černý král
  // začíná v rohu a bílý ho systematicky vytlačí.
  // ============================================================
  {
    id: "khon-met-mate-corner",
    title: "Khon + Met mat z rohu",
    topic:
      "Slabá Met potřebuje pomocníky. Tato studie ukazuje, jak Khon a Met společně matují krále v rohu.",
    description:
      "Met sama matovat nedokáže, ale s Khonem a králem dokáže uzavřít matovou síť. Bílý postupně omezuje černého krále, Met a Khon kryjí diagonály a finální tah Khona dopředu na d7 uzavírá mat. Oproti Partii 6 začíná černý král v rohu, což ilustruje jiný geometrický přístup ke stejné koncovce.",
    difficulty: 4,
    result: "Bílý matuje (Khon d7#)",
    setup: [
      { type: "K", side: "white", row: 3, col: 4 }, // Khun e5
      { type: "M", side: "white", row: 3, col: 2 }, // Met c5
      { type: "B", side: "white", row: 3, col: 3 }, // Khon d5
      { type: "K", side: "black", row: 0, col: 0 }, // Khun a8
    ],
    moves: [
      {
        from: [3, 2],
        to: [2, 1],
        comment:
          "Met se posune diagonálně na b6 a odřezává černému králi ústup na a7.",
      },
      {
        from: [0, 0],
        to: [0, 1],
        comment:
          "Černý král ustupuje na b8. a8 je pod kontrolou bílé Mety.",
      },
      {
        from: [3, 3],
        to: [2, 2],
        comment:
          "Khon postupuje na c6 a pokračuje v omezování prostoru kolem černého krále.",
      },
      {
        from: [0, 1],
        to: [0, 2],
        comment:
          "Král pokračuje po zadní řadě na c8, ale volba se zužuje.",
      },
      {
        from: [3, 4],
        to: [2, 3],
        comment:
          "Bílý král se přibližuje a přebírá kontrolu nad klíčovými poli c7 a e7.",
      },
      {
        from: [0, 2],
        to: [0, 3],
        comment:
          "Černý král se stáhne na d8. Zbývá jen čekat na mat.",
      },
      {
        from: [2, 2],
        to: [1, 3],
        comment:
          "MAT! Khon na d7 dává šach dopředu na d8 a diagonálně kryje c8/e8. Bílý král na e7 drží c7 a e7. Černý král nemá kam.",
      },
    ],
  },

  // ============================================================
  // PARTIE 11 — Past na Met (plná partie, 19 tahů)
  // Černá Met se vyžene na c5 — pole, které po b6-b5 kryje jen
  // kůň, zatímco bílý na něj míří koněm i dvěma pěšci. Tah 16
  // (Mc5??) je záměrná chyba, viz scripts/validate-allowlist.json.
  // ============================================================
  {
    id: "met-trap",
    title: "Past na Met",
    topic:
      "Taktická lekce: aktivní Met bez krytí je zranitelná. Bílý ji potrestá skokem koně na c5.",
    description:
      "Z bílého queenside rozjezdu (b4, Nb3) se černá Met snaží co nejrychleji zapojit do hry: e7, d6 a nakonec c5 — pole, které po b6-b5 kryje jen kůň, zatímco bílý na něj míří koněm i dvěma pěšci. Lekce: v makruku je Met slabá figura — každé pole, kam ji posíláš, si přepočítej (útočníci proti obráncům).",
    difficulty: 3,
    result: "Bílý získává Met (past na c5)",
    moves: [
      {
        from: [5, 3],
        to: [4, 3],
        comment: "Bílý otevírá centrum d-pěšcem.",
      },
      {
        from: [2, 3],
        to: [3, 3],
        comment: "Černý odpovídá symetricky.",
      },
      {
        from: [5, 4],
        to: [4, 4],
        comment:
          "Druhý centrální pěšec — vzniká klasická makruková struktura s pěšci d4/e4 proti d5/e5.",
      },
      {
        from: [2, 4],
        to: [3, 4],
        comment: "Černý udržuje symetrii v centru.",
      },
      {
        from: [7, 1],
        to: [6, 3],
        comment:
          "Levý kůň na d2 — jediný legální skok z výchozí pozice (a3 a c3 jsou obsazeny vlastními pěšci).",
      },
      {
        from: [0, 1],
        to: [1, 3],
        comment: "Černý kůň na d7, symetrický rozvoj. Odtud kryje c5 a e5.",
      },
      {
        from: [7, 6],
        to: [6, 4],
        comment: "Pravý kůň na e2.",
      },
      {
        from: [0, 2],
        to: [1, 1],
        comment: "Černý Khon na b7 — fianchetto; z b7 kryje a6, c6 a a8.",
      },
      {
        from: [5, 1],
        to: [4, 1],
        comment:
          "Bílý b-pěšec na b4 — uvolňuje pole b3 pro koně a pěšec sám odteď napadá a5 a c5.",
      },
      {
        from: [2, 1],
        to: [3, 1],
        comment:
          "Černý zastavuje další postup b4-b5 a fixuje bílého pěšce. Má to ale cenu: pole c5 už nekryje žádný černý pěšec (d6 postoupil na d5, b6 na b5) — hlídá ho jen kůň z d7.",
      },
      {
        from: [6, 3],
        to: [5, 1],
        comment:
          "Bílý kůň na b3 míří na c5. To pole teď napadá kůň i pěšec b4 a černý ho kryje jediným koněm — přesně takové pole je pro slabou Met past.",
      },
      {
        from: [0, 3],
        to: [1, 4],
        comment:
          "Černá Met vykročí na e7 — z d8 má jen dva diagonální kroky (c7, e7) a přes e7 vede cesta do centra.",
      },
      {
        from: [7, 2],
        to: [6, 2],
        comment:
          "Bílý Khon z c1 krokem rovně na c2 (Khon smí i jedno pole vpřed). Uvolňuje první řadu a chystá Khon na d3, kde podepře centrum.",
      },
      {
        from: [1, 4],
        to: [2, 3],
        comment:
          "Met pokračuje na d6. Zatím stojí bezpečně: d6 nenapadá žádná bílá figura ani pěšec.",
      },
      {
        from: [7, 5],
        to: [6, 5],
        comment:
          "Druhý Khon na f2 — bílý dokončuje rozvoj lehkých figur a čeká, jestli Met půjde ještě dál.",
      },
      {
        from: [2, 3],
        to: [3, 2],
        comment:
          "Met na c5?? Vypadá aktivně (napadá b4 i d4), ale je to chyba: c5 útočí kůň b3, pěšec b4 i pěšec d4, kryje ho jen kůň d7. Tři útočníci proti jednomu obránci — spočítej to vždy dřív, než slabou figuru pošleš do soupeřova tábora.",
      },
      {
        from: [5, 1],
        to: [3, 2],
        comment:
          "Kůň bere Met. Černý sice může vzít zpět koněm, ale pak bere pěšec b4 — a bílý na konci výměny získal Met za nic.",
      },
      {
        from: [1, 3],
        to: [3, 2],
        comment:
          "Černý bere koně zpět — jinak by byl prostě o Met chudší a bílý kůň z c5 by navíc napadal Khon b7 i koně d7.",
      },
      {
        from: [4, 1],
        to: [3, 2],
        comment:
          "Pěšec bere zpět a výměna končí: kůň za koně, Met za nic. Bilance: bílý má Met navíc a pěšec c5 mu k tomu drží b6 a d6. Poučení: Met je nejslabší figura — bez krytí ji do soupeřova tábora neposílej.",
      },
    ],
  },

  // ============================================================
  // PARTIE 12 — Symetrické zahájení (plná partie, 20 tahů)
  // Oba hráči zrcadlí první tahy, dokud bílý nezahraje c4 —
  // zrcadlové c5?! by dovolilo d×e5! s hrozbou e6=P+, proto černý
  // bere e5×d4. Výsledek je s korektní hrou vyrovnaný (engine ≈ 0).
  // ============================================================
  {
    id: "symmetric-opening",
    title: "Symetrické zahájení",
    topic:
      "Symetrická hra se rozejde v centru: bílý zahraje c4 a černý nesmí zrcadlit c5 — správné je e5×d4.",
    description:
      "Prvních dvanáct tahů je zrcadlových — oba hráči rozvíjejí koně a Khony do standardních pozic. Rozdíl nastane po bílém c4: zrcadlové c5?! by dovolilo d×e5! s hrozbou e5-e6 = P+ (pěšec na 5. řadě je v makruku jen krok od promoce), a tak černý bere e5×d4. Po výměnách na d5 a d4 vznikne vyrovnaná, ale asymetrická pozice: bílý má koně v centru a věž na otevřeném c-sloupci, černý pevného pěšce d5. Lekce: symetrie končí ve chvíli, kdy se v centru začne brát — a pak se každé braní musí přepočítat.",
    difficulty: 3,
    result: "Vyrovnaná pozice — symetrii rozbil c4 a černý ji správně nekopíroval",
    moves: [
      {
        from: [5, 3],
        to: [4, 3],
        comment: "Bílý začíná centrálním d-pěšcem.",
      },
      {
        from: [2, 3],
        to: [3, 3],
        comment: "Černý zrcadlí v centru.",
      },
      {
        from: [5, 4],
        to: [4, 4],
        comment: "Bílý posílá e-pěšcem.",
      },
      {
        from: [2, 4],
        to: [3, 4],
        comment: "Černý zrcadlí i druhým centrálním pěšcem.",
      },
      {
        from: [7, 1],
        to: [6, 3],
        comment: "Levý kůň na d2.",
      },
      {
        from: [0, 1],
        to: [1, 3],
        comment: "Černý levý kůň na d7.",
      },
      {
        from: [7, 6],
        to: [6, 4],
        comment: "Pravý kůň na e2.",
      },
      {
        from: [0, 6],
        to: [1, 4],
        comment: "Černý pravý kůň na e7. Odtud kryje d5 — to se bude hodit.",
      },
      {
        from: [7, 2],
        to: [6, 1],
        comment: "Khon c1-b2, připravuje se na fianchetto.",
      },
      {
        from: [0, 2],
        to: [1, 1],
        comment: "Černý Khon c8-b7, symetricky.",
      },
      {
        from: [7, 5],
        to: [6, 6],
        comment: "Khon f1-g2.",
      },
      {
        from: [0, 5],
        to: [1, 6],
        comment: "Černý Khon f8-g7. Dvanáct tahů zrcadlově — teď je na bílém, aby symetrii rozbil.",
      },
      {
        from: [5, 2],
        to: [4, 2],
        comment:
          "c-pěšec na c4 — bílý rozbíjí symetrii na dámském křídle a napadá d5 podruhé (c4 a e4).",
      },
      {
        from: [3, 4],
        to: [4, 3],
        comment:
          "Černý symetrii nekopíruje — a správně. Po 13...c5?! by přišlo 14.d×e5! s hrozbou e5-e6 = P+: pěšec na 5. řadě je v makruku jen krok od promoce. Proto bere sám: e5×d4, a bílý pěšec d4 je pryč dřív, než stihne cokoli.",
      },
      {
        from: [4, 2],
        to: [3, 3],
        comment:
          "Bílý bere c4×d5 a otevírá c-sloupec — na něj se první dostane jeho věž.",
      },
      {
        from: [2, 2],
        to: [3, 3],
        comment:
          "Černý bere zpět c6×d5. Pěšec d5 je teď izolovaný (c- ani e-pěšce už černý nemá), ale kryje ho kůň e7 a bílý pěšec e4 na něj sám nestačí.",
      },
      {
        from: [6, 4],
        to: [4, 3],
        comment:
          "Kůň bere zpět na d4 — centrální pole, kde ho žádný černý pěšec nenapadne (c5 i e5 jsou pryč). Materiál je rovný, ale kůň v centru stojí lépe než kůň na e7.",
      },
      {
        from: [0, 3],
        to: [1, 2],
        comment:
          "Met na c7: vyklízí d8 pro věž a míří na d6, odkud pokryje c5 i e5.",
      },
      {
        from: [7, 0],
        to: [7, 2],
        comment:
          "Rua a1-c1: bílý obsadí otevřený c-sloupec jako první a hned napadá Met c7 — c3 je po c3-c4 prázdné, takže věž vidí až na c7.",
      },
      {
        from: [1, 2],
        to: [2, 3],
        comment:
          "Met uhýbá z dostřelu věže na d6, kde stojí bezpečně a hlídá c5 i e5. Bilance po 20 tazích: materiál rovný, pozice vyrovnaná, ale symetrie je pryč: bílý má koně v centru na d4 a věž na otevřeném c-sloupci, černý pevného pěšce d5 (kryje ho kůň e7) a kompaktní královské křídlo. Teprve teď začíná skutečná partie.",
      },
    ],
  },
];
