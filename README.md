# Makruk — Průvodce thajskými šachy

Vzdělávací webová aplikace pro učení thajských šachů (makruku). Cílová
skupina: česky mluvící šachisté a hráči xiangqi, kteří se chtějí seznámit
s touto historickou variantou pocházející z chaturangy.

Sourozenec projektu [xiangqi-pruvodce](https://github.com/r4d3k2/xiangqi-pruvodce)
— sdílí UX pattern a architekturu, liší se obsahem (deska 8×8, jiné figury
a pravidla).

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS (v4) + CSS custom properties (3 témata)
- Vlastní makruková logika v `src/lib/makruk.ts`, žádné externí šachové
  knihovny

## Vývoj

```bash
npm install
npm run dev      # vývojový server
npm run build    # produkční build
```

## Licence a kredity

Tento projekt je publikován pod licencí **GNU General Public License v3**
(viz `LICENSE`).

Siluety figur pro makruk pocházejí z projektu
[PyChess](https://github.com/pychess/pychess) (autor: cajone et al.,
licence GPL v3) — soubory v `src/assets/pieces/`. Při použití nebo
úpravě těchto siluet musí být zachována původní licence.

Aplikaci vytvořil Radovan jako vzdělávací nástroj pro učení thajských
šachů (makruku). Není určena ke komerčním účelům.
