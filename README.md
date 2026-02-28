# puzzle-lib

![puzzle-lib CI](https://github.com/puzztool/puzzle-lib/workflows/puzzle-lib%20CI/badge.svg)
[![npm](https://img.shields.io/npm/v/puzzle-lib.svg)](https://www.npmjs.com/package/puzzle-lib)

Library of puzzle-solving algorithms

## Usage

```console
$ npm install --save puzzle-lib
```

```ts
import { decodeMorse, caesarRotations, vigenereEncrypt } from 'puzzle-lib';

// Decode morse code
decodeMorse('.----/..---/...--'); // '123'

// Get all Caesar cipher rotations
caesarRotations('hello');

// Vigenère encrypt
vigenereEncrypt('hello', 'key');
```

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
$ cd <path to other project>
$ npm link <path to puzzle-lib>
```
