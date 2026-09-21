# Engine validace tahů — makruk-pruvodce

Vygenerováno: 2026-09-21 16:27 UTC · `npm run validate`

## Nastavení

- **Engine:** Fairy-Stockfish 14 (`tools/fairy-stockfish/fairy-stockfish_x86-64-bmi2.exe`, release `fairy_sf_14`), varianta `makruk`, klasické hodnocení (release neobsahuje makruk NNUE)
- **Hledání:** `go movetime 1000` na každou pozici (před i po tahu), Hash 256 MB, Threads 4; legalita přes `go perft 1`
- **Pozice:** vždy `position startpos|fen <setup> moves …` — engine tak sám vede makruk counting rules (u koncovek bez pěšců)
- **Prahy:** chyba ≥ 250 cp, nepřesnost 150–249 cp (ztráta = eval před tahem − eval po tahu, obojí z pohledu strany, která táhla; `mate N` → ±(10000 − |N|·10))
- **Rozhodnuté pozice:** je-li |eval| ≥ 2500 cp před i po tahu (stejným směrem), tah se klasifikuje „rozhodnuto" a nepočítá se jako chyba — typicky matové studie, kde engine v 1 s mat v N „ztratí z dohledu" (M11 → +5900 by jinak vyšlo jako chyba 4000 cp), nebo tahy už poražené strany; v detailu jsou uvedeny při ztrátě ≥ 250 cp
- **Doba běhu:** 6.5 min

### Kalibrace škály hodnocení

Bílý na tahu, výchozí pozice bez jedné figury (stejné hledání jako u validace):

| pozice | eval (cp) | depth |
|---|---:|---:|
| výchozí pozice | +7 | 17 |
| bílý má navíc Rua (chybí r a8) | +746 | 17 |
| černý má navíc Rua (chybí R a1) | -715 | 17 |
| bílý má navíc Ma (chybí n b8) | +500 | 14 |
| bílý má navíc Khon (chybí s c8) | +376 | 20 |
| bílý má navíc Met (chybí m d8) | +269 | 17 |
| bílý má navíc Bia (chybí p d6) | +200 | 17 |

Škála enginu je oproti šachovému „1 pěšec = 100 cp" nafouklá: Bia ≈ 160–190, Met ≈ 250, Khon ≈ 370, Ma ≈ 490, Rua ≈ 730 cp. Výchozí odhad prahů byl chyba ≥ 300 / nepřesnost ≥ 150. **Práh chyby je snížen na 250 cp**, aby ztráta Met (nejslabší figury) už počítala jako chyba; práh nepřesnosti 150 cp odpovídá zhruba ztrátě jednoho Bia a zůstává.

### Sanity testy

- ✅ **a)** uci → uciok, UCI_Variant=makruk, isready → readyok — `Fairy-Stockfish 14`
- ✅ **b)** position startpos → FEN — `rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1`
- ✅ **c)** go perft 4 = 273026 — `Nodes searched: 273026`
- ✅ **d)** initialBoard() → FEN shodný s b) + square(7,3)=d1, (0,4)=e8, (5,3)=d3 — `rnsmksnr/8/pppppppp/8/8/PPPPPPPP/8/RNSKMSNR w - - 0 1`

## Souhrn

| zdroj | id | tahů | nelegálních | chyb | nepřesností | eval na konci |
|---|---|---:|---:|---:|---:|---:|
| strategy | central-push/symmetric | 12 | 0 | 0 | 0 | 0 (bílý na tahu) |
| strategy | central-push/c-pawn-knights | 12 | 0 | 2 | 0 | +146 (bílý na tahu) |
| strategy | central-push/e-pawn-kingside | 12 | 0 | 2 | 3 | +158 (bílý na tahu) |
| strategy | khon-wall/central-khon-wall | 12 | 0 | 2 | 2 | +130 (bílý na tahu) |
| strategy | khon-wall/khon-wall-central-hit | 12 | 0 | 2 | 1 | +545 (bílý na tahu) |
| strategy | khon-wall/khon-wall-kingside | 12 | 0 | 0 | 2 | +123 (bílý na tahu) |
| strategy | met-attack/early-sortie | 10 | 0 | 0 | 0 | -61 (bílý na tahu) |
| strategy | met-attack/met-g5-support | 12 | 0 | 1 | 4 | +223 (bílý na tahu) |
| strategy | met-attack/met-against-f5 | 12 | 0 | 3 | 3 | +204 (bílý na tahu) |
| strategy | met-attack/met-h4-diagonal | 12 | 0 | 1 | 0 | +184 (bílý na tahu) |
| strategy | met-attack/met-b4-diagonal | 12 | 0 | 1 | 0 | +184 (bílý na tahu) |
| strategy | rua-on-7th/open-a-file | 10 | 0 | 7 | 0 | -30 (bílý na tahu) |
| strategy | rua-on-7th/h-file-rook | 12 | 0 | 9 | 0 | +700 (bílý na tahu) |
| strategy | rua-on-7th/b-file-rook | 12 | 0 | 4 | 0 | -123 (bílý na tahu) |
| strategy | rua-on-7th/a-file-active-knights | 12 | 0 | 9 | 0 | +723 (bílý na tahu) |
| strategy | promo-prep/e-file-push | 10 | 0 | 1 | 0 | +407 (bílý na tahu) |
| strategy | promo-prep/d-pawn-e5-promo | 12 | 0 | 4 | 3 | +430 (bílý na tahu) |
| strategy | promo-prep/b-pawn-promo | 12 | 0 | 2 | 2 | +392 (bílý na tahu) |
| strategy | promo-prep/c-pawn-via-b | 12 | 0 | 2 | 4 | +558 (bílý na tahu) |
| strategy | promo-prep/f-pawn-g-promo | 12 | 0 | 3 | 2 | +184 (bílý na tahu) |
| game | rook-endgame | 15 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | promo-mate | 9 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-coop | 16 | 0 | 4 | 1 | -161 (bílý na tahu) |
| game | passive-vs-active | 19 | 0 | 3 | 1 | -484 (černý na tahu) |
| game | two-rooks-mate | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-mate | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | kramnik-fianchetto | 16 | 0 | 1 | 0 | +261 (bílý na tahu) |
| game | two-knights-mate | 7 | 0 | 1 | 0 | -M0 (mat) (černý na tahu) |
| game | rook-and-knight-mate | 9 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-mate-corner | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | met-trap | 17 | 0 | 2 | 1 | +114 (černý na tahu) |
| game | symmetric-opening | 19 | 0 | 3 | 0 | 0 (černý na tahu) |
| **celkem** | 32 položek | **382** | **0** | **69** | **29** | |


## Detail problémů

### strategy · central-push/c-pawn-knights

*Centrální postup pěšců — Rozvoj přes c-pěšce*

#### tah 11 (bílý) — `e2f4` Ma e2→f4 · data [6,4]→[4,5] — **CHYBA**

- ztráta: **422 cp** (eval před tahem +76 → po tahu -346, z pohledu bílého)
- engine preferuje: `d4e5` Bia d4×e5 (Bia) (eval +76), PV: `d4e5 d5e4 c3e4 f6e5 c1d2 e7f5`
- po zahraném tahu soupeř může: `e5f4` Bia e5×f4 (Ma) (eval +346 pro černého)
- komentář z dat: „Bílý kůň z e2 vyskočí na f4. Centrální pěšci mu uvolnili cestu a najednou má kůň silné pole."

#### tah 12 (černý) — `e7f5` Ma e7→f5 · data [1,4]→[3,5] — **CHYBA**

- ztráta: **492 cp** (eval před tahem +346 → po tahu -146, z pohledu černého)
- engine preferuje: `e5f4` Bia e5×f4 (Ma) (eval +346), PV: `e5f4 c4d5 c6d4 g3f4 c8c7 b3b4`
- po zahraném tahu soupeř může: `d4e5` Bia d4×e5 (Bia) (eval +146 pro bílého)
- komentář z dat: „Kůň na f5. Černý nečeká, až bílý jezdec na f4 zesílí — staví proti němu vlastního a zároveň hlídá e3 i g3, tedy pole v bílém táboře."

### strategy · central-push/e-pawn-kingside

*Centrální postup pěšců — Královské křídlo s e-pěšcem*

#### tah 8 (černý) — `f6f5` Bia f6→f5 · data [2,5]→[3,5] — **CHYBA**

- ztráta: **268 cp** (eval před tahem +15 → po tahu -253, z pohledu černého)
- engine preferuje: `d5e4` Bia d5×e4 (Bia) (eval +15), PV: `d5e4 d2e4 f8e7 f4e5 f6e5 g1f3`
- po zahraném tahu soupeř může: `e4d5` Bia e4×d5 (Bia) (eval +253 pro bílého)
- komentář z dat: „f5. Uvolňuje f6 pro koně a hlavně útočí na bílého pěšce na e4 — černý si buduje vlastní hrozby."

#### tah 9 (bílý) — `g1f3` Ma g1→f3 · data [7,6]→[5,5] — **CHYBA**

- ztráta: **332 cp** (eval před tahem +253 → po tahu -79, z pohledu bílého)
- engine preferuje: `e4d5` Bia e4×d5 (Bia) (eval +253), PV: `e4d5 e5d4 d5c6m d4c3m c6d7 c8d7`
- po zahraném tahu soupeř může: `f5e4` Bia f5×e4 (Bia) (eval +79 pro černého)
- komentář z dat: „Pravý kůň na f3. f-pěšec ustoupil, takže kůň může obsadit aktivní pole místo pasivního e2."

#### tah 10 (černý) — `g8f6` Ma g8→f6 · data [0,6]→[2,5] — **NEPŘESNOST**

- ztráta: **247 cp** (eval před tahem +79 → po tahu -168, z pohledu černého)
- engine preferuje: `f5e4` Bia f5×e4 (Bia) (eval +79), PV: `f5e4 f3e5 g8e7 d1c2 f8f7 c1b2`
- po zahraném tahu soupeř může: `e4d5` Bia e4×d5 (Bia) (eval +168 pro bílého)
- komentář z dat: „Kůň na f6. Podpírá útok na e4 a hlídá g4 — černý přidává druhého útočníka, místo aby jen čekal."

#### tah 11 (bílý) — `f1f2` Khon f1→f2 · data [7,5]→[6,5] — **NEPŘESNOST**

- ztráta: **191 cp** (eval před tahem +168 → po tahu -23, z pohledu bílého)
- engine preferuje: `e4d5` Bia e4×d5 (Bia) (eval +168), PV: `e4d5 e5d4`
- po zahraném tahu soupeř může: `e5d4` Bia e5×d4 (Bia) (eval +23 pro černého)
- komentář z dat: „Khon na f2. Bílý dokončuje pevnou královskou strukturu a chrání pole před Khunem."

#### tah 12 (černý) — `f8f7` Khon f8→f7 · data [0,5]→[1,5] — **NEPŘESNOST**

- ztráta: **181 cp** (eval před tahem +23 → po tahu -158, z pohledu černého)
- engine preferuje: `e5d4` Bia e5×d4 (Bia) (eval +23), PV: `e5d4 e4d5 d4c3m d5c6m c3d2 c6d7`
- po zahraném tahu soupeř může: `e4d5` Bia e4×d5 (Bia) (eval +158 pro bílého)
- komentář z dat: „Khon na f7. Král je krytý a černý má hotovo: pěšec f5 i kůň f6 tlačí na e4, takže bílý musí centrum hlídat, místo aby útočil."

### strategy · khon-wall/central-khon-wall

*Stěna z Khon — Dvě stěny — mrtvá pozice*

#### tah 8 (černý) — `c8d7` Khon c8→d7 · data [0,2]→[1,3] — **NEPŘESNOST**

- ztráta: **191 cp** (eval před tahem +107 → po tahu -84, z pohledu černého)
- engine preferuje: `c5d4` Bia c5×d4 (Bia) (eval +107), PV: `c5d4 e3d4 d5c4 b3c4 c6d4 d2d3`
- po zahraném tahu soupeř může: `c4d5` Bia c4×d5 (Bia) (eval +84 pro bílého)
- komentář z dat: „Khon na d7. Černý si staví vlastní stěnu, protože k proražení té bílé nemá dost figur — a útok bez dostatku útočníků je jen ztráta materiál…"

#### tah 10 (černý) — `f8e7` Khon f8→e7 · data [0,5]→[1,4] — **NEPŘESNOST**

- ztráta: **161 cp** (eval před tahem +46 → po tahu -115, z pohledu černého)
- engine preferuje: `d5c4` Bia d5×c4 (Bia) (eval +46), PV: `d5c4 d4c5 c4b3m c5b6m a8b8 b6c5`
- po zahraném tahu soupeř může: `c4d5` Bia c4×d5 (Bia) (eval +115 pro bílého)
- komentář z dat: „Khon na e7 a stěna je hotová i u černého. Všimni si vedlejšího účinku: bílý kůň na g1 má jediné pole e2 obsazené vlastním Khonem, takže je …"

#### tah 11 (bílý) — `d1c1` Khun d1→c1 · data [7,3]→[7,2] — **CHYBA**

