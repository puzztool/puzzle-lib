# puzzle-lib

![puzzle-lib CI](https://github.com/puzztool/puzzle-lib/workflows/puzzle-lib%20CI/badge.svg)
[![npm](https://img.shields.io/npm/v/puzzle-lib.svg)](https://www.npmjs.com/package/puzzle-lib)

A TypeScript library of puzzle-solving algorithms. Includes tools for ciphers,
encodings, conversions, and more.

## Installation

```console
$ npm install puzzle-lib
```

## Usage

> **Breaking change in v2:** There is no longer a root `puzzle-lib` import.
> Use the subpath imports shown below.

puzzle-lib uses [subpath exports](https://nodejs.org/api/packages.html#subpath-exports)
so you import from the specific module you need:

```ts
import {caesarRotations, vigenereEncrypt} from 'puzzle-lib/cipher';
import {decodeMorse} from 'puzzle-lib/morse';
import {convertString} from 'puzzle-lib/conversion';
```

This enables tree-shaking — your bundler only includes the modules you
actually use.

### Quick examples

```ts
import {caesarRotations, vigenereEncrypt} from 'puzzle-lib/cipher';

// Get all 26 Caesar cipher rotations
caesarRotations('hello');

// Vigenère encrypt
vigenereEncrypt('hello', 'key'); // 'rijvs'
```

```ts
import {decodeMorse} from 'puzzle-lib/morse';

// Decode morse code
decodeMorse('.---- ..--- ...--'); // '123'
decodeMorse('.... . .-.. .-.. --- / .-- --- .-. .-.. -..'); // 'HELLO WORLD'
```

```ts
import {lookupBrailleEncoding} from 'puzzle-lib/braille';

// Look up a braille encoding
const result = lookupBrailleEncoding(0b101010);
```

## Modules

| Module      | Import path              | Description                                               |
| ----------- | ------------------------ | --------------------------------------------------------- |
| Braille     | `puzzle-lib/braille`     | Braille encoding/decoding                                 |
| Cipher      | `puzzle-lib/cipher`      | Caesar, Vigenère, and Autokey ciphers                     |
| Common      | `puzzle-lib/common`      | Shared types (`EncodingCategory`, `CharacterImage`, etc.) |
| Conversion  | `puzzle-lib/conversion`  | Character encoding conversion and ASCII/ordinal tables    |
| Morse       | `puzzle-lib/morse`       | Morse code encoding/decoding                              |
| NATO        | `puzzle-lib/nato`        | NATO phonetic alphabet lookup                             |
| Naval Flags | `puzzle-lib/naval-flags` | International naval signal flags                          |
| Resistor    | `puzzle-lib/resistor`    | Resistor color code calculator                            |
| Semaphore   | `puzzle-lib/semaphore`   | Flag semaphore encoding/decoding                          |
| Word Search | `puzzle-lib/word-search` | Word search grid solver                                   |

See [docs/API.md](docs/API.md) for the full API reference.

## Contributing

The library and tests are written in TypeScript. Tests use
[Vitest](https://vitest.dev/).

```console
$ git clone https://github.com/puzztool/puzzle-lib.git
$ cd puzzle-lib
$ npm install
$ npm test
```

To lint:

```console
$ npm run lint
```

To use local changes in another project:

```console
$ npm pack
$ cd <path to other project>
$ npm install <path to puzzle-lib tarball>
```
