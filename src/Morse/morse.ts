import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingEntry} from '../Common/EncodingEntry';
import {EncodingLookupResult} from '../Common/EncodingLookupResult';
import {MorseEncoding} from './MorseEncoding';

export const MORSE_DOT = '.';
export const MORSE_DASH = '-';
export const MORSE_CHARACTER_DIVIDER = '/';
export const MORSE_WORD_DIVIDER = ' ';

// Reserved character used internally for dot/dash swap
const RESERVED_DIVIDER = 'A';

const MORSE_BITMASK = MorseEncoding.Dot | MorseEncoding.Dash;

// Build the lookup table once
const MORSE_ENTRIES: Array<EncodingEntry<MorseEncoding>> = [];

function addEntry(
  encoding: MorseEncoding,
  category: EncodingCategory,
  display: string,
) {
  MORSE_ENTRIES.push(new EncodingEntry(encoding, category, display));
}

// Letters
addEntry(MorseEncoding.LetterA, EncodingCategory.Letter, 'A');
addEntry(MorseEncoding.LetterB, EncodingCategory.Letter, 'B');
addEntry(MorseEncoding.LetterC, EncodingCategory.Letter, 'C');
addEntry(MorseEncoding.LetterD, EncodingCategory.Letter, 'D');
addEntry(MorseEncoding.LetterE, EncodingCategory.Letter, 'E');
addEntry(MorseEncoding.LetterF, EncodingCategory.Letter, 'F');
addEntry(MorseEncoding.LetterG, EncodingCategory.Letter, 'G');
addEntry(MorseEncoding.LetterH, EncodingCategory.Letter, 'H');
addEntry(MorseEncoding.LetterI, EncodingCategory.Letter, 'I');
addEntry(MorseEncoding.LetterJ, EncodingCategory.Letter, 'J');
addEntry(MorseEncoding.LetterK, EncodingCategory.Letter, 'K');
addEntry(MorseEncoding.LetterL, EncodingCategory.Letter, 'L');
addEntry(MorseEncoding.LetterM, EncodingCategory.Letter, 'M');
addEntry(MorseEncoding.LetterN, EncodingCategory.Letter, 'N');
addEntry(MorseEncoding.LetterO, EncodingCategory.Letter, 'O');
addEntry(MorseEncoding.LetterP, EncodingCategory.Letter, 'P');
addEntry(MorseEncoding.LetterQ, EncodingCategory.Letter, 'Q');
addEntry(MorseEncoding.LetterR, EncodingCategory.Letter, 'R');
addEntry(MorseEncoding.LetterS, EncodingCategory.Letter, 'S');
addEntry(MorseEncoding.LetterT, EncodingCategory.Letter, 'T');
addEntry(MorseEncoding.LetterU, EncodingCategory.Letter, 'U');
addEntry(MorseEncoding.LetterV, EncodingCategory.Letter, 'V');
addEntry(MorseEncoding.LetterW, EncodingCategory.Letter, 'W');
addEntry(MorseEncoding.LetterX, EncodingCategory.Letter, 'X');
addEntry(MorseEncoding.LetterY, EncodingCategory.Letter, 'Y');
addEntry(MorseEncoding.LetterZ, EncodingCategory.Letter, 'Z');

// Numbers
addEntry(MorseEncoding.Number0, EncodingCategory.Number, '0');
addEntry(MorseEncoding.Number1, EncodingCategory.Number, '1');
addEntry(MorseEncoding.Number2, EncodingCategory.Number, '2');
addEntry(MorseEncoding.Number3, EncodingCategory.Number, '3');
addEntry(MorseEncoding.Number4, EncodingCategory.Number, '4');
addEntry(MorseEncoding.Number5, EncodingCategory.Number, '5');
addEntry(MorseEncoding.Number6, EncodingCategory.Number, '6');
addEntry(MorseEncoding.Number7, EncodingCategory.Number, '7');
addEntry(MorseEncoding.Number8, EncodingCategory.Number, '8');
addEntry(MorseEncoding.Number9, EncodingCategory.Number, '9');

