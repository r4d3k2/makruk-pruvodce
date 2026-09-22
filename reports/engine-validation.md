# Engine validace tahů — makruk-pruvodce

Vygenerováno: 2026-09-21 21:17 UTC · `npm run validate`

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
| výchozí pozice | +20 | 14 |
| bílý má navíc Rua (chybí r a8) | +738 | 20 |
| černý má navíc Rua (chybí R a1) | -707 | 17 |
| bílý má navíc Ma (chybí n b8) | +500 | 20 |
| bílý má navíc Khon (chybí s c8) | +374 | 21 |
| bílý má navíc Met (chybí m d8) | +261 | 19 |
| bílý má navíc Bia (chybí p d6) | +192 | 19 |

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
| strategy | central-push/c-pawn-knights | 12 | 0 | 0 | 0 | +23 (bílý na tahu) |
| strategy | central-push/e-pawn-kingside | 12 | 0 | 0 | 0 | -7 (bílý na tahu) |
| strategy | khon-wall/central-khon-wall | 12 | 0 | 0 | 0 | +61 (bílý na tahu) |
| strategy | khon-wall/khon-wall-central-hit | 12 | 0 | 0 | 0 | -16 (bílý na tahu) |
| strategy | khon-wall/khon-wall-kingside | 12 | 0 | 0 | 0 | +146 (bílý na tahu) |
| strategy | met-attack/early-sortie | 10 | 0 | 0 | 0 | -53 (bílý na tahu) |
| strategy | met-attack/met-g5-support | 12 | 0 | 0 | 0 | +123 (bílý na tahu) |
| strategy | met-attack/met-against-f5 | 12 | 0 | 0 | 0 | +7 (bílý na tahu) |
| strategy | met-attack/met-h4-diagonal | 12 | 0 | 0 | 0 | -87 (bílý na tahu) |
| strategy | met-attack/met-b4-diagonal | 12 | 0 | 0 | 0 | -90 (bílý na tahu) |
| strategy | rua-on-7th/open-a-file | 10 | 0 | 0 | 0 | +31 (bílý na tahu) |
| strategy | rua-on-7th/h-file-rook | 12 | 0 | 0 | 0 | +92 (bílý na tahu) |
| strategy | rua-on-7th/b-file-rook | 12 | 0 | 0 | 0 | +69 (bílý na tahu) |
| strategy | rua-on-7th/a-file-active-knights | 12 | 0 | 0 | 0 | +74 (bílý na tahu) |
| strategy | promo-prep/e-file-push | 10 | 0 | 0 | 0 | -30 (bílý na tahu) |
| strategy | promo-prep/d-pawn-e5-promo | 12 | 0 | 0 | 0 | -46 (bílý na tahu) |
| strategy | promo-prep/b-pawn-promo | 12 | 0 | 0 | 0 | -53 (bílý na tahu) |
| strategy | promo-prep/c-pawn-via-b | 12 | 0 | 0 | 0 | +100 (bílý na tahu) |
| strategy | promo-prep/f-pawn-g-promo | 12 | 0 | 0 | 0 | +15 (bílý na tahu) |
| game | rook-endgame | 15 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | promo-mate | 9 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-coop | 16 | 0 | 4 | 0 | -169 (bílý na tahu) |
| game | passive-vs-active | 19 | 0 | 3 | 1 | -479 (černý na tahu) |
| game | two-rooks-mate | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-mate | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | kramnik-fianchetto | 16 | 0 | 1 | 0 | +261 (bílý na tahu) |
| game | two-knights-mate | 7 | 0 | 1 | 0 | -M0 (mat) (černý na tahu) |
| game | rook-and-knight-mate | 9 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | khon-met-mate-corner | 7 | 0 | 0 | 0 | -M0 (mat) (černý na tahu) |
| game | met-trap | 17 | 0 | 2 | 2 | +115 (černý na tahu) |
| game | symmetric-opening | 19 | 0 | 3 | 0 | 0 (černý na tahu) |
| **celkem** | 32 položek | **382** | **0** | **14** | **3** | |

Tahů „rozhodnuto" (ztráta ≥ 250 cp v už rozhodnuté pozici, nepočítají se): 2 — viz detail.

## Detail problémů

