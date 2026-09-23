# Engine validace tahů — makruk-pruvodce

Vygenerováno: 2026-09-23 07:40 UTC · `npm run validate`

## Nastavení

- **Engine:** Fairy-Stockfish 14 (`tools/fairy-stockfish/fairy-stockfish_x86-64-bmi2.exe`, release `fairy_sf_14`), varianta `makruk`, klasické hodnocení (release neobsahuje makruk NNUE)
- **Hledání:** `go movetime 1000` na každou pozici (před i po tahu), Hash 256 MB, Threads 4; legalita přes `go perft 1`
- **Pozice:** vždy `position startpos|fen <setup> moves …` — engine tak sám vede makruk counting rules (u koncovek bez pěšců)
- **Prahy:** chyba ≥ 250 cp, nepřesnost 150–249 cp (ztráta = eval před tahem − eval po tahu, obojí z pohledu strany, která táhla; `mate N` → ±(10000 − |N|·10))
- **Rozhodnuté pozice:** je-li |eval| ≥ 2500 cp před i po tahu (stejným směrem), tah se klasifikuje „rozhodnuto" a nepočítá se jako chyba — typicky matové studie, kde engine v 1 s mat v N „ztratí z dohledu" (M11 → +5900 by jinak vyšlo jako chyba 4000 cp), nebo tahy už poražené strany; v detailu jsou uvedeny při ztrátě ≥ 250 cp
- **Doba běhu:** 7.3 min

### Kalibrace škály hodnocení

Bílý na tahu, výchozí pozice bez jedné figury (stejné hledání jako u validace):

| pozice | eval (cp) | depth |
|---|---:|---:|
| výchozí pozice | +7 | 16 |
| bílý má navíc Rua (chybí r a8) | +746 | 20 |
| černý má navíc Rua (chybí R a1) | -715 | 18 |
| bílý má navíc Ma (chybí n b8) | +492 | 18 |
| bílý má navíc Khon (chybí s c8) | +376 | 18 |
| bílý má navíc Met (chybí m d8) | +246 | 19 |
| bílý má navíc Bia (chybí p d6) | +187 | 19 |

Škála enginu je oproti šachovému „1 pěšec = 100 cp" nafouklá: Bia ≈ 160–190, Met ≈ 250, Khon ≈ 370, Ma ≈ 490, Rua ≈ 730 cp. Výchozí odhad prahů byl chyba ≥ 300 / nepřesnost ≥ 150. **Práh chyby je snížen na 250 cp**, aby ztráta Met (nejslabší figury) už počítala jako chyba; práh nepřesnosti 150 cp odpovídá zhruba ztrátě jednoho Bia a zůstává.

### Sanity testy

- ✅ **a)** uci → uciok, UCI_Variant=makruk, isready → readyok — `Fairy-Stockfish 14`
- ✅ **b)** position startpos → FEN — `rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1`
- ✅ **c)** go perft 4 = 273026 — `Nodes searched: 273026`
- ✅ **d)** initialBoard() → FEN shodný s b) + square(7,3)=d1, (0,4)=e8, (5,3)=d3 — `rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1`

## Souhrn

