import {CharacterTableEntry} from './CharacterTableEntry';

function addAsciiRange(
  array: CharacterTableEntry[],
  start: number,
  end: number,
  conversion: (value: string) => number,
  maxValue: number,
) {
  for (let i = start; i <= end; i++) {
    const letter = String.fromCharCode(i);
    array.push(new CharacterTableEntry(letter, conversion(letter), maxValue));
  }
}

/**
 * Returns the ASCII code for a single character (0-127), or -1 if out of range.
 */
export function toAscii(ch: string): number {
  if (typeof ch !== 'string' || ch.length !== 1) {
    throw new Error('A single character is required');
  }

  const ascii = ch.charCodeAt(0);
  if (ascii >= 0 && ascii <= 127) {
    return ascii;
  }

  return -1;
}

/**
 * Returns the ordinal value of a letter (A=1, Z=26), or -1 if not a letter.
 */
export function toOrdinal(ch: string): number {
  if (typeof ch !== 'string' || ch.length !== 1) {
    throw new Error('A single character is required');
  }

  const chCode = ch.charCodeAt(0);

  let ordinalCode = chCode - 'a'.charCodeAt(0);
  if (ordinalCode >= 0 && ordinalCode < 26) {
    return ordinalCode + 1;
  }

  ordinalCode = chCode - 'A'.charCodeAt(0);
  if (ordinalCode >= 0 && ordinalCode < 26) {
    return ordinalCode + 1;
  }

  return -1;
}

/**
 * Returns a table of ASCII characters with their representations in various bases.
 */
export function getAsciiTable(): CharacterTableEntry[] {
  const retVal: CharacterTableEntry[] = [];
  addAsciiRange(retVal, 48, 57, toAscii, 127);
  addAsciiRange(retVal, 65, 90, toAscii, 127);
  addAsciiRange(retVal, 97, 122, toAscii, 127);
  return retVal;
}

/**
 * Returns a table of letters with their ordinal representations in various bases.
 */
export function getOrdinalTable(): CharacterTableEntry[] {
  const retVal: CharacterTableEntry[] = [];
  addAsciiRange(retVal, 65, 90, toOrdinal, 26);
  return retVal;
}