- ztráta: **268 cp** (eval před tahem +115 → po tahu -153, z pohledu bílého)
- engine preferuje: `c4d5` Bia c4×d5 (Bia) (eval +115), PV: `c4d5 e6d5 d4c5 b6c5 c3d5 e7d6`
- po zahraném tahu soupeř může: `c5d4` Bia c5×d4 (Bia) (eval +153 pro černého)
- komentář z dat: „Bílému došly užitečné tahy — Khun se přesouvá na uvolněné c1. Pevnost stojí, ale nemá čím udeřit."

#### tah 12 (černý) — `e8f8` Khun e8→f8 · data [0,4]→[0,5] — **CHYBA**

- ztráta: **283 cp** (eval před tahem +153 → po tahu -130, z pohledu černého)
- engine preferuje: `c5d4` Bia c5×d4 (Bia) (eval +153), PV: `c5d4 e3d4 c6d4 a1b1 e7d6 c4d5`
- po zahraném tahu soupeř může: `c4d5` Bia c4×d5 (Bia) (eval +130 pro bílého)
- komentář z dat: „Černý Khun na f8 — také jen přešlapuje. Závěr varianty: obě strany jsou naprosto v bezpečí a ani jedna nemá jak postoupit. Pevnost sama nev…"

### strategy · khon-wall/khon-wall-central-hit

*Stěna z Khon — Černý ignoruje stěnu a hraje na křídlo*

#### tah 5 (bílý) — `c1d2` Khon c1→d2 · data [7,2]→[6,3] — **NEPŘESNOST**

- ztráta: **245 cp** (eval před tahem +61 → po tahu -184, z pohledu bílého)
- engine preferuje: `g3g4` Bia g3→g4 (eval +61), PV: `g3g4 b6b5 b1c3 g8e7 c1d2 b8d7`
- po zahraném tahu soupeř může: `h4g3m` Bia h4×g3 (Bia)=P+ (eval +184 pro černého)
- komentář z dat: „Khon c1 na d2. Bílý pokládá první kámen stěny a dění na křídle si nevšímá."

#### tah 6 (černý) — `h8h5` Rua h8→h5 · data [0,7]→[3,7] — **CHYBA**

- ztráta: **299 cp** (eval před tahem +184 → po tahu -115, z pohledu černého)
- engine preferuje: `h4g3m` Bia h4×g3 (Bia)=P+ (eval +184), PV: `h4g3m b1c3 g3h4 f3f4 b6b5 g1f3`
- po zahraném tahu soupeř může: `g3g4` Bia g3→g4 (eval +115 pro bílého)
- komentář z dat: „Rua na h5, přesně za vlastním pěšcem. Černý ho kryje, takže výměna na h4 mu vyhovuje: bere zpět věží a rovnou získává aktivní pole."

#### tah 12 (černý) — `h6g4` Ma h6→g4 · data [2,7]→[4,6] — **CHYBA**

- ztráta: **460 cp** (eval před tahem -85 → po tahu -545, z pohledu černého)
- engine preferuje: `b6b5` Bia b6→b5 (eval -85), PV: `b6b5 e2d3`
- po zahraném tahu soupeř může: `f3g4` Bia f3×g4 (Ma) (eval +545 pro bílého)
- komentář z dat: „Kůň na g4! Černý má na bílé polovině desky věž i jezdce, bílý tam nemá nic. Závěr: bílý je pevný, ale pasivní — černý má aktivitu a určuje,…"

### strategy · khon-wall/khon-wall-kingside

*Stěna z Khon — Černý udeří dřív, než je stěna hotová*

#### tah 9 (bílý) — `c3c4` Bia c3→c4 · data [5,2]→[4,2] — **NEPŘESNOST**

- ztráta: **199 cp** (eval před tahem +92 → po tahu -107, z pohledu bílého)
- engine preferuje: `d1c2` Khun d1→c2 (eval +92), PV: `d1c2 h6h5 h3h4 a6a5 d2e3 e8f7`
- po zahraném tahu soupeř může: `c5b3` Ma c5×b3 (Bia) (eval +107 pro černého)
- komentář z dat: „Bílý c-pěšec na c4. Nutnost, ne volba: kůň na b1 má jen pole a3, c3 a d2 — dvě drží vlastní pěšci a d2 zabral vlastní Khon. Stěna si zablok…"

#### tah 10 (černý) — `e6e5` Bia e6→e5 · data [2,4]→[3,4] — **NEPŘESNOST**

- ztráta: **173 cp** (eval před tahem +107 → po tahu -66, z pohledu černého)
- engine preferuje: `c5b3` Ma c5×b3 (Bia) (eval +107), PV: `c5b3 a1a2`
- po zahraném tahu soupeř může: `d1c2` Khun d1→c2 (eval +66 pro bílého)
- komentář z dat: „e5. Černý zavírá centrum a fixuje bílého pěšce na e4. Bílý ho už neposune — a co se nehýbe, to se dá napadat."

### strategy · met-attack/met-g5-support

*Met-útok — Met na g5 s podporou g-pěšce*

#### tah 7 (bílý) — `e3f4` Met e3→f4 · data [5,4]→[4,5] — **NEPŘESNOST**

- ztráta: **161 cp** (eval před tahem +69 → po tahu -92, z pohledu bílého)
- engine preferuje: `b1d2` Ma b1→d2 (eval +69), PV: `b1d2 f6f5 f3f4 g8f6 a3a4 f5e4`
- po zahraném tahu soupeř může: `e5f4` Bia e5×f4 (Met) (eval +92 pro černého)
- komentář z dat: „Met na f4. f-pěšec zůstává na f3, takže f4 je volné — Met obsazuje silné pole na královském křídle."

#### tah 9 (bílý) — `g3g4` Bia g3→g4 · data [5,6]→[4,6] — **NEPŘESNOST**

- ztráta: **192 cp** (eval před tahem -23 → po tahu -215, z pohledu bílého)
- engine preferuje: `f4e3` Met f4→e3 (eval -23), PV: `f4e3 g8f6 g1e2 b6b5 b1d2 h6h5`
- po zahraném tahu soupeř může: `f5e4` Bia f5×e4 (Bia) (eval +215 pro černého)
- komentář z dat: „g-pěšec vpřed. Uvolňuje g5, aby se Met mohla posunout ještě hlouběji na královské křídlo."

#### tah 10 (černý) — `g8f6` Ma g8→f6 · data [0,6]→[2,5] — **NEPŘESNOST**

- ztráta: **154 cp** (eval před tahem +215 → po tahu +61, z pohledu černého)
- engine preferuje: `f5e4` Bia f5×e4 (Bia) (eval +215), PV: `f5e4 f3e4`
- po zahraném tahu soupeř může: `f4e3` Met f4→e3 (eval -61 pro bílého)
- komentář z dat: „Kůň na f6. Hlídá e4 i g4 a čeká, až se Met vysune ještě dál — pak ji chce chytit, ne před ní ustupovat."

#### tah 11 (bílý) — `f4g5` Met f4→g5 · data [4,5]→[3,6] — **NEPŘESNOST**

- ztráta: **208 cp** (eval před tahem -61 → po tahu -269, z pohledu bílého)
- engine preferuje: `f4e3` Met f4→e3 (eval -61), PV: `f4e3 f5f4 e3f4 e5f4 h3h4 h8g8`
- po zahraném tahu soupeř může: `h6g5` Bia h6×g5 (Met) (eval +269 pro černého)
- komentář z dat: „Met na g5! g-pěšec ji kryje a Met je nyní na samém okraji černého tábora. V makruku je takto daleko vysunutá Met riskantní, ale i velmi nep…"

#### tah 12 (černý) — `f8e7` Khon f8→e7 · data [0,5]→[1,4] — **CHYBA**

- ztráta: **492 cp** (eval před tahem +269 → po tahu -223, z pohledu černého)
- engine preferuje: `h6g5` Bia h6×g5 (Met) (eval +269), PV: `h6g5 e4f5 g6f5 g4f5 f6d5 f1f2`
- po zahraném tahu soupeř může: `g5f6` Met g5×f6 (Ma) (eval +223 pro bílého)
- komentář z dat: „Khon na e7. Kryje d6 i f6 a černý má plán: tahem h6 Met z g5 vyhnat, nebo ji obklíčit figurami. Vysunutá Met je zbraň jen do chvíle, než na…"

### strategy · met-attack/met-against-f5

*Met-útok — Met proti černému f5*

#### tah 7 (bílý) — `d2e3` Met d2→e3 · data [6,3]→[5,4] — **NEPŘESNOST**

- ztráta: **150 cp** (eval před tahem +100 → po tahu -50, z pohledu bílého)
- engine preferuje: `e4e5` Bia e4→e5 (eval +100), PV: `e4e5 g8e7 f3f4 g6g5 g1e2 h8g8`
- po zahraném tahu soupeř může: `f5e4` Bia f5×e4 (Bia) (eval +50 pro černého)
- komentář z dat: „Met na e3. Bílý nebrání f4 pasivně, ale pokračuje v aktivní hře uprostřed."

#### tah 8 (černý) — `g8f6` Ma g8→f6 · data [0,6]→[2,5] — **NEPŘESNOST**

- ztráta: **188 cp** (eval před tahem +50 → po tahu -138, z pohledu černého)
- engine preferuje: `f5e4` Bia f5×e4 (Bia) (eval +50), PV: `f5e4 f3e4`
- po zahraném tahu soupeř může: `e4e5` Bia e4→e5 (eval +138 pro bílého)
- komentář z dat: „Kůň na f6. Hlídá e4 i g4 a čeká na okamžik, kdy bude moct bílou Met napadnout — černý si na ni chystá figury, ne ústupová pole."

#### tah 9 (bílý) — `e3f4` Met e3→f4 · data [5,4]→[4,5] — **NEPŘESNOST**

- ztráta: **245 cp** (eval před tahem +138 → po tahu -107, z pohledu bílého)
- engine preferuje: `e4e5` Bia e4→e5 (eval +138), PV: `e4e5 f6h5 f1f2 e8f7 a3a4 b6b5`
- po zahraném tahu soupeř může: `f5e4` Bia f5×e4 (Bia) (eval +107 pro černého)
- komentář z dat: „Met na f4! Bílý využívá toho, že černý se věnoval f-sloupci, a okupuje silné pole na královském křídle."

#### tah 10 (černý) — `e6e5` Bia e6→e5 · data [2,4]→[3,4] — **CHYBA**

- ztráta: **353 cp** (eval před tahem +107 → po tahu -246, z pohledu černého)
- engine preferuje: `f5e4` Bia f5×e4 (Bia) (eval +107), PV: `f5e4 f1f2 e4f3m f2f3 f6h7 f4e5`
- po zahraném tahu soupeř může: `f4e5` Met f4×e5 (Bia) (eval +246 pro bílého)
- komentář z dat: „e5! Pěšec útočí přímo na bílou Met na f4 (Bia bere diagonálně vpřed). Černý přešel do protiútoku — vysunutá Met musí ustoupit, nebo si sehn…"

#### tah 11 (bílý) — `g1e2` Ma g1→e2 · data [7,6]→[6,4] — **CHYBA**

- ztráta: **362 cp** (eval před tahem +246 → po tahu -116, z pohledu bílého)
- engine preferuje: `f4e5` Met f4×e5 (Bia) (eval +246), PV: `f4e5 f6h5 g1e2 f5e4 f3e4 h5g7`
- po zahraném tahu soupeř může: `e5f4` Bia e5×f4 (Met) (eval +116 pro černého)
- komentář z dat: „Bílý kůň na e2. f3 je stále obsazené Bia, takže kůň jde dovnitř a připravuje se na pozdější skok."

#### tah 12 (černý) — `f8e7` Khon f8→e7 · data [0,5]→[1,4] — **CHYBA**

- ztráta: **320 cp** (eval před tahem +116 → po tahu -204, z pohledu černého)
- engine preferuje: `e5f4` Bia e5×f4 (Met) (eval +116), PV: `e5f4`
- po zahraném tahu soupeř může: `d4e5` Bia d4×e5 (Bia) (eval +204 pro bílého)
- komentář z dat: „Khon na e7. Kryje d6 i f6 a černý má, co chtěl: bílá Met stojí vysunutá a bez opory, zatímco jeho figury mají jasné cíle."

### strategy · met-attack/met-h4-diagonal

*Met-útok — Met na dlouhé diagonále h4*

#### tah 12 (černý) — `f8e7` Khon f8→e7 · data [0,5]→[1,4] — **CHYBA**

- ztráta: **260 cp** (eval před tahem +76 → po tahu -184, z pohledu černého)
- engine preferuje: `e5e4` Bia e5→e4 (eval +76), PV: `e5e4 d3e4`
- po zahraném tahu soupeř může: `f4e5` Bia f4×e5 (Bia) (eval +184 pro bílého)
- komentář z dat: „Khon na e7. Černý dokončil obranu a bilance je jasná: bílá Met stojí v rohu na h4 bez podpory, černý má centrum i rozvoj. Za vzdálenost se …"

### strategy · met-attack/met-b4-diagonal

*Met-útok — Met na dámském křídle b4*

#### tah 12 (černý) — `f8e7` Khon f8→e7 · data [0,5]→[1,4] — **CHYBA**