// Punctuation
addEntry(MorseEncoding.PunctuationPeriod, EncodingCategory.Punctuation, '.');
addEntry(MorseEncoding.PunctuationComma, EncodingCategory.Punctuation, ',');
addEntry(
  MorseEncoding.PunctuationQuestionMark,
  EncodingCategory.Punctuation,
  '?',
);
addEntry(
  MorseEncoding.PunctuationApostrophe,
  EncodingCategory.Punctuation,
  "'",
);
addEntry(
  MorseEncoding.PunctuationExclamationPoint,
  EncodingCategory.Punctuation,
  '!',
);
addEntry(
  MorseEncoding.PunctuationForwardSlash,
  EncodingCategory.Punctuation,
  '/',
);
addEntry(
  MorseEncoding.PunctuationOpenParenthesis,
  EncodingCategory.Punctuation,
  '(',
);
addEntry(
  MorseEncoding.PunctuationCloseParenthesis,
  EncodingCategory.Punctuation,
  ')',
);
addEntry(MorseEncoding.PunctuationAmpersand, EncodingCategory.Punctuation, '&');
addEntry(MorseEncoding.PunctuationColon, EncodingCategory.Punctuation, ':');
addEntry(MorseEncoding.PunctuationSemicolon, EncodingCategory.Punctuation, ';');
addEntry(
  MorseEncoding.PunctuationDoubleDash,
  EncodingCategory.Punctuation,
  '=',
);
addEntry(MorseEncoding.PunctuationPlusSign, EncodingCategory.Punctuation, '+');
addEntry(MorseEncoding.PunctuationHyphen, EncodingCategory.Punctuation, '-');
addEntry(
  MorseEncoding.PunctuationUnderscore,
  EncodingCategory.Punctuation,
  '_',
);
addEntry(
  MorseEncoding.PunctuationQuotationMark,
  EncodingCategory.Punctuation,
  '"',
);
addEntry(
  MorseEncoding.PunctuationDollarSign,
  EncodingCategory.Punctuation,
  '$',
);
addEntry(MorseEncoding.PunctuationAtSign, EncodingCategory.Punctuation, '@');

/**
 * Converts a MorseEncoding value to its dot/dash string representation.
 */
export function morseEncodingToString(encoding: MorseEncoding): string {
  let morseChars = '';

  while (encoding !== MorseEncoding.None) {
    if ((encoding & MORSE_BITMASK) === MorseEncoding.Dot) {
      morseChars += MORSE_DOT;
    } else if ((encoding & MORSE_BITMASK) === MorseEncoding.Dash) {
      morseChars += MORSE_DASH;
    } else {
      throw new Error('Invalid morse bits');
    }

    encoding >>>= 2;
  }

  return morseChars;
}

/**
 * Parses a dot/dash string into a MorseEncoding value.
 */
export function parseMorseString(morse: string): MorseEncoding {
  let bits = MorseEncoding.None;

  for (let i = morse.length - 1; i >= 0; i--) {
    const ch = morse[i];
    if (ch === MORSE_DOT) {
      bits |= MorseEncoding.Dot;
    } else if (ch === MORSE_DASH) {
      bits |= MorseEncoding.Dash;
    } else {
      throw new Error('Invalid morse character');
    }

    bits <<= 2;
  }

  bits >>>= 2;
  return bits;
}

/**
 * Looks up a morse encoding in the data table.
 */
export function lookupMorseEncoding(
  encoding: MorseEncoding,
  category: EncodingCategory = EncodingCategory.All,
): EncodingLookupResult<MorseEncoding> {
  const result = new EncodingLookupResult<MorseEncoding>();

  for (const entry of MORSE_ENTRIES) {
    if ((entry.category & category) !== 0) {
      if (entry.encoding === encoding) {
        result.exact.push(entry);
      } else if ((entry.encoding & encoding) === encoding) {
        result.partial.push(entry);
      }
    }
  }

  return result;
}

