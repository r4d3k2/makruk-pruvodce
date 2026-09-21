import {
  type Board,
  type MoveDef,
  type Side,
  emptyBoard,
  initialBoard,
} from "../src/lib/makruk.js";
import {
  applyOne,
  legalMoves,
  isCheckmate,
  boardToString,
} from "./validate-games.js";

const draftGames: { title: string; setup?: any[]; moves: MoveDef[]; mateFor?: Side }[] = [
  {
    title: "Khon + Met mat z rohu",
    setup: [
      { type: "K", side: "white", row: 3, col: 4 }, // Ke5
      { type: "M", side: "white", row: 3, col: 2 }, // Mc5
      { type: "B", side: "white", row: 3, col: 3 }, // Bd5
      { type: "K", side: "black", row: 0, col: 0 }, // Ka8
    ],
    moves: [
      { from: [3, 2], to: [2, 1], comment: "Met se posune na b6 a odřezává černému králi ústup na a7." },
      { from: [0, 0], to: [0, 1], comment: "Černý král ustupuje na b8." },
      { from: [3, 3], to: [2, 2], comment: "Khon postupuje na c6 a pokračuje v omezování prostoru." },
      { from: [0, 1], to: [0, 2], comment: "Král pokračuje po zadní řadě na c8." },
      { from: [3, 4], to: [2, 3], comment: "Bílý král se přibližuje a přebírá kontrolu nad c7 a e7." },
      { from: [0, 2], to: [0, 3], comment: "Černý král se stáhne na d8." },
      { from: [2, 2], to: [1, 3], comment: "MAT! Khon na d7 dává šach dopředu na d8 a diagonálně kryje c8/e8. Bílý král drží c7/e7." },
    ],
    mateFor: "black",
  },
  {
    title: "Centrální průlom",
    moves: [
      { from: [5, 3], to: [4, 3], comment: "Bílý začíná centrálním d-pěšcem." },
      { from: [2, 3], to: [3, 3], comment: "Černý zrcadlí v centru." },
      { from: [5, 4], to: [4, 4], comment: "Oba centrální pěšci vpřed — typická makruková půda pro taktiku." },
      { from: [2, 4], to: [3, 4], comment: "Černý udržuje symetrii." },
      { from: [7, 1], to: [6, 3], comment: "Levý kůň na d2." },
      { from: [0, 1], to: [1, 3], comment: "Černý kůň na d7." },
      { from: [7, 6], to: [6, 4], comment: "Pravý kůň na e2." },
      { from: [0, 6], to: [1, 4], comment: "Černý kůň na e7." },
      { from: [7, 2], to: [6, 1], comment: "Khon b2, připraven podpořit centrum." },
      { from: [0, 2], to: [1, 1], comment: "Černý Khon b7." },
      { from: [7, 5], to: [6, 6], comment: "Druhý Khon g2." },
      { from: [0, 3], to: [1, 2], comment: "Černá Met d8-c7, připravuje se na rozvoj." },
      { from: [6, 3], to: [4, 2], comment: "Bílý kůň na c4, ovládá d6 a útočí na e5." },
      { from: [1, 4], to: [3, 5], comment: "Černý kůň na f5, hrozí skokem na d4." },
      { from: [6, 4], to: [4, 5], comment: "Druhý bílý kůň na f4, útočí na d5 a e6." },
      { from: [3, 5], to: [4, 3], comment: "Černý kůň bere pěšce na d4." },
      { from: [4, 5], to: [3, 3], comment: "Nxd5 — bílý kůň bere pěšce na d5." },
      { from: [4, 3], to: [3, 1], comment: "Černý kůň ustupuje na b5, hledá protihru na kraji." },
      { from: [3, 3], to: [5, 2], comment: "Bílý kůň se stáhne na c3, udržuje tlak na centrum." },
      { from: [3, 1], to: [1, 2], comment: "Černý kůň na c7, hledá bezpečnější pole." },
      { from: [5, 2], to: [3, 4], comment: "Nxe5 — bílý kůň bere e5 a získává materiální výhod." },
      { from: [0, 5], to: [1, 6], comment: "Černý Khon na g7, pokus o krytí krále." },
      { from: [3, 4], to: [4, 2], comment: "Kůň zpět na c4, připravuje se na b6." },
      { from: [1, 2], to: [3, 1], comment: "Černý kůň na b5, drží se na kraji." },
      { from: [4, 2], to: [2, 1], comment: "Nxb6 — bílý kůň bere b-pěšce. Bílý má pěšce navíc a aktivní pozici." },
    ],
  },
  {
    title: "Vidlička na královském křídle",
    moves: [
      { from: [5, 3], to: [4, 3], comment: "Bílý otevírá centrum d-pěšcem." },
      { from: [2, 3], to: [3, 3], comment: "Černý odpovídá symetricky." },
      { from: [5, 4], to: [4, 4], comment: "Druhý centrální pěšec — klasická makruková struktura." },
      { from: [2, 4], to: [3, 4], comment: "Černý udržuje symetrii v centru." },
      { from: [7, 1], to: [6, 3], comment: "Levý kůň na d2." },
      { from: [0, 1], to: [1, 3], comment: "Černý kůň na d7." },
      { from: [7, 6], to: [6, 4], comment: "Pravý kůň na e2." },
      { from: [0, 6], to: [1, 4], comment: "Černý kůň na e7." },
      { from: [7, 2], to: [6, 1], comment: "Khon c1-b2." },
      { from: [0, 2], to: [1, 1], comment: "Černý Khon b7." },
      { from: [7, 5], to: [6, 6], comment: "Druhý Khon f1-g2." },
      { from: [0, 5], to: [1, 6], comment: "Černý Khon g7." },
      { from: [5, 5], to: [4, 5], comment: "f-pěšec vpřed — bílý otevírá královské křídlo." },
      { from: [3, 4], to: [4, 5], comment: "Černý e-pěšec bere f4." },
      { from: [6, 4], to: [4, 5], comment: "Nxf4 — bílý kůň bere zpět." },
      { from: [1, 3], to: [3, 4], comment: "Černý kůň na e5, aktivizuje druhého jezdce." },
      { from: [4, 5], to: [2, 6], comment: "Ng6+ — bílý kůň dává vidličku na krále e8 a koně e5!" },
      { from: [0, 4], to: [0, 5], comment: "Král ustupuje na f8, jediné volné pole." },
      { from: [2, 6], to: [3, 4], comment: "Nxe5 — bílý kůň bere černého koně." },
      { from: [3, 3], to: [4, 3], comment: "Černý d-pěšec se rozhýbává, hledá protihru." },
      { from: [3, 4], to: [5, 2], comment: "Bílý kůň na c4, připravuje útok na b6." },
      { from: [4, 3], to: [5, 3], comment: "d-pěšec pokračuje vpřed." },
      { from: [5, 2], to: [2, 1], comment: "Nxb6 — bílý kůň bere b-pěšce. Černý ztratil jezdce a dva pěšce, partie je vyhraná." },
    ],
  },
  {
    title: "Khon + Khun mat",
    setup: [
      { type: "K", side: "white", row: 2, col: 2 }, // Kc6
      { type: "B", side: "white", row: 3, col: 3 }, // Bd5
      { type: "K", side: "black", row: 0, col: 0 }, // Ka8
    ],
    moves: [
      { from: [2, 2], to: [2, 1], comment: "Bílý král postupuje na b6, připravuje sevření černého krále v rohu." },
      { from: [0, 0], to: [0, 1], comment: "Černý král ustupuje na b8." },
      { from: [3, 3], to: [2, 2], comment: "Khon na c6 — kryje b7 a d7 a omezuje černého krále." },
      { from: [0, 1], to: [0, 0], comment: "Král se vrací na a8, jinam nemůže." },
      { from: [2, 2], to: [1, 1], comment: "MAT! Khon na b7 dává šach. Černý král na a8 nemá kam — a7 a b8 kryje bílý král, c8 kryje Khon." },
    ],
    mateFor: "black",
  },
  {
    title: "Dva povýšení pěšci matují",
    setup: [
      { type: "K", side: "white", row: 2, col: 1 }, // Kb6
      { type: "P+", side: "white", row: 3, col: 1 }, // P+b5
      { type: "P+", side: "white", row: 3, col: 2 }, // P+c5
      { type: "K", side: "black", row: 0, col: 0 }, // Ka8
    ],
    moves: [
      { from: [2, 1], to: [1, 2], comment: "Bílý král postupuje na c7, připravuje sevření soupeřova krále v rohu." },
      { from: [0, 0], to: [1, 0], comment: "Černý král ustupje na a7." },
      { from: [3, 1], to: [2, 0], comment: "P+ b5-a6 — první pěšec se přibližuje diagonálně." },
      { from: [1, 0], to: [0, 0], comment: "Král se vrací na a8, hledá úkryt." },
      { from: [2, 0], to: [1, 1], comment: "P+ a6-b7 — druhý krok, kryje c8 a hrozí a8." },
      { from: [0, 0], to: [1, 0], comment: "Král opět na a7, cesta zpět na a8 je zaplacena." },
      { from: [3, 2], to: [2, 1], comment: "MAT! P+ c5-b6 dává šach. Černý král na a7 nemá kam — a8 kryje P+ b7, b7 a c7 kryjí bílý král a P+." },
    ],
    mateFor: "black",
  },
];