- ztráta: **260 cp** (eval před tahem +76 → po tahu -184, z pohledu černého)
- engine preferuje: `e5e4` Bia e5→e4 (eval +76), PV: `e5e4 d3e4 f5e4 f3e5 d5c4 b3c4`
- po zahraném tahu soupeř může: `f4e5` Bia f4×e5 (Bia) (eval +184 pro bílého)
- komentář z dat: „Khon na e7. Černý má rozvinutá obě křídla a jasný plán: zahrát a6-a5 a Met na b4 rovnou napadnout. Slabá figura daleko od svých není hrozba…"

### strategy · rua-on-7th/open-a-file

*Rua na 7. řadě — Otevření a-sloupce*

#### tah 4 (černý) — `a6b5` Bia a6×b5 (Bia) · data [2,0]→[3,1] — **CHYBA**

- ztráta: **677 cp** (eval před tahem -61 → po tahu -738, z pohledu černého)
- engine preferuje: `c6b5` Bia c6×b5 (Bia) (eval -61), PV: `c6b5 f3f4 b8c6 b3b4 f8g7 b1d2`
- po zahraném tahu soupeř může: `a1a8` Rua a1×a8 (Rua) (eval +738 pro bílého)
- komentář z dat: „Bere zpět a-pěšcem. Sloupec je otevřený pro obě strany — teď jde jen o to, kdo na něj dostane věž dřív."

#### tah 5 (bílý) — `a1a4` Rua a1→a4 · data [7,0]→[4,0] — **CHYBA**

- ztráta: **1499 cp** (eval před tahem +738 → po tahu -761, z pohledu bílého)
- engine preferuje: `a1a8` Rua a1×a8 (Rua) (eval +738), PV: `a1a8 c8c7 f3f4 b8d7 f1e2 g8e7`
- po zahraném tahu soupeř může: `b5a4` Bia b5×a4 (Rua) (eval +761 pro černého)
- komentář z dat: „Bílá Rua vykračuje na a4 po prázdném sloupci. Tři pole najednou — Rua se hýbe ortogonálně jako šachová věž."

#### tah 6 (černý) — `b8d7` Ma b8→d7 · data [0,1]→[1,3] — **CHYBA**

- ztráta: **1453 cp** (eval před tahem +761 → po tahu -692, z pohledu černého)
- engine preferuje: `b5a4` Bia b5×a4 (Rua) (eval +761), PV: `b5a4 b3a4 a8a4 c3c4 g8e7 b1c3`
- po zahraném tahu soupeř může: `a4a8` Rua a4×a8 (Rua) (eval +692 pro bílého)
- komentář z dat: „Kůň na d7 — a právě tady černý dělá chybu, kterou má varianta ukázat. Po výměně se uvolnilo pole a6, kam kůň také může a odkud by sloupec b…"

#### tah 7 (bílý) — `a4a6` Rua a4→a6 · data [4,0]→[2,0] — **CHYBA**

- ztráta: **1484 cp** (eval před tahem +692 → po tahu -792, z pohledu bílého)
- engine preferuje: `a4a8` Rua a4×a8 (Rua) (eval +692), PV: `a4a8 c8b7 a8a1 f6f5 b1d2 f8e7`
- po zahraném tahu soupeř může: `a8a6` Rua a8×a6 (Rua) (eval +792 pro černého)
- komentář z dat: „Bílá Rua zaujímá 6. řadu (rank 6 z bílého pohledu). Napadá černé pěšce a má za sebou volný sloupec."

#### tah 8 (černý) — `d6d5` Bia d6→d5 · data [2,3]→[3,3] — **CHYBA**

- ztráta: **1476 cp** (eval před tahem +792 → po tahu -684, z pohledu černého)
- engine preferuje: `a8a6` Rua a8×a6 (Rua) (eval +792), PV: `a8a6 h3h4 h6h5 b1d2 g8e7 g1e2`
- po zahraném tahu soupeř může: `a6a8` Rua a6×a8 (Rua) (eval +684 pro bílého)
- komentář z dat: „d5. Černý chce protihru v centru a doufá, že bude rychlejší než bílá věž. Je to hazard: a-sloupec zůstává otevřený a nikdo ho nebrání."

#### tah 9 (bílý) — `a6a7` Rua a6→a7 · data [2,0]→[1,0] — **CHYBA**

- ztráta: **1476 cp** (eval před tahem +684 → po tahu -792, z pohledu bílého)
- engine preferuje: `a6a8` Rua a6×a8 (Rua) (eval +684), PV: `a6a8 c8b7 a8a1 c6c5 g1e2 h6h5`
- po zahraném tahu soupeř může: `a8a7` Rua a8×a7 (Rua) (eval +792 pro černého)
- komentář z dat: „Rua na 7. řadě! Kontaktuje černou Rua a a8. Toto je vrchol celého plánu — Rua hluboko v soupeřově táboře, omezující krále a vyhrožující jeh…"

#### tah 10 (černý) — `c8b7` Khon c8→b7 · data [0,2]→[1,1] — **CHYBA**

- ztráta: **762 cp** (eval před tahem +792 → po tahu +30, z pohledu černého)
- engine preferuje: `a8a7` Rua a8×a7 (Rua) (eval +792), PV: `a8a7 b1d2 h6h5 f3f4 c6c5 g1f3`
- po zahraném tahu soupeř může: `a7a8` Rua a7×a8 (Rua) (eval -30 pro bílého)
- komentář z dat: „Khon na b7 — konečně tah se záměrem. Khon dosáhne diagonálně dozadu na a8 a kryje tak vlastní Rua, takže bílá věž na a7 nemá koho brát. Čer…"

### strategy · rua-on-7th/h-file-rook

*Rua na 7. řadě — Otevření h-sloupce*

#### tah 4 (černý) — `h6g5` Bia h6×g5 (Bia) · data [2,7]→[3,6] — **CHYBA**

- ztráta: **647 cp** (eval před tahem -76 → po tahu -723, z pohledu černého)
- engine preferuje: `f6g5` Bia f6×g5 (Bia) (eval -76), PV: `f6g5 b1d2 f8g7 f3f4 g5g4 g1e2`
- po zahraném tahu soupeř může: `h1h8` Rua h1×h8 (Rua) (eval +723 pro bílého)
- komentář z dat: „Bere zpět h-pěšcem. Sloupec je volný — jenže bílá Rua na h1 je na tahu dřív. Přesně o tohle tempo v celé variantě jde."

#### tah 5 (bílý) — `h1h7` Rua h1→h7 · data [7,7]→[1,7] — **CHYBA**

- ztráta: **1461 cp** (eval před tahem +723 → po tahu -738, z pohledu bílého)
- engine preferuje: `h1h8` Rua h1×h8 (Rua) (eval +723), PV: `h1h8 e8f7 c3c4 c6c5 b1c3 b8c6`
- po zahraném tahu soupeř může: `h8h7` Rua h8×h7 (Rua) (eval +738 pro černého)
- komentář z dat: „Rua přímo na h7! Využívá volného h-sloupce a okamžitě proniká do černého tábora. h8 je obsazená černá Rua, takže bílá zastaví o pole dřív."

#### tah 6 (černý) — `f6f5` Bia f6→f5 · data [2,5]→[3,5] — **CHYBA**

- ztráta: **1453 cp** (eval před tahem +738 → po tahu -715, z pohledu černého)
- engine preferuje: `h8h7` Rua h8×h7 (Rua) (eval +738), PV: `h8h7 g1e2 g8e7 c3c4 b8d7 d1c2`
- po zahraném tahu soupeř může: `h7h8` Rua h7×h8 (Rua) (eval +715 pro bílého)
- komentář z dat: „f5. Věž na h7 pěšcem nevyžene, tak černý mění plán: uvolňuje f6 pro koně, který na ni dosáhne, a zároveň si bere prostor."

#### tah 7 (bílý) — `f3f4` Bia f3→f4 · data [5,5]→[4,5] — **CHYBA**

- ztráta: **1369 cp** (eval před tahem +715 → po tahu -654, z pohledu bílého)
- engine preferuje: `h7h8` Rua h7×h8 (Rua) (eval +715), PV: `h7h8 g8f6 g1h3 g5g4 f3g4 f6g4`
- po zahraném tahu soupeř může: `h8h7` Rua h8×h7 (Rua) (eval +654 pro černého)
- komentář z dat: „Bílý f-pěšec vpřed. Zpevňuje královské křídlo a uvolňuje f3 pro koně."

#### tah 8 (černý) — `g8f6` Ma g8→f6 · data [0,6]→[2,5] — **CHYBA**

- ztráta: **1346 cp** (eval před tahem +654 → po tahu -692, z pohledu černého)
- engine preferuje: `h8h7` Rua h8×h7 (Rua) (eval +654), PV: `h8h7`
- po zahraném tahu soupeř může: `h7h8` Rua h7×h8 (Rua) (eval +692 pro bílého)
- komentář z dat: „Kůň na f6 — a rovnou útočí na bílou Rua na h7 (skok f6-h7 je legální L). Černý našel jedním tahem obránce i útočníka."

#### tah 9 (bílý) — `g1f3` Ma g1→f3 · data [7,6]→[5,5] — **CHYBA**

- ztráta: **1430 cp** (eval před tahem +692 → po tahu -738, z pohledu bílého)
- engine preferuje: `h7h8` Rua h7×h8 (Rua) (eval +692), PV: `h7h8 g5g4 b1d2 c6c5 e3e4 e8f7`
- po zahraném tahu soupeř může: `f6h7` Ma f6×h7 (Rua) (eval +738 pro černého)
- komentář z dat: „Bílý kůň na f3. f-pěšec ustoupil, takže kůň může obsadit aktivní pole a podpořit Rua."

#### tah 10 (černý) — `d6d5` Bia d6→d5 · data [2,3]→[3,3] — **CHYBA**

- ztráta: **1461 cp** (eval před tahem +738 → po tahu -723, z pohledu černého)
- engine preferuje: `f6h7` Ma f6×h7 (Rua) (eval +738), PV: `f6h7 a1a2 g5g4 f3h4 h7f6 a2e2`
- po zahraném tahu soupeř může: `h7h8` Rua h7×h8 (Rua) (eval +723 pro bílého)
- komentář z dat: „d5. Věž má černý pod kontrolou, a tak přechází k vlastnímu plánu: prostor v centru, kde bílý zatím nic nepostavil."

#### tah 11 (bílý) — `d3d4` Bia d3→d4 · data [5,3]→[4,3] — **CHYBA**

- ztráta: **1470 cp** (eval před tahem +723 → po tahu -747, z pohledu bílého)
- engine preferuje: `h7h8` Rua h7×h8 (Rua) (eval +723), PV: `h7h8 g5g4 f3g5 e8e7 h8h2 b8d7`
- po zahraném tahu soupeř může: `f6h7` Ma f6×h7 (Rua) (eval +747 pro černého)
- komentář z dat: „Bílý d-pěšec vpřed. Dává centru váhu a připravuje další figury na koordinovaný tlak."

#### tah 12 (černý) — `b8d7` Ma b8→d7 · data [0,1]→[1,3] — **CHYBA**

- ztráta: **1447 cp** (eval před tahem +747 → po tahu -700, z pohledu černého)
- engine preferuje: `f6h7` Ma f6×h7 (Rua) (eval +747), PV: `f6h7`
- po zahraném tahu soupeř může: `h7h8` Rua h7×h8 (Rua) (eval +700 pro bílého)
- komentář z dat: „Kůň na d7. Černý dorovnal rozvoj a bilance je vyrovnaná: bílý má věž na 7. řadě, černý za to má centrum a jezdce, který na ni dosáhne."

### strategy · rua-on-7th/b-file-rook

*Rua na 7. řadě — Rua přes b-sloupec*

#### tah 9 (bílý) — `b1b7` Rua b1→b7 · data [7,1]→[1,1] — **CHYBA**

- ztráta: **753 cp** (eval před tahem +7 → po tahu -746, z pohledu bílého)
- engine preferuje: `f3f4` Bia f3→f4 (eval +7), PV: `f3f4 g8e7 d1e2 g6g5 g1f3 c8c7`
- po zahraném tahu soupeř může: `c8b7` Khon c8×b7 (Rua) (eval +746 pro černého)
- komentář z dat: „Rua na b7! b-sloupec je otevřený a bílá věž opět proniká na 7. řadu — tentokrát z jiného úhlu."

#### tah 10 (černý) — `g8e7` Ma g8→e7 · data [0,6]→[1,4] — **CHYBA**

- ztráta: **685 cp** (eval před tahem +746 → po tahu +61, z pohledu černého)
- engine preferuje: `c8b7` Khon c8×b7 (Rua) (eval +746), PV: `c8b7 f3f4 d6d5 g1f3 f8e7 d1e2`
- po zahraném tahu soupeř může: `b7b3` Rua b7→b3 (eval -61 pro bílého)
- komentář z dat: „Kůň na e7. Jezdce na d7 černý nechává stát — kryje ho Khon z c8 — a rozvíjí druhého. Bílá věž na b7 sice tlačí, ale nemá do čeho kousnout."

#### tah 11 (bílý) — `d3d4` Bia d3→d4 · data [5,3]→[4,3] — **CHYBA**

