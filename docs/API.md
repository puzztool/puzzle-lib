# puzzle-lib API Reference

## `puzzle-lib/braille`

Braille encoding, decoding, and stream processing.

```ts
import {
  decodeBrailleStream,
  getBrailleDot,
  lookupBrailleEncoding,
  toggleBrailleDot,
  BrailleDot,
  BrailleEncoding,
} from 'puzzle-lib/braille';
```

| Export                            | Type     | Description                                    |
| --------------------------------- | -------- | ---------------------------------------------- |
| `lookupBrailleEncoding(encoding)` | Function | Look up a character by its braille dot pattern |
| `decodeBrailleStream(stream)`     | Function | Decode a stream of braille encodings into text |
| `getBrailleDot(encoding, dot)`    | Function | Check if a specific dot is set in an encoding  |
| `toggleBrailleDot(encoding, dot)` | Function | Toggle a specific dot in an encoding           |
| `BrailleDot`                      | Enum     | Dot positions (e.g., `BrailleDot.UpperLeft`)   |
| `BrailleEncoding`                 | Enum     | Named braille encodings                        |

## `puzzle-lib/cipher`

Caesar, Vigenère, and Autokey cipher operations.

```ts
import {
  autokeyDecrypt,
  autokeyEncrypt,
  caesarRotate,
  caesarRotations,
  isAlpha,
  rotateLetter,
  vigenereDecrypt,
  vigenereEncrypt,
} from 'puzzle-lib/cipher';
```

| Export                        | Type     | Description                              |
| ----------------------------- | -------- | ---------------------------------------- |
| `caesarRotate(text, shift)`   | Function | Apply a Caesar cipher shift to text      |
| `caesarRotations(text)`       | Function | Return all 26 Caesar rotations           |
| `rotateLetter(letter, shift)` | Function | Rotate a single letter by a shift amount |
| `vigenereEncrypt(text, key)`  | Function | Encrypt text using the Vigenère cipher   |
| `vigenereDecrypt(text, key)`  | Function | Decrypt text using the Vigenère cipher   |
| `autokeyEncrypt(text, key)`   | Function | Encrypt text using the Autokey cipher    |
| `autokeyDecrypt(text, key)`   | Function | Decrypt text using the Autokey cipher    |
| `isAlpha(char)`               | Function | Check if a character is alphabetic       |

## `puzzle-lib/common`

Shared types used across multiple modules.

```ts
import {
  CharacterImage,
  EncodingCategory,
  EncodingEntry,
  EncodingLookupResult,
  InlineSvg,
} from 'puzzle-lib/common';
```

| Export                 | Type  | Description                                                       |
| ---------------------- | ----- | ----------------------------------------------------------------- |
| `EncodingCategory`     | Enum  | Category of an encoding entry (Letter, Number, Punctuation, etc.) |
| `CharacterImage`       | Class | A character with associated image data                            |
| `EncodingEntry`        | Class | An entry in an encoding table                                     |
| `EncodingLookupResult` | Class | Result of an encoding lookup                                      |
| `InlineSvg`            | Class | Inline SVG image data                                             |

## `puzzle-lib/conversion`

Character encoding conversion, ASCII/ordinal tables, and significant figure
rounding.

```ts
import {
  convertCharacter,
  convertString,
  determineCharacterEncoding,
  determineStringEncoding,
  getAsciiTable,
  getOrdinalTable,
  toAscii,
  toOrdinal,
  CharacterEncoding,
  CharacterTableEntry,
  sigFigCeil,
  sigFigFloor,
  sigFigRound,
} from 'puzzle-lib/conversion';
```

