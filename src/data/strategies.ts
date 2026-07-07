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
      {
        id: "c-pawn-knights",
        name: "Rozvoj přes c-pěšce",
        description:
          "Bílý otevře cestu koněm postranním c-pěšcem a pak rozvine oba koně do aktivnějších poloh než v čistě symetrické variantě.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Centrální d-pěšec jako obvykle — bez tlaku v centru se makruk neotevírá.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý kopíruje — d5 stojí proti d4.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c-pěšec vpřed. Kromě uvolnění c3 pro koně zároveň naznačuje možný postranní průlom v pozdější fázi.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment: "Černý postupuje zrcadlově — c5 brání c3 a uvolňuje vlastního koně.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Kůň na c3. Díky c4 je c3 volné — v makruku to není samozřejmost, protože startovní Bia c3 brání přímý výskok.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment: "Černý kůň stejným způsobem na c6, zrcadlově kopíruje strukturu.",
          },
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec dopředu. Bílý teď má dva centrální pěšce a aktivního levého koně — rovnováha mezi centrem a křídlem.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý udržuje symetrii e-pěšců a připravuje vlastní koně na e7.",
          },
          {
            from: [7, 6],
            to: [6, 4],
            comment:
              "Druhý kůň na e2. f3 a h3 jsou stále obsazená Bia, takže i pravý kůň musí nejprve dovnitř.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment: "Černý kůň na e7 — symetrický rozvoj pokračuje.",
          },
          {
            from: [6, 4],
            to: [4, 5],
            comment:
              "Bílý kůň z e2 vyskočí na f4. Centrální pěšci mu uvolnili cestu a najednou má kůň silné pole.",
          },
          {
            from: [1, 4],
            to: [3, 5],
            comment:
              "Černý odpovídá symetricky — kůň z e7 na f5. Oba jezdci stojí ve stejné vzdálenosti od centra.",
          },
        ],
      },
      {
        id: "e-pawn-kingside",
        name: "Královské křídlo s e-pěšcem",
        description:
          "Bílý nejprve pustí do centra e-pěšce, pak uvolní f3 pro koně a postaví kompaktní královskou formaci.",
        moves: [
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec vpřed. Bílý sází na rychlejší aktivitu na královském křídle, než by přinesl jen d-pěšec.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý zrcadlí — e5 brání případný bílý průlom.",
          },
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec dopředu. Dvojice e4/d4 tvoří klasický centrální trojúhelník a dává koním volná pole.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý udržuje symetrii — d5 blokuje d4 a připravuje se na výměny.",
          },
          {
            from: [7, 1],
            to: [6, 3],
            comment:
              "Levý kůň na d2. c3 je obsazené Bia, takže jediná cesta vede dovnitř — stejně jako ve všech startovních pozicích.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment: "Černý kůň na d7, zrcadlově.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "f-pěšec vpřed. Bílý uvolňuje f3 pro pravého koně, což je klíčový rozdíl oproti pomalejší symetrické variantě.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment: "Černý uvolňuje f6 pro vlastního koně — zrcadlová reakce.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Pravý kůň na f3. f-pěšec ustoupil, takže kůň může obsadit aktivní pole místo pasivního e2.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment: "Černý kůň na f6, symetrická odpověď.",
          },
          {
            from: [7, 5],
            to: [6, 5],
            comment:
              "Khon na f2. Bílý dokončuje pevnou královskou strukturu a chrání pole před Khunem.",
          },
          {
            from: [0, 5],
            to: [1, 5],
            comment:
              "Černý Khon na f7. Oba králové jsou nyní krytí Khony a oba koně stojí aktivněji než v základní symetrii.",
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
      {
        id: "khon-wall-central-hit",
        name: "Khon-wall s úderem v centru",
        description:
          "Bílý postaví Khon-wall a ihned vyvolá centrální výměnu, která ukáže, jak se pevná struktura promění v aktivní hru.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec vpřed — klasický začátek, který neprozradí obranné záměry.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý zrcadlí — d5 drží rovnováhu v centru.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c-pěšec. Stejný přípravný tah jako v základní Khon-wall — uvolňuje c3 pro koně a později i Khonovi diagonálu.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment: "Černý pokračuje v zrcadlení a brání c5.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Kůň na c3. Uvolněné pole umožňuje rychlý rozvoj, aniž by bílý prozradil stěnu.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment: "Černý kůň na c6 — symetrický rozvoj.",
          },
          {
            from: [7, 2],
            to: [6, 3],
            comment:
              "Khon na d2. První kámen stěny — Khon kryje krále a Met před útokem z diagonály.",
          },
          {
            from: [0, 2],
            to: [1, 3],
            comment: "Černý Khon na d7, zrcadlově buduje vlastní stěnu.",
          },
          {
            from: [7, 5],
            to: [6, 4],
            comment:
              "Khon na e2. Stěna je kompletní: d2/e2 tvoří pevný val před Khunem a Met.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý dokončuje stěnu na d7/e7. Obě strany mají pevnou pozici, takže partie potřebuje jiskru.",
          },
          {
            from: [4, 3],
            to: [3, 2],
            comment:
              "Bílý vyvolává jiskru: d-pěšec bere c-pěšce diagonálně vpřed. Centrální výměna otevírá sloupce.",
          },
          {
            from: [2, 1],
            to: [3, 2],
            comment:
              "Černý vrací b-pěšcem. Po této výměně zůstává c-sloupec otevřený — Khon-wall teď musí čelit Rua nebo Met na otevřené linii.",
          },
        ],
      },
      {
        id: "khon-wall-kingside",
        name: "Khon-wall po královském křídle",
        description:
          "Bílý postaví stěnu před královským křídlem (e2/f2) a rozvíjí koně aktivněji než v čistě pasivní variantě.",
        moves: [
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec vpřed. Bílý chce rychle získat prostor na královském křídle a připravit Khon-wall přímo před Khunem.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý zrcadlí — e5 brání postup a udržuje symetrii.",
          },
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec dopředu. Dvojice e4/d4 tvoří pevný střed, ze kterého bude Khon-wall vycházet.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý udržuje symetrii d-pěšců.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "f-pěšec vpřed. Uvolňuje f3 pro koně a zároveň připravuje Khonovi na f1 cestu na f2.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment: "Černý uvolňuje f6 pro koně a kopíruje f-pěšcový postup.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Pravý kůň na f3. f-pěšec mu ustoupil, takže místo pasivního e2 obsazuje aktivnější pole.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment: "Černý kůň na f6, symetrická odpověď.",
          },
          {
            from: [7, 5],
            to: [6, 4],
            comment:
              "Khon z f1 na e2. První kámen stěny — diagonální krok vpřed, který kryje krále i Met.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment: "Černý Khon na e7, zrcadlově.",
          },
          {
            from: [7, 2],
            to: [6, 3],
            comment:
              "Druhý Khon na d2. Bílá stěna e2/d2 kryje královské křídlo, zatímco koně na f3/f6 sledují další aktivitu.",
          },
          {
            from: [0, 2],
            to: [1, 3],
            comment:
              "Černý Khon na d7. Obě strany mají kompletní Khon-wall a připravují se na poziční boj.",
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
      {
        id: "met-g5-support",
        name: "Met na g5 s podporou g-pěšce",
        description:
          "Bílý nejprve vysune Met na f4, pak otevře g-sloupec g-pěšcem a dopraví Met až na útočné g5.",
        moves: [
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec vpřed. Uvolňuje diagonálu e1-d2-c3-b4-a5 a zároveň poskytuje centru oporu.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý zrcadlí — e5 brání postup bílého e-pěšce.",
          },
          {
            from: [7, 4],
            to: [6, 3],
            comment:
              "Met na d2. Opouští základnu a chystá se využít uvolněnou diagonálu.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý levý kůň na d7. Jediný legální skok, protože vlastní Bia zablokovala a6 i c6.",
          },
          {
            from: [6, 3],
            to: [5, 4],
            comment:
              "Met na e3. Využívá volného pole, které po e4 zůstalo, a postupuje po diagonále hlouběji.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment:
              "Černý c-pěšec vpřed. Získává prostor na dámském křídle a brání bílé Met v postupu na c3.",
          },
          {
            from: [5, 4],
            to: [4, 5],
            comment:
              "Met na f4. f-pěšec zůstává na f3, takže f4 je volné — Met obsazuje silné pole na královském křídle.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Uvolňuje f6 pro koně a brání bílé Met v postupu na h6.",
          },
          {
            from: [5, 6],
            to: [4, 6],
            comment:
              "g-pěšec vpřed. Uvolňuje g5, aby se Met mohla posunout ještě hlouběji na královské křídlo.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6. Využívá uvolněného f6 a hned se zapojuje do obrany královského křídla.",
          },
          {
            from: [4, 5],
            to: [3, 6],
            comment:
              "Met na g5! g-pěšec ji kryje a Met je nyní na samém okraji černého tábora. V makruku je takto daleko vysunutá Met riskantní, ale i velmi nepříjemná.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý Khon na e7. Zpevňuje královské křídlo a připravuje se čelit hrozbám z g5 i centra.",
          },
        ],
      },
      {
        id: "met-against-f5",
        name: "Met proti černému f5",
        description:
          "Bílý využije černého postranního výpadu f5 k vlastnímu vývoji Met a aktivnímu královskému křídlu.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec vpřed. Klasický centrální tah, který zároveň otevírá diagonálu pro Met.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý zrcadlí — d5 drží centrum.",
          },
          {
            from: [7, 4],
            to: [6, 3],
            comment:
              "Met na d2. Bílý okamžitě signalizuje úmysl využít diagonály, zatímco černý se chystá k postranní akci.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment: "Černý levý kůň na d7 — klidný rozvoj.",
          },
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec vpřed. Bílý posiluje centrum a připravuje další skok Met na e3.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Postranní výpad, který má za cíl uvolnit f6 pro koně a oslabit bílé královské křídlo.",
          },
          {
            from: [6, 3],
            to: [5, 4],
            comment:
              "Met na e3. Bílý nebrání f4 pasivně, ale pokračuje v aktivní hře uprostřed.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6, využívá uvolněné pole po f5. Je nyní připraven na skoky do centra.",
          },
          {
            from: [5, 4],
            to: [4, 5],
            comment:
              "Met na f4! Bílý využívá toho, že černý se věnoval f-sloupci, a okupuje silné pole na královském křídle.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "Černý e-pěšec dopředu, aby získal prostor a omezil bílou Met na diagonále.",
          },
          {
            from: [7, 6],
            to: [6, 4],
            comment:
              "Bílý kůň na e2. f3 je stále obsazené Bia, takže kůň jde dovnitř a připravuje se na pozdější skok.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý Khon na e7. Černý zpevňuje královské křídlo a připravuje se čelit hrozbám z f4.",
          },
        ],
      },
      {
        id: "met-h4-diagonal",
        name: "Met na dlouhé diagonále h4",
        description:
          "Bílý Met projde diagonálou e1-f2-g3-h4 a ukáže, jak slabá figura může rychle získat útočnou vzdálenost.",
        moves: [
          {
            from: [5, 6],
            to: [4, 6],
            comment:
              "g-pěšec vpřed. První krok k otevření diagonály e1-f2-g3-h4 pro Met.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý d-pěšec vpřed — rychlá odpověď v centru.",
          },
          {
            from: [7, 4],
            to: [6, 5],
            comment:
              "Met na f2. g-pěšec uvolnil f2, takže Met může opustit e1 diagonálně vpřed.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý e-pěšec vpřed, aby bránil centrum a omezil bílou Met.",
          },
          {
            from: [6, 5],
            to: [5, 6],
            comment:
              "Met na g3. Diagonála je volná, protože g-pěšec postoupil na g4. Met se blíží k hranici soupeřova tábora.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý levý kůň na d7. Zatímco bílá Met postupuje po diagonále, černý buduje koně.",
          },
          {
            from: [5, 6],
            to: [4, 7],
            comment:
              "Met na h4. Bílá Met dosáhla posledního sloupce a hrozí černému královskému křídlu z úhlu.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Omezí aktivitu bílé Met a uvolňuje f6 pro koně.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "Bílý f-pěšec vpřed. Kryje g4 a zároveň uvolňuje f3 pro pravého koně.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6. Využívá uvolněné pole a připravuje se na aktivní protihru.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Bílý kůň na f3. f-pěšec ustoupil, takže kůň může obsadit pole s výhledem na centrum i královské křídlo.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý Khon na e7. Zpevňuje královské křídlo proti hrozbám z h4 a f3.",
          },
        ],
      },
      {
        id: "met-b4-diagonal",
        name: "Met na dámském křídle b4",
        description:
          "Bílý Met využije uvolněného c3 a postoupí po dámské diagonále až na b4, kde ruší černé postavení.",
        moves: [
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c-pěšec vpřed. Uvolňuje c3, aby se Met mohla dostat na dámskou diagonálu e1-d2-c3-b4-a5.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý d-pěšec vpřed — klasická odpověď v centru.",
          },
          {
            from: [7, 4],
            to: [6, 3],
            comment:
              "Met na d2. c-pěšec uvolnil c3, takže Met může začít stoupat po diagonále.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment: "Černý levý kůň na d7.",
          },
          {
            from: [6, 3],
            to: [5, 2],
            comment:
              "Met na c3. Využívá volného pole po c4 a pokračuje po diagonále směrem k dámskému křídlu.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý e-pěšec vpřed, aby získal prostor a bránil bílé Met.",
          },
          {
            from: [5, 2],
            to: [4, 1],
            comment:
              "Met na b4. Bílá Met je nyní na dámském křídle a ohrožuje a5/c5, což nutí černého k řešení.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Zabraňuje bílé Met proniknout na c5 a připravuje vlastního koně.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "Bílý f-pěšec vpřed. Kryje g4 a uvolňuje f3 pro koně, zatímco Met tlačí na dámském křídle.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6. Využívá uvolněného f6 a připravuje se na střed.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Bílý kůň na f3. f-pěšec ustoupil, takže kůň získává aktivní pole na královském křídle.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý Khon na e7. Černý zpevňuje pozici a chystá se čelit dvojité hrozbě na obou křídlech.",
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
      {
        id: "h-file-rook",
        name: "Otevření h-sloupce",
        description:
          "Bílý otevře h-sloupec výměnou krajních pěšců a vrazí Rua až na 7. řadu, kde tíží černého krále.",
        moves: [
          {
            from: [5, 7],
            to: [4, 7],
            comment:
              "h-pěšec vpřed. Bílý začíná otevírat královský sloupec, aby se k němu dostala Rua z h1.",
          },
          {
            from: [2, 6],
            to: [3, 6],
            comment:
              "Černý g-pěšec vpřed. Nabízí výměnu, která po vyčištění otevře h-sloupec.",
          },
          {
            from: [4, 7],
            to: [3, 6],
            comment:
              "Bílý bere g-pěšce diagonálně vpřed. V makruku pěšec bere jen tímto způsobem.",
          },
          {
            from: [2, 7],
            to: [3, 6],
            comment:
              "Černý vrací h-pěšcem. Po výměně jsou oba pěšci z h-sloupce pryč a sloupec je volný.",
          },
          {
            from: [7, 7],
            to: [1, 7],
            comment:
              "Rua přímo na h7! Využívá volného h-sloupce a okamžitě proniká do černého tábora. h8 je obsazená černá Rua, takže bílá zastaví o pole dřív.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Uvolňuje f6 pro koně a snaží se získat protihru na královském křídle.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "Bílý f-pěšec vpřed. Zpevňuje královské křídlo a uvolňuje f3 pro koně.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6. Využívá uvolněného pole a připravuje se čelit Rua na h7.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Bílý kůň na f3. f-pěšec ustoupil, takže kůň může obsadit aktivní pole a podpořit Rua.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "Černý d-pěšec vpřed. Snaží se otevřít centrum a odvést pozornost od h-sloupce.",
          },
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Bílý d-pěšec vpřed. Dává centru váhu a připravuje další figury na koordinovaný tlak.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý levý kůň na d7. Černý dokončuje základní rozvoj a připravuje se bránit proti silné bílé Rua.",
          },
        ],
      },
      {
        id: "b-file-rook",
        name: "Rua přes b-sloupec",
        description:
          "Bílý nejprve vyvine koně z b1, pak převede Rua z a1 na b1 a vystřelí ji otevřeným b-sloupcem na 7. řadu.",
        moves: [
          {
            from: [5, 1],
            to: [4, 1],
            comment:
              "b-pěšec vpřed. Bílý začíná otevírat b-sloupec, který původně patří černému koni.",
          },
          {
            from: [2, 0],
            to: [3, 0],
            comment:
              "Černý a-pěšec vpřed na a5. Nabízí možnost výměny, po které zmizí pěšci z b-sloupce.",
          },
          {
            from: [4, 1],
            to: [3, 0],
            comment:
              "Bílý b-pěšec bere černého a-pěšce. Bílý pěšec se dostane na a5 a začíná se čistit cesta po b-sloupci.",
          },
          {
            from: [2, 1],
            to: [3, 0],
            comment:
              "Černý vrací b-pěšcem z b6. Po této výměně už na b-sloupci nestojí žádný pěšec a Rua může projet.",
          },
          {
            from: [7, 1],
            to: [6, 3],
            comment:
              "Kůň na d2. Bílý uvolňuje b1, aby na něj mohla přejít Rua z a1.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment: "Černý kůň na d7, symetrický rozvoj.",
          },
          {
            from: [7, 0],
            to: [7, 1],
            comment:
              "Rua na b1. c3 je obsazené Bia, takže Rua přejde po první řadě a připraví se na výstup b-sloupcem.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment: "Černý c-pěšec vpřed, aby získal prostor v centru.",
          },
          {
            from: [7, 1],
            to: [1, 1],
            comment:
              "Rua na b7! b-sloupec je otevřený a bílá věž opět proniká na 7. řadu — tentokrát z jiného úhlu.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment: "Černý pravý kůň na e7, rychlý rozvoj k obraně.",
          },
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Bílý d-pěšec vpřed. Dává centru váhu a otevírá diagonálu pro Met.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "Černý e-pěšec vpřed. Černý získává prostor v centru a připravuje se čelit aktivní bílé Rua.",
          },
        ],
      },
      {
        id: "a-file-active-knights",
        name: "Otevření a-sloupce s aktivními koni",
        description:
          "Klasické otevření a-sloupce doplněné rychlým rozvojem jezdců — bílý chce Rua na 7. řadě i aktivní koně.",
        moves: [
          {
            from: [5, 0],
            to: [4, 0],
            comment:
              "a-pěšec vpřed. Bílý začíná známý plán otevření a-sloupce.",
          },
          {
            from: [2, 1],
            to: [3, 1],
            comment: "Černý b-pěšec vpřed, nabízí výměnu.",
          },
          {
            from: [4, 0],
            to: [3, 1],
            comment:
              "Bílý bere b-pěšce. Výměna pěšců je klíčem k otevřenému sloupci.",
          },
          {
            from: [2, 0],
            to: [3, 1],
            comment:
              "Černý vrací a-pěšcem. a-sloupec je nyní volný.",
          },
          {
            from: [7, 0],
            to: [1, 0],
            comment:
              "Rua rovnou na a7. Bílý neztrácí čas mezipolíčky a okamžitě okupuje 7. řadu.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Uvolňuje f6 a připravuje rychlý rozvoj pravého koně.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "Bílý f-pěšec vpřed. Uvolňuje f3 a zpevňuje královské křídlo.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6. Využívá uvolněného pole a hrozí skokem do centra.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Bílý kůň na f3. f-pěšec ustoupil, takže kůň obsazuje aktivní pole.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "Černý d-pěšec vpřed. Získává prostor v centru a omezuje bílou Rua na a7.",
          },
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Bílý d-pěšec vpřed. Bílý má Rua na 7. řadě a aktivního koně — partie je napjatá.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý levý kůň na d7. Černý dokončuje rozvoj a připravuje protihru.",
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
      {
        id: "d-pawn-e5-promo",
        name: "Tlak po e-sloupci přes d-pěšce",
        description:
          "Bílý d-pěšec převezme černého e-pěšce a sám doběhne na e6, kde se povýší.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec vpřed. Připravuje se na vstřelení do centra a výměnu, která otevře cestu k promoci.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment: "Černý e-pěšec vpřed — aktivní postup v centru.",
          },
          {
            from: [4, 3],
            to: [3, 4],
            comment:
              "Bílý d-pěšec bere černého e-pěšce diagonálně vpřed. Pěšec se přesune na e5 a je najednou blízko 6. řady.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Uvolňuje f6 pro koně a snaží se získat protiakci, zatímco bílý tlačí na promo.",
          },
          {
            from: [3, 4],
            to: [2, 4],
            promotes: true,
            comment:
              "Promoce! Bílý pěšec z e5 postoupí na e6 a automaticky se mění na P+. V makruku není volba — promoce je vynucená na 6. řadě.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý kůň na d7. Rychlý rozvoj, aby černý mohl začít řešit nebezpečného povýšeného pěšce.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "Bílý f-pěšec vpřed. Zpevňuje královské křídlo a uvolňuje f3 pro koně.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6. Využívá uvolněného f6 a připravuje se na útok proti e6.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Bílý kůň na f3. f-pěšec ustoupil, takže kůň může bránit královské křídlo a podporovat povýšeného pěšce.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment: "Černý c-pěšec vpřed. Získává prostor a otevírá cestu pro vlastního koně.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "Bílý c-pěšec vpřed. Uvolňuje c3 pro koně a získává prostor na dámském křídle.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý Khon na e7. Zpevňuje pozici a připravuje se čelit dvojitému tlaku bílých koní a povýšeného pěšce.",
          },
        ],
      },
      {
        id: "b-pawn-promo",
        name: "Tlak po b-sloupci",
        description:
          "Bílý a-pěšec odvede černého b-pěšce, pak bílý b-pěšec proběhne až na b6 a povýší se.",
        moves: [
          {
            from: [5, 0],
            to: [4, 0],
            comment:
              "a-pěšec vpřed. Připravuje výměnu, po které bude cesta pro b-pěšce volnější.",
          },
          {
            from: [2, 1],
            to: [3, 1],
            comment: "Černý b-pěšec vpřed. Brání a5 a připravuje se na výměnu.",
          },
          {
            from: [4, 0],
            to: [3, 1],
            comment:
              "Bílý bere černého b-pěšce. a-pěšec se dostane na b5, což je přesně to, co bílý potřebuje.",
          },
          {
            from: [2, 0],
            to: [3, 0],
            comment:
              "Černý a-pěšec vpřed na a5. Zkusí zastavit bílého pěšce, ale bílý má připravený postup.",
          },
          {
            from: [3, 1],
            to: [2, 1],
            promotes: true,
            comment:
              "Promoce! Bílý pěšec z b5 postoupí na b6 a povýší se. Černý a-pěšec se sice pokusil zabránit, ale 6. řada je dosažena.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý kůň na d7. Rychlý rozvoj, aby černý mohl čelit novému povýšenému pěšci.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "Bílý c-pěšec vpřed. Uvolňuje c3 pro koně a získává prostor na dámském křídle.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment: "Černý c-pěšec vpřed. Symetrická reakce v centru.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Bílý kůň na c3. c-pěšec uvolnil c3 a kůň může obsadit aktivní pole.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Černý pravý kůň na e7. Černý rozvíjí oba koně a připravuje se na další fázi.",
          },
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Bílý d-pěšec vpřed. Dává centru váhu a otevírá diagonálu pro Met.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Uvolňuje f6 a připravuje protihru na královském křídle.",
          },
        ],
      },
      {
        id: "c-pawn-via-b",
        name: "Tlak po c-sloupci přes b-pěšce",
        description:
          "Bílý c-pěšec odvede pozornost na dámském křídle, pak se b-pěšec propracuje přes c6 až k promoci.",
        moves: [
          {
            from: [5, 0],
            to: [4, 0],
            comment:
              "a-pěšec vpřed. Otevírá možnosti na dámském křídle a nutí černého reagovat.",
          },
          {
            from: [2, 1],
            to: [3, 1],
            comment: "Černý b-pěšec vpřed. Brání a5 a připravuje se na výměnu.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c-pěšec vpřed. Bílý nabízí nový cíl — černý b-pěšec bude muset řešit hrozbu na b5.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Černý kůň na d7. Rychlý rozvoj místo okamžitého braní — černý chce zachovat flexibilitu.",
          },
          {
            from: [4, 2],
            to: [3, 1],
            comment:
              "Bílý c-pěšec bere černého b-pěšce. Bílý pěšec je nyní na b5 a hrozí c6 s promocí.",
          },
          {
            from: [2, 0],
            to: [3, 0],
            comment: "Černý a-pěšec vpřed. Snaží se omezit bílého pěšce na b-sloupci.",
          },
          {
            from: [3, 1],
            to: [2, 2],
            promotes: true,
            comment:
              "Promoce! Bílý pěšec z b5 bere černého c-pěšce na c6 a zároveň dosahuje 6. řady. V makruku je promoce vždy automatická na P+.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "Černý e-pěšec vpřed. Černý získává prostor v centru a připravuje se čelit silnému povýšenému pěšci.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Bílý kůň na c3. c-pěšec uvolnil c3 a kůň může obsadit aktivní pole.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "Černý f-pěšec vpřed. Uvolňuje f6 pro koně a snaží se rozjet protihru na královském křídle.",
          },
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Bílý d-pěšec vpřed. Centrální tlak doplňuje hrozbu povýšeného pěšce na c6.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6. Využívá uvolněného f6 a připravuje se čelit bílému tlaku na c6 i v centru.",
          },
        ],
      },
      {
        id: "f-pawn-g-promo",
        name: "Tlak po f-sloupci",
        description:
          "Bílý g-pěšec vyrazí na g5, sebere černého f-pěšce a sám se povýší na f6.",
        moves: [
          {
            from: [5, 6],
            to: [4, 6],
            comment:
              "g-pěšec vpřed. Bílý začíná ofenzívu na královském křídle, která má vést k rychlé promoci.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment: "Černý d-pěšec vpřed. Klasická odpověď v centru.",
          },
          {
            from: [4, 6],
            to: [3, 6],
            comment:
              "g-pěšec na g5. Bílý tlačí dál a připravuje sebrání f-pěšce.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment: "Černý levý kůň na d7.",
          },
          {
            from: [3, 6],
            to: [2, 5],
            promotes: true,
            comment:
              "Promoce! Bílý g-pěšec bere černého f-pěšce na f6 a dosahuje 6. řady. Povýšený pěšec je nyní silnou figurou hluboko v černém táboře.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment:
              "Černý c-pěšec vpřed. Černý získává prostor na dámském křídle a připravuje protiakci.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "Bílý f-pěšec vpřed. Uvolňuje f3 pro koně a zpevňuje královské křídlo.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Černý kůň na f6. I když f-pěšec zmizel, pole f6 je volné a černý kůň ho obsazuje.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Bílý kůň na f3. f-pěšec ustoupil, takže kůň může aktivně bránit krále a podpořit povýšeného pěšce.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "Černý e-pěšec vpřed. Získává prostor v centru a omezuje bílého koně.",
          },
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "Bílý d-pěšec vpřed. Doplňuje tlak v centru a otevírá diagonálu pro Met.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Černý Khon na e7. Zpevňuje královské křídlo a připravuje se čelit hrozbám z f6 i centra.",
          },
        ],
      },
    ],
  },
];