| zdroj | id | tahů | nelegálních | chyb | nepřesností | eval na konci |
|---|---|---:|---:|---:|---:|---:|
| strategy | central-push/symmetric | 12 | 0 | 0 | 0 | +14 (bílý na tahu) |
| strategy | central-push/c-pawn-knights | 12 | 0 | 0 | 0 | +23 (bílý na tahu) |
| strategy | central-push/e-pawn-kingside | 12 | 0 | 0 | 0 | -15 (bílý na tahu) |
| strategy | khon-wall/central-khon-wall | 12 | 0 | 0 | 0 | +53 (bílý na tahu) |
| strategy | khon-wall/khon-wall-central-hit | 12 | 0 | 0 | 0 | -7 (bílý na tahu) |
| strategy | khon-wall/khon-wall-kingside | 12 | 0 | 0 | 0 | +153 (bílý na tahu) |
| strategy | met-attack/early-sortie | 10 | 0 | 0 | 0 | -46 (bílý na tahu) |
| strategy | met-attack/met-g5-support | 12 | 0 | 0 | 0 | +107 (bílý na tahu) |
| strategy | met-attack/met-against-f5 | 12 | 0 | 0 | 0 | +7 (bílý na tahu) |
| strategy | met-attack/met-h4-diagonal | 12 | 0 | 0 | 0 | -76 (bílý na tahu) |
| strategy | met-attack/met-b4-diagonal | 12 | 0 | 0 | 0 | -84 (bílý na tahu) |
| strategy | rua-on-7th/open-a-file | 10 | 0 | 0 | 0 | +38 (bílý na tahu) |
| strategy | rua-on-7th/h-file-rook | 12 | 0 | 0 | 0 | +92 (bílý na tahu) |
| strategy | rua-on-7th/b-file-rook | 12 | 0 | 0 | 0 | +53 (bílý na tahu) |
| strategy | rua-on-7th/a-file-active-knights | 12 | 0 | 0 | 0 | +84 (bílý na tahu) |
| strategy | promo-prep/e-file-push | 10 | 0 | 0 | 0 | -17 (bílý na tahu) |
| strategy | promo-prep/d-pawn-e5-promo | 12 | 0 | 0 | 0 | -31 (bílý na tahu) |
| strategy | promo-prep/b-pawn-promo | 12 | 0 | 0 | 0 | -69 (bílý na tahu) |
| strategy | promo-prep/c-pawn-via-b | 12 | 0 | 0 | 0 | +107 (bílý na tahu) |
| strategy | promo-prep/f-pawn-g-promo | 12 | 0 | 0 | 0 | +15 (bílý na tahu) |
| strategy | black-initiative/early-f5 | 12 | 0 | 0 | 0 | +30 (bílý na tahu) |
| strategy | black-initiative/met-sortie-black | 12 | 0 | 0 | 0 | +100 (bílý na tahu) |
| game | rook-endgame | 15 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | promo-mate | 9 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-coop | 16 | 0 | 0 (+1 allowlist) | 0 | -523 (bílý na tahu) |
| game | passive-vs-active | 19 | 0 | 0 (+1 allowlist) | 0 | -415 (černý na tahu) |
| game | two-rooks-mate | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-mate | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | kramnik-fianchetto | 20 | 0 | 0 | 0 | 0 (bílý na tahu) |
| game | two-knights-mate | 7 | 0 | 0 (+1 allowlist) | 0 | -M0 (mat) (černý na tahu) |
| game | rook-and-knight-mate | 9 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-mate-corner | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | met-trap | 19 | 0 | 0 (+1 allowlist) | 0 | -300 (černý na tahu) |
| game | symmetric-opening | 20 | 0 | 0 | 0 | -39 (bílý na tahu) |
| game | counting-rook-knight | 23 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| **celkem** | 35 položek | **436** | **0** | **0** | **0** | |

Tahů na allowlistu: 4 (uvedeny v detailu, nepočítají se).
Tahů „rozhodnuto" (ztráta ≥ 250 cp v už rozhodnuté pozici, nepočítají se): 2 — viz detail.

## Detail problémů

### game · khon-met-coop

*Khon a Met spolu*

#### tah 15 (bílý) — `f4e6` Ma f4→e6 · data [4,5]→[2,4] — **CHYBA** · _allowlist: záměrná chyba bílého: Ne6?? – kůň skočí na pole kryté Khonem e7 (Khon útočí i rovně vpřed); komentář tahu 15 ji výslovně popisuje_

- ztráta: **485 cp** (eval před tahem -38 → po tahu -523, z pohledu bílého)
- engine preferuje: `f1e2` Khon f1→e2 (eval -38), PV: `f1e2 e8f7 d1c2 e7e6 c1d2 g8e7`
- po zahraném tahu soupeř může: `e7e6` Khon e7×e6 (Ma) (eval +523 pro černého)
- komentář z dat: „Kůň na e6?? Vypadá lákavě — napadá Met c7 — jenže e6 hlídá Khon z e7: Khon v makruku útočí i na pole přímo před sebou, což šachová intuice …"

### game · passive-vs-active

*Pasivní obrana proti aktivnímu útoku*

#### tah 16 (černý) — `b8d7` Ma b8→d7 · data [0,1]→[1,3] — **CHYBA** · _allowlist: záměrná chyba černého: Nd7?? – zabírá králi pole d7, po N×e6 nelze odvrátit dvojí hrozbu N×g7 / Nc7+; komentář tahu 16 ji výslovně popisuje_

