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

- `src/` — Library source code, organized by module (kebab-case directories)
  - `src/braille/` — Braille encoding/decoding
  - `src/cipher/` — Cipher implementations (Caesar, Vigenère, Autokey)
  - `src/common/` — Shared types (EncodingCategory, EncodingEntry, etc.)
  - `src/conversion/` — Number/letter encoding conversions (ASCII, binary, ordinal, ternary)
  - `src/morse/` — Morse code encoding/decoding
  - `src/nato/` — NATO phonetic alphabet
  - `src/naval-flags/` — International naval signal flags
  - `src/pigpen/` — Pigpen cipher encoding/decoding
  - `src/resistor/` — Resistor color code calculator
  - `src/semaphore/` — Semaphore flag encoding/decoding
  - `src/word-search/` — Word search grid solver
- `test/` — Test files (one per module, using Vitest)
- `docs/API.md` — Full API reference

## Code Style

- Uses [Google TypeScript Style (gts)](https://github.com/google/gts)
- Prettier formatting is enforced via `gts lint`
- File and folder names under `src/` and `test/` must be **kebab-case** (enforced by `eslint-plugin-check-file`)

## Module Structure (ESM)

This project uses ES modules (`"type": "module"` in `package.json`) with
[subpath exports](https://nodejs.org/api/packages.html#subpath-exports).
There is no root entry point — each module is imported independently
(e.g., `import { decodeMorse } from 'puzzle-lib/morse'`).

**Key conventions:**

- Each module lives in its own kebab-case directory under `src/` (e.g., `src/morse/`)
- Each module has a barrel export file `index.ts` that re-exports its public API
- Internal imports between source files use `.js` extensions (e.g., `import {Foo} from './bar.js'`) — this is required for ESM compatibility with TypeScript
- Tests import from the module's `index.js` (e.g., `from '../src/morse/index.js'`), not from a root entry point

## Adding a New Module

1. Create a kebab-case directory under `src/` (e.g., `src/my-module/`)
2. Add source files with kebab-case names
3. Create `src/my-module/index.ts` as the barrel export
4. Add a subpath export entry in `package.json` under `"exports"`:
   ```json
   "./my-module": {
     "types": "./build/src/my-module/index.d.ts",
     "default": "./build/src/my-module/index.js"
   }
   ```
5. Add tests in `test/my-module.ts`, importing from `'../src/my-module/index.js'`
6. Update `README.md` (add to the Modules table) and `docs/API.md` (add a section with imports, signatures, and examples)
