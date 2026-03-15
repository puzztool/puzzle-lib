# AGENTS.md

## Project Overview

puzzle-lib is a TypeScript library providing encoding, decoding, and puzzle-solving utilities. It is consumed by the [puzztool](https://github.com/puzztool/puzztool) web app.

## Development Environment

- **Runtime**: Node.js 20+ (tested on 20.x, 22.x, 24.x; a `shell.nix` is provided for NixOS users)
- **Package Manager**: npm

## Commands

- `npm run compile` — Compile TypeScript with `tsc`
- `npm test` — Type-check and run tests (vitest)
- `npm run lint` — Lint with `gts lint` (ESLint + Prettier via Google TypeScript Style)
- `npm run fix` — Auto-fix lint and formatting issues with `gts fix`

## Before Committing

Always run the following before committing changes:

```sh
npm run fix
npm run lint
npm test
```

`gts lint` enforces both ESLint rules and Prettier formatting. CI runs `npm run lint` separately from tests, so formatting issues will cause CI failures even if tests pass. Running `npm run fix` first will auto-correct most issues.

When adding or changing any public API (new exports, renamed functions, changed signatures), update the following documentation:

- `README.md` — Add or update usage examples in the "Quick Start" section
- `docs/API.md` — Add or update the relevant module section with imports, function signatures, and examples

## Project Structure

- `src/` — Library source code
  - `src/Conversion/` — Number/letter encoding conversions (ASCII, binary, ordinal, ternary)
  - `src/Cipher/` — Cipher implementations (Caesar, Vigenere, Autokey)
  - `src/Braille/` — Braille encoding/decoding
  - `src/Morse/` — Morse code encoding/decoding
  - `src/Semaphore/` — Semaphore flag encoding/decoding
  - `src/WordSearch/` — Word search grid solver
- `test/` — Test files (one per module, using Vitest)
- `src/index.ts` — Public API exports

## Code Style

- Uses [Google TypeScript Style (gts)](https://github.com/google/gts)
- Prettier formatting is enforced via `gts lint`
- All public APIs are exported from `src/index.ts`
