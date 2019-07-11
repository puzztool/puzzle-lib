# puzzle-lib

[![Build Status](https://travis-ci.com/puzztool/puzzle-lib.svg?branch=master)](https://travis-ci.com/puzztool/puzzle-lib)
[![npm](https://img.shields.io/npm/v/puzzle-lib.svg)](https://www.npmjs.com/package/puzzle-lib)

Library of puzzle-solving algorithms

## Usage

```console
$ npm install --save puzzle-lib
```

```js
const { MorseCharacter } = require('puzzle-lib');
const ch = new MorseCharacter();
ch.dot();
console.log(ch.toString());
```

## Contributing

The library code is written in TypeScript and produces ECMAScript 5 output. The test code is written in JavaScript using
[Mocha](https://mochajs.org/).

```console
$ git clone https://github.com/puzztool/puzzle-lib.git
$ cd puzzle-lib
$ npm install
$ npm test
```

To use local changes in another project:

```console
$ cd <path to other project>
$ npm link <path to puzzle-lib>
```