function validateDividers(characterDivider: string, wordDivider: string): void {
  if (characterDivider.length !== 1) {
    throw new Error('Divider must be a single character');
  }
  if (wordDivider.length !== 1) {
    throw new Error('Divider must be a single character');
  }
  if (characterDivider === wordDivider) {
    throw new Error('Dividers must be different from each other');
  }
  if (characterDivider === MORSE_DASH) {
    throw new Error('Character divider must not be a reserved value');
  }
  if (characterDivider === MORSE_DOT) {
    throw new Error('Character divider must not be a reserved value');
  }
  if (characterDivider === RESERVED_DIVIDER) {
    throw new Error('Character divider must not be a reserved value');
  }
  if (wordDivider === MORSE_DASH) {
    throw new Error('Word divider must not be a reserved value');
  }
  if (wordDivider === MORSE_DOT) {
    throw new Error('Word divider must not be a reserved value');
  }
  if (wordDivider === RESERVED_DIVIDER) {
    throw new Error('Word divider must not be a reserved value');
  }
}

function parseWords(
  morse: string,
  characterDivider: string,
  wordDivider: string,
): string[][] {
  const words = morse.split(wordDivider).filter(w => w.length > 0);
  return words.map(w => w.split(characterDivider).filter(wc => wc.length > 0));
}

function decodeMorseChar(morseStr: string): string {
  const encoding = parseMorseString(morseStr);
  const result = lookupMorseEncoding(encoding);
  return result.exactString || '?';
}

/**
 * Decodes a morse string to readable text.
 */
export function decodeMorse(
  morse: string,
  characterDivider = MORSE_CHARACTER_DIVIDER,
  wordDivider = MORSE_WORD_DIVIDER,
): string {
  validateDividers(characterDivider, wordDivider);
  const words = parseWords(morse, characterDivider, wordDivider);
  return words
    .map(word => word.map(ch => decodeMorseChar(ch)).join(''))
    .join(' ');
}

function invertMorseStr(morseStr: string): string {
  return morseStr
    .replace(/\./g, RESERVED_DIVIDER)
    .replace(/-/g, MORSE_DOT)
    .replace(new RegExp(RESERVED_DIVIDER, 'g'), MORSE_DASH);
}

/**
 * Inverts dots and dashes in a morse string, then decodes.
 */
export function invertMorse(
  morse: string,
  characterDivider = MORSE_CHARACTER_DIVIDER,
  wordDivider = MORSE_WORD_DIVIDER,
): string {
  validateDividers(characterDivider, wordDivider);
  const words = parseWords(morse, characterDivider, wordDivider);
  return words
    .map(word => word.map(ch => decodeMorseChar(invertMorseStr(ch))).join(''))
    .join(' ');
}

/**
 * Reverses a morse string (reverses words, letters within words,
 * and dots/dashes within each letter), then decodes.
 */
export function reverseMorse(
  morse: string,
  characterDivider = MORSE_CHARACTER_DIVIDER,
  wordDivider = MORSE_WORD_DIVIDER,
): string {
  validateDividers(characterDivider, wordDivider);
  const words = parseWords(morse, characterDivider, wordDivider);
  const reversed = words
    .map(word => word.map(ch => ch.split('').reverse().join('')).reverse())
    .reverse();
  return reversed
    .map(word => word.map(ch => decodeMorseChar(ch)).join(''))
    .join(' ');
}

/**
 * Inverts dots/dashes and reverses a morse string, then decodes.
 */
export function invertAndReverseMorse(
  morse: string,
  characterDivider = MORSE_CHARACTER_DIVIDER,
  wordDivider = MORSE_WORD_DIVIDER,
): string {
  validateDividers(characterDivider, wordDivider);
  const words = parseWords(morse, characterDivider, wordDivider);
  const transformed = words
    .map(word =>
      word.map(ch => invertMorseStr(ch).split('').reverse().join('')).reverse(),
    )
    .reverse();
  return transformed
    .map(word => word.map(ch => decodeMorseChar(ch)).join(''))
    .join(' ');
}