- ztráta: **723 cp** (eval před tahem -61 → po tahu -784, z pohledu bílého)
- engine preferuje: `b7b3` Rua b7→b3 (eval -61), PV: `b7b3 d6d5 f3f4 c8c7 g1f3 c7d6`
- po zahraném tahu soupeř může: `c8b7` Khon c8×b7 (Rua) (eval +784 pro černého)
- komentář z dat: „Bílý d-pěšec vpřed. Dává centru váhu a otevírá diagonálu pro Met."

#### tah 12 (černý) — `e6e5` Bia e6→e5 · data [2,4]→[3,4] — **CHYBA**

- ztráta: **661 cp** (eval před tahem +784 → po tahu +123, z pohledu černého)
- engine preferuje: `c8b7` Khon c8×b7 (Rua) (eval +784), PV: `c8b7 f1f2 h6h5 f3f4 d8c7 g1f3`
- po zahraném tahu soupeř může: `b7b3` Rua b7→b3 (eval -123 pro bílého)
- komentář z dat: „e5. Černý zavírá centrum a jeho plán je jasný: věž na b7 je hluboko a bez podpory. Stačí ji odříznout a bude bílému spíš přítěží než zbraní."

### strategy · rua-on-7th/a-file-active-knights

*Rua na 7. řadě — Otevření a-sloupce s aktivními koni*

#### tah 4 (černý) — `a6b5` Bia a6×b5 (Bia) · data [2,0]→[3,1] — **CHYBA**

- ztráta: **654 cp** (eval před tahem -53 → po tahu -707, z pohledu černého)
- engine preferuje: `c6b5` Bia c6×b5 (Bia) (eval -53), PV: `c6b5 f3f4 b8c6 g1f3 f6f5 e3e4`
- po zahraném tahu soupeř může: `a1a8` Rua a1×a8 (Rua) (eval +707 pro bílého)
- komentář z dat: „Bere zpět a-pěšcem. Sloupec je volný, jenže na tahu je bílý a jeho věž je blíž. Tempo rozhoduje."

#### tah 5 (bílý) — `a1a7` Rua a1→a7 · data [7,0]→[1,0] — **CHYBA**

- ztráta: **1483 cp** (eval před tahem +707 → po tahu -776, z pohledu bílého)
- engine preferuje: `a1a8` Rua a1×a8 (Rua) (eval +707), PV: `a1a8 d8c7 f3f4 g8e7 g1f3 c6c5`
- po zahraném tahu soupeř může: `a8a7` Rua a8×a7 (Rua) (eval +776 pro černého)
- komentář z dat: „Rua rovnou na a7. Bílý neztrácí čas mezipolíčky a okamžitě okupuje 7. řadu."

#### tah 6 (černý) — `f6f5` Bia f6→f5 · data [2,5]→[3,5] — **CHYBA**

- ztráta: **1483 cp** (eval před tahem +776 → po tahu -707, z pohledu černého)
- engine preferuje: `a8a7` Rua a8×a7 (Rua) (eval +776), PV: `a8a7 f1f2 h6h5 b1d2 g8e7 d3d4`
- po zahraném tahu soupeř může: `a7a8` Rua a7×a8 (Rua) (eval +707 pro bílého)
- komentář z dat: „f5. Věž na a7 už nevyžene, tak černý otevírá druhou frontu: uvolňuje f6 pro koně a chystá hru na královském křídle."

#### tah 7 (bílý) — `f3f4` Bia f3→f4 · data [5,5]→[4,5] — **CHYBA**

- ztráta: **1468 cp** (eval před tahem +707 → po tahu -761, z pohledu bílého)
- engine preferuje: `a7a8` Rua a7×a8 (Rua) (eval +707), PV: `a7a8 c8c7 f3f4 g8f6 g1f3 e8f7`
- po zahraném tahu soupeř může: `a8a7` Rua a8×a7 (Rua) (eval +761 pro černého)
- komentář z dat: „Bílý f-pěšec vpřed. Uvolňuje f3 a zpevňuje královské křídlo."

#### tah 8 (černý) — `g8f6` Ma g8→f6 · data [0,6]→[2,5] — **CHYBA**

- ztráta: **1468 cp** (eval před tahem +761 → po tahu -707, z pohledu černého)
- engine preferuje: `a8a7` Rua a8×a7 (Rua) (eval +761), PV: `a8a7 b1d2 b8d7 g1f3 g8f6 f1e2`
- po zahraném tahu soupeř může: `a7a8` Rua a7×a8 (Rua) (eval +707 pro bílého)
- komentář z dat: „Kůň na f6. Míří na e4 a g4 — černý chce jezdce v bílé polovině dřív, než tam bílá věž natáhne posily."

#### tah 9 (bílý) — `g1f3` Ma g1→f3 · data [7,6]→[5,5] — **CHYBA**

- ztráta: **1491 cp** (eval před tahem +707 → po tahu -784, z pohledu bílého)
- engine preferuje: `a7a8` Rua a7×a8 (Rua) (eval +707), PV: `a7a8 d8c7 b3b4 e8f7 g1f3 f8e7`
- po zahraném tahu soupeř může: `a8a7` Rua a8×a7 (Rua) (eval +784 pro černého)
- komentář z dat: „Bílý kůň na f3. f-pěšec ustoupil, takže kůň obsazuje aktivní pole."

#### tah 10 (černý) — `d6d5` Bia d6→d5 · data [2,3]→[3,3] — **CHYBA**

- ztráta: **1560 cp** (eval před tahem +784 → po tahu -776, z pohledu černého)
- engine preferuje: `a8a7` Rua a8×a7 (Rua) (eval +784), PV: `a8a7 b1d2 e8f7 e3e4 f8e7 b3b4`
- po zahraném tahu soupeř může: `a7a8` Rua a7×a8 (Rua) (eval +776 pro bílého)
- komentář z dat: „d5. Černý si bere centrum. Věž na a7 je nepříjemná, ale sama nic nedobude — kdo má střed, ten určuje, kde se bude hrát."

#### tah 11 (bílý) — `d3d4` Bia d3→d4 · data [5,3]→[4,3] — **CHYBA**

- ztráta: **1529 cp** (eval před tahem +776 → po tahu -753, z pohledu bílého)
- engine preferuje: `a7a8` Rua a7×a8 (Rua) (eval +776), PV: `a7a8 c8c7 h1g1 f8e7 g3g4 f5g4`
- po zahraném tahu soupeř může: `a8a7` Rua a8×a7 (Rua) (eval +753 pro černého)
- komentář z dat: „Bílý d-pěšec vpřed. Bílý má Rua na 7. řadě a aktivního koně — partie je napjatá."

#### tah 12 (černý) — `b8d7` Ma b8→d7 · data [0,1]→[1,3] — **CHYBA**

- ztráta: **1476 cp** (eval před tahem +753 → po tahu -723, z pohledu černého)
- engine preferuje: `a8a7` Rua a8×a7 (Rua) (eval +753), PV: `a8a7 f1e2 f8e7 e2d3 c8c7 h1g1`
- po zahraném tahu soupeř může: `a7a8` Rua a7×a8 (Rua) (eval +723 pro bílého)
- komentář z dat: „Kůň na d7. Kryje b6 i c5 a černý má hotovo: bílý má věž na 7. řadě, černý centrum a dva aktivní jezdce. Za pronikání se platí zanedbaným ro…"

### strategy · promo-prep/e-file-push

*Příprava promoce — Tlak po e-sloupci*

#### tah 10 (černý) — `d8e7` Met d8→e7 · data [0,3]→[1,4] — **CHYBA**

- ztráta: **432 cp** (eval před tahem +25 → po tahu -407, z pohledu černého)
- engine preferuje: `d7c5` Ma d7→c5 (eval +25), PV: `d7c5`
- po zahraném tahu soupeř může: `e6d7` P+ e6×d7 (Ma) (eval +407 pro bílého)
- komentář z dat: „Met na e7 — přesně podle plánu. Kryje d6 i f6, takže povýšený pěšec na e6 nemá kam a stává se z něj spíš zajatec než hrozba. Černý za to pl…"

### strategy · promo-prep/d-pawn-e5-promo

*Příprava promoce — Tlak po e-sloupci přes d-pěšce*

#### tah 4 (černý) — `f6f5` Bia f6→f5 · data [2,5]→[3,5] — **CHYBA**

- ztráta: **399 cp** (eval před tahem +61 → po tahu -338, z pohledu černého)
- engine preferuje: `f6e5` Bia f6×e5 (Bia) (eval +61), PV: `f6e5 g1e2 g8f6 a3a4 a6a5 d1c2`
- po zahraném tahu soupeř může: `e5d6m` Bia e5×d6 (Bia)=P+ (eval +338 pro bílého)
- komentář z dat: „f5. Promoci už černý nezastaví, tak volí druhou nejlepší věc: uvolňuje f6 pro koně, který se k povýšenému pěšci dostane nejrychleji."

#### tah 5 (bílý) — `e5e6m` Bia e5→e6=P+ · data [3,4]→[2,4] — **NEPŘESNOST**

- ztráta: **154 cp** (eval před tahem +338 → po tahu +184, z pohledu bílého)
- engine preferuje: `e5d6m` Bia e5×d6 (Bia)=P+ (eval +338), PV: `e5d6m`
- po zahraném tahu soupeř může: `f8e7` Khon f8→e7 (eval -184 pro černého)
- komentář z dat: „Promoce! Bílý pěšec z e5 postoupí na e6 a automaticky se mění na P+. V makruku není volba — promoce je vynucená na 6. řadě."

#### tah 6 (černý) — `b8d7` Ma b8→d7 · data [0,1]→[1,3] — **NEPŘESNOST**

- ztráta: **239 cp** (eval před tahem -184 → po tahu -423, z pohledu černého)
- engine preferuje: `f8e7` Khon f8→e7 (eval -184), PV: `f8e7 e6f5 g6f5 g3g4 e7f6 g1e2`
- po zahraném tahu soupeř může: `e6d7` P+ e6×d7 (Ma) (eval +423 pro bílého)
- komentář z dat: „Kůň na d7. Míří na c5 a e5 — černý chce obsadit pole kolem e6 dřív, než bílý povýšeného pěšce podepře."

#### tah 7 (bílý) — `f3f4` Bia f3→f4 · data [5,5]→[4,5] — **CHYBA**

- ztráta: **378 cp** (eval před tahem +423 → po tahu +45, z pohledu bílého)
- engine preferuje: `e6d7` P+ e6×d7 (Ma) (eval +423), PV: `e6d7 c8d7 g3g4 g8f6 a3a4 d6d5`
- po zahraném tahu soupeř může: `d7c5` Ma d7→c5 (eval -45 pro černého)
- komentář z dat: „Bílý f-pěšec vpřed. Zpevňuje královské křídlo a uvolňuje f3 pro koně."

#### tah 8 (černý) — `g8f6` Ma g8→f6 · data [0,6]→[2,5] — **CHYBA**

- ztráta: **363 cp** (eval před tahem -45 → po tahu -408, z pohledu černého)
- engine preferuje: `d7c5` Ma d7→c5 (eval -45), PV: `d7c5`
- po zahraném tahu soupeř může: `e6d7` P+ e6×d7 (Ma) (eval +408 pro bílého)
- komentář z dat: „Kůň na f6. Na e6 sám nedosáhne, ale drží e4 i g4 a odřezává povýšenému pěšci cestu k posilám. Černý ho chce vyhladovět, ne brát za každou c…"

#### tah 9 (bílý) — `g1f3` Ma g1→f3 · data [7,6]→[5,5] — **NEPŘESNOST**

- ztráta: **232 cp** (eval před tahem +408 → po tahu +176, z pohledu bílého)
- engine preferuje: `e6d7` P+ e6×d7 (Ma) (eval +408), PV: `e6d7`
- po zahraném tahu soupeř může: `d7c5` Ma d7→c5 (eval -176 pro černého)
- komentář z dat: „Bílý kůň na f3. f-pěšec ustoupil, takže kůň může bránit královské křídlo a podporovat povýšeného pěšce."

#### tah 10 (černý) — `c6c5` Bia c6→c5 · data [2,2]→[3,2] — **CHYBA**

- ztráta: **277 cp** (eval před tahem -176 → po tahu -453, z pohledu černého)
- engine preferuje: `d7c5` Ma d7→c5 (eval -176), PV: `d7c5 f3d4 f8e7 e6f5 g6f5 d1c2`
- po zahraném tahu soupeř může: `e6d7` P+ e6×d7 (Ma) (eval +453 pro bílého)
- komentář z dat: „c5. Černý otevírá druhou frontu na dámském křídle: dokud je bílý zaměstnaný jedním pěšcem na e6, může si tady vzít prostor skoro zadarmo."

### strategy · promo-prep/b-pawn-promo

*Příprava promoce — Tlak po b-sloupci*

#### tah 4 (černý) — `a6a5` Bia a6→a5 · data [2,0]→[3,0] — **CHYBA**

- ztráta: **261 cp** (eval před tahem -46 → po tahu -307, z pohledu černého)
- engine preferuje: `c6b5` Bia c6×b5 (Bia) (eval -46), PV: `c6b5 f3f4 e8f7 e3e4 b8c6 g1f3`
- po zahraném tahu soupeř může: `b5b6m` Bia b5→b6=P+ (eval +307 pro bílého)
- komentář z dat: „a5. Černý chce pěšce obejít z boku, jenže na b-sloupec odsud nedosáhne — Bia bere jen diagonálně vpřed. Tady se ukazuje, že proti průchozím…"

