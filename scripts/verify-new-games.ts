import {
  type Board,
  type MoveDef,
  type Side,
  emptyBoard,
  initialBoard,
  squareName,
} from "../src/lib/makruk.js";
import {
  applyOne,
  legalMoves,
  isCheckmate,
  boardToString,
} from "./validate-games.js";

function setupToBoard(setup: any[]): Board {
  const b = emptyBoard();
  for (const p of setup) {
    b[p.row][p.col] = { type: p.type, side: p.side };
  }
  return b;
}

function validate(label: string, setup: any[] | null, moves: MoveDef[], expectMateFor?: Side) {
  console.log(`\n=== ${label} ===`);
  let board = setup ? setupToBoard(setup) : initialBoard();
  console.log(boardToString(board));
  let side: Side = "white";
  let ok = true;
  for (let i = 0; i < moves.length; i++) {
    const m = moves[i];
    const piece = board[m.from[0]][m.from[1]];
    if (!piece || piece.side !== side) {
      console.error(`Move ${i + 1}: wrong side or no piece at ${squareName(m.from[0], m.from[1])}`);
      ok = false;
      break;
    }
    const legal = legalMoves(board, side);
    if (!legal.some(lm => lm.to[0] === m.to[0] && lm.to[1] === m.to[1] && lm.from[0] === m.from[0] && lm.from[1] === m.from[1])) {
      console.error(`Move ${i + 1}: ILLEGAL ${squareName(m.from[0], m.from[1])}-${squareName(m.to[0], m.to[1])}`);
      console.error(boardToString(board));
      ok = false;
      break;
    }
    board = applyOne(board, m);
    side = side === "white" ? "black" : "white";
  }
  if (ok) {
    console.log("All moves legal.");
    console.log(boardToString(board));
    if (expectMateFor) {
      if (!isCheckmate(board, expectMateFor)) {
        console.error(`NOT checkmate for ${expectMateFor}`);
        ok = false;
      } else {
        console.log(`Checkmate for ${expectMateFor} verified.`);
      }
    }
  }
  return ok;
}

