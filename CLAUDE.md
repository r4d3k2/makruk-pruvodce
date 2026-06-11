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
- `src/data/strategies.ts` — 5 strategií × 1 varianta každá × ~10 tahů
- `src/data/pieces.ts` — 6 figur + diagramy pohybu
- `src/data/games.ts` — **7 instruktážních partií** (4 původních + Mat dvěma věžemi, Khon+Met mat, Kramnikova fianchetto Khon)
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
- **Negenerovat tahy bez simulace** — každý tah v `strategies.ts` a `games.ts` musí být legální. Při přidávání nového obsahu vždy mentálně simulovat sekvenci.

## Co s tímto projektem DĚLAT (pravidla pro úpravy obsahu)

- **Komentáře k tahům musí být pedagogické**, ne generické (žádné „dobrý tah", „symetricky"). Vysvětlovat **proč** tah dává smysl, navazovat na předchozí tah, případně zmínit specifika makruku (např. „pole c3 je obsazené Bia, kůň musí na d2").
- **Tahy musí být legální** — Claude Code v promptech dostává explicitní pokyn k simulaci. Při ručních úpravách (např. v GitHub web editoru) toto pravidlo také platí.
- **Studovat režim:** otočení desky 🔄 je čistě vizuální (bílý vždy začíná, otáčení mění jen pohled).
- **Procvičovat režim:** hráč může hrát za obě strany přes „Hraj za bílého / Hraj za černého" přepínač. Soupeř hraje automaticky po 700 ms.

## Autentické zdroje pro obsah

- **Pravidla:** [pychess.org/variants/makruk](https://www.pychess.org/variants/makruk) — autoritativní reference
- **Strategie a koncovky:** PyChess guide + chessvariants.org
- **Kramnikova partie** (Partie 7 v games.ts): inspirována analyzovanou makruk hrou Vladimira Kramnika z chessvariants.org. Pasáž ukazuje fianchetto Khon a útok přes g-sloupec.
- **Kramnikova citace** (v history sekci Strategie 1 i 2): *„Makruk Thai je strategičtější než mezinárodní šachy — musíte plánovat operace s naprostou opatrností, protože makruk lze přirovnat k anticipovanému koncovce mezinárodních šachů."* — Vladimir Kramnik

## Komunikace s uživatelem

Uživatel (Radovan) komunikuje stručně, česky. Když si nejsi něčím jistý, **zeptej se** — nepokoušej se „domyslet". Pokud máš na výběr mezi dvěma přístupy, krátce nabídni oba a nech ho rozhodnout. Drobné poznámky pro zlepšení uvítá, ale ne dlouhé úvahy bez konkrétního závěru.

Při větších změnách (např. nová partie, refaktor komponenty) **uložit a počkat na schválení v Preview**, nepushovat automaticky.

## Licence

Tento projekt je publikován pod licencí **GNU General Public License v3** (viz `LICENSE`). Důvod: používáme SVG figurky z PyChess (GPL v3), takže atribuce a kompatibilní licence jsou nutné. Pro vzdělávací osobní projekt na Vercelu je to v pohodě, pro komerční využití by bylo nutné siluety nahradit.