#### tah 7 (bílý) — `c3c4` Bia c3→c4 · data [5,2]→[4,2] — **NEPŘESNOST**

- ztráta: **231 cp** (eval před tahem +315 → po tahu +84, z pohledu bílého)
- engine preferuje: `b6a5` P+ b6×a5 (Bia) (eval +315), PV: `b6a5 g8e7 f3f4 e8f7 c1b2 c6c5`
- po zahraném tahu soupeř může: `d7b6` Ma d7×b6 (P+) (eval -84 pro černého)
- komentář z dat: „Bílý c-pěšec vpřed. Uvolňuje c3 pro koně a získává prostor na dámském křídle."

#### tah 11 (bílý) — `d3d4` Bia d3→d4 · data [5,3]→[4,3] — **NEPŘESNOST**

- ztráta: **194 cp** (eval před tahem +270 → po tahu +76, z pohledu bílého)
- engine preferuje: `c3b5` Ma c3→b5 (eval +270), PV: `c3b5`
- po zahraném tahu soupeř může: `c5d4` Bia c5×d4 (Bia) (eval -76 pro černého)
- komentář z dat: „Bílý d-pěšec vpřed. Dává centru váhu a otevírá diagonálu pro Met."

#### tah 12 (černý) — `f6f5` Bia f6→f5 · data [2,5]→[3,5] — **CHYBA**

- ztráta: **316 cp** (eval před tahem -76 → po tahu -392, z pohledu černého)
- engine preferuje: `c5d4` Bia c5×d4 (Bia) (eval -76), PV: `c5d4 e3d4 d7b6 g1e2 e8f7 d1c2`
- po zahraném tahu soupeř může: `c3b5` Ma c3→b5 (eval +392 pro bílého)
- komentář z dat: „f5. Černý otevírá druhou frontu. Bílý má sice povýšeného pěšce, ale všechny jeho figury zůstaly na dámském křídle — královské křídlo patří …"

### strategy · promo-prep/c-pawn-via-b

*Příprava promoce — Tlak po c-sloupci přes b-pěšce*

#### tah 5 (bílý) — `c4b5` Bia c4×b5 (Bia) · data [4,2]→[3,1] — **NEPŘESNOST**

- ztráta: **175 cp** (eval před tahem +92 → po tahu -83, z pohledu bílého)
- engine preferuje: `a4b5` Bia a4×b5 (Bia) (eval +92), PV: `a4b5 c6b5 c4b5 c8b7 b5a6m a8a6`
- po zahraném tahu soupeř může: `a6b5` Bia a6×b5 (Bia) (eval +83 pro černého)
- komentář z dat: „Bílý c-pěšec bere černého b-pěšce. Bílý pěšec je nyní na b5 a hrozí c6 s promocí."

#### tah 6 (černý) — `a6a5` Bia a6→a5 · data [2,0]→[3,0] — **CHYBA**

- ztráta: **323 cp** (eval před tahem +83 → po tahu -240, z pohledu černého)
- engine preferuje: `a6b5` Bia a6×b5 (Bia) (eval +83), PV: `a6b5 f3f4`
- po zahraném tahu soupeř může: `b5c6m` Bia b5×c6 (Bia)=P+ (eval +240 pro bílého)
- komentář z dat: „a5. Černý chce pěšce zablokovat z boku, jenže na b5 z a5 nedosáhne — Bia bere diagonálně vpřed, ne do strany. Tenhle tah přišel o tah pozdě."

#### tah 8 (černý) — `e6e5` Bia e6→e5 · data [2,4]→[3,4] — **CHYBA**

- ztráta: **321 cp** (eval před tahem -238 → po tahu -559, z pohledu černého)
- engine preferuje: `d7e5` Ma d7→e5 (eval -238), PV: `d7e5 c6b5 e5d3 c1d2 d3c5 d1c2`
- po zahraném tahu soupeř může: `c6d7` P+ c6×d7 (Ma) (eval +559 pro bílého)
- komentář z dat: „e5. Povýšeného pěšce na c6 zatím žádná černá figura nenapadá, tak si černý bere aspoň to, co bílý zanedbal — centrum. Bílý má hodnotu navíc…"

#### tah 10 (černý) — `f6f5` Bia f6→f5 · data [2,5]→[3,5] — **NEPŘESNOST**

- ztráta: **154 cp** (eval před tahem -415 → po tahu -569, z pohledu černého)
- engine preferuje: `d7c5` Ma d7→c5 (eval -415), PV: `d7c5 c1c2 g8e7 c6d5 c5a6 g1e2`
- po zahraném tahu soupeř může: `c6d7` P+ c6×d7 (Ma) (eval +569 pro bílého)
- komentář z dat: „f5. Druhá fronta. Bílý strávil pět tahů jedním pěšcem na dámském křídle a královské křídlo nechal být — přesně tam černý útočí."

#### tah 11 (bílý) — `d3d4` Bia d3→d4 · data [5,3]→[4,3] — **NEPŘESNOST**

- ztráta: **202 cp** (eval před tahem +569 → po tahu +367, z pohledu bílého)
- engine preferuje: `c6d7` P+ c6×d7 (Ma) (eval +569), PV: `c6d7 c8d7 d1c2 e8f7 c2b2 f8e7`
- po zahraném tahu soupeř může: `d7f6` Ma d7→f6 (eval -367 pro černého)
- komentář z dat: „Bílý d-pěšec vpřed. Centrální tlak doplňuje hrozbu povýšeného pěšce na c6."

#### tah 12 (černý) — `g8f6` Ma g8→f6 · data [0,6]→[2,5] — **NEPŘESNOST**

- ztráta: **191 cp** (eval před tahem -367 → po tahu -558, z pohledu černého)
- engine preferuje: `d7f6` Ma d7→f6 (eval -367), PV: `d7f6 d4d5`
- po zahraném tahu soupeř může: `c6d7` P+ c6×d7 (Ma) (eval +558 pro bílého)
- komentář z dat: „Kůň na f6. Míří na e4 a g4 a černý má plán hotový: bílý má silného pěšce na c6, černý za to iniciativu na druhé straně desky. Promoce není …"

### strategy · promo-prep/f-pawn-g-promo

*Příprava promoce — Tlak po f-sloupci*

#### tah 3 (bílý) — `g4g5` Bia g4→g5 · data [4,6]→[3,6] — **NEPŘESNOST**

- ztráta: **239 cp** (eval před tahem -7 → po tahu -246, z pohledu bílého)
- engine preferuje: `h3h4` Bia h3→h4 (eval -7), PV: `h3h4 g8e7 f3f4 c6c5 g1f3 b8c6`
- po zahraném tahu soupeř může: `h6g5` Bia h6×g5 (Bia) (eval +246 pro černého)
- komentář z dat: „g-pěšec na g5. Bílý tlačí dál a připravuje sebrání f-pěšce."

#### tah 4 (černý) — `b8d7` Ma b8→d7 · data [0,1]→[1,3] — **NEPŘESNOST**

- ztráta: **184 cp** (eval před tahem +246 → po tahu +62, z pohledu černého)
- engine preferuje: `h6g5` Bia h6×g5 (Bia) (eval +246), PV: `h6g5 b1d2 c6c5 g1e2 b8c6 d1c2`
- po zahraném tahu soupeř může: `g5f6m` Bia g5×f6 (Bia)=P+ (eval -62 pro bílého)
- komentář z dat: „Kůň na d7. Bílý žene pěšce po křídle, černý staví figuru do centra: odsud dosáhne kamkoli, kdežto pěšec umí jen dopředu."

#### tah 10 (černý) — `e6e5` Bia e6→e5 · data [2,4]→[3,4] — **CHYBA**

- ztráta: **284 cp** (eval před tahem 0 → po tahu -284, z pohledu černého)
- engine preferuje: `f8e7` Khon f8→e7 (eval 0), PV: `f8e7 h1g1 e8f7 f3e5 d7e5 f4e5`
- po zahraném tahu soupeř může: `f4e5` Bia f4×e5 (Bia) (eval +284 pro bílého)
- komentář z dat: „e5. V pěšcích je materiál vyrovnaný, ale černý vyměnil obyčejného Bia za povýšeného — a to je zisk v hodnotě. Teď zavírá centrum a míří do …"

#### tah 11 (bílý) — `d3d4` Bia d3→d4 · data [5,3]→[4,3] — **CHYBA**

- ztráta: **375 cp** (eval před tahem +284 → po tahu -91, z pohledu bílého)
- engine preferuje: `f4e5` Bia f4×e5 (Bia) (eval +284), PV: `f4e5 f6h5 e5e6m d7f6 c3c4 d5c4`
- po zahraném tahu soupeř může: `e5f4` Bia e5×f4 (Bia) (eval +91 pro černého)
- komentář z dat: „Bílý d-pěšec vpřed. Doplňuje tlak v centru a otevírá diagonálu pro Met."

#### tah 12 (černý) — `f8e7` Khon f8→e7 · data [0,5]→[1,4] — **CHYBA**

- ztráta: **275 cp** (eval před tahem +91 → po tahu -184, z pohledu černého)
- engine preferuje: `e5f4` Bia e5×f4 (Bia) (eval +91), PV: `e5f4 e3f4`
- po zahraném tahu soupeř může: `f4e5` Bia f4×e5 (Bia) (eval +184 pro bílého)
- komentář z dat: „Khon na e7. Kryje d6 i f6, kde stojí jeho vlastní kůň. Závěr varianty: promoce je silný motiv, ale povýšený pěšec bez podpory je jen dražší…"

### game · khon-met-coop

*Khon a Met spolu*

#### tah 12 (černý) — `c7d6` Met c7→d6 · data [1,2]→[2,3] — **CHYBA**

- ztráta: **361 cp** (eval před tahem 0 → po tahu -361, z pohledu černého)
- engine preferuje: `e8f7` Khun e8→f7 (eval 0), PV: `e8f7 d2e4 f6e5 f4d3 c7d6 d1c2`
- po zahraném tahu soupeř může: `e5d6m` Bia e5×d6 (Met)=P+ (eval +361 pro bílého)
- komentář z dat: „Černý Met se posunuje na d6 (diagonálně). Teď stojí v centru a kontroluje diagonály — pole c5, d6, e7, e5 jsou pod jeho dohledem."

#### tah 13 (bílý) — `f4e6` Ma f4→e6 · data [4,5]→[2,4] — **CHYBA**

- ztráta: **737 cp** (eval před tahem +361 → po tahu -376, z pohledu bílého)
- engine preferuje: `e5d6m` Bia e5×d6 (Met)=P+ (eval +361), PV: `e5d6m e7d6 f4g6 h8h7 f3e4 h7g7`
- po zahraném tahu soupeř může: `f6e5` Bia f6×e5 (Bia) (eval +376 pro černého)
- komentář z dat: „Bílý kůň útočí hluboko na e6. Aspoň dva problémy: nikoho přímo nenapadá smysluplně, a hlavně tam stojí napadený Khonem!"

#### tah 14 (černý) — `e7e6` Khon e7×e6 (Ma) · data [1,4]→[2,4] — **NEPŘESNOST**

- ztráta: **170 cp** (eval před tahem +376 → po tahu +206, z pohledu černého)
- engine preferuje: `f6e5` Bia f6×e5 (Bia) (eval +376), PV: `f6e5 d2e4 c8d7 e6g5 h6g5 e4g5`
- po zahraném tahu soupeř může: `e5d6m` Bia e5×d6 (Met)=P+ (eval -206 pro bílého)
- komentář z dat: „Černý Khon krokem dopředu (jeden z pěti pohybů Khona — diagonály + 1 dopředu) bere bílého koně na e6! Met za sebou drží defenzivně diagonál…"

#### tah 15 (bílý) — `e1f2` Met e1→f2 · data [7,4]→[6,5] — **CHYBA**

- ztráta: **317 cp** (eval před tahem -206 → po tahu -523, z pohledu bílého)
- engine preferuje: `e5d6m` Bia e5×d6 (Met)=P+ (eval -206), PV: `e5d6m`
- po zahraném tahu soupeř může: `d6e5` Met d6×e5 (Bia) (eval +523 pro černého)
- komentář z dat: „Bílý se snaží vyrovnat — Met na f2 (diagonálně). Pokouší se dostat figury do hry, ale je pozdě."

#### tah 16 (černý) — `e6d5` Khon e6→d5 · data [2,4]→[3,3] — **CHYBA**

- ztráta: **362 cp** (eval před tahem +523 → po tahu +161, z pohledu černého)
- engine preferuje: `d6e5` Met d6×e5 (Bia) (eval +523), PV: `d6e5 d2e4 f6f5 e4d2 b8d7 d1c2`
- po zahraném tahu soupeř může: `e5d6m` Bia e5×d6 (Met)=P+ (eval -161 pro bílého)
- komentář z dat: „Černý Khon se vrátí do centra na d5 — bezpečně chráněn. Black má kůň navíc. Materiálová výhoda je jednoznačná, partie bude pro černého tech…"

### game · passive-vs-active

*Pasivní obrana proti aktivnímu útoku*

#### tah 15 (bílý) — `d4d5` Bia d4→d5 · data [4,3]→[3,3] — **NEPŘESNOST**