- ztráta: **370 cp** (eval před tahem -45 → po tahu -415, z pohledu černého)
- engine preferuje: `e6e5` Bia e6→e5 (eval -45), PV: `e6e5`
- po zahraném tahu soupeř může: `f4e6` Ma f4×e6 (Bia) (eval +415 pro bílého)
- komentář z dat: „Kůň b8 → d7?? Rozvoj o tah pozdě, a navíc chyba: kůň zabral králi i pole d7. Po N×e6 tak černý nemá, čím koně napadnout, a obojí — Khon g7 …"

### game · two-knights-mate

*Dva koně: mat jen s pomocí soupeře*

#### tah 6 (černý) — `b7c8` Khun b7→c8 · data [1,1]→[0,2] — **CHYBA** · _allowlist: záměrná chyba černého: Kc8?? místo K×a6 (remíza) – jediný prohrávající tah; komentář tahu 6 i description partie ji výslovně popisují_

- ztráta: **9990 cp** (eval před tahem 0 → po tahu -M1, z pohledu černého)
- engine preferuje: `b7a6` Khun b7×a6 (Ma) (eval 0), PV: `b7a6 b5a3 a6a5 a3c4 a5a4 c4b2`
- po zahraném tahu soupeř může: `b5d6` Ma b5→d6 (eval M1 pro bílého)
- komentář z dat: „Král na c8?? Chyba, která rozhoduje. Černý měl vzít nekrytého koně K×a6 — zůstal by král a kůň proti králi, což je remíza. I ostatní ústupy…"

### game · rook-and-knight-mate

*Věž a kůň matují*

#### tah 3 (bílý) — `e1d2` Khun e1→d2 · data [7,4]→[6,3] — _rozhodnuto (nepočítá se)_

- pozice už rozhodnutá (pomalejší cesta k výhře): eval M12 → +5918 z pohledu bílého; engine preferuje `a2a6` Rua a2→a6

#### tah 4 (černý) — `g7g6` Khun g7→g6 · data [1,6]→[2,6] — _rozhodnuto (nepočítá se)_

- pozice už rozhodnutá (volba mezi prohrávajícími tahy): eval -5918 → -M10 z pohledu černého; engine preferuje `g7f6` Khun g7→f6

### game · met-trap

*Past na Met*

#### tah 16 (černý) — `d6c5` Met d6→c5 · data [2,3]→[3,2] — **CHYBA** · _allowlist: záměrná chyba černého: Met d6-c5?? – pole c5 napadají Nb3, b4 a d4, kryje ho jen Nd7; komentář tahu 16 ji výslovně popisuje_

- ztráta: **262 cp** (eval před tahem -38 → po tahu -300, z pohledu černého)
- engine preferuje: `g8e7` Ma g8→e7 (eval -38), PV: `g8e7 a3a4 b5a4 a1a4 e8f7 c2d3`
- po zahraném tahu soupeř může: `b4c5` Bia b4×c5 (Met) (eval +300 pro bílého)
- komentář z dat: „Met na c5?? Vypadá aktivně (napadá b4 i d4), ale je to chyba: c5 útočí kůň b3, pěšec b4 i pěšec d4, kryje ho jen kůň d7. Tři útočníci proti…"


## Zmeškaná braní

Tahy, kde engine jako nejlepší tah vidí braní, hráč táhl jinak (a nebral tutéž figuru jinou figurou) a buď to podle PV vynáší materiál ≥ 100 cp, nebo je ztráta tahu na úrovni chyby (≥ 250 cp). „Materiál po PV" = změna materiální bilance na konci hlavní varianty enginu (odhad podle kalibrovaných hodnot figur, z pohledu strany na tahu). Visící figura v koncové pozici je vidět v sekci „Tvrzení na konci" (nejlepší tah = braní).

| zdroj | id | tah | strana | engine: brát | eval po braní | zahráno | eval po zahraném | ztráta | materiál po PV | PV enginu |
|---|---|---:|---|---|---:|---|---:|---:|---:|---|
| game | two-knights-mate | 6 | černý | `b7a6` Khun b7×a6 (Ma) | 0 | `b7c8` Khun b7→c8 | -M1 | 9990 | +980 | `b7a6 b5a3 a6a5 a3c4 a5a4 c4b2 a4b4 b2d3` |

## Tvrzení na konci

Eval koncové pozice (z pohledu strany na tahu) a nejlepší tah enginu — k porovnání se závěrečným komentářem / `result`.

