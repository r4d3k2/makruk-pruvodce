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
      "Tato rozestavba je výchozí pozicí v drtivé většině zaznamenaných makruk partií. Pomalé tempo hry znamená, že agresivní výpady v zahájení jsou neefektivní — místo toho se hráči soustředí na koordinaci a strukturu pěšců.\n\nZahájení v makruku je pomalé — bez dvojkroku pěšců trvá zaplnit centrum déle než v šachu. To ale neznamená, že strany hrají totéž: zrcadlení soupeře je ve skutečné hře prohrávající strategie, protože bílý má tempo navíc a černý dřív nebo později narazí na pozici, kde už kopírovat nejde. Vladimir Kramnik, bývalý mistr světa v šachu, popsal makruk takto: 'Makruk Thai je strategičtější než mezinárodní šachy — musíte plánovat operace s naprostou opatrností, protože makruk lze přirovnat k anticipovanému koncovce mezinárodních šachů.' Právě proto se černý odklání brzy a hledá vlastní plán.",
    variants: [
      {
        id: "symmetric",
        name: "Zrcadlení — a proč nefunguje",
        description:
          "Černý kopíruje každý tah bílého. Vypadá to bezpečně, ale kopírování stojí tempo — sleduj, jak černému kolem 10. tahu dojdou dobré zrcadlové odpovědi.",
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
              "d5, zrcadlově proti d4. V prvních tazích je to obhajitelné — struktura je pevná a nic se zatím neděje. Otázka je, kdo z opakování těží.",
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
            comment:
              "Znovu kopie. Černý zatím nic nezkazil, ale ani si nevybral, co vlastně chce — jeho tahy určuje bílý.",
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
              "Kůň na d7. Tady je zrcadlení skoro vynucené: c6 i a6 drží vlastní Bia, takže černý má stejně jediný skok. Levná symetrie, která nic nestojí ani nic nepřináší.",
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
              "Kůň na e7. Čtvrtý černý tah a černý pořád jen odpovídá — bílý mezitím rozhodl, kde se bude hrát.",
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
              "Khon na c7. Tady už kopírování stojí něco skutečného: bílý dokončuje formaci s tempem navíc a černý ji dokončí vždycky o půl tahu později.",
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
              "Khon na f7 — poslední tah, který šel zkopírovat. Pozice vypadá rovná, jenže na tahu je bílý: první nesymetrický výpad (Met ven, Rua na otevřený sloupec) udělá on a černý na něj už zrcadlovou odpověď nemá. To je cena kopírování — jsi o tempo pozadu přesně v okamžiku, kdy hra začíná.",
          },
        ],
      },
      {
        id: "c-pawn-knights",
        name: "Rozvoj přes c-pěšce",
        description:
          "Bílý otevře cestu koněm postranním c-pěšcem a pak rozvine oba koně do aktivnějších poloh, zatímco černý hraje na uzavřené centrum.",
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
            comment:
              "d5. Černý taky bere centrum, ale s jiným úmyslem: chce, aby bílý d-pěšec neměl kam postoupit, a získat klid na rozvoj obou jezdců.",
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
            comment:
              "c5. Černý bere bílým figurám pole b4 i d4 a zároveň si uvolňuje c6 pro vlastního jezdce.",
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
            comment:
              "Kůň na c6. Míří na b4 a d4 — černý chce jezdce na dosah bílého centra, ne jen doma na rozvinutém poli.",
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
            comment:
              "e5. Černý zavírá centrum, aby bílí koně neměli kam skákat, a získává čas na druhého jezdce.",
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
            comment:
              "Kůň na e7. Odsud pokryje d5 i f5 — obě pole, přes která by bílý chtěl dál.",
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
              "Kůň na f5. Černý nečeká, až bílý jezdec na f4 zesílí — staví proti němu vlastního a zároveň hlídá e3 i g3, tedy pole v bílém táboře.",
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
            comment:
              "e5. Černý staví pěšce přímo proti bílému — chce centrum zatuhlé, protože v zatuhlé pozici je rychlejší rozvoj soupeře k ničemu.",
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
            comment:
              "d5. Druhá zábrana. Černý teď drží obě centrální pole a může se v klidu věnovat vlastnímu plánu na křídle.",
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
            comment:
              "Kůň na d7. Odsud míří na c5 a e5 — černý chce jezdce blízko bílého centra, aby měl co napadat.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "f-pěšec vpřed. Bílý uvolňuje f3 pro pravého koně — klíčový rozdíl oproti variantěm, kde jezdec končí pasivně na e2.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "f5. Uvolňuje f6 pro koně a hlavně útočí na bílého pěšce na e4 — černý si buduje vlastní hrozby.",
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
            comment:
              "Kůň na f6. Podpírá útok na e4 a hlídá g4 — černý přidává druhého útočníka, místo aby jen čekal.",
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
              "Khon na f7. Král je krytý a černý má hotovo: pěšec f5 i kůň f6 tlačí na e4, takže bílý musí centrum hlídat, místo aby útočil.",
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
      "Stěna z Khon je oblíbená u opatrnějších hráčů a v partiích, kde černý hraje agresivně. Khon je v makruku nejlepším obráncem krátkých diagonál a stěna využívá tento atribut maximálně.\n\nKhon-stěna je pevná, ale má cenu: stojí tempa a nic sama neútočí. Proti soupeři, který stěnu jen kopíruje, vzniká mrtvá pozice bez plánu pro obě strany. Proti soupeři, který stěnu ignoruje a hraje na křídle, se ukáže, jestli byla investice do obrany oprávněná. Varianty níže ukazují obě odpovědi.",
    variants: [
      {
        id: "central-khon-wall",
        name: "Dvě stěny — mrtvá pozice",
        description:
          "Oba hráči postaví Khon-wall. Pozice je pro obě strany naprosto bezpečná — a přesně proto v ní ani jedna strana nemá jak postoupit.",
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
            comment:
              "d5. Černý tady zrcadlí záměrně: chce stejnou pevnost jako bílý a spoléhá, že v uzavřené pozici se tempo navíc nedá zúročit.",
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
            comment:
              "c5. Stejná příprava z druhé strany. Černý ví, že kopírovat je obecně špatné — u čistě obranné formace mu to ale prochází, protože v zatuhlé pozici není co dobývat.",
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
            comment:
              "Kůň na c6. Černý ho staví přesně proti bílému jezdci — vzniká dvojice, která se navzájem hlídá a ani jeden se nedostane dopředu.",
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
            comment:
              "Khon na d7. Černý si staví vlastní stěnu, protože k proražení té bílé nemá dost figur — a útok bez dostatku útočníků je jen ztráta materiálu.",
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
              "Khon na e7 a stěna je hotová i u černého. Všimni si vedlejšího účinku: bílý kůň na g1 má jediné pole e2 obsazené vlastním Khonem, takže je úplně zablokovaný. Stejný problém má černý kůň na g8.",
          },
          {
            from: [7, 3],
            to: [7, 2],
            comment:
              "Bílému došly užitečné tahy — Khun se přesouvá na uvolněné c1. Pevnost stojí, ale nemá čím udeřit.",
          },
          {
            from: [0, 4],
            to: [0, 5],
            comment:
              "Černý Khun na f8 — také jen přešlapuje. Závěr varianty: obě strany jsou naprosto v bezpečí a ani jedna nemá jak postoupit. Pevnost sama nevyhrává; kdo chce partii rozhodnout, musí stěnu jednou opustit a vzít na sebe riziko.",
          },
        ],
      },
      {
        id: "khon-wall-central-hit",
        name: "Černý ignoruje stěnu a hraje na křídlo",
        description:
          "Bílý investuje tempa do Khon-wall, černý místo toho otevírá h-sloupec a dostává na něj Rua. Stěna je pevná — jen je na opačném konci desky.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec vpřed. Bílý si bere prostor a chystá se postavit Khony před krále.",
          },
          {
            from: [2, 7],
            to: [3, 7],
            comment:
              "h5! Černý se odklání hned druhým tahem. Nechává bílého stavět, co chce, a sám si otevírá sloupec pro Rua na h8.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c-pěšec. Standardní příprava Khon-wall — uvolňuje c3 pro koně a c1 pro Khona.",
          },
          {
            from: [3, 7],
            to: [4, 7],
            comment:
              "h4. Pěšec jde dál. Černý počítá s tím, že ho bílý bude muset brát nebo nechat projít — a v obou případech se h-sloupec otevře.",
          },
          {
            from: [7, 2],
            to: [6, 3],
            comment:
              "Khon c1 na d2. Bílý pokládá první kámen stěny a dění na křídle si nevšímá.",
          },
          {
            from: [0, 7],
            to: [3, 7],
            comment:
              "Rua na h5, přesně za vlastním pěšcem. Černý ho kryje, takže výměna na h4 mu vyhovuje: bere zpět věží a rovnou získává aktivní pole.",
          },
          {
            from: [5, 6],
            to: [4, 7],
            comment:
              "Bílý bere pěšce g3xh4. Nemá lepší volbu — nechat černého pěšce dojít na h3 by bylo horší.",
          },
          {
            from: [3, 7],
            to: [4, 7],
            comment:
              "Rua bere zpět na h4. Přesně o tohle černému šlo: věž je na čtvrté řadě, dívá se přes celou desku na bílého pěšce na d4 a bílý nemá jedinou figuru, která by ji odsud vyhnala.",
          },
          {
            from: [7, 5],
            to: [6, 4],
            comment:
              "Khon f1 na e2. Stěna d2/e2 je hotová — král i Met jsou v bezpečí. Jenže obě figury koukají jen do vlastního tábora.",
          },
          {
            from: [0, 6],
            to: [2, 7],
            comment:
              "Kůň na h6. Pole se uvolnilo po vlastním pěšci a černý ho hned využívá — jezdec míří na g4 za věží.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Bílý kůň konečně ven na c3. Rozvoj je dokončený, ale všechny bílé figury stojí v centru a na dámském křídle.",
          },
          {
            from: [2, 7],
            to: [4, 6],
            comment:
              "Kůň na g4! Černý má na bílé polovině desky věž i jezdce, bílý tam nemá nic. Závěr: bílý je pevný, ale pasivní — černý má aktivitu a určuje, kde se bude hrát. Stěna nikoho neochrání před tím, co se děje mimo její dosah.",
          },
        ],
      },
      {
        id: "khon-wall-kingside",
        name: "Černý udeří dřív, než je stěna hotová",
        description:
          "Khon-wall potřebuje několik tahů. Černý na ně nečeká a tlačí do centra, dokud je stěna teprve rozestavěná.",
        moves: [
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec vpřed. Bílý si bere prostor a plánuje stěnu na d2/e2.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "d5. Černý okamžitě napadá bílého pěšce na e4 (Bia bere diagonálně vpřed). Stěna je zatím jen záměr — tohle je moje okno.",
          },
          {
            from: [7, 2],
            to: [6, 3],
            comment:
              "Khon na d2, první kámen stěny. Bílý sází na to, že e4 je kryté dvakrát — pěšci z d3 i z f3 — a napětí vydrží.",
          },
          {
            from: [3, 3],
            to: [4, 4],
            comment:
              "d5xe4! Černý bere hned. Nečeká, až bílý stěnu dokončí a získá volné ruce — každý tah odkladu hraje pro pomalý plán.",
          },
          {
            from: [5, 3],
            to: [4, 4],
            comment:
              "Bílý musí brát zpět d3xe4. Vynucený tah — a to je tempo, které stěna nedostane.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Kůň na d7. Po výměně zůstalo bílému prázdné pole d3 a d-sloupec bez pěšce. Černý tam míří přes c5.",
          },
          {
            from: [7, 5],
            to: [6, 4],
            comment:
              "Khon na e2. Stěna d2/e2 je konečně hotová — jenže černý mezitím vyměnil v centru a je ve vývoji napřed.",
          },
          {
            from: [1, 3],
            to: [3, 2],
            comment:
              "Kůň na c5. Odsud útočí na bílého pěšce na e4 i na b3 a nikdo ho nemůže vyhnat pěšcem. Díry, které stěna nechala za sebou, jsou teď černého.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "Bílý c-pěšec na c4. Nutnost, ne volba: kůň na b1 má jen pole a3, c3 a d2 — dvě drží vlastní pěšci a d2 zabral vlastní Khon. Stěna si zablokovala vlastního jezdce.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "e5. Černý zavírá centrum a fixuje bílého pěšce na e4. Bílý ho už neposune — a co se nehýbe, to se dá napadat.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Kůň konečně na c3. Bílý má hotový rozvoj i stěnu, ale iniciativu ne.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "f5! Druhý útočník na e4 — teď je napadené dvakrát a kryté jen pěšcem z f3. Bílý musí volit mezi dokončováním svého pomalého plánu a obranou centra. Přesně to je cena pomalého plánu: okamžik si vybírá soupeř.",
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
            comment:
              "d5. Černý zavírá centrum a bere bílým figurám pole c4 i e4 — Met, která se chystá ven, tudy neprojde.",
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
              "Kůň na d7 — jediný legální skok z b8, protože a6 i c6 drží vlastní Bia. Černý ho ale nevyvíjí naslepo: z d7 pokryje c5 i e5, tedy pole, kudy vede jediná cesta bílé Met do jeho tábora.",
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
            comment:
              "e5. Černý staví hráz. Met se po diagonále dostane nanejvýš na e3, dál přes černé pěšce neprojde — a jeden krok za tah je málo na to, aby je obešla.",
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
              "Druhý kůň na e7 — opět jediný legální skok, f6 i h6 drží vlastní Bia. Černý ho posílá právě sem, protože odsud kryje f5 i g6, kam bílá Met směřuje.",
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
              "Černá Met na c7 (e7 už drží kůň). Černý za bílým výpadem nejde: nechá Met zaseknout se na f4 a sám chystá b6-b5 s hrou na dámském křídle, kde bílý nemá jedinou figuru.",
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
            comment:
              "e5. Černý bílého pěšce zablokuje. Proti vysunuté Met je zatuhlé centrum nejlepší obranou — Met potřebuje volné diagonály a ty jí černý nedá.",
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
              "Kůň na d7 — jediný legální skok, a6 i c6 drží vlastní Bia. Odsud černý hlídá c5 a e5 a chystá si c6-c5 s hrou na dámském křídle.",
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
              "c5. Černý si otevírá dámské křídlo — zatímco bílá Met putuje doprava, on chce hrát tam, kde bílý žádné figury nemá.",
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
              "f5. Uvolňuje f6 pro koně a bere Met pole g4 — černý ji chce vytlačit na okraj, kde nikomu neuškodí.",
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
              "Kůň na f6. Hlídá e4 i g4 a čeká, až se Met vysune ještě dál — pak ji chce chytit, ne před ní ustupovat.",
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
              "Khon na e7. Kryje d6 i f6 a černý má plán: tahem h6 Met z g5 vyhnat, nebo ji obklíčit figurami. Vysunutá Met je zbraň jen do chvíle, než na ni soupeř najde dost obránců.",
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
            comment:
              "d5. Černý taky bere centrum, ale s jiným cílem: chce pevný střed a hru na f-sloupci, kam bílá Met nedosáhne.",
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
            comment:
              "Kůň na d7. Černý ho staví tak, aby pokryl c5 i e5 — dvě pole, přes která musí bílá Met projít, chce-li do jeho poloviny.",
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
              "f5. Černý si zvolil vlastní plán: uvolnit f6 pro koně a rozjet hru na f-sloupci. Bílá Met může jít dopředu, on za ní nepůjde.",
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
              "Kůň na f6. Hlídá e4 i g4 a čeká na okamžik, kdy bude moct bílou Met napadnout — černý si na ni chystá figury, ne ústupová pole.",
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
              "e5! Pěšec útočí přímo na bílou Met na f4 (Bia bere diagonálně vpřed). Černý přešel do protiútoku — vysunutá Met musí ustoupit, nebo si sehnat krytí.",
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
              "Khon na e7. Kryje d6 i f6 a černý má, co chtěl: bílá Met stojí vysunutá a bez opory, zatímco jeho figury mají jasné cíle.",
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
            comment:
              "d5. Bílý si hraje na okraji, černý si bere střed — z centra se dá pomoct oběma křídlům, z okraje ani jednomu.",
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
            comment:
              "e5. Druhý centrální pěšec. Černý staví široký střed, protože ví, že Met na křídle mu do něj nepromluví.",
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
              "Kůň na d7. Černý Met nepronásleduje — místo toho dokončuje rozvoj a chystá c6-c5 s tlakem na dámském křídle, kde bílý nemá nic.",
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
              "f5. Uvolňuje f6 pro koně a rovnou útočí na bílého pěšce na g4 — právě ten drží Met celou diagonálu, po které přišla.",
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
              "Kůň na f6. Kryje vlastního pěšce na f5, hlídá g4 a černý má konkrétní cíl: odříznout Met na h4 od zbytku desky.",
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
              "Khon na e7. Černý dokončil obranu a bilance je jasná: bílá Met stojí v rohu na h4 bez podpory, černý má centrum i rozvoj. Za vzdálenost se v makruku platí.",
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
            comment:
              "d5. Bílý si otevírá diagonálu na křídle, černý si bere střed — dva různé plány už od druhého tahu.",
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
            comment:
              "Kůň na d7. Černý ho posílá k c5 a e5, aby měl čím Met napadnout, jakmile se dostane na dosah.",
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
            comment:
              "e5. Druhý centrální pěšec. Zatímco Met šplhá po okraji, černý získává prostor tam, kde se partie rozhodne.",
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
              "f5. Uvolňuje f6 pro koně a bere bílým figurám e4 i g4. Černý si zavírá své křídlo, dokud je Met na opačném konci desky.",
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
              "Kůň na f6. Odsud skáče na e4 i g4 — černý chce mít jezdce v centru dřív, než bílá Met na b4 stihne cokoli podniknout.",
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
              "Khon na e7. Černý má rozvinutá obě křídla a jasný plán: zahrát a6-a5 a Met na b4 rovnou napadnout. Slabá figura daleko od svých není hrozba, ale terč.",
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
              "b5. Černý do výměny jde dobrovolně — po ní bude a-sloupec otevřený i pro jeho Rua na a8 a on chce být ten, kdo ho obsadí první.",
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
              "Bere zpět a-pěšcem. Sloupec je otevřený pro obě strany — teď jde jen o to, kdo na něj dostane věž dřív.",
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
              "Kůň na d7 — a právě tady černý dělá chybu, kterou má varianta ukázat. Po výměně se uvolnilo pole a6, kam kůň také může a odkud by sloupec bránil. Černý volí centrálnější tah a sloupec pouští. Rozvoj bez ohledu na soupeřův plán je v makruku drahý.",
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
              "d5. Černý chce protihru v centru a doufá, že bude rychlejší než bílá věž. Je to hazard: a-sloupec zůstává otevřený a nikdo ho nebrání.",
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
              "Khon na b7 — konečně tah se záměrem. Khon dosáhne diagonálně dozadu na a8 a kryje tak vlastní Rua, takže bílá věž na a7 nemá koho brát. Černý přežil, jenže na vlastní plán mu nezbyl jediný tah.",
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
              "g5. Černý nabízí výměnu sám — chce mít otevřený sloupec pro vlastní Rua na h8 a věří, že ho stihne obsadit dřív.",
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
              "Bere zpět h-pěšcem. Sloupec je volný — jenže bílá Rua na h1 je na tahu dřív. Přesně o tohle tempo v celé variantě jde.",
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
              "f5. Věž na h7 pěšcem nevyžene, tak černý mění plán: uvolňuje f6 pro koně, který na ni dosáhne, a zároveň si bere prostor.",
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
              "Kůň na f6 — a rovnou útočí na bílou Rua na h7 (skok f6-h7 je legální L). Černý našel jedním tahem obránce i útočníka.",
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
              "d5. Věž má černý pod kontrolou, a tak přechází k vlastnímu plánu: prostor v centru, kde bílý zatím nic nepostavil.",
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
              "Kůň na d7. Černý dorovnal rozvoj a bilance je vyrovnaná: bílý má věž na 7. řadě, černý za to má centrum a jezdce, který na ni dosáhne.",
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
              "a5. Černý jde do výměny sám: b-sloupec se otevře i jemu a jeho Rua na a8 to má na b8 blíž po první řadě než bílá věž z a1.",
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
              "Bere zpět b-pěšcem. Sloupec je čistý pro obě strany — teď rozhoduje, kdo na něj dostane věž dřív.",
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
            comment:
              "Kůň na d7. A tady černý ztrácí čas: měl b-sloupec obsadit věží. Tenhle tah je rozvoj bez ohledu na to, co dělá soupeř.",
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
            comment:
              "c5. Černý si bere prostor a dostává b4 i d4 pod kontrolu — jenže na b-sloupec už nedohlédne a bílá věž se tam právě chystá.",
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
            comment:
              "Kůň na e7. Jezdce na d7 černý nechává stát — kryje ho Khon z c8 — a rozvíjí druhého. Bílá věž na b7 sice tlačí, ale nemá do čeho kousnout.",
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
              "e5. Černý zavírá centrum a jeho plán je jasný: věž na b7 je hluboko a bez podpory. Stačí ji odříznout a bude bílému spíš přítěží než zbraní.",
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
            comment:
              "b5. Černý jde do výměny vědomě — chce a-sloupec otevřený i pro vlastní Rua na a8.",
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
              "Bere zpět a-pěšcem. Sloupec je volný, jenže na tahu je bílý a jeho věž je blíž. Tempo rozhoduje.",
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
              "f5. Věž na a7 už nevyžene, tak černý otevírá druhou frontu: uvolňuje f6 pro koně a chystá hru na královském křídle.",
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
              "Kůň na f6. Míří na e4 a g4 — černý chce jezdce v bílé polovině dřív, než tam bílá věž natáhne posily.",
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
              "d5. Černý si bere centrum. Věž na a7 je nepříjemná, ale sama nic nedobude — kdo má střed, ten určuje, kde se bude hrát.",
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
              "Kůň na d7. Kryje b6 i c5 a černý má hotovo: bílý má věž na 7. řadě, černý centrum a dva aktivní jezdce. Za pronikání se platí zanedbaným rozvojem.",
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
            comment:
              "d5. Černý staví pěšce čelem proti d4 — chce centrum zaseknout, protože zablokovaný pěšec se nikdy nepovýší.",
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
              "Kůň na d7 — jediný legální skok z b8, protože c6 i a6 drží vlastní Bia. Černý ho staví na pole, odkud pokryje c5 i e5, tedy obě cesty bílého pěšce dopředu.",
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
              "e5. Černý nabízí výměnu vědomě: chce, aby bílý pěšec opustil d-sloupec a přesunul se na e-sloupec, kde na něj dosáhne jeho Met z d8. Kdo nemůže promoci zabránit, musí si připravit odpověď.",
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
              "Bere zpět. Černý ví, že bílý pěšec projde — počítá s tím, že ho hned uzavře, a mezitím má vlastního pěšce na e4, tedy v bílé polovině desky.",
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
              "Met na e7 — přesně podle plánu. Kryje d6 i f6, takže povýšený pěšec na e6 nemá kam a stává se z něj spíš zajatec než hrozba. Černý za to platí pasivní Met, ale výměnu si vynutí on, až mu to bude vyhovovat.",
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
            comment:
              "e5. Černý jde do střetu první — chce vyměnit bílého d-pěšce dřív, než ho stihne cokoli podpořit.",
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
              "f5. Promoci už černý nezastaví, tak volí druhou nejlepší věc: uvolňuje f6 pro koně, který se k povýšenému pěšci dostane nejrychleji.",
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
              "Kůň na d7. Míří na c5 a e5 — černý chce obsadit pole kolem e6 dřív, než bílý povýšeného pěšce podepře.",
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
              "Kůň na f6. Na e6 sám nedosáhne, ale drží e4 i g4 a odřezává povýšenému pěšci cestu k posilám. Černý ho chce vyhladovět, ne brát za každou cenu.",
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
            comment:
              "c5. Černý otevírá druhou frontu na dámském křídle: dokud je bílý zaměstnaný jedním pěšcem na e6, může si tady vzít prostor skoro zadarmo.",
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
              "Khon na e7 — a rovnou útočí na povýšeného pěšce na e6, protože Khon smí i o pole rovně vpřed. Černý dotáhl plán do konce: bílý povýšil, ale figuru neudrží.",
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
            comment:
              "b5. Černý rovnou útočí na bílého pěšce na a4 — chce ho vyměnit dřív, než z něj bude nebezpečný běžec.",
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
              "a5. Černý chce pěšce obejít z boku, jenže na b-sloupec odsud nedosáhne — Bia bere jen diagonálně vpřed. Tady se ukazuje, že proti průchozímu pěšci musí nastoupit figura, ne jiný pěšec.",
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
              "Kůň na d7 — a hned útočí na povýšeného pěšce na b6 (skok d7-b6 je legální L). Černý reaguje figurou, což je proti průchozímu pěšci jediný funkční recept.",
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
            comment:
              "c5. Černý uvolňuje c6 pro druhého jezdce a bere bílému koni pole b4 i d4 — chce ho udržet daleko od svého dámského křídla.",
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
              "Kůň na e7. Černý dorovnává rozvoj, protože na povýšeného pěšce jeden útočník nestačí — bílý si ho bude bránit a černý potřebuje druhou figuru.",
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
              "f5. Černý otevírá druhou frontu. Bílý má sice povýšeného pěšce, ale všechny jeho figury zůstaly na dámském křídle — královské křídlo patří černému.",
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
            comment:
              "b5. Černý útočí na bílého pěšce na a4. Nechce čekat — chce výměnu, po které bílému na křídle nic nezbude.",
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
              "Kůň na d7. Braní černý odkládá a staví jezdce tam, odkud dosáhne na b6 i c5 — na pole, přes která musí bílý pěšec projít.",
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
            comment:
              "a5. Černý chce pěšce zablokovat z boku, jenže na b5 z a5 nedosáhne — Bia bere diagonálně vpřed, ne do strany. Tenhle tah přišel o tah pozdě.",
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
              "e5. Povýšeného pěšce na c6 zatím žádná černá figura nenapadá, tak si černý bere aspoň to, co bílý zanedbal — centrum. Bílý má hodnotu navíc, černý prostor.",
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
              "f5. Druhá fronta. Bílý strávil pět tahů jedním pěšcem na dámském křídle a královské křídlo nechal být — přesně tam černý útočí.",
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
              "Kůň na f6. Míří na e4 a g4 a černý má plán hotový: bílý má silného pěšce na c6, černý za to iniciativu na druhé straně desky. Promoce není zadarmo.",
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
            comment:
              "d5. Bílý útočí na okraji, černý si bere střed — z centra dosáhnou figury na obě křídla, z okraje ani na jedno.",
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
            comment:
              "Kůň na d7. Bílý žene pěšce po křídle, černý staví figuru do centra: odsud dosáhne kamkoli, kdežto pěšec umí jen dopředu.",
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
              "c5. Bílý má na f6 povýšeného pěšce, ale jinak nic. Černý toho využívá a bere si prostor tam, kde bílý nemá jedinou figuru.",
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
              "Kůň bere povýšeného pěšce na f6! Skok g8-f6 je legální L a P+ na f6 nikdo nekryje. Přesně tohle je riziko rychlé promoce — silná figura hluboko v soupeřově táboře bez podpory dlouho nevydrží.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Bílý kůň na f3. f-pěšec ustoupil, takže se jezdec z g1 konečně dostane ven — po ztrátě povýšeného pěšce musí bílý místo útoku konsolidovat.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "e5. V pěšcích je materiál vyrovnaný, ale černý vyměnil obyčejného Bia za povýšeného — a to je zisk v hodnotě. Teď zavírá centrum a míří do koncovky.",
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
              "Khon na e7. Kryje d6 i f6, kde stojí jeho vlastní kůň. Závěr varianty: promoce je silný motiv, ale povýšený pěšec bez podpory je jen dražší terč.",
          },
        ],
      },
    ],
  },
];