### game · khon-met-coop

*Khon a Met spolu*

#### tah 12 (černý) — `c7d6` Met c7→d6 · data [1,2]→[2,3] — **CHYBA**

- ztráta: **369 cp** (eval před tahem 0 → po tahu -369, z pohledu černého)
- engine preferuje: `e8f7` Khun e8→f7 (eval 0), PV: `e8f7 d2e4 f6e5 f4d3 c7d6 d1c2`
- po zahraném tahu soupeř může: `e5d6m` Bia e5×d6 (Met)=P+ (eval +369 pro bílého)
- komentář z dat: „Černý Met se posunuje na d6 (diagonálně). Teď stojí v centru a kontroluje diagonály — pole c5, d6, e7, e5 jsou pod jeho dohledem."

#### tah 13 (bílý) — `f4e6` Ma f4→e6 · data [4,5]→[2,4] — **CHYBA**

- ztráta: **745 cp** (eval před tahem +369 → po tahu -376, z pohledu bílého)
- engine preferuje: `e5d6m` Bia e5×d6 (Met)=P+ (eval +369), PV: `e5d6m e7d6 f4g6 h8h7 f3e4 h7g7`
- po zahraném tahu soupeř může: `f6e5` Bia f6×e5 (Bia) (eval +376 pro černého)
- komentář z dat: „Bílý kůň útočí hluboko na e6. Aspoň dva problémy: nikoho přímo nenapadá smysluplně, a hlavně tam stojí napadený Khonem!"

#### tah 15 (bílý) — `e1f2` Met e1→f2 · data [7,4]→[6,5] — **CHYBA**

- ztráta: **285 cp** (eval před tahem -238 → po tahu -523, z pohledu bílého)
- engine preferuje: `e5d6m` Bia e5×d6 (Met)=P+ (eval -238), PV: `e5d6m`
- po zahraném tahu soupeř může: `d6e5` Met d6×e5 (Bia) (eval +523 pro černého)
- komentář z dat: „Bílý se snaží vyrovnat — Met na f2 (diagonálně). Pokouší se dostat figury do hry, ale je pozdě."

#### tah 16 (černý) — `e6d5` Khon e6→d5 · data [2,4]→[3,3] — **CHYBA**

- ztráta: **354 cp** (eval před tahem +523 → po tahu +169, z pohledu černého)
- engine preferuje: `d6e5` Met d6×e5 (Bia) (eval +523), PV: `d6e5 d2e4 e8f7 a3a4 f6f5 e4d2`
- po zahraném tahu soupeř může: `e5d6m` Bia e5×d6 (Met)=P+ (eval -169 pro bílého)
- komentář z dat: „Černý Khon se vrátí do centra na d5 — bezpečně chráněn. Black má kůň navíc. Materiálová výhoda je jednoznačná, partie bude pro černého tech…"

### game · passive-vs-active

*Pasivní obrana proti aktivnímu útoku*

#### tah 15 (bílý) — `d4d5` Bia d4→d5 · data [4,3]→[3,3] — **NEPŘESNOST**

- ztráta: **173 cp** (eval před tahem +84 → po tahu -89, z pohledu bílého)
- engine preferuje: `g3g4` Bia g3→g4 (eval +84), PV: `g3g4 a4b3m b2b3 d6d5 f3f4 e7d6`
- po zahraném tahu soupeř může: `h4g3m` Bia h4×g3 (Bia)=P+ (eval +89 pro černého)
- komentář z dat: „Bílý d-pěšec se posunuje na d5. Klíčový průlomový tah — připravuje výměnu, která otevře sloupec a uvolní pozici pro promoci."

#### tah 16 (černý) — `b6b5` Bia b6→b5 · data [2,1]→[3,1] — **CHYBA**

- ztráta: **327 cp** (eval před tahem +89 → po tahu -238, z pohledu černého)
- engine preferuje: `h4g3m` Bia h4×g3 (Bia)=P+ (eval +89), PV: `h4g3m g2g3 c6d5 e4d5 e6d5 d1c2`
- po zahraném tahu soupeř může: `d5e6m` Bia d5×e6 (Bia)=P+ (eval +238 pro bílého)
- komentář z dat: „Černý b-pěšec se rozhýbá — pozdě, ale lépe pozdě než vůbec."

