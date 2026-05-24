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
          "PROMOCE! Bia dosáhne 6. řady (z bílého pohledu) a automaticky se mění na Met — povýšený pěšec (P+). Vizuálně bude pěšcová silueta převrácená vzhůru nohama (tradice z thajských šachovnic) a pohybově se chová jako Met (4 diagonály).",
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
  // ============================================================
  {
    id: "khon-met-coop",
    title: "Khon a Met spolu",
    topic: "Když Met podpoří Khona, jejich spolupráce na centrálních diagonálách stačí k zisku materiálu.",
    description:
      "Z výchozí pozice — oba hráči si první vymění centrální pěšce, pak rozvíjejí lehké figury. Bílý zaútočí koněm hluboko do soupeřova tábora, ale černý Khon (s krytím Met) ho na e6 sebere. Černý získává Ma (kůň) — výrazná materiální výhoda.",
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
        comment: "Černý se taky neostýchá v centru.",
      },
      {
        from: [4, 3],
        to: [3, 4],
        comment:
          "Bílý udělá první výměnu — d-pěšec bere e-pěšce diagonálně. Strategie: otevřít centrum a využít prostor pro koně.",
      },
      {
        from: [3, 3],
        to: [4, 4],
        comment: "Černý vrací — d-pěšec bere e-pěšce. Materiál je stále vyrovnaný.",
      },
      {
        from: [7, 1],
        to: [6, 3],
        comment: "Bílý rozvíjí koně na d2. Z výchozí pozice je to jediný legální skok.",
      },
      {
        from: [0, 5],
        to: [1, 4],
        comment:
          "Černý vyvíjí Khon na e7 — diagonálně. Tento Khon bude pak hrát klíčovou roli.",
      },
      {
        from: [7, 6],
        to: [6, 4],
        comment: "Bílý vyvíjí druhého koně na e2. Útok se začíná chystat.",
      },
      {
        from: [0, 3],
        to: [1, 2],
        comment:
          "Černý vytahuje Met na c7 — diagonálně. Tady se objeví myšlenka: Met bude podporovat Khon.",
      },
      {
        from: [6, 4],
        to: [4, 5],
        comment:
          "Bílý kůň skáče dál — na f4. Aktivní pozice, ale brzy přijde zaplaceno.",
      },
      {
        from: [1, 2],
        to: [2, 3],
        comment:
          "Černý Met se posunuje na d6 (diagonálně). Teď stojí v centru a kontroluje diagonály — pole c5, d6, e7, e5 jsou pod jeho dohledem.",
      },
      {
        from: [4, 5],
        to: [2, 4],
        comment:
          "Bílý kůň útočí hluboko na e6. Aspoň dva problémy: nikoho přímo nenapadá smysluplně, a hlavně tam stojí napadený Khonem!",
      },
      {
        from: [1, 4],
        to: [2, 4],
        comment:
          "Černý Khon krokem dopředu (jeden z pěti pohybů Khona — diagonály + 1 dopředu) bere bílého koně na e6! Met za sebou drží defenzivně diagonálu — kdyby chtěl bílý přitáhnout figury, Met by je odrazila.",
      },
      {
        from: [7, 4],
        to: [6, 5],
        comment:
          "Bílý se snaží vyrovnat — Met na f2 (diagonálně). Pokouší se dostat figury do hry, ale je pozdě.",
      },
      {
        from: [2, 4],
        to: [3, 3],
        comment:
          "Černý Khon se vrátí do centra na d5 — bezpečně chráněn. Black má kůň navíc. Materiálová výhoda je jednoznačná, partie bude pro černého technicky vyhraná.",
      },
    ],
  },

  // ============================================================
  // PARTIE 4 — Pasivní obrana proti aktivnímu útoku (19 tahů)
  // ============================================================
  {
    id: "passive-vs-active",
    title: "Pasivní obrana proti aktivnímu útoku",
    topic: "Bez aktivního plánu nestačí jen reagovat — v makruku pomalé tempo umožní soupeři vybudovat průlom.",
    description:
      "Bílý hraje aktivně: centrum, rozvoj koní, postup Khon a Met. Černý se opírá pouze o okrajové postupy pěšců (a-, b-, h-) a pasivní rozvoj Khon. Bílý postupně získá prostor, prorazí na d-sloupci, povýší pěšec a vezme nechráněnou figuru. Lekce: 'nicnedělání' v makruku nestačí.",
    difficulty: 4,
    result: "Útočník (bílý) vyhraje materiálem — kůň černého padne za otevřený sloupec",
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
          "Černý hraje pasivně — h-pěšec dopředu. Nezpochybňuje centrum, nezačíná rozvoj. Krajní pole se v makruku nedají dobře využít k útoku.",
      },
      {
        from: [5, 4],
        to: [4, 4],
        comment: "Bílý posiluje centrum druhým pěšcem. Plná kontrola nad d5/e5/f5.",
      },
      {
        from: [2, 0],
        to: [3, 0],
        comment: "Černý druhý krajní pěšec na druhé straně. Symetrie pasivity.",
      },
      {
        from: [7, 1],
        to: [6, 3],
        comment: "Bílý rozvíjí koně dovnitř (jediná legální cesta z výchozí pozice).",
      },
      {
        from: [3, 7],
        to: [4, 7],
        comment: "Černý dál vyhání h-pěšce. Pořád žádný plán.",
      },
      {
        from: [7, 6],
        to: [6, 4],
        comment: "Bílý druhý kůň na e2. Centrum + obě jezdci, kompletní rozvoj lehkých figur.",
      },
      {
        from: [3, 0],
        to: [4, 0],
        comment: "Černý dál pěšcuje na okraji. Bílý buduje, černý se jen rozvíjí pomalu.",
      },
      {
        from: [7, 2],
        to: [6, 1],
        comment: "Bílý Khon na b2 (diagonálně) — flexibilní vývoj na bok.",
      },
      {
        from: [0, 2],
        to: [1, 1],
        comment: "Černý odpovídá zrcadlově — Khon na b7. Ale je za bílým v tempu.",
      },
      {
        from: [7, 5],
        to: [6, 6],
        comment: "Druhý Khon bílého — na g2.",
      },
      {
        from: [0, 5],
        to: [1, 6],
        comment: "Černý taky druhý Khon. Pasivní zrcadlení pokračuje.",
      },
      {
        from: [7, 4],
        to: [6, 5],
        comment: "Bílá Met na f2 — připojí se k aktivním figurám.",
      },
      {
        from: [0, 3],
        to: [1, 4],
        comment: "Černá Met na e7. Defenzivně, ale do hry se zatím nezapojí.",
      },
      {
        from: [4, 3],
        to: [3, 3],
        comment:
          "Bílý d-pěšec se posunuje na d5. Klíčový průlomový tah — připravuje výměnu, která otevře sloupec a uvolní pozici pro promoci.",
      },
      {
        from: [2, 1],
        to: [3, 1],
        comment: "Černý b-pěšec se rozhýbá — pozdě, ale lépe pozdě než vůbec.",
      },
      {
        from: [3, 3],
        to: [2, 2],
        promotes: true,
        comment:
          "PROMOCE! Bílý d-pěšec bere černého c-pěšce diagonálně a v jednom tahu dosáhne 6. řady — automatická proměna na Met (P+). Bílý získává figurovou převahu i materiál (pěšec + promoce).",
      },
      {
        from: [1, 4],
        to: [0, 3],
        comment:
          "Černá Met v zoufalství ustoupí na d8 (jiné diagonály jsou zablokované vlastními pěšáky/figurami). Žádnou hrozbu proti P+ nevytváří.",
      },
      {
        from: [2, 2],
        to: [1, 1],
        comment:
          "Povýšený Bia (P+) bere černého Khona na b7 diagonálně! Pohybuje se jako Met. Černý ztratil Khon, je o figuru pozadu, struktura je rozbitá. Lekce: pasivní hra v makruku se vždy mstí.",
      },
    ],
  },
];