| Export                             | Type     | Description                                                         |
| ---------------------------------- | -------- | ------------------------------------------------------------------- |
| `convertCharacter(char, from, to)` | Function | Convert a character between encodings                               |
| `convertString(str, from, to)`     | Function | Convert a string between encodings                                  |
| `determineCharacterEncoding(char)` | Function | Determine the encoding of a character                               |
| `determineStringEncoding(str)`     | Function | Determine the encoding of a string                                  |
| `getAsciiTable()`                  | Function | Get the full ASCII lookup table                                     |
| `getOrdinalTable()`                | Function | Get the A=1 ordinal lookup table                                    |
| `toAscii(value)`                   | Function | Convert a value to its ASCII character                              |
| `toOrdinal(value)`                 | Function | Convert a value to its ordinal character                            |
| `CharacterEncoding`                | Enum     | Supported character encodings                                       |
| `CharacterTableEntry`              | Class    | A character table entry with binary, octal, decimal, and hex values |
| `sigFigCeil(value, figures)`       | Function | Ceiling to significant figures                                      |
| `sigFigFloor(value, figures)`      | Function | Floor to significant figures                                        |
| `sigFigRound(value, figures)`      | Function | Round to significant figures                                        |

## `puzzle-lib/morse`

Morse code encoding, decoding, and manipulation.

```ts
import {
  decodeMorse,
  invertAndReverseMorse,
  invertMorse,
  lookupMorseEncoding,
  morseEncodingToString,
  MORSE_CHARACTER_DIVIDER,
  MORSE_DASH,
  MORSE_DOT,
  MORSE_WORD_DIVIDER,
  parseMorseString,
  reverseMorse,
  MorseEncoding,
} from 'puzzle-lib/morse';
```

| Export                            | Type     | Description                                     |
| --------------------------------- | -------- | ----------------------------------------------- |
| `decodeMorse(morse)`              | Function | Decode a morse code string into text            |
| `lookupMorseEncoding(encoding)`   | Function | Look up a character by its morse encoding       |
| `morseEncodingToString(encoding)` | Function | Convert a morse encoding to its dot/dash string |
| `parseMorseString(str)`           | Function | Parse a dot/dash string into a morse encoding   |
| `invertMorse(morse)`              | Function | Swap dots and dashes                            |
| `reverseMorse(morse)`             | Function | Reverse the morse sequence                      |
| `invertAndReverseMorse(morse)`    | Function | Swap dots/dashes and reverse                    |
| `MORSE_DOT`                       | Constant | The dot character used in morse strings         |
| `MORSE_DASH`                      | Constant | The dash character used in morse strings        |
| `MORSE_CHARACTER_DIVIDER`         | Constant | Divider between characters                      |
| `MORSE_WORD_DIVIDER`              | Constant | Divider between words                           |
| `MorseEncoding`                   | Enum     | Named morse encodings                           |

## `puzzle-lib/nato`

NATO phonetic alphabet lookup.

```ts
import {
  lookupNatoPhonetic,
  NATO_ALPHABET,
  NatoCharacter,
} from 'puzzle-lib/nato';
```

| Export                     | Type     | Description                                 |
| -------------------------- | -------- | ------------------------------------------- |
| `lookupNatoPhonetic(char)` | Function | Look up the NATO phonetic word for a letter |
| `NATO_ALPHABET`            | Constant | Array of all 26 NATO phonetic entries       |
| `NatoCharacter`            | Class    | A NATO alphabet entry (character + word)    |

## `puzzle-lib/naval-flags`

International naval signal flag lookup.

```ts
import {getNavalFlag, NAVAL_FLAGS} from 'puzzle-lib/naval-flags';
```

| Export               | Type     | Description                         |
| -------------------- | -------- | ----------------------------------- |
| `getNavalFlag(char)` | Function | Look up the naval flag for a letter |
| `NAVAL_FLAGS`        | Constant | Array of all 26 naval flag entries  |

## `puzzle-lib/resistor`

Resistor color code calculator.

```ts
import {
  getResistorDisplayValue,
  getResistorValue,
  hasResistorTolerance,
  hasResistorValue,
  INVALID_RESISTOR,
  RESISTOR_COLOR_TABLE,
} from 'puzzle-lib/resistor';
import type {ResistorColor} from 'puzzle-lib/resistor';

// Calculate resistance from color bands
const value = getResistorValue([
  RESISTOR_COLOR_TABLE[4], // Yellow
  RESISTOR_COLOR_TABLE[7], // Violet
  RESISTOR_COLOR_TABLE[3], // Orange (multiplier)
]);
getResistorDisplayValue(value); // '47k'
```