#### tah 17 (bílý) — `d5c6m` Bia d5×c6 (Bia)=P+ · data [3,3]→[2,2] — **CHYBA**

- ztráta: **252 cp** (eval před tahem +238 → po tahu -14, z pohledu bílého)
- engine preferuje: `d5e6m` Bia d5×e6 (Bia)=P+ (eval +238), PV: `d5e6m`
- po zahraném tahu soupeř může: `b8c6` Ma b8×c6 (P+) (eval +14 pro černého)
- komentář z dat: „PROMOCE! Bílý d-pěšec bere černého c-pěšce diagonálně a v jednom tahu dosáhne 6. řady — automatická proměna na Met (P+). Bílý získává figur…"

#### tah 18 (černý) — `e7d8` Met e7→d8 · data [1,4]→[0,3] — **CHYBA**

- ztráta: **490 cp** (eval před tahem +14 → po tahu -476, z pohledu černého)
- engine preferuje: `b8c6` Ma b8×c6 (P+) (eval +14), PV: `b8c6 g3g4 e8d7 b3a4 b5a4 a1b1`
- po zahraném tahu soupeř může: `c6b7` P+ c6×b7 (Khon) (eval +476 pro bílého)
- komentář z dat: „Černá Met v zoufalství ustoupí na d8 (jiné diagonály jsou zablokované vlastními pěšáky/figurami). Žádnou hrozbu proti P+ nevytváří."

### game · kramnik-fianchetto

*Fianchetto Khon*

#### tah 16 (černý) — `c6d5` Khon c6→d5 · data [2,2]→[3,3] — **CHYBA**

- ztráta: **261 cp** (eval před tahem 0 → po tahu -261, z pohledu černého)
- engine preferuje: `d6d5` Bia d6→d5 (eval 0), PV: `d6d5 g2f3 e8f7 d1c2 f8g7 a3a4`
- po zahraném tahu soupeř může: `e4d5` Bia e4×d5 (Khon) (eval +261 pro bílého)
- komentář z dat: „Černý: Khon c6 → d5 (diagonálně SE)! Khon stojí v centru, atakuje pole e4 a kontroluje dlouhou diagonálu. Strategická převaha je hotová — f…"

### game · two-knights-mate

*Dva koně matují*

#### tah 6 (černý) — `b7c8` Khun b7→c8 · data [1,1]→[0,2] — **CHYBA**

- ztráta: **9990 cp** (eval před tahem 0 → po tahu -M1, z pohledu černého)
- engine preferuje: `b7a6` Khun b7×a6 (Ma) (eval 0), PV: `b7a6 e7d6 a6b5 d6c7 b5b4 c7b6`
- po zahraném tahu soupeř může: `b5d6` Ma b5→d6 (eval M1 pro bílého)
- komentář z dat: „Černý král ustupuje na c8, jediné zbývající volné pole."

### game · rook-and-knight-mate

*Věž a kůň matují*

#### tah 3 (bílý) — `e1d2` Khun e1→d2 · data [7,4]→[6,3] — _rozhodnuto (nepočítá se)_

- pozice už rozhodnutá (pomalejší cesta k výhře): eval M11 → +5887 z pohledu bílého; engine preferuje `a2f2` Rua a2→f2

#### tah 4 (černý) — `g7g6` Khun g7→g6 · data [1,6]→[2,6] — _rozhodnuto (nepočítá se)_

- pozice už rozhodnutá (volba mezi prohrávajícími tahy): eval -5887 → -M35 z pohledu černého; engine preferuje `g7f7` Khun g7→f7

### game · met-trap

*Past na Met*

#### tah 11 (bílý) — `d2b3` Ma d2→b3 · data [6,3]→[5,1] — **NEPŘESNOST**

- ztráta: **168 cp** (eval před tahem +92 → po tahu -76, z pohledu bílého)
- engine preferuje: `d4e5` Bia d4×e5 (Bia) (eval +92), PV: `d4e5 d7e5 f3f4 e5c4 d2c4 d5c4`
- po zahraném tahu soupeř může: `f5e4` Bia f5×e4 (Bia) (eval +76 pro černého)
- komentář z dat: „Bílý kůň na b3 — nyní má cestu na c5, kde čeká past na černou Met."

