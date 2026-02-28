import {describe, it, expect} from 'vitest';
import {NatoData} from '../src';

describe('Nato', () => {
  it('Entries', () => {
    const chars = NatoData.instance.entries;
    expect(chars.length).toBe(26);
    for (const ch of chars) {
      expect(ch.character.length).toBe(1);
      expect(ch.character).toBe(ch.word.substring(0, 1));
    }
  });
  it('Lookup', () => {
    expect(NatoData.instance.lookup('B')!.word).toBe('Bravo');
    expect(NatoData.instance.lookup('b')!.word).toBe('Bravo');
    expect(NatoData.instance.lookup('')).toBe(null);
  });
});