const games: { label: string; setup?: any[]; moves: MoveDef[]; mate?: Side }[] = [
  {
    label: "Partie 8: Dva koně matují",
    setup: [
      { type: "K", side: "white", row: 3, col: 3 }, // Kd5
      { type: "N", side: "white", row: 3, col: 2 }, // Nc5
      { type: "N", side: "white", row: 3, col: 1 }, // Nb5
      { type: "K", side: "black", row: 0, col: 0 }, // Ka8
    ],
    moves: [
      { from: [3, 3], to: [2, 3], comment: "Bílý král postupuje na d6 a tlačí černého krále k okraji." },
      { from: [0, 0], to: [0, 1], comment: "Černý král ustupuje na b8." },
      { from: [3, 2], to: [2, 0], comment: "Kůň z c5 na a6 — přibližuje se k černému králi a kryje b8." },
      { from: [0, 1], to: [1, 1], comment: "Černý král na b7, snaží se udržet blízko centra." },
      { from: [2, 3], to: [1, 4], comment: "Bílý král na e7, připravuje finální sevření." },
      { from: [1, 1], to: [0, 2], comment: "Černý král ustupuje na c8, jediné volné pole." },
      { from: [3, 1], to: [2, 3], comment: "MAT! Kůň z b5 na d6 dává šach černému králi. Král na c8 nemá únik — b8 kryje kůň a6, d8 a e8 kryje kůň d6, c7 a e7 kryje bílý král." },
    ],
    mate: "black",
  },
  {
    label: "Partie 9: Věž a kůň matují",
    setup: [
      { type: "K", side: "white", row: 7, col: 4 }, // Ke1
      { type: "N", side: "white", row: 7, col: 6 }, // Ng1
      { type: "R", side: "white", row: 7, col: 0 }, // Ra1
      { type: "K", side: "black", row: 0, col: 7 }, // Kh8
    ],
    moves: [
      { from: [7, 0], to: [6, 0], comment: "Věž se posune na a2 a připraví se na útok po 2. řadě." },
      { from: [0, 7], to: [1, 6], comment: "Černý král se přesune na g7." },
      { from: [7, 4], to: [6, 3], comment: "Bílý král postupuje na d2." },
      { from: [1, 6], to: [2, 6], comment: "Černý král na g6." },
      { from: [6, 3], to: [5, 4], comment: "Bílý král na e3." },
      { from: [2, 6], to: [3, 7], comment: "Černý král na h5." },
      { from: [5, 4], to: [4, 5], comment: "Bílý král na f4, připravuje matovou síť." },
      { from: [3, 7], to: [4, 7], comment: "Černý král na h4." },
      { from: [6, 0], to: [6, 7], comment: "MAT! Věž z a2 na h2 šachuje po h-sloupci. Černý král na h4 nemá únik — g3 a h3 kryje bílý král, g5 kryje věž." },
    ],
    mate: "black",
  },
  {
    label: "Partie 10: Khon + Met mat z rohu",
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
    mate: "black",
  },
  {
    label: "Partie 11: Past na Met",
    setup: null,
    moves: [
      { from: [5, 3], to: [4, 3], comment: "Bílý otevírá centrum d-pěšcem." },
      { from: [2, 3], to: [3, 3], comment: "Černý odpovídá symetricky." },
      { from: [5, 4], to: [4, 4], comment: "Druhý centrální pěšec — klasická makruková struktura." },
      { from: [2, 4], to: [3, 4], comment: "Černý udržuje symetrii v centru." },
      { from: [7, 1], to: [6, 3], comment: "Levý kůň na d2 — jediný legální skok z výchozí pozice." },
      { from: [0, 1], to: [1, 3], comment: "Černý kůň na d7." },
      { from: [7, 6], to: [6, 4], comment: "Pravý kůň na e2." },
      { from: [0, 2], to: [1, 1], comment: "Černý Khon na b7, připravuje fianchetto." },
      { from: [5, 1], to: [4, 1], comment: "Bílý b-pěšec na b4 — uvolňuje b3 pro koně a otevírá queenside." },
      { from: [2, 5], to: [3, 5], comment: "Černý f-pěšec na f5, oslabuje královské křídlo." },
      { from: [6, 3], to: [5, 1], comment: "Bílý kůň na b3 — připravuje skok na c5." },
      { from: [0, 3], to: [1, 4], comment: "Černá Met se vyvine na e7." },
      { from: [7, 2], to: [6, 2], comment: "Bílý Khon na c2, podporuje centrum." },
      { from: [1, 4], to: [2, 3], comment: "Černá Met pokračuje na d6, chce se aktivizovat." },
      { from: [7, 5], to: [6, 5], comment: "Bílý Khon na f2, připravuje královské křídlo." },
      { from: [2, 3], to: [3, 2], comment: "Černá Met táhne na c5 — příliš daleko od bezpečí." },
      { from: [5, 1], to: [3, 2], comment: "Bílý kůň bere Met na c5! Černý spadl do pasti — Met byla aktivní, ale nechráněná." },
    ],
  },
  {
    label: "Partie 12: Symetrické zahájení",
    setup: null,
    moves: [
      { from: [5, 3], to: [4, 3], comment: "Bílý začíná d-pěšcem." },
      { from: [2, 3], to: [3, 3], comment: "Černý zrcadlí." },
      { from: [5, 4], to: [4, 4], comment: "Bílý e-pěšec." },
      { from: [2, 4], to: [3, 4], comment: "Černý zrcadlí." },
      { from: [7, 1], to: [6, 3], comment: "Levý kůň na d2." },
      { from: [0, 1], to: [1, 3], comment: "Černý levý kůň na d7." },
      { from: [7, 6], to: [6, 4], comment: "Pravý kůň na e2." },
      { from: [0, 6], to: [1, 4], comment: "Černý pravý kůň na e7." },
      { from: [7, 2], to: [6, 1], comment: "Khon c1-b2." },
      { from: [0, 2], to: [1, 1], comment: "Černý Khon c8-b7." },
      { from: [7, 5], to: [6, 6], comment: "Khon f1-g2." },
      { from: [0, 5], to: [1, 6], comment: "Černý Khon f8-g7." },
      { from: [5, 2], to: [4, 2], comment: "c-pěšec na c4 — bílý se pokouší rozbít symetrii na queenside." },
      { from: [2, 2], to: [3, 2], comment: "Černý odpovídá c5, udržuje symetrii." },
      { from: [4, 2], to: [3, 3], comment: "Bílý c-pěšec bere d5 a otevírá c-sloupec." },
      { from: [1, 4], to: [3, 3], comment: "Černý kůň z e7 bere zpět na d5. Materiál je vyrovnaný, ale pozice už není symetrická." },
      { from: [6, 4], to: [5, 2], comment: "Bílý kůň na c3 — napadá d5 a hrozí centrální aktivitou." },
      { from: [3, 3], to: [1, 2], comment: "Černý kůň ustupuje na c7, daleko od centra." },
      { from: [4, 3], to: [3, 4], comment: "Bílý d-pěšec bere e5! Černé centrum se rozpadá." },
    ],
  },
];

let allOk = true;
for (const g of games) {
  const ok = validate(g.label, g.setup, g.moves, g.mate);
  if (!ok) allOk = false;
}
process.exit(allOk ? 0 : 1);
