import {describe, it, expect} from 'vitest';
import {
  lookupNatoPhonetic,
  NATO_ALPHABET,
  getNavalFlag,
  NAVAL_FLAGS,
} from '../src';

describe('Nato', () => {
  it('Entries', () => {
    expect(NATO_ALPHABET.length).toBe(26);
    for (const ch of NATO_ALPHABET) {
      expect(ch.character.length).toBe(1);
      expect(ch.character).toBe(ch.word.substring(0, 1));
    }
  });
  it('Lookup', () => {
    expect(lookupNatoPhonetic('B')!.word).toBe('Bravo');
    expect(lookupNatoPhonetic('b')!.word).toBe('Bravo');
    expect(lookupNatoPhonetic('')).toBeUndefined();
  });
});

describe('NavalFlags', () => {
  it('Entries', () => {
    expect(NAVAL_FLAGS.length).toBe(26);
    for (const flag of NAVAL_FLAGS) {
      expect(flag.character.length).toBe(1);
    }
  });
  it('Lookup A-Z', () => {
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode('A'.charCodeAt(0) + i);
      const flag = getNavalFlag(letter);
      expect(flag).toBeDefined();
      expect(flag!.character).toBe(letter);
    }
  });
  it('Lookup case-insensitive', () => {
    const flag = getNavalFlag('a');
    expect(flag).toBeDefined();
    expect(flag!.character).toBe('A');
  });
  it('Invalid characters return undefined', () => {
    for (let i = 0; i <= 9; i++) {
      expect(getNavalFlag(String(i))).toBeUndefined();
    }
    expect(getNavalFlag('')).toBeUndefined();
    expect(getNavalFlag('!')).toBeUndefined();
  });
});
