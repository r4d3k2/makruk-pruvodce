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
          "Bílý otevře cestu koním postranním c-pěšcem, ve správný okamžik vymění pěšce v centru a oba jezdce namíří proti černému pěšci d5.",
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
            from: [4, 2],
            to: [3, 3],
            comment:
              "Bílý bere c4×d5. Napětí v centru došlo do bodu, kdy se vyplatí udeřit první: pěšec d4 byl napadený dvakrát (c5, Ma c6) a krytý jen z e3, takže odklad by stál pěšce. Výměnou bílý napětí uvolní za svých podmínek.",
          },
          {
            from: [3, 2],
            to: [4, 3],
            comment:
              "Černý bere c5×d4 — mezitah. Než vezme zpět na d5, sebere pěšce d4, aby po výměnách nezůstal bílý pěšec v centru sám. Pořadí braní rozhoduje o tom, kdo bude mít jakého pěšce.",
          },
          {
            from: [5, 4],
            to: [4, 3],
            comment:
              "Bílý bere e3×d4. Teď hrozí d5×e6 s promocí — pěšec na d5 stojí na 5. řadě a bere na šestou, takže černý musí brát zpět hned.",
          },
          {
            from: [2, 4],
            to: [3, 3],
            comment:
              "Bere zpět e6×d5. Mohl i Ma×d4 a nechat bílého povýšit d5×e6 s tím, že P+ vezme koněm zpět — černý ale volí klidnější strukturu: každý má jednoho pěšce uprostřed a nic nevisí.",
          },
          {
            from: [7, 6],
            to: [6, 4],
            comment:
              "Druhý kůň na e2. f3 a h3 jsou pořád obsazená Bia, takže pravý kůň musí nejprve dovnitř — z e2 ale kryje d4 a míří na f4, odkud podruhé napadne d5.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Kůň na e7 kryje d5 — jediného centrálního pěšce černého, kterého bílý kůň z c3 už napadá. Bilance: struktura je symetrická, oba mají jednoho pěšce v centru, ale bílý má o tempo víc a jasný plán: Ma e2-f4 a Met přes f2 na e3 proti d5. Bílý stojí o něco lépe — přesně to je zisk z rozvoje přes c-pěšce.",
          },
        ],
      },
                        {
        id: "e-pawn-kingside",
        name: "Královské křídlo s e-pěšcem",
        description:
          "Bílý nejprve pustí do centra e-pěšce, pak uvolní f3 pro koně a dostane oba jezdce na aktivní pole e4 a f3.",
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
              "f-pěšec vpřed — klíčový tah plánu. Uvolňuje f3 pro pravého koně a podruhé napadá e5. Pěšci d4, e4 i f4 teď stojí v kontaktu s černými a napětí musí někdo vyřešit.",
          },
          {
            from: [3, 3],
            to: [4, 4],
            comment:
              "Černý bere d5×e4 hned. Kdyby čekal, bílý by vzal e4×d5 a pěšec e5 by zůstal napadený dvakrát; takhle výměnu řídí on a bílý kůň se sice dostane na e4, ale černý za to nemá žádnou slabinu.",
          },
          {
            from: [6, 3],
            to: [4, 4],
            comment:
              "Kůň bere zpět na e4 a rovnou stojí v centru. Za tempo, které stál f4, získal bílý aktivní figuru — přesně to je smysl uvolnění f3: pravý kůň teď má cestu ven a oba jezdci budou v centru.",
          },
          {
            from: [0, 5],
            to: [1, 4],
            comment:
              "Khon na e7. Kryje d6 i f6 — dvě pole, kam by bílý kůň z e4 mohl vniknout — a drží e5, které je pořád napadené dvakrát.",
          },
          {
            from: [7, 6],
            to: [5, 5],
            comment:
              "Pravý kůň na f3 — druhý jezdec je v centru dění a potřetí napadá e5. Pěšec e5 je teď napadený třikrát (d4, f4, Ma f3) a krytý jen dvakrát (f6, Ma d7): černý musí napětí vyřešit sám.",
          },
          {
            from: [3, 4],
            to: [4, 5],
            comment:
              "Černý bere e5×f4 dřív, než pěšec padne. Bílý vezme zpět g3×f4 a bude mít, co chtěl: koně na e4 a f3, pěšce d4 a f4 a víc prostoru. Pozice je vyrovnaná, ale bílá formace je kompaktnější — tak vypadá plán s e-pěšcem, když ho černý nechá dokončit.",
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
          "Oba hráči postaví Khon-wall za zavřeným centrem. Pozice je pro obě strany naprosto bezpečná — a přesně proto v ní ani jedna strana nemá jak postoupit.",
        moves: [
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec vpřed. Bílý si bere prostor v centru a záměrně neotevírá žádné napětí: pěšci d3 a f3 zůstávají doma, takže e4 nemá co napadat a nikdo nenapadá jeho.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "e5. Černý zrcadlí záměrně: staví pěšce čelem proti bílému, centrum se zavře a v zavřené pozici se tempo navíc nedá zúročit.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "Klíčový přípravný tah — c-pěšec uvolňuje c3 pro koně. Bez něj by kůň z b1 měl jediné pole d2, a to bílý potřebuje pro Khon.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment:
              "c5. Stejná příprava z druhé strany. Kopírovat je obecně špatné — u čistě obranné formace to ale černému prochází, protože v zatuhlém centru není co dobývat.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Kůň na c3. Útočí na d5 a b5, ale hlavně uvolnil d2 — tam míří Khon.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment:
              "Kůň na c6 — přesně proti bílému jezdci. Vzniká dvojice, která se navzájem hlídá, a ani jeden se nedostane dál.",
          },
          {
            from: [7, 2],
            to: [6, 3],
            comment:
              "První Khon na d2 (krok diagonálně vpřed). Stojí přímo před králem a začíná tvořit stěnu.",
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
              "Khon na e7 a stěna je hotová i u černého. Všimni si vedlejšího účinku: bílý kůň na g1 má jediné volné pole e2 obsazené vlastním Khonem, takže je úplně zablokovaný. Stejný problém má černý kůň na g8.",
          },
          {
            from: [7, 3],
            to: [7, 2],
            comment:
              "Bílému došly užitečné tahy — Khun se přesouvá na uvolněné c1. Pevnost stojí, ale nemá čím udeřit: jediný pěšcový kontakt by vznikl až po d4 nebo f4, a to by stěnu otevřelo.",
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
          "Bílý investuje tempa do Khon-wall, černý místo toho otevírá h-sloupec, dostane na něj Rua a chystá zdvojení věží. Stěna je pevná — jen je na opačném konci desky.",
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
              "h5! Černý se odklání hned druhým tahem. Nechává bílého stavět, co chce, a sám si jde otevřít sloupec pro Rua z h8.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c-pěšec. Standardní příprava Khon-wall — uvolňuje c3 pro koně, aby pole d2 zůstalo volné pro Khon.",
          },
          {
            from: [3, 7],
            to: [4, 7],
            comment:
              "h4. Pěšec útočí na g3 — a to v makruku není obyčejná hrozba: h4×g3 by pro černého znamenalo promoci, protože 3. řada je jeho šestá. Bílý musí reagovat hned.",
          },
          {
            from: [5, 6],
            to: [4, 7],
            comment:
              "Bílý bere g3×h4. Hrozbu h4×g3 s promocí nemůže nechat viset a stěna musí počkat — první tempo si vynutil černý.",
          },
          {
            from: [0, 7],
            to: [4, 7],
            comment:
              "Rua bere zpět na h4. Přesně o tohle černému šlo: věž stojí na čtvrté řadě, dívá se přes celou desku na pěšce d4 a bílý nemá jedinou figuru, která by ji odsud vyhnala.",
          },
          {
            from: [7, 2],
            to: [6, 3],
            comment:
              "Khon c1 na d2. Bílý se vrací ke svému plánu a pokládá první kámen stěny — dění na křídle ho zatím stálo jen jedno tempo.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Kůň na e7 — jediný legální skok z g8, f6 i h6 drží vlastní pěšci. Míří ale na f5, odkud bude napadat d4 i e3, tedy přesně to, co má stěna krýt.",
          },
          {
            from: [7, 5],
            to: [6, 4],
            comment:
              "Khon f1 na e2. Stěna d2/e2 je hotová — král i Met jsou v bezpečí. Jenže obě figury koukají jen do vlastního tábora.",
          },
          {
            from: [1, 4],
            to: [3, 5],
            comment:
              "Kůň na f5. Sedí přímo před stěnou, útočí na d4 i e3 a pěšcem ho nikdo nevyžene: g-pěšec je pryč a e-pěšec stojí na e3.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Bílý kůň konečně ven na c3. Rozvoj je dokončený, ale všechny bílé figury stojí v centru a na dámském křídle — na h-sloupci nemá bílý nic.",
          },
          {
            from: [0, 0],
            to: [1, 0],
            comment:
              "Rua a8-a7! V makruku je 7. řada od začátku prázdná, takže druhá věž se po ní přesune na h7 a černý zdvojí věže na otevřeném h-sloupci. Závěr: bílý je pevný, ale pasivní — materiál je vyrovnaný, jenže plán má jen černý. Stěna nikoho neochrání před tím, co se děje mimo její dosah.",
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
              "d5. Černý okamžitě napadá bílého pěšce na e4 (Bia bere diagonálně vpřed). Stěna je zatím jen záměr — tohle je jeho okno.",
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
              "d5×e4! Černý bere hned. Nečeká, až bílý stěnu dokončí a získá volné ruce — každý tah odkladu hraje pro pomalý plán.",
          },
          {
            from: [5, 3],
            to: [4, 4],
            comment:
              "Bílý bere zpět d3×e4. Mohl brát i f3×e4, ale d-pěšec je na e4 užitečnější: uvolňuje d3 a nechává f3 hlídat královské křídlo. Tak či tak je to tempo, které stěna nedostane.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Kůň na d7. Po výměně zůstalo bílému prázdné pole d3 a d-sloupec bez pěšce. Černý tam míří přes c5.",
          },
          {
            from: [7, 3],
            to: [6, 2],
            comment:
              "Khun na c2. Prozíravé: po odchodu d-pěšce zůstal pěšec b3 bez krytí a černý kůň míří na c5, odkud by ho napadl. Bílý ho kryje králem — a stěna zase o tempo počká.",
          },
          {
            from: [1, 3],
            to: [3, 2],
            comment:
              "Kůň na c5. Odsud útočí na e4 i b3. Vyhnat ho může jen b3-b4 — jenže to by bílému rozbilo dámské křídlo, takže si kůň pole na chvíli podrží. Díry, které stěna nechala za sebou, jsou teď černého.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "Bílý c-pěšec na c4. Nutnost, ne volba: kůň na b1 má jen pole a3, c3 a d2 — dvě drží vlastní pěšci a d2 zabral vlastní Khon. Stěna si zablokovala vlastního jezdce, c4 mu aspoň uvolní c3.",
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
              "Kůň konečně na c3. Bílý má rozvoj hotový a kryje e4 podruhé — ale stěna zůstala nedostavěná: Khon f1 pořád stojí doma, protože tempa padla na obranu b3 a e4.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "f5! Druhý útočník na e4 — pěšec je teď napadený dvakrát (Ma c5, f5) a krytý dvakrát (f3, Ma c3), takže bílý drží, ale jen tak tak. Musí volit mezi dokončením stěny a obranou centra: každé tempo navíc si teď vybírá soupeř. Pozice je napjatá — bílý má víc prostoru, černý iniciativu.",
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
        name: "Met na f4 přes pěšcovou páku",
        description:
          "Bílý vyveze Met na e3, nechá černého otevřít f-sloupec a pákou f4 vymění pěšce e5 — Met se dostane na f4, kde už ji žádný pěšec nenapadá, a odtud hrozí g5.",
        moves: [
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec vpřed. Uvolňuje diagonálu e1-d2-e3 pro Met a zároveň poskytuje centru oporu.",
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
              "Kůň na d7 — jediný legální skok, a6 i c6 drží vlastní Bia. Odsud černý hlídá c5 a e5, tedy pole, přes která by Met chtěla dál.",
          },
          {
            from: [6, 3],
            to: [5, 4],
            comment:
              "Met na e3. Využívá volného pole po e4 — a dál zatím nemůže: pole f4 hlídá černý pěšec e5.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "f5. Černý útočí na e4 a nabízí výměnu: chce otevřít f-sloupec pro věž a vyhnat bílého pěšce z centra dřív, než Met dostane oporu.",
          },
          {
            from: [4, 4],
            to: [3, 5],
            comment:
              "Bílý bere e4×f5. Výměnu přijímá s jasným cílem: černý bude brát zpět g-pěšcem a pěšec e5 zůstane bez pěšcové opory — pak přijde f4.",
          },
          {
            from: [2, 6],
            to: [3, 5],
            comment:
              "Bere zpět g6×f5 — jediná dobrá odpověď. Jakékoli otálení by dovolilo f5×g6 s promocí na 6. řadě.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "f4! Pěšcová páka: útočí na e5, které teď kryje jen kůň d7. Pěšce f4 kryjí Met e3 i pěšec g3, takže černý nemůže brát beztrestně — ale nechat e5 padnout nechce taky.",
          },
          {
            from: [3, 4],
            to: [4, 5],
            comment:
              "Černý bere e5×f4 — raději vymění, než aby pěšce ztratil. Tím ale uvolňuje pole f4 přesně pro bílou Met.",
          },
          {
            from: [5, 4],
            to: [4, 5],
            comment:
              "Met bere zpět na f4. Teď stojí na silném poli, které už žádný černý pěšec nenapadá: e-pěšec je pryč a g-pěšec stojí na f5. Bílý mohl brát i g3×f4, ale Met na f4 je celý smysl plánu.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Kůň na f6. Hlídá g4 a h5 a černý si chystá figury, kterými by Met později obklíčil. Bílý ale má, co chtěl: Met na f4 bez pěšce, který by ji vyhnal, a volné f3 pro koně. Plán zní Ma f3 a pak Met g5 s podporou koně. Bílý stojí o něco lépe — má prostor a aktivní Met, černý ještě musí dokončit rozvoj.",
          },
        ],
      },
                        {
        id: "met-against-f5",
        name: "Met proti černému f5",
        description:
          "Bílý využije černého výpadu f5: postupem e5 uzavře centrum a dostane Met na f4, kde ji už žádný černý pěšec nenapadne.",
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
              "f5. Černý si zvolil vlastní plán: uvolnit f6 pro koně a rozjet hru na f-sloupci. Pěšec e4 je teď napadený dvakrát.",
          },
          {
            from: [4, 4],
            to: [3, 4],
            comment:
              "e5! Bílý pěšec jde vpřed s tempem. Na e4 byl napadený dvakrát (d5, f5) a krytý jen z f3, takže by stejně musel něco dělat — a postup je lepší než výměna. Na e5 ho žádný pěšec nenapadá (d- i f-pěšec už černý posunul) a bere černému pole d6 a f6 pro figury.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Kůň na e7: f6 mu vzal pěšec e5, tak volí pole, odkud kryje d5 a g6, a chystá si c6-c5 s hrou na dámském křídle.",
          },
          {
            from: [6, 3],
            to: [5, 4],
            comment:
              "Met na e3. Cesta na f4 je otevřená a bezpečná: černý e-pěšec stojí na e6 a na f4 nedosáhne.",
          },
          {
            from: [0, 4],
            to: [1, 5],
            comment:
              "Khun na f7. Černý dává krále do bezpečí za pěšce f5 a kryje g6 i e6 — ví, že bílá Met míří na f4 a odtamtud na g5.",
          },
          {
            from: [5, 4],
            to: [4, 5],
            comment:
              "Met na f4! Silné pole, které černý nemá čím napadnout: jeho pěšci stojí na e6 a g6, kůň by potřeboval d5 nebo g6 a obě pole drží vlastní pěšci. Bílý mohl hrát i f3-f4 a Met nechat doma, ale celý plán stojí na aktivní Met.",
          },
          {
            from: [2, 2],
            to: [3, 2],
            comment:
              "c5. Černý hledá protihru tam, kde bílá Met není: na dámském křídle. Bilance: Met stojí na f4 pevně a bez starostí, ale sama partii nerozhodne — pozice je vyrovnaná a záleží, kdo dřív zapojí zbytek figur.",
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
            from: [3, 4],
            to: [4, 4],
            comment:
              "e4! Pěšec e5 byl napadený dvakrát (f4, Ma f3) a krytý jen koněm z d7, tak jde vpřed a sám útočí — na d3 i na koně f3. Bílý ho vezme d3×e4, černý f5×e4 a kůň bude muset uhnout. Bilance: černý má iniciativu v centru, bílá Met stojí v rohu na h4 a útoku se neúčastní. Za vzdálenost se v makruku platí.",
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
            from: [3, 4],
            to: [4, 4],
            comment:
              "e4! Pěšec e5 byl napadený dvakrát (f4, Ma f3) a krytý jen koněm z d7 — místo čekání na výměnu jde vpřed a sám napadá d3 i koně f3. Bílý ho vezme d3×e4, černý bere zpět (d5×e4 nebo f5×e4) a kůň musí uhnout. Bilance: černý má centrum i iniciativu, bílá Met na b4 je daleko od dění a a6-a5 ji brzy vyžene. Slabá figura daleko od svých není hrozba, ale terč.",
          },
        ],
      },
    ],
  },

  {
    id: "rua-on-7th",
    name: "Rua na 7. řadě",
    intro:
      "Klasický strategický motiv: dostat věž (Rua) na otevřený sloupec a odtud na 7. řadu, kde napadá soupeřovy pěšce a omezuje krále. V makruku je to zvlášť cenné, protože Rua je zdaleka nejsilnější figura — a právě proto se o každý otevřený sloupec hraje oběma věžemi.",
    history:
      "Otevřít sloupec pro Rua se v makruku dělá obvykle přes krajního pěšce — méně rizikové než výměny v centru. Háček: na krajních sloupcích stojí věže od začátku proti sobě, a kdo sloupec otevře, dává soupeři první tah. Proto se sloupec otevírá až po přípravě: buď musí být vstupní pole kryté, nebo musí soupeřova věž ze sloupce pryč. Sedmá řada je cíl střední hry; v zahájení jde o to, dostat věž na sloupec tak, aby nevisela.",
    variants: [
                        {
        id: "open-a-file",
        name: "Otevření a-sloupce — a výměna věží",
        description:
          "Bílý otevře a-sloupec výměnou krajních pěšců. Jenže obě věže stojí proti sobě: kdo sloupec otevře, dává soupeři první tah — a s dobrou přípravou skončí otevření výměnou věží, ne věží na 7. řadě.",
        moves: [
          {
            from: [5, 0],
            to: [4, 0],
            comment:
              "Krajní pěšec vpřed. Bílý plánuje výměnu, ne tlak — chce otevřený a-sloupec pro Rua.",
          },
          {
            from: [0, 2],
            to: [1, 1],
            comment:
              "Khon na b7. Černý plán čte a připravuje se dřív, než sloupec vůbec existuje: Khon dosáhne diagonálně dozadu na a8 a kryje tak vlastní věž. Bez tohoto tahu by po otevření sloupce visela.",
          },
          {
            from: [7, 2],
            to: [6, 1],
            comment:
              "Khon na b2 — totéž zrcadlově. Bílý kryje a1, aby ho otevřený sloupec nemohl stát věž, kdyby první tah na něm připadl černému.",
          },
          {
            from: [2, 1],
            to: [3, 1],
            comment:
              "b5. Černý nabízí výměnu sám. Díky Khonu b7 mu otevřený sloupec už nevadí — ví, že skončí výměnou věží, ne ztrátou.",
          },
          {
            from: [4, 0],
            to: [3, 1],
            comment:
              "Bílý bere a4×b5. Pamatuj: Bia bere jen diagonálně vpřed — to je jediný způsob, jak v makruku pěšec vezme figuru.",
          },
          {
            from: [2, 0],
            to: [3, 1],
            comment:
              "Bere zpět a6×b5 — a sloupec je otevřený celý. Kdyby Khon nestál na b7, byla by to hrubá chyba: na tahu je bílý a R×a8 by vyhrálo věž. Takhle černý ví, že přijde jen výměna.",
          },
          {
            from: [7, 0],
            to: [0, 0],
            comment:
              "R×a8. Bílý bere první, protože jinak by vzal černý R×a1 a Khon b2 by jen bral zpět. Otevřený sloupec s věžemi proti sobě znamená výměnu — ne věž na 7. řadě.",
          },
          {
            from: [1, 1],
            to: [0, 0],
            comment:
              "Khon bere zpět na a8. Věže jsou pryč a s nimi celý plán: sloupec je sice otevřený, ale nemá ho kdo obsadit.",
          },
          {
            from: [7, 1],
            to: [6, 3],
            comment:
              "Kůň na d2. Bílý se vrací k rozvoji — po odchodu a-pěšce má kůň i pole a3, ale d2 je blíž centru.",
          },
          {
            from: [0, 0],
            to: [1, 1],
            comment:
              "Khon se vrací na b7 a kryje pěšce b5. Poučení: otevřít sloupec, na kterém stojí soupeřova věž, znamená výměnu věží. Kdo chce věž na 7. řadě, musí sloupec otevřít, až když ho soupeřova věž nehlídá, nebo mít vstupní pole kryté tak, aby výměna vyšla v jeho prospěch — přesně to ukazují další varianty.",
          },
        ],
      },
                        {
        id: "h-file-rook",
        name: "Otevření h-sloupce",
        description:
          "Bílý otevře h-sloupec výměnou krajních pěšců a věž nechá na h1: odtud váže černou věž k obraně h6 a dává tempo tahu Ma h3. Pákou f4 se pak otevře i g-sloupec pro druhou věž.",
        moves: [
          {
            from: [5, 7],
            to: [4, 7],
            comment:
              "h-pěšec vpřed. Bílý začíná otevírat královský sloupec pro Rua z h1.",
          },
          {
            from: [2, 6],
            to: [3, 6],
            comment:
              "g5. Černý nabízí výměnu — chce mít sloupec otevřený i pro vlastní Rua na h8 a spoléhá, že si ho pohlídá.",
          },
          {
            from: [4, 7],
            to: [3, 6],
            comment:
              "Bílý bere h4×g5 diagonálně vpřed. V makruku pěšec bere jen tímto způsobem.",
          },
          {
            from: [2, 5],
            to: [3, 6],
            comment:
              "Bere zpět f6×g5 — a ne h6×g5! Po h×g5 by byl h-sloupec otevřený celý, na tahu bílý a R×h8 by vyhrálo věž. Pěšec h6 proto zůstává na sloupci jako zátka.",
          },
          {
            from: [7, 6],
            to: [5, 7],
            comment:
              "Kůň na h3 — pole se uvolnilo po h-pěšci. Kůň napadá g5 a jeho jediný obránce h6 nesmí brát: h6×g5 by otevřelo sloupec pro R×h8. Tak vypadá tlak věže, která se ze sloupce ještě ani nehnula.",
          },
          {
            from: [0, 5],
            to: [1, 6],
            comment:
              "Khon na g7 — jediná dobrá obrana. Khon dosáhne dozadu na h8 a kryje i h6, takže po Ma×g5 h6×g5 R×h8 by bílý věž o věž jen vyměnil a přišel o koně.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "f4! Druhý útočník na g5. Pěšec je teď napadený dvakrát (Ma h3, f4) a krytý jen z h6 — a h6 brát nesmí. Černý musí výměnu přijmout sám.",
          },
          {
            from: [3, 6],
            to: [4, 5],
            comment:
              "Černý bere g5×f4. Nechat pěšce stát by znamenalo ho ztratit; takhle ho aspoň vymění.",
          },
          {
            from: [5, 6],
            to: [4, 5],
            comment:
              "Bílý bere zpět g3×f4 — a ne e3×f4. G-pěšec pryč znamená otevřený g-sloupec, na kterém stojí černý Khon g7, a pěšec e3 dál kryje d4 i f4.",
          },
          {
            from: [0, 6],
            to: [2, 5],
            comment:
              "Kůň na f6. Černý kryje h7 i h5 a drží g4 — jeho věž na h8 je pořád vázaná k obraně h6, tak přidává druhého obránce křídla.",
          },
          {
            from: [7, 0],
            to: [6, 0],
            comment:
              "Rua a1-a2! Druhá řada je v makruku od začátku prázdná, takže věž se po ní přesune na g2 a napadne Khon g7 po otevřeném g-sloupci. Bílý zapojuje druhou věž, zatímco ta černá na a8 zatím nemá kam.",
          },
          {
            from: [0, 7],
            to: [0, 6],
            comment:
              "Rua na g8: černý kryje Khon g7 dřív, než přijde Rg2, a nechává krále u středu. Cena: opustil h-sloupec — ten teď patří jen bílé věži a h6 hlídá už jen Khon. Bílý stojí o něco lépe: má otevřený g-sloupec, poloviční h-sloupec a plán Ma h3-f2-g4 proti h6.",
          },
        ],
      },
                        {
        id: "b-file-rook",
        name: "Rua přes b-sloupec — a výhodná výměna",
        description:
          "Bílý otevře b-sloupec výměnou pěšců, převede Rua z a1 na b1, a když černý sloupec zkříží vlastní věží, věže vymění — výměna mu vyhovuje, protože černá věž byla jediným obráncem pěšce a5.",
        moves: [
          {
            from: [5, 1],
            to: [4, 1],
            comment:
              "b-pěšec vpřed. Bílý chce otevřít b-sloupec — na něm stojí jen koně, žádné věže, takže po otevření nehrozí okamžitá výměna.",
          },
          {
            from: [2, 0],
            to: [3, 0],
            comment:
              "a5. Černý jde do výměny sám: b-sloupec se otevře i jemu a jeho Rua z a8 to má na b8 jen jeden krok.",
          },
          {
            from: [4, 1],
            to: [3, 0],
            comment:
              "Bílý bere b4×a5. Pěšec se dostal na a5 a b-sloupec je z bílé strany čistý.",
          },
          {
            from: [2, 1],
            to: [3, 0],
            comment:
              "Bere zpět b6×a5. Mohl brát i věží — R×a5 by byla aktivnější — ale černý chce věž nechat na 8. řadě, aby mohla na b8. Všimni si, že pěšec a5 teď kryje jen ona.",
          },
          {
            from: [7, 1],
            to: [6, 3],
            comment:
              "Kůň na d2. Bílý uvolňuje b1 pro věž a kůň má z d2 cestu na b3 i c4.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Kůň na d7. Kryje b6 i b8 — černý ví, že bílá věž přijde na b1, a připravuje si pole, na která by mohla vniknout.",
          },
          {
            from: [7, 0],
            to: [7, 1],
            comment:
              "Rua na b1. c3 je obsazené Bia, takže věž přejde po první řadě. Vstupuje na sloupec, na kterém soupeřova věž nestojí — tak má vypadat správné pořadí: nejdřív otevřít, pak obsadit, dokud je sloupec prázdný.",
          },
          {
            from: [0, 0],
            to: [0, 1],
            comment:
              "Rua na b8. Černý sloupec zkříží vlastní věží a nabízí výměnu: b8 kryje kůň d7, takže R×b8 Ma×b8 je pro něj bezpečné. Jinak by bílá věž hrozila Rb5 s útokem na a5.",
          },
          {
            from: [7, 1],
            to: [0, 1],
            comment:
              "R×b8! Bílý výměnu přijímá — a tady je pointa: výměna věží je neutrální jen na první pohled. Černá věž byla jediným obráncem pěšce a5 a kůň, který bere zpět, se vrací na b8, tedy pryč z rozvoje.",
          },
          {
            from: [1, 3],
            to: [0, 1],
            comment:
              "Kůň bere zpět na b8. Jinak nejde — a kůň stojí zase tam, kde začínal.",
          },
          {
            from: [6, 3],
            to: [4, 2],
            comment:
              "Kůň na c4 — s tempem: útočí na a5, které už nikdo nekryje. Za výměnu věží bílý získal čas i cíl.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "d5! Černý pěšce a5 neudrží — kdyby ho bránil postupem a5-a4, kůň by místo něj vzal d6. Raději napadá koně pěšcem d5 a spoléhá na protihru: věž z h8 půjde po prázdné 7. řadě (h7-a7) za bílým koněm. Bilance: bílý vezme Ma×a5 a bude o pěšce napřed, černý za něj dostane aktivitu — bílý stojí o něco lépe. Tak vypadá výměna věží, která se vyplatila.",
          },
        ],
      },
                        {
        id: "a-file-active-knights",
        name: "Otevření a-sloupce s aktivními koni",
        description:
          "Bílý otevře a-sloupec a druhou pákou c4 i b-sloupec; koně dostanou centrální pole a věž na a1 váže černou věž k obraně pěšce a6.",
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
              "Bílý bere a4×b5. Výměna pěšců je klíčem k otevřenému sloupci.",
          },
          {
            from: [2, 2],
            to: [3, 1],
            comment:
              "Bere zpět c6×b5 — správně. Po a6×b5 by sloupec byl otevřený celý, na tahu bílý a R×a8 by vyhrálo věž. Pěšec a6 tak zůstává na sloupci a černá věž ho musí krýt.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c4! Druhá páka. Pěšec b5 je napadený a jeho obránce a6 brát nesmí — kdyby vzal, přijde R×a8. Černý musí brát sám, jinak bílý vezme c4×b5 a pěšec bude ztracený.",
          },
          {
            from: [3, 1],
            to: [4, 2],
            comment:
              "Černý bere b5×c4. Jediná rozumná odpověď — pěšce jinak neudrží.",
          },
          {
            from: [5, 1],
            to: [4, 2],
            comment:
              "Bílý bere zpět b3×c4 (ne d3×c4: d-pěšec má zůstat v centru). Otevřel se i b-sloupec a kůň b1 má konečně volné c3.",
          },
          {
            from: [0, 1],
            to: [2, 2],
            comment:
              "Kůň na c6. Pole se uvolnilo po c-pěšci; kůň odsud hlídá b4 i d4 a kryje a7 — černý čeká bílou věž na a-sloupci a připravuje obranu.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Kůň na c3 — díky c4 poprvé bez oklik. Aktivní kůň v centru, s výhledem na b5 a d5.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Kůň na e7. Černý dokončuje rozvoj a drží d5 — ví, že bílý kůň z c3 tam míří.",
          },
          {
            from: [5, 5],
            to: [4, 5],
            comment:
              "f4. Uvolňuje f3 pro druhého koně: bílý chce oba jezdce v centru, než věž udeří. Rua a1 mezitím drží černou věž na a8 — pěšec a6 jiného obránce nemá.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "d5. Černý napadá c4 a hledá protihru v centru. Bilance: bílý má aktivního koně c3 a druhého na cestě na f3, otevřený b-sloupec pro věž a černou věž vázanou k a6 — stojí o něco lépe. Na 7. řadu zatím nikdo nevnikl: to je práce pro střední hru, ale příprava je hotová.",
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
              "Příprava: d-pěšec vpřed. Bude potřeba udeřit, až se černý vydá s e-pěšcem.",
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
              "e5. Černý nabízí výměnu vědomě: chce, aby bílý pěšec opustil d-sloupec a přesunul se na e-sloupec, kde na něj dosáhnou jeho figury. Kdo nemůže promoci zabránit, musí si připravit odpověď.",
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
              "Bere zpět. Černý ví, že bílý pěšec projde — počítá s tím, že ho hned napadne, a mezitím má vlastního pěšce na e4, tedy v bílé polovině desky.",
          },
          {
            from: [3, 4],
            to: [2, 4],
            promotes: true,
            comment:
              "Promoce! Bílý pěšec dosáhne 6. řady (z bílého pohledu) a automaticky se mění na P+ — figuru s pohybem Met. Toto je vrchol celého plánu.",
          },
          {
            from: [1, 3],
            to: [3, 2],
            comment:
              "Kůň na c5 — uhýbá z dosahu P+ (ten bere diagonálně všemi směry, takže na d7 by ho vzal) a zároveň P+ na e6 sám napadá. Bílý ho nemá čím krýt, takže výměna je nevyhnutelná: bílý vezme f3×e4 a kůň pak P+ na e6 sebere. Bilance: materiál vyrovnaný — promoce sama nic nevyhrála, rozhodne, kdo lépe využije otevřený střed.",
          },
        ],
      },
                        {
        id: "d-pawn-e5-promo",
        name: "Volný d-pěšec a hrozba promoce na d6",
        description:
          "Bílý po výměně na c4 dostane d-pěšce na d5, kde je volný: hrozí d5-d6 s promocí a černý musí pole d6 zablokovat figurou.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec vpřed. Bílý chce mít v centru pěšce, který jednou půjde dál — příprava promoce začíná výběrem kandidáta.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "d5. Černý staví pěšce čelem proti d4 — zablokovaný pěšec se nikdy nepovýší.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c4! Páka proti d5. Bílý nechce d-pěšce měnit, chce odstranit pěšce, který ho blokuje.",
          },
          {
            from: [3, 3],
            to: [4, 2],
            comment:
              "Černý bere d5×c4 — vyměňuje blokujícího pěšce dřív, než ho bílý podepře koněm z c3.",
          },
          {
            from: [5, 1],
            to: [4, 2],
            comment:
              "Bílý bere zpět b3×c4. Pěšec d4 už nemá soupeře — před ním je volno až na d6, kde by se povýšil.",
          },
          {
            from: [2, 4],
            to: [3, 4],
            comment:
              "e5. Černý útočí na d4: buď ho vymění, nebo ho donutí k postupu dřív, než bude mít oporu.",
          },
          {
            from: [4, 3],
            to: [3, 3],
            comment:
              "d5! Bílý pěšce posílá vpřed, dokud má krytí z c4. Na d5 napadá c6 a hlavně je jen jeden krok od 6. řady.",
          },
          {
            from: [2, 2],
            to: [3, 3],
            comment:
              "Černý bere c6×d5 — jinak by přišlo d5-d6 s promocí, protože pole d6 zatím nikdo nekryje.",
          },
          {
            from: [4, 2],
            to: [3, 3],
            comment:
              "Bílý bere zpět c4×d5 a pěšec stojí na d5 znovu — tentokrát jako volný: na d-sloupci ani na sousedních sloupcích před ním žádný černý pěšec není. Hrozí d5-d6 s promocí.",
          },
          {
            from: [0, 3],
            to: [1, 2],
            comment:
              "Met na c7! Kryje d6, takže po d5-d6 by P+ hned padl. Slabá Met je ideální blokátor — nic lepšího na tuhle práci černý nemá.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Kůň na c3. Kryje pěšce d5 a bílý má volného pěšce pevně podepřeného — zatím ho ale nemá jak protlačit přes d6.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Kůň na d7 — kryje e5 a připravuje Khon f8-e7-d6, aby volného pěšce zablokoval natrvalo. Bilance: bílý má volného pěšce, černý pevnou blokádu a o něco lepší figury — promoce zůstává hrozbou, ne ziskem.",
          },
        ],
      },
                        {
        id: "b-pawn-promo",
        name: "Průlom b5 s podporou a- a c-pěšce",
        description:
          "Bílý připraví postup b-pěšce oběma sousedy a Khonem na b2, který kryje a1. Průlom b5 vyjde, jenže pole b6 si černý včas pohlídal — promoce zůstane hrozbou.",
        moves: [
          {
            from: [5, 1],
            to: [4, 1],
            comment:
              "b-pěšec vpřed. Bílý vybral kandidáta na promoci: pole b6 je ze všech polí 6. řady nejméně kryté — na začátku ho nehlídá žádná černá figura.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Kůň na d7. Černý to ví a b6 hned kryje: z d7 dosáhne kůň na b6 i b8.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c4. Pěšec b4 potřebuje sousedy: na b5 ho budou napadat a6 i c6, takže bílý chce mít krytí z obou stran.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Kůň na e7 — jediný legální skok, f6 i h6 drží vlastní Bia. Černý dokončuje rozvoj a čeká, co bílý s pěšci provede.",
          },
          {
            from: [5, 0],
            to: [4, 0],
            comment:
              "a4. Druhý soused. Teď je b5 kryté dvakrát a bílý by mohl prorazit — ještě ale ne: po výměnách by a-pěšec bral na b5 a otevřel a-sloupec s černou věží na tahu.",
          },
          {
            from: [0, 4],
            to: [1, 5],
            comment:
              "Khun na f7. Černý dává krále do bezpečí a nechává bílého, ať si pěšce připraví — jeho obrana b6 je hotová.",
          },
          {
            from: [7, 2],
            to: [6, 1],
            comment:
              "Khon na b2 — nenápadný, ale nutný tah. Kryje a1: až se po výměnách otevře a-sloupec, R×a1 nebude vyhrávat věž, ale jen měnit. Bez toho by celý průlom stál bílého věž.",
          },
          {
            from: [0, 2],
            to: [1, 2],
            comment:
              "Khon na c7. Druhý hlídač b6 — a zároveň kryje c6, na které bude bílý pěšec z b5 útočit.",
          },
          {
            from: [4, 1],
            to: [3, 1],
            comment:
              "b5! Průlom. Pěšec je napadený dvakrát (a6, c6) a krytý dvakrát (a4, c4); černý ho musí brát, jinak b5×a6 nebo b5×c6 — obojí s promocí.",
          },
          {
            from: [2, 0],
            to: [3, 1],
            comment:
              "Černý bere a6×b5: otevírá a-sloupec, na kterém má věž on, a ví, že po a4×b5 přijde R×a1 s výměnou věží.",
          },
          {
            from: [4, 2],
            to: [3, 1],
            comment:
              "Bílý bere zpět c4×b5 — ne a4×b5, to by otevřelo a-sloupec s černou věží na tahu a bílý věž zatím měnit nechce. Pěšec stojí na b5 znovu a napadá c6.",
          },
          {
            from: [2, 2],
            to: [3, 1],
            comment:
              "Černý bere c6×b5 — poslední výměna. Bilance: bílý teď vezme a4×b5, černý R×a1 a Khon b2 bere zpět: věže se vymění a bílý pěšec na b5 bude volný. Jenže b6 hlídají Ma d7 i Khon c7, takže promoce nehrozí. Černý stojí o něco lépe — bílý za průlom zaplatil tempy a nic hmatatelného nezískal. Poučení: samotný postup nestačí, promoce potřebuje, aby soupeř pole na 6. řadě nestihl pokrýt.",
          },
        ],
      },
                        {
        id: "c-pawn-via-b",
        name: "c-pěšec přes b5 na a6",
        description:
          "Dva bílí pěšci proti jednomu: po výměnách na b5 zůstane bílý pěšec, který černý a-pěšec nesmí vzít (otevřel by a-sloupec pro R×a8), a promoce b5×a6 vynutí výměnu věží — bílý skončí o pěšce napřed.",
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
              "b5. Černý útočí na bílého pěšce na a4 — chce výměnu, po které bílému na křídle nic nezbude.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c4! Druhý pěšec proti b5. Pěšec b5 je teď napadený dvakrát a krytý dvakrát (a6, c6) — jenže jeden z obránců, a6, brát nesmí: a6×b5 by otevřelo a-sloupec s bílou věží na tahu.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Kůň na d7. Černý braní odkládá a staví jezdce tam, odkud dosáhne na b6 i c5 — na pole, přes která by bílý pěšec musel jít.",
          },
          {
            from: [4, 0],
            to: [3, 1],
            comment:
              "Bílý bere a4×b5. Začíná série výměn, kterou si bílý spočítal: poslední pěšec na b5 bude jeho.",
          },
          {
            from: [2, 2],
            to: [3, 1],
            comment:
              "Bere zpět c6×b5 — správně c-pěšcem. Po a6×b5 by přišlo R×a8 a černý by přišel o věž.",
          },
          {
            from: [4, 2],
            to: [3, 1],
            comment:
              "Bílý bere c4×b5 a pěšec zůstává na b5. Černý a-pěšec ho vzít nesmí (R×a8), takže bílý pěšec napadá a6 a hrozí b5×a6 s promocí.",
          },
          {
            from: [0, 2],
            to: [1, 1],
            comment:
              "Khon na b7 — jediná dobrá obrana. Khon kryje a8 i a6: kdyby teď bílý vzal b5×a6 s promocí, černá věž vezme zpět a bude krytá.",
          },
          {
            from: [3, 1],
            to: [2, 0],
            promotes: true,
            comment:
              "b5×a6 — promoce! Pěšec bere na 6. řadě a automaticky se mění na P+. Bílý ví, že P+ hned padne; jde mu o to, co zbude.",
          },
          {
            from: [0, 0],
            to: [2, 0],
            comment:
              "Rua bere P+ na a6. Černý nemá na výběr — P+ by z a6 napadal b7 i b5 a hlavně by byl figurou navíc.",
          },
          {
            from: [7, 0],
            to: [2, 0],
            comment:
              "R×a6! Bílá věž bere černou. Pole a6 sice kryje Khon b7, ale bílý za věž dostane věž — a kdyby nevzal, vzal by černý R×a1, protože a1 nikdo nekryje.",
          },
          {
            from: [1, 1],
            to: [2, 0],
            comment:
              "Khon bere zpět na a6. Spočítej pěšce: bílý přišel o a- a c-pěšce, černý o a-, b- i c-pěšce — bílý je o pěšce napřed a má otevřený a-sloupec, na který se mu po prázdné druhé řadě dostane věž z h1 (Rh1-h2-a2). Promoce sama padla, ale výměny, které vynutila, přinesly zisk.",
          },
        ],
      },
                        {
        id: "f-pawn-g-promo",
        name: "h-pěšec s podporou g4 a promoce na g6",
        description:
          "Bílý postoupí h-pěšcem na h5 s krytím z g4. Pole g6 na začátku žádná černá figura nekryje, takže černý musí buď brát, nebo g6 pokrýt Khonem — a pak přijde h5×g6 s promocí.",
        moves: [
          {
            from: [5, 7],
            to: [4, 7],
            comment:
              "h-pěšec vpřed. Bílý vybral krajního pěšce: pole g6 je na začátku bez krytí — Rua h8 hlídá jen h6 a Ma g8 jen f6 — takže pěšec na h5 bude mít cíl.",
          },
          {
            from: [2, 3],
            to: [3, 3],
            comment:
              "d5. Bílý útočí na okraji, černý si bere střed — z centra dosáhnou figury na obě křídla, z okraje ani na jedno.",
          },
          {
            from: [5, 6],
            to: [4, 6],
            comment:
              "g4. Pěšec h4 potřebuje před dalším krokem krytí: na h5 ho bude napadat g6.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Kůň na d7. Bílý žene pěšce po křídle, černý staví figuru do centra: odsud dosáhne kamkoli, kdežto pěšec umí jen dopředu.",
          },
          {
            from: [4, 7],
            to: [3, 7],
            comment:
              "h5! Pěšec napadá g6 a hrozí h5×g6 s promocí. Braní g6×h5 bílý přežije — vezme zpět g4×h5 nebo věží z h1. Černý má víc rovnocenných odpovědí; podstatné je, že hrozbu nesmí ignorovat.",
          },
          {
            from: [0, 5],
            to: [1, 5],
            comment:
              "Khon na f7 kryje g6. Černý nechce brát g6×h5 — otevřel by bílé věži h-sloupec — a raději nechá pěšce povýšit s tím, že P+ hned sebere.",
          },
          {
            from: [3, 7],
            to: [2, 6],
            promotes: true,
            comment:
              "h5×g6 — promoce! Pěšec bere na 6. řadě a mění se na P+. Na g6 vydrží jen okamžik, ale bílý vyměnil krajního pěšce za g-pěšce a otevřel h-sloupec pro Rua z h1.",
          },
          {
            from: [1, 5],
            to: [2, 6],
            comment:
              "Khon bere P+ na g6 — jediný tah: P+ by jinak vzal Khon f7, protože se hýbe jako Met.",
          },
          {
            from: [7, 1],
            to: [6, 3],
            comment:
              "Kůň na d2. Bílý dokončuje rozvoj — h-sloupec je poloviční (na h6 stojí černý pěšec krytý věží z h8), takže věž z h1 má cíl, ale zatím nic hmatatelného.",
          },
          {
            from: [2, 7],
            to: [3, 7],
            comment:
              "h5. Černý pěšce posílá vpřed, aby napadl g4 a uvolnil věži h8 sloupec. Pěšec h5 kryje Khon g6.",
          },
          {
            from: [7, 6],
            to: [6, 4],
            comment:
              "Kůň na e2. Bílý zapojuje druhého jezdce — míří přes g3 nebo f4 na křídlo, kde je teď po výměnách nejvíc práce.",
          },
          {
            from: [0, 4],
            to: [1, 5],
            comment:
              "Khun na f7. Král kryje g6 i e6 a černý má vše pokryté. Bilance: materiál je vyrovnaný, promoce proběhla a hned zmizela — bílý za ni má poloviční h-sloupec a lepší strukturu na křídle. Poučení: promoce v zahájení bývá výměna, ne zisk; cenné je, co po ní zůstane.",
          },
        ],
      },
    ],
  },

  {
    id: "black-initiative",
    name: "Černý útočí první",
    intro:
      "Tempo navíc váží v makruku míň než v šachu: bez dvojkroku trvá rozvoj oběma stranám tak dlouho, že jeden půltah nic nerozhodne. Jakmile bílý hraje jen klidné rozvojové tahy a o nic se nepokusí, může plán převzít černý — a bílý pak celou partii jen odpovídá. V téhle strategii má plán černý.",
    history:
      "Že to jde, naznačuje Partie 7 v aplikaci: rekonstrukce inspirovaná plánem z Kramnikovy makrukové partie, kde černý postaví Khona do fianchetta a hru si otevře po g-sloupci. Není to přepis jeho tahů, jen motiv — černý nehledá vyrovnání, hledá vlastní plán. Obě varianty níže jsou takový pokus: první ukazuje, jak se iniciativa bere, druhá, jak se promarní.",
    variants: [
      {
        id: "early-f5",
        name: "Rychlé f5",
        description:
          "Černý zahraje f5 hned druhým tahem, vyklidí f8 pro věž a výměnou na e4 otevře f-sloupec. Bílé věže stojí na a1 a h1, takže na otevřený sloupec je černý první — a bílému koni z g1 zmizí pole f3.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec vpřed. Bílý si bere střed a spoléhá na tempo navíc — v makruku je to ale malá jistina, protože každý plán tu stojí o dva tahy víc než v šachu.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "f5 hned druhým tahem. Černý nečeká, co bílý vymyslí: bere si prostor na královském křídle a chystá výměnu na e4, po které se otevře f-sloupec. Sloupec si vybral schválně — bílé věže stojí na a1 a h1 a f1 drží vlastní Khon.",
          },
          {
            from: [5, 2],
            to: [4, 2],
            comment:
              "c4 uvolňuje c3 pro koně. Přirozený rozvoj, jen pomalý: bílý řeší dámské křídlo, zatímco černý už pracuje na tom svém.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Kůň na e7, ne na f6. Rozdíl je zásadní: z f6 by kůň zavřel vlastní věži sloupec, který teprve chce otevřít. Z e7 hlídá d5, f5 i g6 a f-sloupec zůstává volný.",
          },
          {
            from: [7, 1],
            to: [5, 2],
            comment:
              "Kůň na c3 — díky c4 bez oklik. Aktivní pole, jenže na opačné straně desky: kdyby šel na d2, kryl by odtud f3. Takhle zůstane f3 bez obránce a to se za chvíli bude počítat.",
          },
          {
            from: [0, 5],
            to: [1, 6],
            comment:
              "Khon z f8 na g7. Poslední figura, která černému blokovala f-sloupec, je pryč; z g7 navíc kryje f6 i h6, takže na křídle nic nevisí. Sloupec je připravený dřív, než vůbec existuje.",
          },
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec do centra. Pěšce na e4 kryje f3 a napadá ho jen f5, takže napětí bílému nevadí. Přehlíží ale, co výměna udělá se sloupcem za jeho zády.",
          },
          {
            from: [3, 5],
            to: [4, 4],
            comment:
              "f5×e4 — o tohle šlo celou dobu. Postup f5-f4 by vypadal ostřeji, jenže pole f4 kryje pěšec z g3 a po výměně na něm i kůň, jakmile z g1 skočí na e2, takže by tam pěšec jen padl. Černý proto napětí řeší výměnou, a v pravý okamžik: až bílý vezme zpět pěšcem, bude f-sloupec otevřený celý a věž z h8 má na f8 dva kroky.",
          },
          {
            from: [5, 5],
            to: [4, 4],
            comment:
              "Bílý bere zpět f3×e4. Brát koněm z c3 by sice nechalo pěšce f3 stát a sloupec zavřený, jenže kůň na e4 by hned dostal d6-d5 a musel by uhnout. Bílý volí pevný střed a s otevřeným sloupcem počítá.",
          },
          {
            from: [0, 7],
            to: [0, 5],
            comment:
              "Rua na f8 — a rovnou s hrozbou R×f1. Khon na f1 nekryje nikdo: věž h1 ho nevidí přes vlastního koně na g1, Met z e1 dosáhne jen na d2 a f2. Tak vypadá otevřený sloupec, na kterém soupeř věž nemá.",
          },
          {
            from: [7, 4],
            to: [6, 5],
            comment:
              "Met e1-f2. Nejklidnější způsob, jak hrozbu odstavit: Met sloupec zacpe a sama je krytá Khonem z f1, takže R×f2 by byla věž za Met. Cena je ale jasná — bílý místo rozvoje uklízí.",
          },
          {
            from: [0, 1],
            to: [1, 3],
            comment:
              "Kůň na d7 dokončuje rozvoj. Bilance po 12 tazích: materiál je rovný, ale jedinou věž na otevřeném sloupci má černý — a bílý kůň z g1 nemá kam. Na f3 by ho vzala věž (f3 nekryje žádná bílá figura) a h3 drží vlastní pěšec, takže mu zbývá jediné pole e2. Iniciativu má černý, i když začínal bílý.",
          },
        ],
      },
      {
        id: "met-sortie-black",
        name: "Met vyráží",
        description:
          "Černá Met vyjede po diagonále d8-e7-f6-g5. Vypadá to aktivně, jenže z g5 nic nenapadá a bílý ji jedním pěšcem pošle zpátky. Varování, ne vzor.",
        moves: [
          {
            from: [5, 3],
            to: [4, 3],
            comment:
              "d-pěšec vpřed. Bílý si bere střed a rozvíjí se normálním tempem — žádný pokus o rychlý zisk, jen figury ven.",
          },
          {
            from: [0, 3],
            to: [1, 4],
            comment:
              "Met hned ven na e7. V makruku je 7. řada od začátku prázdná, takže Met nepotřebuje žádnou přípravu — a černý chce ukázat, že iniciativu může vzít i on.",
          },
          {
            from: [7, 1],
            to: [6, 3],
            comment:
              "Kůň na d2 — z b1 jediný legální skok, a3 i c3 drží vlastní Bia. Bílý Met zatím neřeší: dokud stojí na e7, nic nenapadá.",
          },
          {
            from: [2, 5],
            to: [3, 5],
            comment:
              "f5 otevírá Met cestu na f6 a rovnou bere prostor na křídle. Záměr je konkrétní: dostat Met na g5, odkud bude koukat na f4 i h4.",
          },
          {
            from: [5, 4],
            to: [4, 4],
            comment:
              "e-pěšec do centra. Pěšce kryje f3, takže napětí s f5 bílému nevadí — a centrum je přesně to, co černý při běhu s Met zanedbává.",
          },
          {
            from: [1, 4],
            to: [2, 5],
            comment:
              "Met na f6. Krok za krokem, jiné tempo než dáma v šachu — černý sází na to, že v pomalém makruku na takovou pouť čas je.",
          },
          {
            from: [7, 6],
            to: [6, 4],
            comment:
              "Druhý kůň na e2. Nenápadný, ale přesný tah: z e2 kryje kůň f4 i g3, tedy obě pole, na která by Met z g5 chtěla dál.",
          },
          {
            from: [2, 5],
            to: [3, 6],
            comment:
              "Met na g5?! Vypadá to jako vrchol plánu, jenže odsud Met nenapadá vůbec nic — f4 i h4 jsou prázdná pole a obě kryjí bílí. Tady zašla o krok dál, než měla.",
          },
          {
            from: [5, 7],
            to: [4, 7],
            comment:
              "h4! Pěšcem na Met. Brát nesmí: h4 kryje pěšec g3, takže Met×h4 g3×h4 by byla figura za pěšce. Slabou figuru vyžene v makruku každý pěšec — proto se s Met neútočí.",
          },
          {
            from: [3, 6],
            to: [2, 5],
            comment:
              "Met se vrací na f6. Čtyři tahy Met a nula zisku; pole g5 si navíc bílý pohlídal napořád.",
          },
          {
            from: [7, 3],
            to: [6, 2],
            comment:
              "Khun na c2. Bílý si v klidu uklízí krále z první řady — zatímco černý běhal s Met, on postavil centrum a vyvedl oba koně.",
          },
          {
            from: [0, 6],
            to: [1, 4],
            comment:
              "Kůň na e7, první černá lehká figura venku. Bilance po 12 tazích: materiál je rovný, rozvoj ne — bílý má dva koně a pevný střed, černý jednoho koně a Met na f6, odkud nic neohrožuje. Poučení: iniciativa se v makruku bere pěšci a věžemi, ne Met; ta je tak pomalá, že ji vyžene první pěšec, který na ni sáhne.",
          },
        ],
      },
    ],
  },
];
