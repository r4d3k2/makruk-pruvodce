# CLAUDE.md — Makruk Průvodce

Tento soubor je trvalý kontext projektu pro AI asistenty (Claude v chatu i Claude Code Desktop).

## O projektu

Vzdělávací webová aplikace pro učení thajských šachů (makruku). Cílová skupina: česky mluvící šachisté a hráči xiangqi.

Sourozenec projektu xiangqi-pruvodce — sdílí UX pattern a architekturu, liší se obsahem (8×8 deska, jiné figury, jiná pravidla, žádná řeka ani palác).

Živá URL: https://makruk-pruvodce.vercel.app/

## Vývojový workflow

- Cesta B z AI Flow průvodce: **Claude Code Desktop → GitHub → Vercel**
- Větev `main`, žádné worktree, žádné feature větve
- Každý prompt do Claude Code začíná: *"Work directly on the main branch, do not create new branches, do not use git worktree."*
- Při ladění vizuálu uživatel často žádá *"NECOMMITUJ a NEPUSHUJ"* — Claude Code uloží změny, uživatel je ověří v Preview, teprve pak dá příkaz `git push`.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS (v4) + CSS custom properties (3 témata: `thai-sunset`, `teak-day`, `midnight-teak`)
- Vlastní makruková logika v `src/lib/makruk.ts`, žádné externí šachové knihovny
- Siluety figur z PyChess Cajones setu (GPL v3) v `src/assets/pieces/`
- **Vlastní silueta pro P+ (povýšený pěšec)** — `wpp.svg`/`bpp.svg` — pilový kotouč s 10 zuby. Vznikla po 5+ iteracích, neměnit bez konzultace s uživatelem.
- Žádný backend, žádné API, žádné přihlašování

## Klíčové soubory

- `src/lib/makruk.ts` — typy, výchozí deska, applyMoves s promocí, pieceTraceUpTo
- `src/lib/storage.ts` — localStorage (téma, pokrok, strana hráče)
- `src/lib/recommend.ts` — algoritmus chytrého opakování (1★ → 2★ → nehrané → 3★)
- `src/data/strategies.ts` — 5 strategií, celkem 20 variant (3–5 na strategii) × 10–12 tahů; všechny prošly validací enginem
- `src/data/pieces.ts` — 6 figur + diagramy pohybu
- `src/data/games.ts` — **12 instruktážních partií** (matové koncovky + plné partie; všechny prošly validací enginem, viz níže)
- `src/components/makruk/MakrukBoard.tsx` — SVG deska 8×8 s tracked pieces a CSS animacemi
- `src/components/makruk/PieceSilhouettes.tsx` — wrapper pro SVG (PyChess + vlastní P+)
- `src/components/makruk/Pill.tsx` — 3-level pill systém (L1 režimy, L2 strategie/partie, L3 varianty)
- `src/pages/Index.tsx` — hlavní stránka, 4 režimy

## Aktuální stav (k 12. 6. 2026)

**Hotové fáze:**
- Fáze 1: Kostra + Studovat režim + 1 strategie
- Fáze 2: Procvičovat + Figury + 5 strategií + 3 témata + localStorage
- Fáze 2.5: Oprava legality koňů + hraj za bílého/černého
- Fáze 3: Partie režim + promotion blink + smart recommendation + polish
- Obsahová revize: 3 nové partie + Kramnik kontext + ProPawn jako pilový kotouč

**Aplikace je v plně funkčním stavu.** Drobné iterace probíhají podle potřeby.

## Designové principy