| zdroj | id | na tahu | eval | nejlepší tah | mat? | result / poslední komentář |
|---|---|---|---:|---|---|---|
| strategy | central-push/symmetric | bílý | +14 | `d1c1` Khun d1→c1 | — | „Khon na f7 — poslední tah, který šel zkopírovat. Pozice vypadá rovná, jenže na tahu je bílý: první nesymetric…" |
| strategy | central-push/c-pawn-knights | bílý | +23 | `d1c2` Khun d1→c2 | — | „Kůň na e7 kryje d5 — jediného centrálního pěšce černého, kterého bílý kůň z c3 už napadá. Bilance: struktura …" |
| strategy | central-push/e-pawn-kingside | bílý | -15 | `g3f4` Bia g3×f4 (Bia) | — | „Černý bere e5×f4 dřív, než pěšec padne. Bílý vezme zpět g3×f4 a bude mít, co chtěl: koně na e4 a f3, pěšce d4…" |
| strategy | khon-wall/central-khon-wall | bílý | +53 | `f3f4` Bia f3→f4 | — | „Černý Khun na f8 — také jen přešlapuje. Závěr varianty: obě strany jsou naprosto v bezpečí a ani jedna nemá j…" |
| strategy | khon-wall/khon-wall-central-hit | bílý | -7 | `e2d3` Khon e2→d3 | — | „Rua a8-a7! V makruku je 7. řada od začátku prázdná, takže druhá věž se po ní přesune na h7 a černý zdvojí věž…" |
| strategy | khon-wall/khon-wall-kingside | bílý | +153 | `e1f2` Met e1→f2 | — | „f5! Druhý útočník na e4 — pěšec je teď napadený dvakrát (Ma c5, f5) a krytý dvakrát (f3, Ma c3), takže bílý d…" |
| strategy | met-attack/early-sortie | bílý | -46 | `f4e3` Met f4→e3 | — | „Černá Met na c7 (e7 už drží kůň). Černý za bílým výpadem nejde: nechá Met zaseknout se na f4 a sám chystá b6-…" |
| strategy | met-attack/met-g5-support | bílý | +107 | `g1f3` Ma g1→f3 | — | „Kůň na f6. Hlídá g4 a h5 a černý si chystá figury, kterými by Met později obklíčil. Bílý ale má, co chtěl: Me…" |
| strategy | met-attack/met-against-f5 | bílý | +7 | `g1e2` Ma g1→e2 | — | „c5. Černý hledá protihru tam, kde bílá Met není: na dámském křídle. Bilance: Met stojí na f4 pevně a bez star…" |
| strategy | met-attack/met-h4-diagonal | bílý | -76 | `f3e5` Ma f3→e5 | — | „e4! Pěšec e5 byl napadený dvakrát (f4, Ma f3) a krytý jen koněm z d7, tak jde vpřed a sám útočí — na d3 i na …" |
| strategy | met-attack/met-b4-diagonal | bílý | -84 | `d3e4` Bia d3×e4 (Bia) | — | „e4! Pěšec e5 byl napadený dvakrát (f4, Ma f3) a krytý jen koněm z d7 — místo čekání na výměnu jde vpřed a sám…" |
| strategy | rua-on-7th/open-a-file | bílý | +38 | `b3b4` Bia b3→b4 | — | „Khon se vrací na b7 a kryje pěšce b5. Poučení: otevřít sloupec, na kterém stojí soupeřova věž, znamená výměnu…" |
| strategy | rua-on-7th/h-file-rook | bílý | +92 | `a2g2` Rua a2→g2 | — | „Rua na g8: černý kryje Khon g7 dřív, než přijde Rg2, a nechává krále u středu. Cena: opustil h-sloupec — ten …" |
| strategy | rua-on-7th/b-file-rook | bílý | +53 | `c4a5` Ma c4×a5 (Bia) | — | „d5! Černý pěšce a5 neudrží — kdyby ho bránil postupem a5-a4, kůň by místo něj vzal d6. Raději napadá koně pěš…" |
| strategy | rua-on-7th/a-file-active-knights | bílý | +84 | `d1e2` Khun d1→e2 | — | „d5. Černý napadá c4 a hledá protihru v centru. Bilance: bílý má aktivního koně c3 a druhého na cestě na f3, o…" |
| strategy | promo-prep/e-file-push | bílý | -17 | `f3e4` Bia f3×e4 (Bia) | — | „Kůň na c5 — uhýbá z dosahu P+ (ten bere diagonálně všemi směry, takže na d7 by ho vzal) a zároveň P+ na e6 sá…" |
| strategy | promo-prep/d-pawn-e5-promo | bílý | -31 | `c1d2` Khon c1→d2 | — | „Kůň na d7 — kryje e5 a připravuje Khon f8-e7-d6, aby volného pěšce zablokoval natrvalo. Bilance: bílý má voln…" |
| strategy | promo-prep/b-pawn-promo | bílý | -69 | `a4b5` Bia a4×b5 (Bia) | — | „Černý bere c6×b5 — poslední výměna. Bilance: bílý teď vezme a4×b5, černý R×a1 a Khon b2 bere zpět: věže se vy…" |
| strategy | promo-prep/c-pawn-via-b | bílý | +107 | `h1h2` Rua h1→h2 | — | „Khon bere zpět na a6. Spočítej pěšce: bílý přišel o a- a c-pěšce, černý o a-, b- i c-pěšce — bílý je o pěšce …" |
| strategy | promo-prep/f-pawn-g-promo | bílý | +15 | `a3a4` Bia a3→a4 | — | „Khun na f7. Král kryje g6 i e6 a černý má vše pokryté. Bilance: materiál je vyrovnaný, promoce proběhla a hne…" |
| strategy | black-initiative/early-f5 | bílý | +30 | `a3a4` Bia a3→a4 | — | „Kůň na d7 dokončuje rozvoj. Bilance po 12 tazích: materiál je rovný, ale jedinou věž na otevřeném sloupci má …" |
| strategy | black-initiative/met-sortie-black | bílý | +100 | `d2c4` Ma d2→c4 | — | „Kůň na e7, první černá lehká figura venku. Bilance po 12 tazích: materiál je rovný, rozvoj ne — bílý má dva k…" |
| game | rook-endgame | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R a8#)** — „MAT! Rua dorazí na a8 a útočí celou 8. řadu. Černý král na g8 nemá kam — g7/h7/f7 pokrývá bílý král, f8/h8 na…" |
| game | promo-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje s pomocí promoce (R a8#)** — „MAT! Rua dorazí na a8 a šachuje 8. řadu. Černý král na c8 nemá únik: b8/d8 napadá Rua, b7/c7 napadá bílý král…" |
| game | khon-met-coop | bílý | -523 | `f3f4` Bia f3→f4 | — | **Černý vyhraje materiálem (zisk Ma za žádnou cenu)** — „Khon krokem rovně vpřed bere koně na e6 — zadarmo. Bilance po 16 tazích: pěšci 6 : 6, ale černý má koně navíc…" |
| game | passive-vs-active | černý | -415 | `e8e7` Khun e8→e7 | — | **Útočník (bílý) vyhraje materiálem — pasivně postavené figury nekryjí e6 a Khon g7 padne** — „Kůň bere Khon. Bilance: bílý má Khon a pěšce navíc a jeho kůň stojí hluboko v soupeřově pozici, kde ho nikdo …" |
| game | two-rooks-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R a8#)** — „MAT! Rua a6 → a8, šach na 8. řadě. Druhá Rua na h7 stále drží 7. řadu, takže král nemá kam utéct. Černý král …" |
| game | khon-met-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (Khon d7# — krytý Khunem, Met zajišťuje diagonály)** — „MAT! Khon dělá diagonální skok na d7 — šach černému králi (Khon útočí dopředu na pole přímo před sebou, tedy …" |
| game | kramnik-fianchetto | bílý | 0 | `d1c2` Khun d1→c2 | — | **Vyrovnaná pozice — plán fianchetta splněn, Khon stojí v centru na d5** — „Černý: b6×c5. Pěšec c5 hlídá d4 a b4, kůň d7 dál kryje e5 i c5. Bilance po 20 tazích: materiál rovný, pozice …" |
| game | two-knights-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (N d6#) — jen díky chybě černého v 6. tahu** — „MAT! Kůň z b5 na d6 dává šach. Král na c8 nemá kam: b8 a c7 hlídá kůň a6, b7 kůň d6, d7 a d8 bílý král. Obraz…" |
| game | rook-and-knight-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R h2#)** — „MAT! Věž z a2 na h2 šachuje po celém h-sloupci. Černý král na h4 nemá únik: g3 a h3 kryje bílý král, g5 kryje…" |
| game | khon-met-mate-corner | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (Khon d7#)** — „MAT! Khon na d7 dává šach dopředu na d8 a diagonálně kryje c8/e8. Bílý král na e7 drží c7 a e7. Černý král ne…" |
| game | met-trap | černý | -300 | `f8f7` Khon f8→f7 | — | **Bílý získává Met (past na c5)** — „Pěšec bere zpět a výměna končí: kůň za koně, Met za nic. Bilance: bílý má Met navíc a pěšec c5 mu k tomu drží…" |
| game | symmetric-opening | bílý | -39 | `f3f4` Bia f3→f4 | — | **Vyrovnaná pozice — symetrii rozbil c4 a černý ji správně nekopíroval** — „Met uhýbá z dostřelu věže na d6, kde stojí bezpečně a hlídá c5 i e5. Bilance po 20 tazích: materiál rovný, po…" |
| game | counting-rook-knight | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje v limitu** — „MAT v 12/16 — Rua na a8 dává šach po a-sloupci. Král na a5 nemá kam: a4 i a6 drží Rua, b4 a b6 bílý Khun, na …" |

## Kontrolní případy z ruční revize

### 1. strategy · khon-wall/khon-wall-central-hit, tah 12

Podezření: poslední tah černého Ma na g4 — kůň visí za Bia f3

- tah v datech: `a8a7` Rua a8→a7 (černý), data [0,0]→[1,0]
- eval před tahem -46 → po tahu +7 (z pohledu černého); ztráta **-53 cp** → **ok**
- engine místo toho preferuje: `b6b5` Bia b6→b5, PV `b6b5 e2d3 b5c4 d3c4 b8d7 d1c2`
- po zahraném tahu soupeř může: `e2d3` Khon e2→d3 (eval -7 pro bílého)
- koncová pozice (bílý na tahu): eval -7, nejlepší tah `e2d3` Khon e2→d3

### 2. strategy · rua-on-7th/h-file-rook, tah 5

Podezření: Rua h1→h7 visí za černou Rua h8; navazující tah černého je zmeškané braní

- tah v datech: `g1h3` Ma g1→h3 (bílý), data [7,6]→[5,7]
- eval před tahem +85 → po tahu +30 (z pohledu bílého); ztráta **55 cp** → **ok**
- engine místo toho preferuje: `f3f4` Bia f3→f4, PV `f3f4`
- po zahraném tahu soupeř může: `f8g7` Khon f8→g7 (eval -30 pro černého)
- tah 6 (černý) `f8g7` Khon f8→g7: zmeškané braní **nezachyceno** (engine preferuje `f8g7` Khon f8→g7, ztráta -7 cp)

### 3. strategy · rua-on-7th/a-file-active-knights, tah 5

Podezření: Rua a1→a7 visí za černou Rua a8; navazující tah černého je zmeškané braní

- tah v datech: `c3c4` Bia c3→c4 (bílý), data [5,2]→[4,2]
- eval před tahem +70 → po tahu +53 (z pohledu bílého); ztráta **17 cp** → **ok**
- engine místo toho preferuje: `c3c4` Bia c3→c4, PV `c3c4`
- po zahraném tahu soupeř může: `b5c4` Bia b5×c4 (Bia) (eval -53 pro černého)
- tah 6 (černý) `b5c4` Bia b5×c4 (Bia): zmeškané braní **nezachyceno** (engine preferuje `b5c4` Bia b5×c4 (Bia), ztráta -15 cp)

### 4. game · met-trap, tah 17

Podezření: závěrečné braní Met (Ma b3×c5) je kryté černým koněm z d7

- tah v datech: `b3c5` Ma b3×c5 (Met) (bílý), data [5,1]→[3,2]
- eval před tahem +300 → po tahu +279 (z pohledu bílého); ztráta **21 cp** → **ok**
- engine místo toho preferuje: `b4c5` Bia b4×c5 (Met), PV `b4c5 g8e7 c2d3 h6h5 e1d2 a6a5`
- po zahraném tahu soupeř může: `b7b6` Khon b7→b6 (eval -279 pro černého)

### 5. game · symmetric-opening, tah 19

Podezření: koncového pěšce na e5 jde vzít f6×e5

- tah v datech: `a1c1` Rua a1→c1 (bílý), data [7,0]→[7,2]
- eval před tahem -46 → po tahu -53 (z pohledu bílého); ztráta **7 cp** → **ok**
- engine místo toho preferuje: `b2c3` Khon b2→c3, PV `b2c3 e8f7 d1c2 a8c8 e1f2 d5e4`
- po zahraném tahu soupeř může: `a8c8` Rua a8→c8 (eval +53 pro černého)
