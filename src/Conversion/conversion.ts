import {CharacterEncoding} from './CharacterEncoding';

const BINARY_REGEX = /^[01]+$/;
const TERNARY_REGEX = /^[0-2]{3}$/;

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
 * Determines the character encoding of a single input token.
 */
export function determineCharacterEncoding(input: string): CharacterEncoding {
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

function splitString(input: string): string[] {
  return input.split(' ').filter(item => item !== '');
}

/**
 * Determines the most common encoding across all tokens in a string.
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
