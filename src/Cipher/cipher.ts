import {CharacterConversion} from '../Conversion/CharacterConversion';

const UPPER_A = 'A'.charCodeAt(0);
const UPPER_Z = 'Z'.charCodeAt(0);
const LOWER_A = 'a'.charCodeAt(0);
const LOWER_Z = 'z'.charCodeAt(0);
const ALPHA_LENGTH = 26;

function isUpperAlpha(code: number) {
  return code >= UPPER_A && code <= UPPER_Z;
}

function isLowerAlpha(code: number) {
  return code >= LOWER_A && code <= LOWER_Z;
}

/**
 * Returns true if the character is an ASCII letter (A-Z or a-z).
 */
export function isAlpha(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return isUpperAlpha(code) || isLowerAlpha(code);
}

/**
 * Rotates a single letter by the given amount, preserving case.
 * Non-alpha characters are returned unchanged.
 */
export function rotateLetter(ch: string, rot: number): string {
  if (ch.length !== 1) {
    throw new Error('Expected a single character');
  }

  rot %= ALPHA_LENGTH;
  if (rot < 0) {
    rot += ALPHA_LENGTH;
  }

  const code = ch.charCodeAt(0);
  let base = 0;
  if (isLowerAlpha(code)) {
    base = LOWER_A;
  } else if (isUpperAlpha(code)) {
    base = UPPER_A;
  } else {
    return ch;
  }

  return String.fromCharCode(((code - base + rot) % ALPHA_LENGTH) + base);
}

function rotateLetterWithKey(
  ch: string,
  key: string,
  keyIndex: number,
  decrypt: boolean,
): string {
  if (key.length === 0) {
    return ch;
  }

  const keyCh = key.charAt(keyIndex % key.length);
  let rot = CharacterConversion.toOrdinal(keyCh) - 1;

  if (decrypt) {
    rot = -rot;
  }

  return rotateLetter(ch, rot);
}

/**
 * Applies a Caesar rotation to every character in the text.
 */
export function caesarRotate(text: string, rotation: number): string {
  const result = [];
  for (const ch of text) {
    result.push(rotateLetter(ch, rotation));
  }
  return result.join('');
}

/**
 * Returns all 26 Caesar rotations of the text.
 */
export function caesarRotations(text: string): string[] {
  const rotations = [];
  for (let i = 0; i < ALPHA_LENGTH; i++) {
    rotations.push(caesarRotate(text, i));
  }
  return rotations;
}

/**
 * Encrypts text using the Vigenère cipher with the given key.
 */
export function vigenereEncrypt(text: string, key: string): string {
  const result = [];
  let keyIndex = 0;

  for (const ch of text) {
    if (isAlpha(ch)) {
      result.push(rotateLetterWithKey(ch, key, keyIndex++, false));
    } else {
      result.push(ch);
    }
  }

  return result.join('');
}

/**
 * Decrypts text using the Vigenère cipher with the given key.
 */
export function vigenereDecrypt(text: string, key: string): string {
  const result = [];
  let keyIndex = 0;

  for (const ch of text) {
    if (isAlpha(ch)) {
      result.push(rotateLetterWithKey(ch, key, keyIndex++, true));
    } else {
      result.push(ch);
    }
  }

  return result.join('');
}

/**
 * Encrypts text using the Autokey cipher with the given key.
 */
export function autokeyEncrypt(text: string, key: string): string {
  if (key.length < 1) {
    return text;
  }

  const result = [];
  let keyIndex = 0;
  let fullKey = key;

  for (const ch of text) {
    if (isAlpha(ch)) {
      result.push(rotateLetterWithKey(ch, fullKey, keyIndex++, false));
      fullKey += ch;
    } else {
      result.push(ch);
    }
  }

  return result.join('');
}

/**
 * Decrypts text using the Autokey cipher with the given key.
 */
export function autokeyDecrypt(text: string, key: string): string {
  if (key.length < 1) {
    return text;
  }

  const result = [];
  let keyIndex = 0;
  let fullKey = key;

  for (const ch of text) {
    if (isAlpha(ch)) {
      const currentLetter = rotateLetterWithKey(ch, fullKey, keyIndex++, true);
      result.push(currentLetter);
      fullKey += currentLetter;
    } else {
      result.push(ch);
    }
  }

  return result.join('');
}
