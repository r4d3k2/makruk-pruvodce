# CLAUDE.md — Makruk Průvodce

## O projektu

Vzdělávací webová aplikace pro učení thajských šachů (makruku).
Cílová skupina: česky mluvící šachisté a hráči xiangqi.

Sourozenec projektu xiangqi-pruvodce — sdílí UX pattern
a architekturu, liší se obsahem (8×8 deska, jiné figury, jiná
pravidla, žádná řeka ani palác).

Živá URL: https://makruk-pruvodce.vercel.app/

## Vývojový workflow

- Cesta B z AI Flow průvodce: Claude Code Desktop → GitHub → Vercel
- Větev `main`, žádné worktree, žádné feature větve
- Každý prompt do Claude Code začíná: "Work directly on the main
  branch, do not create new branches, do not use git worktree."

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS + CSS custom properties (3 témata: `thai-sunset`,
  `teak-day`, `midnight-teak`)
- Vlastní makruková logika v `src/lib/makruk.ts`, žádné externí
  šachové knihovny
- Siluety figur z PyChess (GPL v3) v `src/assets/pieces/`
- Žádný backend, žádné API, žádné přihlašování

## Klíčové soubory

- `src/lib/makruk.ts` — typy, výchozí deska, applyMoves s promocí
- `src/lib/storage.ts` — localStorage (téma, pokrok, strana hráče)
- `src/lib/recommend.ts` — algoritmus chytrého opakování
- `src/data/strategies.ts` — 5 strategií × varianty × tahy
- `src/data/pieces.ts` — 6 figur + diagramy pohybu
- `src/data/games.ts` — 4 instruktážní partie (vč. K+R endgame, promoce)
- `src/components/makruk/MakrukBoard.tsx` — SVG deska 8×8
- `src/components/makruk/PieceSilhouettes.tsx` — wrapper pro SVG
  z PyChess
- `src/pages/Index.tsx` — hlavní stránka, 4 režimy

## Designové principy

- Autentická thajská estetika: oranžová deska, siluety figur
  (žádné placky se znaky jako u xiangqi)
- České názvy figur s thajskými v závorce (Khun ขุน)
- Mobile-first, kontejner max 520px
- Pill 3-level hierarchie (L1 = režimy, L2 = strategie/partie,
  L3 = varianty)
- 4 režimy: Studovat / Procvičovat / Figury / Partie
- Promoce vizualizována zlatým prstenem (600 ms blik) + převrácenou
  siluetou Met (tabletop konvence)

## Co s tímto projektem NEDĚLAT

- Nezavádět externí backend, databáze, autentizaci
- Nepřidávat sound effects
- Nepřidávat reklamy, tracking
- Nemíchat s xiangqi-pruvodce — to je samostatný projekt
  (později spojíme do zastřešující aplikace)
- Neimplementovat counting rules jako vynucenou herní logiku
  (jen popsáno textově)
- Neměnit pravidla makruku — používáme originální/standardní verzi
- V Procvičovat režimu hráč může hrát za obě strany
  (Hraj za bílého / Hraj za černého)
- Ve Studovat režimu otočení desky je čistě vizuální
  (bílý vždy začíná, otáčení mění jen pohled)