- ztráta: **176 cp** (eval před tahem +100 → po tahu -76, z pohledu bílého)
- engine preferuje: `g3g4` Bia g3→g4 (eval +100), PV: `g3g4 a4b3m b2b3 d6d5 f3f4 c6c5`
- po zahraném tahu soupeř může: `h4g3m` Bia h4×g3 (Bia)=P+ (eval +76 pro černého)
- komentář z dat: „Bílý d-pěšec se posunuje na d5. Klíčový průlomový tah — připravuje výměnu, která otevře sloupec a uvolní pozici pro promoci."

#### tah 16 (černý) — `b6b5` Bia b6→b5 · data [2,1]→[3,1] — **CHYBA**

- ztráta: **329 cp** (eval před tahem +76 → po tahu -253, z pohledu černého)
- engine preferuje: `h4g3m` Bia h4×g3 (Bia)=P+ (eval +76), PV: `h4g3m g2g3 e6d5 e4d5 c6d5 d1c2`
- po zahraném tahu soupeř může: `d5e6m` Bia d5×e6 (Bia)=P+ (eval +253 pro bílého)
- komentář z dat: „Černý b-pěšec se rozhýbá — pozdě, ale lépe pozdě než vůbec."

#### tah 17 (bílý) — `d5c6m` Bia d5×c6 (Bia)=P+ · data [3,3]→[2,2] — **CHYBA**

- ztráta: **276 cp** (eval před tahem +253 → po tahu -23, z pohledu bílého)
- engine preferuje: `d5e6m` Bia d5×e6 (Bia)=P+ (eval +253), PV: `d5e6m b8a6`
- po zahraném tahu soupeř může: `b8c6` Ma b8×c6 (P+) (eval +23 pro černého)
- komentář z dat: „PROMOCE! Bílý d-pěšec bere černého c-pěšce diagonálně a v jednom tahu dosáhne 6. řady — automatická proměna na Met (P+). Bílý získává figur…"

#### tah 18 (černý) — `e7d8` Met e7→d8 · data [1,4]→[0,3] — **CHYBA**

- ztráta: **500 cp** (eval před tahem +23 → po tahu -477, z pohledu černého)
- engine preferuje: `b8c6` Ma b8×c6 (P+) (eval +23), PV: `b8c6 g3g4 g8h6 e2d4 c6d4 c3d4`
- po zahraném tahu soupeř může: `c6b7` P+ c6×b7 (Khon) (eval +477 pro bílého)
- komentář z dat: „Černá Met v zoufalství ustoupí na d8 (jiné diagonály jsou zablokované vlastními pěšáky/figurami). Žádnou hrozbu proti P+ nevytváří."

### game · kramnik-fianchetto

*Fianchetto Khon*

#### tah 16 (černý) — `c6d5` Khon c6→d5 · data [2,2]→[3,3] — **CHYBA**

- ztráta: **261 cp** (eval před tahem 0 → po tahu -261, z pohledu černého)
- engine preferuje: `d6d5` Bia d6→d5 (eval 0), PV: `d6d5 g2f3 d5e4 f3e4 e8f7 d1c2`
- po zahraném tahu soupeř může: `e4d5` Bia e4×d5 (Khon) (eval +261 pro bílého)
- komentář z dat: „Černý: Khon c6 → d5 (diagonálně SE)! Khon stojí v centru, atakuje pole e4 a kontroluje dlouhou diagonálu. Strategická převaha je hotová — f…"

### game · two-knights-mate

*Dva koně matují*

#### tah 6 (černý) — `b7c8` Khun b7→c8 · data [1,1]→[0,2] — **CHYBA**

- ztráta: **9990 cp** (eval před tahem 0 → po tahu -M1, z pohledu černého)
- engine preferuje: `b7a6` Khun b7×a6 (Ma) (eval 0), PV: `b7a6 b5a3 a6b7 a3b1 b7b6 b1d2`
- po zahraném tahu soupeř může: `b5d6` Ma b5→d6 (eval M1 pro bílého)
- komentář z dat: „Černý král ustupuje na c8, jediné zbývající volné pole."

### game · met-trap

*Past na Met*

#### tah 11 (bílý) — `d2b3` Ma d2→b3 · data [6,3]→[5,1] — **NEPŘESNOST**

- ztráta: **163 cp** (eval před tahem +71 → po tahu -92, z pohledu bílého)
- engine preferuje: `d4e5` Bia d4×e5 (Bia) (eval +71), PV: `d4e5 d7e5 f3f4 e5c4 d2c4 d5c4`
- po zahraném tahu soupeř může: `f5e4` Bia f5×e4 (Bia) (eval +92 pro černého)
- komentář z dat: „Bílý kůň na b3 — nyní má cestu na c5, kde čeká past na černou Met."

#### tah 16 (černý) — `d6c5` Met d6→c5 · data [2,3]→[3,2] — **CHYBA**

- ztráta: **314 cp** (eval před tahem +68 → po tahu -246, z pohledu černého)
- engine preferuje: `f5e4` Bia f5×e4 (Bia) (eval +68), PV: `f5e4 f3e4`
- po zahraném tahu soupeř může: `e4f5` Bia e4×f5 (Bia) (eval +246 pro bílého)
- komentář z dat: „Černá Met táhne na c5 — příliš daleko od bezpečí. Tento aktivní tah je pastí."

#### tah 17 (bílý) — `b3c5` Ma b3×c5 (Met) · data [5,1]→[3,2] — **CHYBA**

- ztráta: **360 cp** (eval před tahem +246 → po tahu -114, z pohledu bílého)
- engine preferuje: `e4f5` Bia e4×f5 (Bia) (eval +246), PV: `e4f5 c5d4 f5g6m d4c3 c2c3 g8e7`
- po zahraném tahu soupeř může: `b6c5` Bia b6×c5 (Ma) (eval +114 pro černého)
- komentář z dat: „Bílý kůň bere Met na c5! Černý spadl do pasti — Met byla aktivní, ale nechráněná. Materiální ztráta figury je rozhodující."

### game · symmetric-opening

*Symetrické zahájení*

#### tah 16 (černý) — `e7d5` Ma e7×d5 (Bia) · data [1,4]→[3,3] — **CHYBA**

- ztráta: **283 cp** (eval před tahem +14 → po tahu -269, z pohledu černého)
- engine preferuje: `c5d4` Bia c5×d4 (Bia) (eval +14), PV: `c5d4 e2c1`
- po zahraném tahu soupeř může: `e4d5` Bia e4×d5 (Ma) (eval +269 pro bílého)
- komentář z dat: „Černý kůň z e7 bere zpět na d5. Materiál je vyrovnaný, ale pozice už není symetrická — bílý má aktivnějšího koně."

#### tah 17 (bílý) — `e2c3` Ma e2→c3 · data [6,4]→[5,2] — **CHYBA**

- ztráta: **569 cp** (eval před tahem +269 → po tahu -300, z pohledu bílého)
- engine preferuje: `e4d5` Bia e4×d5 (Ma) (eval +269), PV: `e4d5 c5d4 d5d6m e8f7 e2c1 h8e8`
- po zahraném tahu soupeř může: `d5e3` Ma d5→e3 (eval +300 pro černého)
- komentář z dat: „Bílý kůň na c3 — napadá d5 a hrozí centrální aktivitou."

#### tah 18 (černý) — `d5c7` Ma d5→c7 · data [3,3]→[1,2] — **CHYBA**

- ztráta: **346 cp** (eval před tahem +300 → po tahu -46, z pohledu černého)
- engine preferuje: `d5e3` Ma d5→e3 (eval +300), PV: `d5e3 d1e2 e5d4 c3d5 e3g2 d2c4`
- po zahraném tahu soupeř může: `d4d5` Bia d4→d5 (eval +46 pro bílého)
- komentář z dat: „Černý kůň ustupuje na c7, daleko od centra. Bílý získal tempo."


## Zmeškaná braní

Tahy, kde engine jako nejlepší tah vidí braní, hráč táhl jinak (a nebral tutéž figuru jinou figurou) a buď to podle PV vynáší materiál ≥ 100 cp, nebo je ztráta tahu na úrovni chyby (≥ 250 cp). „Materiál po PV" = změna materiální bilance na konci hlavní varianty enginu (odhad podle kalibrovaných hodnot figur, z pohledu strany na tahu). Visící figura v koncové pozici je vidět v sekci „Tvrzení na konci" (nejlepší tah = braní).

