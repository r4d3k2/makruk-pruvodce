import type { PieceType } from "../lib/makruk";

export type DiagramTargetKind = "move" | "blocked" | "capture";

export interface DiagramTarget {
  row: number;
  col: number;
  kind: DiagramTargetKind;
}

export interface MoveDiagram {
  rows: number;
  cols: number;
  pieceRow: number;
  pieceCol: number;
  /** Optional caption rendered above the diagram. */
  caption?: string;
  /** Piece type used to render the central silhouette. Defaults to the parent piece. */
  pieceType?: PieceType;
  targets: DiagramTarget[];
}

export interface PieceInfo {
  type: PieceType;
  letter: string;
  csName: string;
  thaiName: string;
  thaiTransliteration?: string;
  /** 2-4 sentences explaining the movement. */
  movement: string;
  /** Approximate piece value. */
  value: string;
  diagrams: MoveDiagram[];
}

// 5×5 diagram with the piece centered at (2, 2).
const CENTER5: { rows: number; cols: number; pieceRow: number; pieceCol: number } = {
  rows: 5,
  cols: 5,
  pieceRow: 2,
  pieceCol: 2,
};

export const PIECES: PieceInfo[] = [
  {
    type: "K",
    letter: "K",
    csName: "Khun",
    thaiName: "ขุน",
    thaiTransliteration: "khun",
    movement:
      "Král. Hýbe se o jedno pole jakýmkoli směrem — vodorovně, svisle nebo diagonálně (8 směrů). V makruku neexistuje rošáda, takže Khun zůstává po celou partii blízko své základní pozice.",
    value: "neocenitelný",
    diagrams: [
      {
        ...CENTER5,
        targets: [
          { row: 1, col: 1, kind: "move" },
          { row: 1, col: 2, kind: "move" },
          { row: 1, col: 3, kind: "move" },
          { row: 2, col: 1, kind: "move" },
          { row: 2, col: 3, kind: "move" },
          { row: 3, col: 1, kind: "move" },
          { row: 3, col: 2, kind: "move" },
          { row: 3, col: 3, kind: "move" },
        ],
      },
    ],
  },

  {
    type: "M",
    letter: "M",
    csName: "Met",
    thaiName: "เม็ด",
    thaiTransliteration: "met",
    movement:
      "Met (dáma) je v makruku překvapivě slabá. Pohybuje se pouze o jedno pole diagonálně — všemi čtyřmi směry. Není to silná útočná figura, ale na klidných diagonálách udrží tlak a brání krátké linie kolem krále.",
    value: "≈ 1,5–2",
    diagrams: [
      {
        ...CENTER5,
        targets: [
          { row: 1, col: 1, kind: "move" },
          { row: 1, col: 3, kind: "move" },
          { row: 3, col: 1, kind: "move" },
          { row: 3, col: 3, kind: "move" },
        ],
      },
    ],
  },

  {
    type: "B",
    letter: "B",
    csName: "Khon",
    thaiName: "โคน",
    thaiTransliteration: "khon",
    movement:
      "Khon je biskupská figura, ale pohybuje se podobně jako stříbrný generál v japonském šógi. Skočí o jedno pole diagonálně (4 směry) nebo o jedno pole rovně dopředu — celkem 5 možných polí. Dozadu rovně nemůže, ani do stran.",
    value: "≈ 2",
    diagrams: [
      {
        ...CENTER5,
        caption: "Khon má 5 možných polí: 4 diagonály + 1 dopředu",
        targets: [
          { row: 1, col: 1, kind: "move" },
          { row: 1, col: 2, kind: "move" },
          { row: 1, col: 3, kind: "move" },
          { row: 3, col: 1, kind: "move" },
          { row: 3, col: 3, kind: "move" },
        ],
      },
    ],
  },

  {
    type: "N",
    letter: "N",
    csName: "Ma",
    thaiName: "ม้า",
    thaiTransliteration: "ma",
    movement:
      "Ma (kůň) se hýbe naprosto stejně jako šachový jezdec — písmenem L, tedy 2 pole jedním směrem a 1 pole kolmo. Ma jako jediná figura v makruku přeskakuje ostatní figury. Vzhledem k pomalému tempu hry je Ma často nejaktivnější figurou.",
    value: "≈ 3",
    diagrams: [
      {
        ...CENTER5,
        targets: [
          { row: 0, col: 1, kind: "move" },
          { row: 0, col: 3, kind: "move" },
          { row: 1, col: 0, kind: "move" },
          { row: 1, col: 4, kind: "move" },
          { row: 3, col: 0, kind: "move" },
          { row: 3, col: 4, kind: "move" },
          { row: 4, col: 1, kind: "move" },
          { row: 4, col: 3, kind: "move" },
        ],
      },
    ],
  },

  {
    type: "R",
    letter: "R",
    csName: "Rua",
    thaiName: "เรือ",
    thaiTransliteration: "rua",
    movement:
      "Rua (loď, věž) se hýbe libovolný počet polí ortogonálně — vodorovně nebo svisle, dokud nenarazí na figuru. Stejná jako šachová věž. Slovo Rua znamená v thajštině 'loď' a je to bezpochyby nejsilnější figura makruku.",
    value: "≈ 5",
    diagrams: [
      {
        ...CENTER5,
        targets: [
          { row: 0, col: 2, kind: "move" },
          { row: 1, col: 2, kind: "move" },
          { row: 3, col: 2, kind: "move" },
          { row: 4, col: 2, kind: "move" },
          { row: 2, col: 0, kind: "move" },
          { row: 2, col: 1, kind: "move" },
          { row: 2, col: 3, kind: "move" },
          { row: 2, col: 4, kind: "move" },
        ],
      },
    ],
  },

  {
    type: "P",
    letter: "P",
    csName: "Bia",
    thaiName: "เบี้ย",
    thaiTransliteration: "bia",
    movement:
      "Bia (pěšec, mušle) postupuje pouze jedno pole dopředu a bere diagonálně dopředu — stejně jako šachový pěšec, ale BEZ dvojkroku a BEZ en passant. Když Bia dosáhne 6. řady (z postupujícího pohledu), automaticky se povýší na Met.",
    value: "≈ 1 (před promocí)",
    diagrams: [
      {
        rows: 4,
        cols: 3,
        pieceRow: 2,
        pieceCol: 1,
        caption: "Bia postupuje rovně, bere diagonálně",
        targets: [
          { row: 1, col: 1, kind: "move" },
          { row: 1, col: 0, kind: "capture" },
          { row: 1, col: 2, kind: "capture" },
        ],
      },
      {
        ...CENTER5,
        caption: "Po promoci: Bia+ se hýbe jako Met (4 diagonály)",
        pieceType: "P+",
        targets: [
          { row: 1, col: 1, kind: "move" },
          { row: 1, col: 3, kind: "move" },
          { row: 3, col: 1, kind: "move" },
          { row: 3, col: 3, kind: "move" },
        ],
      },
    ],
  },
];