function setupToBoard(setup: any[]): Board {
  const b = emptyBoard();
  for (const p of setup) {
    b[p.row][p.col] = { type: p.type, side: p.side };
  }
  return b;
}

let ok = true;
for (const game of draftGames) {
  console.log(`\n=== ${game.title} ===`);
  let board = game.setup ? setupToBoard(game.setup) : initialBoard();
  console.log(boardToString(board));
  let side: Side = "white";
  for (let i = 0; i < game.moves.length; i++) {
    const m = game.moves[i];
    const piece = board[m.from[0]][m.from[1]];
    if (!piece || piece.side !== side) {
      console.error(`Move ${i + 1}: wrong side or no piece`);
      ok = false;
      break;
    }
    const legal = legalMoves(board, side);
    if (!legal.some((lm) => lm.to[0] === m.to[0] && lm.to[1] === m.to[1] && lm.from[0] === m.from[0] && lm.from[1] === m.from[1])) {
      console.error(`Move ${i + 1}: ILLEGAL`);
      console.error(boardToString(board));
      ok = false;
      break;
    }
    board = applyOne(board, m);
    side = side === "white" ? "black" : "white";
  }
  if (game.mateFor) {
    if (!isCheckmate(board, game.mateFor)) {
      console.error(`NOT CHECKMATE for ${game.mateFor}`);
      console.error(boardToString(board));
      ok = false;
    } else {
      console.log("Checkmate verified.");
      console.log(boardToString(board));
    }
  }
}
process.exit(ok ? 0 : 1);