| zdroj | id | tah | strana | engine: brát | eval po braní | zahráno | eval po zahraném | ztráta | materiál po PV | PV enginu |
|---|---|---:|---|---|---:|---|---:|---:|---:|---|
| strategy | central-push/c-pawn-knights | 11 | bílý | `d4e5` Bia d4×e5 (Bia) | +76 | `e2f4` Ma e2→f4 | -346 | 422 | -175 | `d4e5 d5e4 c3e4 f6e5 c1d2 e7f5 d1c2 f8e7` |
| strategy | central-push/c-pawn-knights | 12 | černý | `e5f4` Bia e5×f4 (Ma) | +346 | `e7f5` Ma e7→f5 | -146 | 492 | +415 | `e5f4 c4d5 c6d4 g3f4 c8c7 b3b4 d4f3 f1e2` |
| strategy | central-push/e-pawn-kingside | 8 | černý | `d5e4` Bia d5×e4 (Bia) | +15 | `f6f5` Bia f6→f5 | -253 | 268 | 0 | `d5e4 d2e4 f8e7 f4e5 f6e5 g1f3 g8f6 e4f6` |
| strategy | central-push/e-pawn-kingside | 9 | bílý | `e4d5` Bia e4×d5 (Bia) | +253 | `g1f3` Ma g1→f3 | -79 | 332 | +240 | `e4d5 e5d4 d5c6m d4c3m c6d7 c8d7 d2c4 b6b5` |
| strategy | central-push/e-pawn-kingside | 10 | černý | `f5e4` Bia f5×e4 (Bia) | +79 | `g8f6` Ma g8→f6 | -168 | 247 | +120 | `f5e4 f3e5 g8e7 d1c2 f8f7 c1b2 f7e6 f1e2` |
| strategy | khon-wall/central-khon-wall | 8 | černý | `c5d4` Bia c5×d4 (Bia) | +107 | `c8d7` Khon c8→d7 | -84 | 191 | +175 | `c5d4 e3d4 d5c4 b3c4 c6d4 d2d3 d4c6 f3f4` |
| strategy | khon-wall/central-khon-wall | 10 | černý | `d5c4` Bia d5×c4 (Bia) | +46 | `f8e7` Khon f8→e7 | -115 | 161 | +175 | `d5c4 d4c5 c4b3m c5b6m a8b8 b6c5 e8f7 f3f4` |
| strategy | khon-wall/central-khon-wall | 11 | bílý | `c4d5` Bia c4×d5 (Bia) | +115 | `d1c1` Khun d1→c1 | -153 | 268 | +175 | `c4d5 e6d5 d4c5 b6c5 c3d5 e7d6 d5c3 e8f7` |
| strategy | khon-wall/central-khon-wall | 12 | černý | `c5d4` Bia c5×d4 (Bia) | +153 | `e8f8` Khun e8→f8 | -130 | 283 | +175 | `c5d4 e3d4 c6d4 a1b1 e7d6 c4d5 d6d5 c1b2` |
| strategy | khon-wall/khon-wall-central-hit | 6 | černý | `h4g3m` Bia h4×g3 (Bia)=P+ | +184 | `h8h5` Rua h8→h5 | -115 | 299 | +250 | `h4g3m b1c3 g3h4 f3f4 b6b5 g1f3 b8d7 d1c2` |
| strategy | khon-wall/khon-wall-kingside | 10 | černý | `c5b3` Ma c5×b3 (Bia) | +107 | `e6e5` Bia e6→e5 | -66 | 173 | +175 | `c5b3 a1a2` |
| strategy | met-attack/met-g5-support | 12 | černý | `h6g5` Bia h6×g5 (Met) | +269 | `f8e7` Khon f8→e7 | -223 | 492 | +250 | `h6g5 e4f5 g6f5 g4f5 f6d5 f1f2 d5e7 g1e2` |
| strategy | met-attack/met-against-f5 | 10 | černý | `f5e4` Bia f5×e4 (Bia) | +107 | `e6e5` Bia e6→e5 | -246 | 353 | +175 | `f5e4 f1f2 e4f3m f2f3 f6h7 f4e5 a6a5 a3a4` |
| strategy | met-attack/met-against-f5 | 11 | bílý | `f4e5` Met f4×e5 (Bia) | +246 | `g1e2` Ma g1→e2 | -116 | 362 | +175 | `f4e5 f6h5 g1e2 f5e4 f3e4 h5g7 b1d2 f8e7` |
| strategy | met-attack/met-against-f5 | 12 | černý | `e5f4` Bia e5×f4 (Met) | +116 | `f8e7` Khon f8→e7 | -204 | 320 | +250 | `e5f4` |
| strategy | rua-on-7th/open-a-file | 5 | bílý | `a1a8` Rua a1×a8 (Rua) | +738 | `a1a4` Rua a1→a4 | -761 | 1499 | +730 | `a1a8 c8c7 f3f4 b8d7 f1e2 g8e7 g1f3 e8f7` |
| strategy | rua-on-7th/open-a-file | 6 | černý | `b5a4` Bia b5×a4 (Rua) | +761 | `b8d7` Ma b8→d7 | -692 | 1453 | +555 | `b5a4 b3a4 a8a4 c3c4 g8e7 b1c3 a4b4 c3e4` |
| strategy | rua-on-7th/open-a-file | 7 | bílý | `a4a8` Rua a4×a8 (Rua) | +692 | `a4a6` Rua a4→a6 | -792 | 1484 | +730 | `a4a8 c8b7 a8a1 f6f5 b1d2 f8e7 f1e2 g8f6` |
| strategy | rua-on-7th/open-a-file | 8 | černý | `a8a6` Rua a8×a6 (Rua) | +792 | `d6d5` Bia d6→d5 | -684 | 1476 | +730 | `a8a6 h3h4 h6h5 b1d2 g8e7 g1e2 e8f7 f1f2` |
| strategy | rua-on-7th/open-a-file | 9 | bílý | `a6a8` Rua a6×a8 (Rua) | +684 | `a6a7` Rua a6→a7 | -792 | 1476 | +730 | `a6a8 c8b7 a8a1 c6c5 g1e2 h6h5 b1d2 g8e7` |
| strategy | rua-on-7th/open-a-file | 10 | černý | `a8a7` Rua a8×a7 (Rua) | +792 | `c8b7` Khon c8→b7 | +30 | 762 | +730 | `a8a7 b1d2 h6h5 f3f4 c6c5 g1f3 g8e7 f1e2` |
| strategy | rua-on-7th/h-file-rook | 5 | bílý | `h1h8` Rua h1×h8 (Rua) | +723 | `h1h7` Rua h1→h7 | -738 | 1461 | +730 | `h1h8 e8f7 c3c4 c6c5 b1c3 b8c6 c1d2 f8g7` |
| strategy | rua-on-7th/h-file-rook | 6 | černý | `h8h7` Rua h8×h7 (Rua) | +738 | `f6f5` Bia f6→f5 | -715 | 1453 | +730 | `h8h7 g1e2 g8e7 c3c4 b8d7 d1c2 b6b5 b1c3` |
| strategy | rua-on-7th/h-file-rook | 7 | bílý | `h7h8` Rua h7×h8 (Rua) | +715 | `f3f4` Bia f3→f4 | -654 | 1369 | +730 | `h7h8 g8f6 g1h3 g5g4 f3g4 f6g4 h3g5 c8d7` |
| strategy | rua-on-7th/h-file-rook | 8 | černý | `h8h7` Rua h8×h7 (Rua) | +654 | `g8f6` Ma g8→f6 | -692 | 1346 | +730 | `h8h7` |
| strategy | rua-on-7th/h-file-rook | 9 | bílý | `h7h8` Rua h7×h8 (Rua) | +692 | `g1f3` Ma g1→f3 | -738 | 1430 | +730 | `h7h8 g5g4 b1d2 c6c5 e3e4 e8f7 a3a4 b8c6` |
| strategy | rua-on-7th/h-file-rook | 10 | černý | `f6h7` Ma f6×h7 (Rua) | +738 | `d6d5` Bia d6→d5 | -723 | 1461 | +730 | `f6h7 a1a2 g5g4 f3h4 h7f6 a2e2 d6d5 b1d2` |
| strategy | rua-on-7th/h-file-rook | 11 | bílý | `h7h8` Rua h7×h8 (Rua) | +723 | `d3d4` Bia d3→d4 | -747 | 1470 | +610 | `h7h8 g5g4 f3g5 e8e7 h8h2 b8d7 a3a4 f8g7` |
| strategy | rua-on-7th/h-file-rook | 12 | černý | `f6h7` Ma f6×h7 (Rua) | +747 | `b8d7` Ma b8→d7 | -700 | 1447 | +730 | `f6h7` |
| strategy | rua-on-7th/b-file-rook | 10 | černý | `c8b7` Khon c8×b7 (Rua) | +746 | `g8e7` Ma g8→e7 | +61 | 685 | +730 | `c8b7 f3f4 d6d5 g1f3 f8e7 d1e2 e7d6 e2f2` |
| strategy | rua-on-7th/b-file-rook | 12 | černý | `c8b7` Khon c8×b7 (Rua) | +784 | `e6e5` Bia e6→e5 | +123 | 661 | +730 | `c8b7 f1f2 h6h5 f3f4 d8c7 g1f3 d6d5 h1g1` |
| strategy | rua-on-7th/a-file-active-knights | 5 | bílý | `a1a8` Rua a1×a8 (Rua) | +707 | `a1a7` Rua a1→a7 | -776 | 1483 | +730 | `a1a8 d8c7 f3f4 g8e7 g1f3 c6c5 b1d2 e8f7` |
| strategy | rua-on-7th/a-file-active-knights | 6 | černý | `a8a7` Rua a8×a7 (Rua) | +776 | `f6f5` Bia f6→f5 | -707 | 1483 | +730 | `a8a7 f1f2 h6h5 b1d2 g8e7 d3d4 e8f7 f3f4` |
| strategy | rua-on-7th/a-file-active-knights | 7 | bílý | `a7a8` Rua a7×a8 (Rua) | +707 | `f3f4` Bia f3→f4 | -761 | 1468 | +730 | `a7a8 c8c7 f3f4 g8f6 g1f3 e8f7 d1c2 f8e7` |
| strategy | rua-on-7th/a-file-active-knights | 8 | černý | `a8a7` Rua a8×a7 (Rua) | +761 | `g8f6` Ma g8→f6 | -707 | 1468 | +730 | `a8a7 b1d2 b8d7 g1f3 g8f6 f1e2 e8f7 e3e4` |
| strategy | rua-on-7th/a-file-active-knights | 9 | bílý | `a7a8` Rua a7×a8 (Rua) | +707 | `g1f3` Ma g1→f3 | -784 | 1491 | +730 | `a7a8 d8c7 b3b4 e8f7 g1f3 f8e7 f1e2 b8d7` |
| strategy | rua-on-7th/a-file-active-knights | 10 | černý | `a8a7` Rua a8×a7 (Rua) | +784 | `d6d5` Bia d6→d5 | -776 | 1560 | +730 | `a8a7 b1d2 e8f7 e3e4 f8e7 b3b4 a7a2 f1e2` |
| strategy | rua-on-7th/a-file-active-knights | 11 | bílý | `a7a8` Rua a7×a8 (Rua) | +776 | `d3d4` Bia d3→d4 | -753 | 1529 | +730 | `a7a8 c8c7 h1g1 f8e7 g3g4 f5g4 h3g4 e8f7` |
| strategy | rua-on-7th/a-file-active-knights | 12 | černý | `a8a7` Rua a8×a7 (Rua) | +753 | `b8d7` Ma b8→d7 | -723 | 1476 | +730 | `a8a7 f1e2 f8e7 e2d3 c8c7 h1g1 e8f7 g3g4` |
| strategy | promo-prep/d-pawn-e5-promo | 4 | černý | `f6e5` Bia f6×e5 (Bia) | +61 | `f6f5` Bia f6→f5 | -338 | 399 | +175 | `f6e5 g1e2 g8f6 a3a4 a6a5 d1c2 f8e7 c3c4` |
| strategy | promo-prep/d-pawn-e5-promo | 5 | bílý | `e5d6m` Bia e5×d6 (Bia)=P+ | +338 | `e5e6m` Bia e5→e6=P+ | +184 | 154 | +250 | `e5d6m` |
| strategy | promo-prep/d-pawn-e5-promo | 7 | bílý | `e6d7` P+ e6×d7 (Ma) | +423 | `f3f4` Bia f3→f4 | +45 | 378 | +415 | `e6d7 c8d7 g3g4 g8f6 a3a4 d6d5 g1e2 f8e7` |
| strategy | promo-prep/d-pawn-e5-promo | 9 | bílý | `e6d7` P+ e6×d7 (Ma) | +408 | `g1f3` Ma g1→f3 | +176 | 232 | +490 | `e6d7` |
| strategy | promo-prep/b-pawn-promo | 4 | černý | `c6b5` Bia c6×b5 (Bia) | -46 | `a6a5` Bia a6→a5 | -307 | 261 | +175 | `c6b5 f3f4 e8f7 e3e4 b8c6 g1f3 b5b4 c1d2` |
| strategy | promo-prep/b-pawn-promo | 7 | bílý | `b6a5` P+ b6×a5 (Bia) | +315 | `c3c4` Bia c3→c4 | +84 | 231 | +175 | `b6a5 g8e7 f3f4 e8f7 c1b2 c6c5 g1f3 d6d5` |
| strategy | promo-prep/b-pawn-promo | 12 | černý | `c5d4` Bia c5×d4 (Bia) | -76 | `f6f5` Bia f6→f5 | -392 | 316 | +75 | `c5d4 e3d4 d7b6 g1e2 e8f7 d1c2 e7c6 e1f2` |
| strategy | promo-prep/c-pawn-via-b | 6 | černý | `a6b5` Bia a6×b5 (Bia) | +83 | `a6a5` Bia a6→a5 | -240 | 323 | +175 | `a6b5 f3f4` |
| strategy | promo-prep/c-pawn-via-b | 11 | bílý | `c6d7` P+ c6×d7 (Ma) | +569 | `d3d4` Bia d3→d4 | +367 | 202 | +240 | `c6d7 c8d7 d1c2 e8f7 c2b2 f8e7 g1e2 e7e6` |
| strategy | promo-prep/f-pawn-g-promo | 4 | černý | `h6g5` Bia h6×g5 (Bia) | +246 | `b8d7` Ma b8→d7 | +62 | 184 | +175 | `h6g5 b1d2 c6c5 g1e2 b8c6 d1c2 f8e7 c2b2` |
| strategy | promo-prep/f-pawn-g-promo | 11 | bílý | `f4e5` Bia f4×e5 (Bia) | +284 | `d3d4` Bia d3→d4 | -91 | 375 | +250 | `f4e5 f6h5 e5e6m d7f6 c3c4 d5c4 b3c4 f8e7` |
| strategy | promo-prep/f-pawn-g-promo | 12 | černý | `e5f4` Bia e5×f4 (Bia) | +91 | `f8e7` Khon f8→e7 | -184 | 275 | 0 | `e5f4 e3f4` |
| game | khon-met-coop | 13 | bílý | `e5d6m` Bia e5×d6 (Met)=P+ | +361 | `f4e6` Ma f4→e6 | -376 | 737 | +425 | `e5d6m e7d6 f4g6 h8h7 f3e4 h7g7 g6h4 g8e7` |
| game | khon-met-coop | 14 | černý | `f6e5` Bia f6×e5 (Bia) | +376 | `e7e6` Khon e7×e6 (Ma) | +206 | 170 | +805 | `f6e5 d2e4 c8d7 e6g5 h6g5 e4g5 e8f8 c1d2` |
| game | khon-met-coop | 15 | bílý | `e5d6m` Bia e5×d6 (Met)=P+ | -206 | `e1f2` Met e1→f2 | -523 | 317 | +325 | `e5d6m` |
| game | khon-met-coop | 16 | černý | `d6e5` Met d6×e5 (Bia) | +523 | `e6d5` Khon e6→d5 | +161 | 362 | 0 | `d6e5 d2e4 f6f5 e4d2 b8d7 d1c2 e8f7 a3a4` |
| game | passive-vs-active | 16 | černý | `h4g3m` Bia h4×g3 (Bia)=P+ | +76 | `b6b5` Bia b6→b5 | -253 | 329 | +175 | `h4g3m g2g3 e6d5 e4d5 c6d5 d1c2 b8d7 e2f4` |
| game | passive-vs-active | 17 | bílý | `d5e6m` Bia d5×e6 (Bia)=P+ | +253 | `d5c6m` Bia d5×c6 (Bia)=P+ | -23 | 276 | +250 | `d5e6m b8a6` |
| game | passive-vs-active | 18 | černý | `b8c6` Ma b8×c6 (P+) | +23 | `e7d8` Met e7→d8 | -477 | 500 | +250 | `b8c6 g3g4 g8h6 e2d4 c6d4 c3d4 e8f7 d1e2` |
| game | two-knights-mate | 6 | černý | `b7a6` Khun b7×a6 (Ma) | 0 | `b7c8` Khun b7→c8 | -M1 | 9990 | +980 | `b7a6 b5a3 a6b7 a3b1 b7b6 b1d2 b6a6 d2b3` |
| game | met-trap | 16 | černý | `f5e4` Bia f5×e4 (Bia) | +68 | `d6c5` Met d6→c5 | -246 | 314 | 0 | `f5e4 f3e4` |
| game | met-trap | 17 | bílý | `e4f5` Bia e4×f5 (Bia) | +246 | `b3c5` Ma b3×c5 (Met) | -114 | 360 | +325 | `e4f5 c5d4 f5g6m d4c3 c2c3 g8e7 g6h5 c6c5` |
| game | symmetric-opening | 16 | černý | `c5d4` Bia c5×d4 (Bia) | +14 | `e7d5` Ma e7×d5 (Bia) | -269 | 283 | +175 | `c5d4 e2c1` |
| game | symmetric-opening | 17 | bílý | `e4d5` Bia e4×d5 (Ma) | +269 | `e2c3` Ma e2→c3 | -300 | 569 | +195 | `e4d5 c5d4 d5d6m e8f7 e2c1 h8e8 d6e5 f6e5` |