| Export                           | Type     | Description                                          |
| -------------------------------- | -------- | ---------------------------------------------------- |
| `getResistorValue(colors)`       | Function | Calculate resistance from color bands                |
| `getResistorDisplayValue(value)` | Function | Format a resistance value for display (e.g., "4.7k") |
| `hasResistorValue(color)`        | Function | Check if a color has a resistance value              |
| `hasResistorTolerance(color)`    | Function | Check if a color has a tolerance value               |
| `INVALID_RESISTOR`               | Constant | Sentinel value for invalid resistor                  |
| `RESISTOR_COLOR_TABLE`           | Constant | Full color code reference table                      |
| `ResistorColor`                  | Type     | A resistor color band entry                          |

## `puzzle-lib/semaphore`

Flag semaphore encoding, decoding, and direction manipulation.

Semaphore encodings are bitmasks of `SemaphoreDirection` values representing
the two flag positions for a character.

```ts
import {
  addSemaphoreDirection,
  decodeSemaphoreStream,
  degreesToSemaphoreDirection,
  directionsToEncoding,
  getEncodingDegrees,
  hasSemaphoreDirection,
  lookupSemaphoreEncoding,
  removeSemaphoreDirection,
  semaphoreDirectionToDegrees,
  SemaphoreDirection,
  SemaphoreEncoding,
} from 'puzzle-lib/semaphore';

// Build an encoding from directions (A = flags at SouthWest + South)
const encoding = directionsToEncoding([
  SemaphoreDirection.SouthWest,
  SemaphoreDirection.South,
]);
lookupSemaphoreEncoding(encoding).exactString; // 'A'

// Or use a named encoding directly
lookupSemaphoreEncoding(SemaphoreEncoding.LetterA).exactString; // 'A'

// Decode a stream of encodings
decodeSemaphoreStream([SemaphoreEncoding.LetterH, SemaphoreEncoding.LetterI]); // 'HI'
```

| Export                                    | Type     | Description                                        |
| ----------------------------------------- | -------- | -------------------------------------------------- |
| `lookupSemaphoreEncoding(encoding)`       | Function | Look up a character by its semaphore encoding      |
| `decodeSemaphoreStream(stream)`           | Function | Decode a stream of semaphore encodings into text   |
| `addSemaphoreDirection(encoding, dir)`    | Function | Add a direction to a semaphore encoding            |
| `removeSemaphoreDirection(encoding, dir)` | Function | Remove a direction from a semaphore encoding       |
| `hasSemaphoreDirection(encoding, dir)`    | Function | Check if a direction is set                        |
| `directionsToEncoding(dirs)`              | Function | Convert directions to a semaphore encoding         |
| `degreesToSemaphoreDirection(degrees)`    | Function | Convert degrees to the nearest semaphore direction |
| `semaphoreDirectionToDegrees(dir)`        | Function | Convert a semaphore direction to degrees           |
| `getEncodingDegrees(encoding)`            | Function | Get the degrees for each flag in an encoding       |
| `SemaphoreDirection`                      | Enum     | Flag directions (Up, UpRight, Right, etc.)         |
| `SemaphoreEncoding`                       | Enum     | Named semaphore encodings                          |

## `puzzle-lib/word-search`

Word search grid solver.

```ts
import {
  findWords,
  parseWordSearchGrid,
  WordSearchResult,
  WordSearchDirection,
} from 'puzzle-lib/word-search';
import type {WordSearchPoint, WordSearchOptions} from 'puzzle-lib/word-search';
```

| Export                      | Type      | Description                                                       |
| --------------------------- | --------- | ----------------------------------------------------------------- |
| `findWords(options)`        | Function  | Find words in a grid, returning their positions                   |
| `parseWordSearchGrid(text)` | Function  | Parse a text grid into a 2D character array                       |
| `WordSearchPoint`           | Interface | A 2D point with x and y coordinates                               |
| `WordSearchResult`          | Class     | A found word with its matched points                              |
| `WordSearchDirection`       | Enum      | Search directions (None, Cardinal, Diagonal, CardinalAndDiagonal) |
| `WordSearchOptions`         | Interface | Options for word search (grid, words, directions)                 |
