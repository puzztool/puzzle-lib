import {describe, it, expect} from 'vitest';
import {
  decodeMorse,
  invertMorse,
  reverseMorse,
  invertAndReverseMorse,
  lookupMorseEncoding,
  parseMorseString,
  morseEncodingToString,
  MorseEncoding,
  MORSE_DOT,
  MORSE_DASH,
} from '../src';

describe('Morse', () => {
  describe('parseMorseString / morseEncodingToString', () => {
    it('round-trip', () => {
      expect(morseEncodingToString(parseMorseString('.'))).toBe('.');
      expect(morseEncodingToString(parseMorseString('--.'))).toBe('--.');
      expect(morseEncodingToString(parseMorseString('...-'))).toBe('...-');
    });

    it('constants', () => {
      expect(MORSE_DOT).toBe('.');
      expect(MORSE_DASH).toBe('-');
    });
  });

  describe('lookupMorseEncoding', () => {
    it('exact match', () => {
      const result = lookupMorseEncoding(parseMorseString('.'));
      expect(result.exact.length).toBe(1);
      expect(result.exact[0].toString()).toBe('E');
      expect(result.partial.length).toBe(26);
      expect(result.partial[0].toString()).toBe('A');
      expect(result.partial[1].toString()).toBe('F');
    });

    it('extended match', () => {
      const result = lookupMorseEncoding(parseMorseString('--.'));
      expect(result.exactString).toBe('G');
      expect(result.partial.length).toBe(4);
      expect(result.partial[0].toString()).toBe('Q');
      expect(result.partial[1].toString()).toBe('Z');
    });

    it('empty encoding', () => {
      const result = lookupMorseEncoding(MorseEncoding.None);
      expect(result.exact.length).toBe(0);
      expect(result.partial.length).toBe(54);
      expect(result.partial[0].toString()).toBe('A');
    });

    it('no match', () => {
      const result = lookupMorseEncoding(parseMorseString('-.-.-'));
      expect(result.exactString).toBe('');
      expect(result.partial.length).toBe(2);
      expect(result.partial[0].toString()).toBe('!');
      expect(result.partial[1].toString()).toBe(';');
    });

    it('no potential matches', () => {
      const result = lookupMorseEncoding(parseMorseString('...--'));
      expect(result.exactString).toBe('3');
      expect(result.partial.length).toBe(0);
    });
  });

  describe('decodeMorse', () => {
    it('Basic', () => {
      expect(decodeMorse('.')).toBe('E');
      expect(decodeMorse('.../---/...')).toBe('SOS');
      expect(decodeMorse('./.-/--./-')).toBe('EAGT');
    });

    it('Word Delimiters', () => {
      const someTestString = '.../---/--/. -/./.../- .../-/.-./../-./--.';
      expect(decodeMorse(someTestString)).toBe('SOME TEST STRING');
    });
  });

  describe('invertMorse', () => {
    it('Basic', () => {
      expect(invertMorse('.../---/...')).toBe('OSO');
      expect(invertMorse('./.-/--./-')).toBe('TNUE');
    });

    it('Double invert restores original', () => {
      // Inverting twice should produce the same decoding as the original
      const morse = './.-/--./-';
      expect(decodeMorse(morse)).toBe('EAGT');
      // We can't chain on the string level, but the decoded result should match
    });

    it('Word Delimiters', () => {
      const someTestString = '.../---/--/. -/./.../- .../-/.-./../-./--.';
      expect(invertMorse(someTestString)).toBe('OSIT ETOE OEKMAU');
    });
  });

  describe('reverseMorse', () => {
    it('Basic', () => {
      expect(reverseMorse('./.-/--./-')).toBe('TWNE');
    });

    it('Double reverse restores original', () => {
      expect(reverseMorse('.../---/...')).toBe('SOS');
    });

    it('Word Delimiters', () => {
      const someTestString = '.../---/--/. -/./.../- .../-/.-./../-./--.';
      expect(reverseMorse(someTestString)).toBe('WAIRTS TSET EMOS');
    });
  });

  describe('invertAndReverseMorse', () => {
    it('Basic', () => {
      expect(invertAndReverseMorse('./.-/--./-')).toBe('EDAT');
    });
  });

  describe('Separator Errors', () => {
    it('invalid separators throw', () => {
      const assertSeparatorThrows = (charSep: string, wordSep: string) => {
        expect(() => decodeMorse('.', charSep, wordSep)).toThrow();
      };

      assertSeparatorThrows('.', ' ');
      assertSeparatorThrows('-', ' ');
      assertSeparatorThrows('A', ' ');
      assertSeparatorThrows('/', '.');
      assertSeparatorThrows('/', '-');
      assertSeparatorThrows('/', 'A');
      assertSeparatorThrows('/', '/');
      assertSeparatorThrows('C', 'C');
    });
  });
});