## Tvrzení na konci

Eval koncové pozice (z pohledu strany na tahu) a nejlepší tah enginu — k porovnání se závěrečným komentářem / `result`.

| zdroj | id | na tahu | eval | nejlepší tah | mat? | result / poslední komentář |
|---|---|---|---:|---|---|---|
| strategy | central-push/symmetric | bílý | 0 | `f2e3` Khon f2→e3 | — | „Khon na f7 — poslední tah, který šel zkopírovat. Pozice vypadá rovná, jenže na tahu je bílý: první nesymetric…" |
| strategy | central-push/c-pawn-knights | bílý | +146 | `d4e5` Bia d4×e5 (Bia) | — | „Kůň na f5. Černý nečeká, až bílý jezdec na f4 zesílí — staví proti němu vlastního a zároveň hlídá e3 i g3, te…" |
| strategy | central-push/e-pawn-kingside | bílý | +158 | `e4d5` Bia e4×d5 (Bia) | — | „Khon na f7. Král je krytý a černý má hotovo: pěšec f5 i kůň f6 tlačí na e4, takže bílý musí centrum hlídat, m…" |
| strategy | khon-wall/central-khon-wall | bílý | +130 | `c4d5` Bia c4×d5 (Bia) | — | „Černý Khun na f8 — také jen přešlapuje. Závěr varianty: obě strany jsou naprosto v bezpečí a ani jedna nemá j…" |
| strategy | khon-wall/khon-wall-central-hit | bílý | +545 | `f3g4` Bia f3×g4 (Ma) | — | „Kůň na g4! Černý má na bílé polovině desky věž i jezdce, bílý tam nemá nic. Závěr: bílý je pevný, ale pasivní…" |
| strategy | khon-wall/khon-wall-kingside | bílý | +123 | `d1c2` Khun d1→c2 | — | „f5! Druhý útočník na e4 — teď je napadené dvakrát a kryté jen pěšcem z f3. Bílý musí volit mezi dokončováním …" |
| strategy | met-attack/early-sortie | bílý | -61 | `f4e3` Met f4→e3 | — | „Černá Met na c7 (e7 už drží kůň). Černý za bílým výpadem nejde: nechá Met zaseknout se na f4 a sám chystá b6-…" |
| strategy | met-attack/met-g5-support | bílý | +223 | `g5f6` Met g5×f6 (Ma) | — | „Khon na e7. Kryje d6 i f6 a černý má plán: tahem h6 Met z g5 vyhnat, nebo ji obklíčit figurami. Vysunutá Met …" |
| strategy | met-attack/met-against-f5 | bílý | +204 | `d4e5` Bia d4×e5 (Bia) | — | „Khon na e7. Kryje d6 i f6 a černý má, co chtěl: bílá Met stojí vysunutá a bez opory, zatímco jeho figury mají…" |
| strategy | met-attack/met-h4-diagonal | bílý | +184 | `f4e5` Bia f4×e5 (Bia) | — | „Khon na e7. Černý dokončil obranu a bilance je jasná: bílá Met stojí v rohu na h4 bez podpory, černý má centr…" |
| strategy | met-attack/met-b4-diagonal | bílý | +184 | `f4e5` Bia f4×e5 (Bia) | — | „Khon na e7. Černý má rozvinutá obě křídla a jasný plán: zahrát a6-a5 a Met na b4 rovnou napadnout. Slabá figu…" |
| strategy | rua-on-7th/open-a-file | bílý | -30 | `a7a8` Rua a7×a8 (Rua) | — | „Khon na b7 — konečně tah se záměrem. Khon dosáhne diagonálně dozadu na a8 a kryje tak vlastní Rua, takže bílá…" |
| strategy | rua-on-7th/h-file-rook | bílý | +700 | `h7h8` Rua h7×h8 (Rua) | — | „Kůň na d7. Černý dorovnal rozvoj a bilance je vyrovnaná: bílý má věž na 7. řadě, černý za to má centrum a jez…" |
| strategy | rua-on-7th/b-file-rook | bílý | -123 | `b7b3` Rua b7→b3 | — | „e5. Černý zavírá centrum a jeho plán je jasný: věž na b7 je hluboko a bez podpory. Stačí ji odříznout a bude …" |
| strategy | rua-on-7th/a-file-active-knights | bílý | +723 | `a7a8` Rua a7×a8 (Rua) | — | „Kůň na d7. Kryje b6 i c5 a černý má hotovo: bílý má věž na 7. řadě, černý centrum a dva aktivní jezdce. Za pr…" |
| strategy | promo-prep/e-file-push | bílý | +407 | `e6d7` P+ e6×d7 (Ma) | — | „Met na e7 — přesně podle plánu. Kryje d6 i f6, takže povýšený pěšec na e6 nemá kam a stává se z něj spíš zaja…" |
| strategy | promo-prep/d-pawn-e5-promo | bílý | +430 | `e6d7` P+ e6×d7 (Ma) | — | „Khon na e7 — a rovnou útočí na povýšeného pěšce na e6, protože Khon smí i o pole rovně vpřed. Černý dotáhl pl…" |
| strategy | promo-prep/b-pawn-promo | bílý | +392 | `c3b5` Ma c3→b5 | — | „f5. Černý otevírá druhou frontu. Bílý má sice povýšeného pěšce, ale všechny jeho figury zůstaly na dámském kř…" |
| strategy | promo-prep/c-pawn-via-b | bílý | +558 | `c6d7` P+ c6×d7 (Ma) | — | „Kůň na f6. Míří na e4 a g4 a černý má plán hotový: bílý má silného pěšce na c6, černý za to iniciativu na dru…" |
| strategy | promo-prep/f-pawn-g-promo | bílý | +184 | `f4e5` Bia f4×e5 (Bia) | — | „Khon na e7. Kryje d6 i f6, kde stojí jeho vlastní kůň. Závěr varianty: promoce je silný motiv, ale povýšený p…" |
| game | rook-endgame | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R a8#)** — „MAT! Rua dorazí na a8 a útočí celou 8. řadu. Černý král na g8 nemá kam — g7/h7/f7 pokrývá bílý král, f8/h8 na…" |
| game | promo-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje s pomocí promoce (R a8#)** — „MAT! Rua dorazí na a8 a šachuje 8. řadu. Černý král na c8 nemá únik: b8/d8 napadá Rua, b7/c7 napadá bílý král…" |
| game | khon-met-coop | bílý | -161 | `e5d6m` Bia e5×d6 (Met)=P+ | — | **Černý vyhraje materiálem (zisk Ma za žádnou cenu)** — „Černý Khon se vrátí do centra na d5 — bezpečně chráněn. Black má kůň navíc. Materiálová výhoda je jednoznačná…" |
| game | passive-vs-active | černý | -484 | `a8a7` Rua a8→a7 | — | **Útočník (bílý) vyhraje materiálem — kůň černého padne za otevřený sloupec** — „Povýšený Bia (P+) bere černého Khona na b7 diagonálně! Pohybuje se jako Met. Černý ztratil Khon, je o figuru …" |
| game | two-rooks-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R a8#)** — „MAT! Rua a6 → a8, šach na 8. řadě. Druhá Rua na h7 stále drží 7. řadu, takže král nemá kam utéct. Černý král …" |
| game | khon-met-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (Khon d7# — krytý Khunem, Met zajišťuje diagonály)** — „MAT! Khon dělá diagonální skok na d7 — šach černému králi (Khon útočí dopředu na pole přímo před sebou, tedy …" |
| game | kramnik-fianchetto | bílý | +261 | `e4d5` Bia e4×d5 (Khon) | — | **Černý získává strategickou převahu (aktivní Khon na d5)** — „Černý: Khon c6 → d5 (diagonálně SE)! Khon stojí v centru, atakuje pole e4 a kontroluje dlouhou diagonálu. Str…" |
| game | two-knights-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (N d6#)** — „MAT! Kůň z b5 na d6 dává šach černému králi. Král na c8 nemá únik: b8 kryje kůň a6, d8 a e8 kryje kůň d6, c7 …" |
| game | rook-and-knight-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R h2#)** — „MAT! Věž z a2 na h2 šachuje po celém h-sloupci. Černý král na h4 nemá únik: g3 a h3 kryje bílý král, g5 kryje…" |
| game | khon-met-mate-corner | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (Khon d7#)** — „MAT! Khon na d7 dává šach dopředu na d8 a diagonálně kryje c8/e8. Bílý král na e7 drží c7 a e7. Černý král ne…" |
| game | met-trap | černý | +114 | `b6c5` Bia b6×c5 (Ma) | — | **Bílý získává Met (N c5)** — „Bílý kůň bere Met na c5! Černý spadl do pasti — Met byla aktivní, ale nechráněná. Materiální ztráta figury je…" |
| game | symmetric-opening | černý | 0 | `f6e5` Bia f6×e5 (Bia) | — | **Bílý získává volného pěšce v centru** — „Bílý d-pěšec bere e5! Černé centrum se rozpadá a bílý získává volného pěšce. Symetrické zahájení se rozjelo v…" |

## Kontrolní případy z ruční revize

### 1. strategy · khon-wall/khon-wall-central-hit, tah 12

Podezření: poslední tah černého Ma na g4 — kůň visí za Bia f3

- tah v datech: `h6g4` Ma h6→g4 (černý), data [2,7]→[4,6]
- eval před tahem -85 → po tahu -545 (z pohledu černého); ztráta **460 cp** → **chyba**
- engine místo toho preferuje: `b6b5` Bia b6→b5, PV `b6b5 e2d3`
- po zahraném tahu soupeř může: `f3g4` Bia f3×g4 (Ma) (eval +545 pro bílého)
- koncová pozice (bílý na tahu): eval +545, nejlepší tah `f3g4` Bia f3×g4 (Ma)

### 2. strategy · rua-on-7th/h-file-rook, tah 5

Podezření: Rua h1→h7 visí za černou Rua h8; navazující tah černého je zmeškané braní

- tah v datech: `h1h7` Rua h1→h7 (bílý), data [7,7]→[1,7]
- eval před tahem +723 → po tahu -738 (z pohledu bílého); ztráta **1461 cp** → **chyba**
- engine místo toho preferuje: `h1h8` Rua h1×h8 (Rua), PV `h1h8 e8f7 c3c4 c6c5 b1c3 b8c6`
- po zahraném tahu soupeř může: `h8h7` Rua h8×h7 (Rua) (eval +738 pro černého)
- tah 6 (černý) `f6f5` Bia f6→f5: **zmeškané braní potvrzeno** — engine chtěl `h8h7` Rua h8×h7 (Rua), ztráta 1453 cp

### 3. strategy · rua-on-7th/a-file-active-knights, tah 5

Podezření: Rua a1→a7 visí za černou Rua a8; navazující tah černého je zmeškané braní

- tah v datech: `a1a7` Rua a1→a7 (bílý), data [7,0]→[1,0]
- eval před tahem +707 → po tahu -776 (z pohledu bílého); ztráta **1483 cp** → **chyba**
- engine místo toho preferuje: `a1a8` Rua a1×a8 (Rua), PV `a1a8 d8c7 f3f4 g8e7 g1f3 c6c5`
- po zahraném tahu soupeř může: `a8a7` Rua a8×a7 (Rua) (eval +776 pro černého)
- tah 6 (černý) `f6f5` Bia f6→f5: **zmeškané braní potvrzeno** — engine chtěl `a8a7` Rua a8×a7 (Rua), ztráta 1483 cp

### 4. game · met-trap, tah 17

Podezření: závěrečné braní Met (Ma b3×c5) je kryté černým koněm z d7

- tah v datech: `b3c5` Ma b3×c5 (Met) (bílý), data [5,1]→[3,2]
- eval před tahem +246 → po tahu -114 (z pohledu bílého); ztráta **360 cp** → **chyba**
- engine místo toho preferuje: `e4f5` Bia e4×f5 (Bia), PV `e4f5 c5d4 f5g6m d4c3 c2c3 g8e7`
- po zahraném tahu soupeř může: `b6c5` Bia b6×c5 (Ma) (eval +114 pro černého)
- koncová pozice (černý na tahu): eval +114, nejlepší tah `b6c5` Bia b6×c5 (Ma) — data tvrdí: „Bílý získává Met (N c5)"

### 5. game · symmetric-opening, tah 19

Podezření: koncového pěšce na e5 jde vzít f6×e5

- tah v datech: `d4e5` Bia d4×e5 (Bia) (bílý), data [4,3]→[3,4]
- eval před tahem +46 → po tahu 0 (z pohledu bílého); ztráta **46 cp** → **ok**
- engine místo toho preferuje: `d4d5` Bia d4→d5, PV `d4d5 d8e7 d1c2 b6b5 f3f4 h6h5`
- po zahraném tahu soupeř může: `f6e5` Bia f6×e5 (Bia) (eval 0 pro černého)
- koncová pozice (černý na tahu): eval 0, nejlepší tah `f6e5` Bia f6×e5 (Bia) — data tvrdí: „Bílý získává volného pěšce v centru"