#### tah 13 (bílý) — `c1c2` Khon c1→c2 · data [7,2]→[6,2] — **NEPŘESNOST**

- ztráta: **150 cp** (eval před tahem +43 → po tahu -107, z pohledu bílého)
- engine preferuje: `d4e5` Bia d4×e5 (Bia) (eval +43), PV: `d4e5 d7e5`
- po zahraném tahu soupeř může: `d5e4` Bia d5×e4 (Bia) (eval +107 pro černého)
- komentář z dat: „Bílý Khon na c2, podporuje centrum a připravuje se na další vývoj."

#### tah 16 (černý) — `d6c5` Met d6→c5 · data [2,3]→[3,2] — **CHYBA**

- ztráta: **307 cp** (eval před tahem +61 → po tahu -246, z pohledu černého)
- engine preferuje: `f5e4` Bia f5×e4 (Bia) (eval +61), PV: `f5e4 f3e4 g8f6 e4d5 c6d5 d4e5`
- po zahraném tahu soupeř může: `d4e5` Bia d4×e5 (Bia) (eval +246 pro bílého)
- komentář z dat: „Černá Met táhne na c5 — příliš daleko od bezpečí. Tento aktivní tah je pastí."

#### tah 17 (bílý) — `b3c5` Ma b3×c5 (Met) · data [5,1]→[3,2] — **CHYBA**

- ztráta: **361 cp** (eval před tahem +246 → po tahu -115, z pohledu bílého)
- engine preferuje: `d4e5` Bia d4×e5 (Bia) (eval +246), PV: `d4e5 d7e5 e4f5 g6f5 b4c5 g8e7`
- po zahraném tahu soupeř může: `b6c5` Bia b6×c5 (Ma) (eval +115 pro černého)
- komentář z dat: „Bílý kůň bere Met na c5! Černý spadl do pasti — Met byla aktivní, ale nechráněná. Materiální ztráta figury je rozhodující."

### game · symmetric-opening

*Symetrické zahájení*

#### tah 16 (černý) — `e7d5` Ma e7×d5 (Bia) · data [1,4]→[3,3] — **CHYBA**

- ztráta: **306 cp** (eval před tahem +30 → po tahu -276, z pohledu černého)
- engine preferuje: `c5d4` Bia c5×d4 (Bia) (eval +30), PV: `c5d4 e2c1 d8c7 c1d3 b6b5 h3h4`
- po zahraném tahu soupeř může: `e4d5` Bia e4×d5 (Ma) (eval +276 pro bílého)
- komentář z dat: „Černý kůň z e7 bere zpět na d5. Materiál je vyrovnaný, ale pozice už není symetrická — bílý má aktivnějšího koně."

#### tah 17 (bílý) — `e2c3` Ma e2→c3 · data [6,4]→[5,2] — **CHYBA**

- ztráta: **550 cp** (eval před tahem +276 → po tahu -274, z pohledu bílého)
- engine preferuje: `e4d5` Bia e4×d5 (Ma) (eval +276), PV: `e4d5 c5d4 d5d6m e8f7 a3a4 h8e8`
- po zahraném tahu soupeř může: `d5e3` Ma d5→e3 (eval +274 pro černého)
- komentář z dat: „Bílý kůň na c3 — napadá d5 a hrozí centrální aktivitou."

#### tah 18 (černý) — `d5c7` Ma d5→c7 · data [3,3]→[1,2] — **CHYBA**

- ztráta: **304 cp** (eval před tahem +274 → po tahu -30, z pohledu černého)
- engine preferuje: `d5e3` Ma d5→e3 (eval +274), PV: `d5e3`
- po zahraném tahu soupeř může: `d4d5` Bia d4→d5 (eval +30 pro bílého)
- komentář z dat: „Černý kůň ustupuje na c7, daleko od centra. Bílý získal tempo."


## Zmeškaná braní

Tahy, kde engine jako nejlepší tah vidí braní, hráč táhl jinak (a nebral tutéž figuru jinou figurou) a buď to podle PV vynáší materiál ≥ 100 cp, nebo je ztráta tahu na úrovni chyby (≥ 250 cp). „Materiál po PV" = změna materiální bilance na konci hlavní varianty enginu (odhad podle kalibrovaných hodnot figur, z pohledu strany na tahu). Visící figura v koncové pozici je vidět v sekci „Tvrzení na konci" (nejlepší tah = braní).

