import {CharacterEncoding} from './character-encoding.js';

const BINARY_REGEX = /^[01]+$/;
const TERNARY_REGEX = /^[0-2]{3}$/;
const HEX_REGEX = /^[0-9a-f]{2}$/i;

function appearsBinary(str: string): boolean {
  return BINARY_REGEX.test(str);
}

function appearsTernary(str: string): boolean {
  return TERNARY_REGEX.test(str);
}

function asciiPrintable(index: number): string {
  if (index < 32 || index > 126) {
    return '';
  }
  return String.fromCharCode(index);
}

/**
 * Checks if a token could be valid printable hex.
 */
function appearsHexPrintable(input: string): boolean {
  if (!HEX_REGEX.test(input)) {
    return false;
  }
  const hex = Number.parseInt(input, 16);
  return hex >= 32 && hex <= 126;
}

/**
 * Determines the character encoding of a single input token.
 */
export function determineCharacterEncoding(input: string): CharacterEncoding {
  // Unambiguous hex: 2 hex chars with at least one a-f letter and at least one digit
  if (HEX_REGEX.test(input) && /[a-f]/i.test(input) && /[0-9]/.test(input)) {
    return CharacterEncoding.Hexadecimal;
  }

  if (input.match(/[a-z]/i)) {
    return CharacterEncoding.Latin;
  }

  const numeric = Number.parseInt(input, 10);

  if (appearsBinary(input)) {
    if (input.length === 5) {
      return CharacterEncoding.FiveBitBinary;
    } else if (input.length === 8 || input.length === 7) {
      return CharacterEncoding.EightBitBinary;
    }
  }

  if (appearsTernary(input)) {
    return CharacterEncoding.Ternary;
  }

  if (input.length < 3 && numeric > 0 && numeric < 27) {
    return CharacterEncoding.Ordinal;
  }

  if (numeric > 64 && numeric < 91) {
    return CharacterEncoding.Ascii;
  }
  if (numeric > 97 && numeric < 123) {
    return CharacterEncoding.Ascii;
  }

  // All-digit 2-char tokens that aren't decimal but are valid printable hex
  if (appearsHexPrintable(input)) {
    return CharacterEncoding.Hexadecimal;
  }

  return CharacterEncoding.None;
}

/**
 * Converts a single token to a character based on its encoding.
 * Optionally forces a specific encoding.
 */
export function convertCharacter(
  input: string,
  forcedCharacterEncoding?: CharacterEncoding,
): string {
  const encoding = forcedCharacterEncoding ?? determineCharacterEncoding(input);

  if (encoding === CharacterEncoding.None) {
    return '';
  }

  if (encoding === CharacterEncoding.Latin) {
    return input;
  }

  const baseTen = Number.parseInt(input, 10);
  if (encoding === CharacterEncoding.Ascii) {
    return asciiPrintable(baseTen);
  }

  if (encoding === CharacterEncoding.Hexadecimal) {
    const hex = Number.parseInt(input, 16);
    if (Number.isNaN(hex)) {
      return '';
    }
    return asciiPrintable(hex);
  }

  const asciiOffset = 64;
  if (encoding === CharacterEncoding.Ordinal) {
    return asciiPrintable(baseTen + asciiOffset);
  }

  const binary = Number.parseInt(input, 2);
  if (encoding === CharacterEncoding.FiveBitBinary && appearsBinary(input)) {
    return asciiPrintable(binary + asciiOffset);
  }
  if (encoding === CharacterEncoding.EightBitBinary && appearsBinary(input)) {
    return asciiPrintable(binary);
  }

  if (encoding === CharacterEncoding.Ternary) {
    const ternary = Number.parseInt(input, 3);
    return asciiPrintable(ternary + asciiOffset);
  }

  return '';
}

// Auto-chunk a continuous binary string into 8-bit, 7-bit, or 5-bit groups.
function chunkBinary(token: string): string[] {
  if (!appearsBinary(token) || token.length <= 8) {
    return [token];
  }
  const chunkSize =
    token.length % 8 === 0
      ? 8
      : token.length % 7 === 0
        ? 7
        : token.length % 5 === 0
          ? 5
          : 8;
  return token.match(new RegExp(`.{1,${chunkSize}}`, 'g'))!;
}

function splitString(input: string): string[] {
  return input
    .split(' ')
    .filter(item => item !== '')
    .flatMap(chunkBinary);
}

/**
 * Determines the most common encoding across all tokens in a string.
 * When hex and decimal encodings are mixed, tries hex for all tokens
 * and picks whichever produces more printable results.
 */
export function determineStringEncoding(input: string): CharacterEncoding {
  const encodingCount: {[index: number]: number} = {};
  const parsed = splitString(input);
  const encodingKeys: number[] = [];

  for (const letter of parsed) {
    const charEncoding = determineCharacterEncoding(letter);
    if (!encodingCount[charEncoding]) {
      encodingCount[charEncoding] = 1;
      encodingKeys.push(charEncoding);
    } else {
      encodingCount[charEncoding] = encodingCount[charEncoding] + 1;
    }
  }

  let maxCount = 0;
  let maxEncoding: number;
  maxEncoding = CharacterEncoding.None;

  for (const encoding of encodingKeys) {
    if (encodingCount[encoding] > maxCount) {
      maxCount = encodingCount[encoding];
      maxEncoding = encoding;
    }
  }

  // Tiebreaker: if we have a mix of hex and decimal (Ascii/Ordinal) and the
  // most common encoding is a decimal type, check if interpreting everything
  // as hex produces more printable results.
  const hasHex = encodingCount[CharacterEncoding.Hexadecimal] > 0;
  const maxIsDecimal =
    maxEncoding === CharacterEncoding.Ascii ||
    maxEncoding === CharacterEncoding.Ordinal;

  if (hasHex && maxIsDecimal) {
    const hexPrintable = parsed.filter(
      t =>
        appearsHexPrintable(t) &&
        convertCharacter(t, CharacterEncoding.Hexadecimal) !== '',
    ).length;
    const decPrintable = parsed.filter(
      t => convertCharacter(t, maxEncoding) !== '',
    ).length;

    if (hexPrintable > decPrintable) {
      return CharacterEncoding.Hexadecimal;
    }
  }

  return maxEncoding;
}

/**
 * Converts a space-separated string by auto-detecting encoding.
 * If homogeneous is true, all tokens use the same detected encoding.
 */
export function convertString(input: string, homogeneous: boolean): string {
  const split = splitString(input);

  if (homogeneous) {
    const encoding = determineStringEncoding(input);
    return split.reduce(
      (result, letter) => result + convertCharacter(letter, encoding),
      '',
    );
  } else {
    return split.reduce(
      (result, letter) => result + convertCharacter(letter),
      '',
    );
  }
}