- **Autentická thajská estetika:** oranžová deska, siluety figur (žádné placky se znaky jako u xiangqi)
- **České názvy figur s thajskými v závorce:** Khun ขุน, Met เม็ด, Khon โคน, Ma ม้า, Rua เรือ, Bia เบี้ย
- **Mobile-first**, kontejner max 520px
- **Pill 3-level hierarchie:** L1 (režimy), L2 (strategie/partie), L3 (varianty)
- **4 režimy:** Studovat / Procvičovat / Figury / Partie
- **Promoce vizualizována:** zlatým prstenem (600 ms blik) na cílovém poli + výměna siluety na P+ (pilový kotouč). Tradiční „převracení vzhůru nohama" se NEPOUŽÍVÁ — ProPawn má vlastní design.

## Důležitá pravidla makruku v kódu

- **Bia stojí na 3./6. řadě**, ne na 2./7. jako v šachu. Důsledek: koně z výchozí pozice mají **jediný legální skok** — Ma b1 → d2, Ma g1 → e2 (zrcadlově černý). Pole c3, a3, f3, h3 jsou všechna obsazená vlastními pěšáky.
- **Žádný dvojkrok pěšce, žádný en passant, žádná rošáda.**
- **Promoce Bia → P+ automaticky** na 6. řadě postupujícího hráče.
- **Pohyb Khon (slon):** 1 pole diagonálně NEBO 1 pole rovně dopředu (5 možných pohybů).
- **Pohyb Met (dáma):** jen 1 pole diagonálně (slabá figura).
- **Asymetrický setup:** Khun bílý na d1, Khun černý na e8 (Met opačně). Není to chyba — díky tomu obě Met startují na polích stejné barvy.
- **P+ napadá všechny čtyři diagonály (i dozadu).** Figura stojící diagonálně vedle soupeřova P+ bez krytí visí — např. kůň na d7 vedle P+ na e6 prostě padne (P+×d7). Platí i pro pěšce, který na 6. řadu teprve bere: e5×f6=P+ hned napadá e7 i g7.
- **Otevřený sloupec s věžemi proti sobě** (typicky a/h po a×b5 a×b5) znamená výměnu věží pro toho, kdo táhne první — R×a8 / R×h8. Do otevřeného sloupce s věží soupeře nevstupovat, dokud není vstupní pole kryté (Khon b7/b2, g7/g2) nebo soupeřova věž pryč; a v pěšcové výměně nebrat jako poslední krajním pěšcem.

## Co s tímto projektem NEDĚLAT