| zdroj | id | tah | strana | engine: brát | eval po braní | zahráno | eval po zahraném | ztráta | materiál po PV | PV enginu |
|---|---|---:|---|---|---:|---|---:|---:|---:|---|
| game | khon-met-coop | 13 | bílý | `e5d6m` Bia e5×d6 (Met)=P+ | +369 | `f4e6` Ma f4→e6 | -376 | 745 | +425 | `e5d6m e7d6 f4g6 h8h7 f3e4 h7g7 g6h4 g8e7` |
| game | khon-met-coop | 15 | bílý | `e5d6m` Bia e5×d6 (Met)=P+ | -238 | `e1f2` Met e1→f2 | -523 | 285 | +325 | `e5d6m` |
| game | khon-met-coop | 16 | černý | `d6e5` Met d6×e5 (Bia) | +523 | `e6d5` Khon e6→d5 | +169 | 354 | -175 | `d6e5 d2e4 e8f7 a3a4 f6f5 e4d2 g8f6 f1e2` |
| game | passive-vs-active | 16 | černý | `h4g3m` Bia h4×g3 (Bia)=P+ | +89 | `b6b5` Bia b6→b5 | -238 | 327 | +350 | `h4g3m g2g3 c6d5 e4d5 e6d5 d1c2 e8f7 h3h4` |
| game | passive-vs-active | 17 | bílý | `d5e6m` Bia d5×e6 (Bia)=P+ | +238 | `d5c6m` Bia d5×c6 (Bia)=P+ | -14 | 252 | +250 | `d5e6m` |
| game | passive-vs-active | 18 | černý | `b8c6` Ma b8×c6 (P+) | +14 | `e7d8` Met e7→d8 | -476 | 490 | +250 | `b8c6 g3g4 e8d7 b3a4 b5a4 a1b1 g6g5 c3c4` |
| game | two-knights-mate | 6 | černý | `b7a6` Khun b7×a6 (Ma) | 0 | `b7c8` Khun b7→c8 | -M1 | 9990 | +980 | `b7a6 e7d6 a6b5 d6c7 b5b4 c7b6 b4b3 b6a5` |
| game | met-trap | 16 | černý | `f5e4` Bia f5×e4 (Bia) | +61 | `d6c5` Met d6→c5 | -246 | 307 | 0 | `f5e4 f3e4 g8f6 e4d5 c6d5 d4e5 d7e5 f2e3` |
| game | met-trap | 17 | bílý | `d4e5` Bia d4×e5 (Bia) | +246 | `b3c5` Ma b3×c5 (Met) | -115 | 361 | +250 | `d4e5 d7e5 e4f5 g6f5 b4c5 g8e7 a3a4 a6a5` |
| game | symmetric-opening | 16 | černý | `c5d4` Bia c5×d4 (Bia) | +30 | `e7d5` Ma e7×d5 (Bia) | -276 | 306 | +350 | `c5d4 e2c1 d8c7 c1d3 b6b5 h3h4 f6f5 h4h5` |
| game | symmetric-opening | 17 | bílý | `e4d5` Bia e4×d5 (Ma) | +276 | `e2c3` Ma e2→c3 | -274 | 550 | +315 | `e4d5 c5d4 d5d6m e8f7 a3a4 h8e8 e2c1 b7c6` |

## Tvrzení na konci

Eval koncové pozice (z pohledu strany na tahu) a nejlepší tah enginu — k porovnání se závěrečným komentářem / `result`.