- **Nezavádět externí backend, databáze, autentizaci** — pokrok jen v localStorage
- **Nepřidávat sound effects** — cíleně bez nich
- **Nepřidávat reklamy, tracking, analytiku**
- **Nepřidávat placky se znaky na figury** — jen siluety (xiangqi má placky, makruk ne)
- **Nemíchat s xiangqi-pruvodce** — to je samostatný projekt (později spojíme do zastřešující aplikace)
- **Neimplementovat counting rules jako vynucenou herní logiku** — jen popsáno textově
- **Neměnit pravidla makruku** — používáme originální/standardní verzi
- **Neměnit ProPawn siluetu (`wpp.svg`/`bpp.svg`)** bez výslovné konzultace — vznikla po 5+ iteracích a uživatel je s ní spokojený
- **Neimplementovat dvojkrok pěšce** — častá chyba ze šachové intuice, v makruku NEEXISTUJE
- **Nepřidávat ani neměnit tahy bez průchodu `npm run validate`** — každá změna v `strategies.ts` nebo `games.ts` musí projít validací enginem bez nelegálních tahů, chyb a zmeškaných braní mimo allowlist (viz „Validace tahů enginem").

## Co s tímto projektem DĚLAT (pravidla pro úpravy obsahu)

- **Komentáře k tahům musí být pedagogické**, ne generické (žádné „dobrý tah", „symetricky"). Vysvětlovat **proč** tah dává smysl, navazovat na předchozí tah, případně zmínit specifika makruku (např. „pole c3 je obsazené Bia, kůň musí na d2").
- **Tahy musí být legální a ověřené enginem** — po každé úpravě `strategies.ts`/`games.ts` spustit `npm run validate` (viz „Validace tahů enginem"). Platí i pro ruční úpravy (např. v GitHub web editoru): validaci pak dohnat při nejbližší práci v Claude Code.
- **Studovat režim:** otočení desky 🔄 je čistě vizuální (bílý vždy začíná, otáčení mění jen pohled).
- **Procvičovat režim:** hráč může hrát za obě strany přes „Hraj za bílého / Hraj za černého" přepínač. Soupeř hraje automaticky po 700 ms.

## Validace tahů enginem

- **Nástroj:** Fairy-Stockfish (GPL v3), varianta `makruk`. Binárka `fairy-stockfish_x86-64-bmi2.exe` (release `fairy_sf_14`) se stahuje lokálně do `tools/fairy-stockfish/` a **necommituje se** (adresář je v `.gitignore`).
- **Spuštění:** `npm run validate` (skript `scripts/validate-moves.ts`, ~7 min pro celý dataset). Výstup: `reports/engine-validation.md` (+ `.json`). Jedna položka: `npm run validate -- --only game:met-trap` nebo `--only strategy:rua-on-7th/h-file-rook`.
- **Pravidlo:** každá změna ve `strategies.ts` nebo `games.ts` musí projít validací **bez nelegálních tahů, bez chyb (ztráta ≥ 250 cp) a bez zmeškaných braní mimo allowlist**. Nepřesnosti (150–249 cp) tolerovat jen výjimečně — kolem 150 cp kolísají mezi běhy, cíl je ztráta ≤ ~100 cp.
- **Allowlist** (`scripts/validate-allowlist.json`) je jen pro **záměrné chyby, které komentář tahu výslovně popisuje** (past, instruktážní chyba soupeře). Každý záznam má `source`, `id`, `ply` a `reason`; není to místo, kam schovávat neopravené chyby.
- **Postup při opravě:** náhradní tah vybírat enginem (MultiPV 3, ne jen první volbu — tah musí sedět do plánu strategie/partie), přepsat navazující komentáře, `id` položky neměnit, `result` a závěrečný komentář musí odpovídat koncové pozici (sekce „Tvrzení na konci" v reportu).

## Autentické zdroje pro obsah

- **Pravidla:** [pychess.org/variants/makruk](https://www.pychess.org/variants/makruk) — autoritativní reference
- **Strategie a koncovky:** PyChess guide + chessvariants.org
- **Partie „Fianchetto Khon"** (`kramnik-fianchetto` v games.ts): **rekonstrukce inspirovaná plánem** z analyzované makruk hry Vladimira Kramnika (chessvariants.org) — fianchetto Khon, útok po g-sloupci. **Není to přepis jeho partie** ani autentická pasáž; v textech aplikace formulovat „inspirováno", nikdy „Kramnik hrál/označil".
- **Kramnikova citace** (v history sekci Strategie 1 i 2): *„Makruk Thai je strategičtější než mezinárodní šachy — musíte plánovat operace s naprostou opatrností, protože makruk lze přirovnat k anticipovanému koncovce mezinárodních šachů."* — Vladimir Kramnik

## Komunikace s uživatelem

Uživatel (Radovan) komunikuje stručně, česky. Když si nejsi něčím jistý, **zeptej se** — nepokoušej se „domyslet". Pokud máš na výběr mezi dvěma přístupy, krátce nabídni oba a nech ho rozhodnout. Drobné poznámky pro zlepšení uvítá, ale ne dlouhé úvahy bez konkrétního závěru.

Při větších změnách (např. nová partie, refaktor komponenty) **uložit a počkat na schválení v Preview**, nepushovat automaticky.

## Licence

Tento projekt je publikován pod licencí **GNU General Public License v3** (viz `LICENSE`). Důvod: používáme SVG figurky z PyChess (GPL v3), takže atribuce a kompatibilní licence jsou nutné. Pro vzdělávací osobní projekt na Vercelu je to v pohodě, pro komerční využití by bylo nutné siluety nahradit.