| zdroj | id | na tahu | eval | nejlepší tah | mat? | result / poslední komentář |
|---|---|---|---:|---|---|---|
| strategy | central-push/symmetric | bílý | 0 | `d1c1` Khun d1→c1 | — | „Khon na f7 — poslední tah, který šel zkopírovat. Pozice vypadá rovná, jenže na tahu je bílý: první nesymetric…" |
| strategy | central-push/c-pawn-knights | bílý | +23 | `e1d2` Met e1→d2 | — | „Kůň na e7 kryje d5 — jediného centrálního pěšce černého, kterého bílý kůň z c3 už napadá. Bilance: struktura …" |
| strategy | central-push/e-pawn-kingside | bílý | -7 | `g3f4` Bia g3×f4 (Bia) | — | „Černý bere e5×f4 dřív, než pěšec padne. Bílý vezme zpět g3×f4 a bude mít, co chtěl: koně na e4 a f3, pěšce d4…" |
| strategy | khon-wall/central-khon-wall | bílý | +61 | `c1b2` Khun c1→b2 | — | „Černý Khun na f8 — také jen přešlapuje. Závěr varianty: obě strany jsou naprosto v bezpečí a ani jedna nemá j…" |
| strategy | khon-wall/khon-wall-central-hit | bílý | -16 | `e2d3` Khon e2→d3 | — | „Rua a8-a7! V makruku je 7. řada od začátku prázdná, takže druhá věž se po ní přesune na h7 a černý zdvojí věž…" |
| strategy | khon-wall/khon-wall-kingside | bílý | +146 | `e1f2` Met e1→f2 | — | „f5! Druhý útočník na e4 — pěšec je teď napadený dvakrát (Ma c5, f5) a krytý dvakrát (f3, Ma c3), takže bílý d…" |
| strategy | met-attack/early-sortie | bílý | -53 | `f4e3` Met f4→e3 | — | „Černá Met na c7 (e7 už drží kůň). Černý za bílým výpadem nejde: nechá Met zaseknout se na f4 a sám chystá b6-…" |
| strategy | met-attack/met-g5-support | bílý | +123 | `g1f3` Ma g1→f3 | — | „Kůň na f6. Hlídá g4 a h5 a černý si chystá figury, kterými by Met později obklíčil. Bílý ale má, co chtěl: Me…" |
| strategy | met-attack/met-against-f5 | bílý | +7 | `g1e2` Ma g1→e2 | — | „c5. Černý hledá protihru tam, kde bílá Met není: na dámském křídle. Bilance: Met stojí na f4 pevně a bez star…" |
| strategy | met-attack/met-h4-diagonal | bílý | -87 | `d3e4` Bia d3×e4 (Bia) | — | „e4! Pěšec e5 byl napadený dvakrát (f4, Ma f3) a krytý jen koněm z d7, tak jde vpřed a sám útočí — na d3 i na …" |
| strategy | met-attack/met-b4-diagonal | bílý | -90 | `d3e4` Bia d3×e4 (Bia) | — | „e4! Pěšec e5 byl napadený dvakrát (f4, Ma f3) a krytý jen koněm z d7 — místo čekání na výměnu jde vpřed a sám…" |
| strategy | rua-on-7th/open-a-file | bílý | +31 | `f3f4` Bia f3→f4 | — | „Khon se vrací na b7 a kryje pěšce b5. Poučení: otevřít sloupec, na kterém stojí soupeřova věž, znamená výměnu…" |
| strategy | rua-on-7th/h-file-rook | bílý | +92 | `a2g2` Rua a2→g2 | — | „Rua na g8: černý kryje Khon g7 dřív, než přijde Rg2, a nechává krále u středu. Cena: opustil h-sloupec — ten …" |
| strategy | rua-on-7th/b-file-rook | bílý | +69 | `c4a5` Ma c4×a5 (Bia) | — | „d5! Černý pěšce a5 neudrží — kdyby ho bránil postupem a5-a4, kůň by místo něj vzal d6. Raději napadá koně pěš…" |
| strategy | rua-on-7th/a-file-active-knights | bílý | +74 | `d1e2` Khun d1→e2 | — | „d5. Černý napadá c4 a hledá protihru v centru. Bilance: bílý má aktivního koně c3 a druhého na cestě na f3, o…" |
| strategy | promo-prep/e-file-push | bílý | -30 | `f3e4` Bia f3×e4 (Bia) | — | „Kůň na c5 — uhýbá z dosahu P+ (ten bere diagonálně všemi směry, takže na d7 by ho vzal) a zároveň P+ na e6 sá…" |
| strategy | promo-prep/d-pawn-e5-promo | bílý | -46 | `c1d2` Khon c1→d2 | — | „Kůň na d7 — kryje e5 a připravuje Khon f8-e7-d6, aby volného pěšce zablokoval natrvalo. Bilance: bílý má voln…" |
| strategy | promo-prep/b-pawn-promo | bílý | -53 | `a4b5` Bia a4×b5 (Bia) | — | „Černý bere c6×b5 — poslední výměna. Bilance: bílý teď vezme a4×b5, černý R×a1 a Khon b2 bere zpět: věže se vy…" |
| strategy | promo-prep/c-pawn-via-b | bílý | +100 | `h1h2` Rua h1→h2 | — | „Khon bere zpět na a6. Spočítej pěšce: bílý přišel o a- a c-pěšce, černý o a-, b- i c-pěšce — bílý je o pěšce …" |
| strategy | promo-prep/f-pawn-g-promo | bílý | +15 | `f1g2` Khon f1→g2 | — | „Khun na f7. Král kryje g6 i e6 a černý má vše pokryté. Bilance: materiál je vyrovnaný, promoce proběhla a hne…" |
| game | rook-endgame | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R a8#)** — „MAT! Rua dorazí na a8 a útočí celou 8. řadu. Černý král na g8 nemá kam — g7/h7/f7 pokrývá bílý král, f8/h8 na…" |
| game | promo-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje s pomocí promoce (R a8#)** — „MAT! Rua dorazí na a8 a šachuje 8. řadu. Černý král na c8 nemá únik: b8/d8 napadá Rua, b7/c7 napadá bílý král…" |
| game | khon-met-coop | bílý | -169 | `e5d6m` Bia e5×d6 (Met)=P+ | — | **Černý vyhraje materiálem (zisk Ma za žádnou cenu)** — „Černý Khon se vrátí do centra na d5 — bezpečně chráněn. Black má kůň navíc. Materiálová výhoda je jednoznačná…" |
| game | passive-vs-active | černý | -479 | `a8a7` Rua a8→a7 | — | **Útočník (bílý) vyhraje materiálem — kůň černého padne za otevřený sloupec** — „Povýšený Bia (P+) bere černého Khona na b7 diagonálně! Pohybuje se jako Met. Černý ztratil Khon, je o figuru …" |
| game | two-rooks-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R a8#)** — „MAT! Rua a6 → a8, šach na 8. řadě. Druhá Rua na h7 stále drží 7. řadu, takže král nemá kam utéct. Černý král …" |
| game | khon-met-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (Khon d7# — krytý Khunem, Met zajišťuje diagonály)** — „MAT! Khon dělá diagonální skok na d7 — šach černému králi (Khon útočí dopředu na pole přímo před sebou, tedy …" |
| game | kramnik-fianchetto | bílý | +261 | `e4d5` Bia e4×d5 (Khon) | — | **Černý získává strategickou převahu (aktivní Khon na d5)** — „Černý: Khon c6 → d5 (diagonálně SE)! Khon stojí v centru, atakuje pole e4 a kontroluje dlouhou diagonálu. Str…" |
| game | two-knights-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (N d6#)** — „MAT! Kůň z b5 na d6 dává šach černému králi. Král na c8 nemá únik: b8 kryje kůň a6, d8 a e8 kryje kůň d6, c7 …" |
| game | rook-and-knight-mate | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (R h2#)** — „MAT! Věž z a2 na h2 šachuje po celém h-sloupci. Černý král na h4 nemá únik: g3 a h3 kryje bílý král, g5 kryje…" |
| game | khon-met-mate-corner | černý | -M0 (mat) | `(none)` — | ✅ mat potvrzen | **Bílý matuje (Khon d7#)** — „MAT! Khon na d7 dává šach dopředu na d8 a diagonálně kryje c8/e8. Bílý král na e7 drží c7 a e7. Černý král ne…" |
| game | met-trap | černý | +115 | `b6c5` Bia b6×c5 (Ma) | — | **Bílý získává Met (N c5)** — „Bílý kůň bere Met na c5! Černý spadl do pasti — Met byla aktivní, ale nechráněná. Materiální ztráta figury je…" |
| game | symmetric-opening | černý | 0 | `f6e5` Bia f6×e5 (Bia) | — | **Bílý získává volného pěšce v centru** — „Bílý d-pěšec bere e5! Černé centrum se rozpadá a bílý získává volného pěšce. Symetrické zahájení se rozjelo v…" |

## Kontrolní případy z ruční revize

### 1. strategy · khon-wall/khon-wall-central-hit, tah 12

Podezření: poslední tah černého Ma na g4 — kůň visí za Bia f3

- tah v datech: `a8a7` Rua a8→a7 (černý), data [0,0]→[1,0]
- eval před tahem -30 → po tahu +16 (z pohledu černého); ztráta **-46 cp** → **ok**
- engine místo toho preferuje: `c6c5` Bia c6→c5, PV `c6c5 d4d5 e6d5 c3d5 b8d7 a3a4`
- po zahraném tahu soupeř může: `e2d3` Khon e2→d3 (eval -16 pro bílého)
- koncová pozice (bílý na tahu): eval -16, nejlepší tah `e2d3` Khon e2→d3

### 2. strategy · rua-on-7th/h-file-rook, tah 5

Podezření: Rua h1→h7 visí za černou Rua h8; navazující tah černého je zmeškané braní

- tah v datech: `g1h3` Ma g1→h3 (bílý), data [7,6]→[5,7]
- eval před tahem +66 → po tahu +23 (z pohledu bílého); ztráta **43 cp** → **ok**
- engine místo toho preferuje: `f3f4` Bia f3→f4, PV `f3f4 f8g7`
- po zahraném tahu soupeř může: `f8g7` Khon f8→g7 (eval -23 pro černého)
- tah 6 (černý) `f8g7` Khon f8→g7: zmeškané braní **nezachyceno** (engine preferuje `f8g7` Khon f8→g7, ztráta 0 cp)

### 3. strategy · rua-on-7th/a-file-active-knights, tah 5

Podezření: Rua a1→a7 visí za černou Rua a8; navazující tah černého je zmeškané braní

- tah v datech: `c3c4` Bia c3→c4 (bílý), data [5,2]→[4,2]
- eval před tahem +38 → po tahu +53 (z pohledu bílého); ztráta **-15 cp** → **ok**
- engine místo toho preferuje: `f3f4` Bia f3→f4, PV `f3f4 b8c6 c3c4 b5c4 b3c4 e8f7`
- po zahraném tahu soupeř může: `b5c4` Bia b5×c4 (Bia) (eval -53 pro černého)
- tah 6 (černý) `b5c4` Bia b5×c4 (Bia): zmeškané braní **nezachyceno** (engine preferuje `b5c4` Bia b5×c4 (Bia), ztráta -15 cp)

### 4. game · met-trap, tah 17

Podezření: závěrečné braní Met (Ma b3×c5) je kryté černým koněm z d7

- tah v datech: `b3c5` Ma b3×c5 (Met) (bílý), data [5,1]→[3,2]
- eval před tahem +246 → po tahu -115 (z pohledu bílého); ztráta **361 cp** → **chyba**
- engine místo toho preferuje: `d4e5` Bia d4×e5 (Bia), PV `d4e5 d7e5 e4f5 g6f5 b4c5 g8e7`
- po zahraném tahu soupeř může: `b6c5` Bia b6×c5 (Ma) (eval +115 pro černého)
- koncová pozice (černý na tahu): eval +115, nejlepší tah `b6c5` Bia b6×c5 (Ma) — data tvrdí: „Bílý získává Met (N c5)"

### 5. game · symmetric-opening, tah 19

Podezření: koncového pěšce na e5 jde vzít f6×e5

- tah v datech: `d4e5` Bia d4×e5 (Bia) (bílý), data [4,3]→[3,4]
- eval před tahem +30 → po tahu 0 (z pohledu bílého); ztráta **30 cp** → **ok**
- engine místo toho preferuje: `d4d5` Bia d4→d5, PV `d4d5 d8e7 h3h4 h6h5 d1c2 e8f7`
- po zahraném tahu soupeř může: `f6e5` Bia f6×e5 (Bia) (eval 0 pro černého)
- koncová pozice (černý na tahu): eval 0, nejlepší tah `f6e5` Bia f6×e5 (Bia) — data tvrdí: „Bílý získává volného pěšce v centru"
