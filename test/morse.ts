import {describe, it, expect} from 'vitest';
import {MorseCharacter, MorseString} from '../src';

describe('Morse', () => {
  describe('Character', () => {
    it('constructor - Basic', () => {
      const ch = new MorseCharacter('.');
      expect(ch.toString()).toBe('E');
      expect(ch.morseString).toBe('.');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(26);
      expect(partial[0].toString()).toBe('A');
      expect(partial[1].toString()).toBe('F');
    });

    it('constructor - Extended', () => {
      const ch = new MorseCharacter('--.');
      expect(ch.toString()).toBe('G');
      expect(ch.morseString).toBe('--.');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(4);
      expect(partial[0].toString()).toBe('Q');
      expect(partial[1].toString()).toBe('Z');
    });

    it('constructor - Empty', () => {
      const ch = new MorseCharacter();
      expect(ch.toString()).toBe('');
      expect(ch.morseString).toBe('');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(54);
      expect(partial[0].toString()).toBe('A');
    });

    it('dot/dash - Basic', () => {
      const ch = new MorseCharacter();
      ch.dash();
      expect(ch.toString()).toBe('T');
      expect(ch.morseString).toBe('-');

      ch.dash();
      expect(ch.toString()).toBe('M');
      expect(ch.morseString).toBe('--');

      ch.dot();
      expect(ch.toString()).toBe('G');
      expect(ch.morseString).toBe('--.');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(4);
      expect(partial[0].toString()).toBe('Q');
      expect(partial[1].toString()).toBe('Z');
    });

    it('dot/dash - Additive', () => {
      const ch = new MorseCharacter('-.');
      expect(ch.toString()).toBe('N');
      expect(ch.morseString).toBe('-.');

      ch.dash();
      expect(ch.toString()).toBe('K');
      expect(ch.morseString).toBe('-.-');

      ch.dot();
      expect(ch.toString()).toBe('C');
      expect(ch.morseString).toBe('-.-.');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(2);
      expect(partial[0].toString()).toBe('!');
      expect(partial[1].toString()).toBe(';');
    });

    it('toString - No match', () => {
      const ch = new MorseCharacter('-.-.-');
      expect(ch.toString()).toBe('');
      expect(ch.morseString).toBe('-.-.-');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(2);
      expect(partial[0].toString()).toBe('!');
      expect(partial[1].toString()).toBe(';');
    });

    it('getPotentialMatches - No potential matches', () => {
      const ch = new MorseCharacter('...--');
      expect(ch.toString()).toBe('3');
      expect(ch.morseString).toBe('...--');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(0);
    });

    it('backspace', () => {
      const ch = new MorseCharacter();
      ch.backspace();
      expect(ch.empty()).toBe(true);

      ch.dot();
      ch.backspace();
      expect(ch.empty()).toBe(true);

      ch.dot();
      ch.dash();
      ch.backspace();
      ch.dot();
      expect(ch.morseString).toBe('..');
    });

    it('empty', () => {
      const ch = new MorseCharacter();
      expect(ch.empty()).toBe(true);

      ch.dot();
      expect(ch.empty()).toBe(false);

      ch.clear();
      expect(ch.empty()).toBe(true);
    });

    it('valid', () => {
      const ch = new MorseCharacter();
      expect(ch.valid()).toBe(false);

      ch.dot();
      expect(ch.valid()).toBe(true);

      ch.dot();
      expect(ch.valid()).toBe(true);

      ch.dot();
      expect(ch.valid()).toBe(true);

      ch.dot();
      expect(ch.valid()).toBe(true);

      ch.dot();
      expect(ch.valid()).toBe(true);

      ch.dot();
      expect(ch.valid()).toBe(false);
    });
  });

  describe('String', () => {
    it('constructor - Basic', () => {
      expect(new MorseString('.').toString()).toBe('E');
      expect(new MorseString('.../---/...').toString()).toBe('SOS');

      expect(new MorseString('./.-/--./-').toString()).toBe('EAGT');
    });

    it('Invert dots/dashes', () => {
      // Becomes ---/.../---
      expect(
        new MorseString('.../---/...').invertDotsAndDashes().toString(),
      ).toBe('OSO');

      // Becomes -/-./..-/.
      expect(
        new MorseString('./.-/--./-').invertDotsAndDashes().toString(),
      ).toBe('TNUE');

      // Should undo itself if repeated
      expect(
        new MorseString('./.-/--./-')
          .invertDotsAndDashes()
          .invertDotsAndDashes()
          .toString(),
      ).toBe('EAGT');
    });

    it('Reverse', () => {
      // Becomes -/.--/-./.
      expect(new MorseString('./.-/--./-').reverse().toString()).toBe('TWNE');

      // Should undo itself if repeated
      expect(new MorseString('./.-/--./-').reverse().reverse().toString()).toBe(
        'EAGT',
      );
    });

    it('Chaining', () => {
      expect(
        new MorseString('./.-/--./-')
          .invertDotsAndDashes()
          .reverse()
          .toString(),
      ).toBe('EDAT');
      expect(
        new MorseString('./.-/--./-')
          .reverse()
          .invertDotsAndDashes()
          .toString(),
      ).toBe('EDAT');
    });

    it('Separator Errors', () => {
      assertSeparatorThrows('.', ' ');
      assertSeparatorThrows('-', ' ');
      assertSeparatorThrows('A', ' ');
      assertSeparatorThrows('/', '.');
      assertSeparatorThrows('/', '-');
      assertSeparatorThrows('/', 'A');
      assertSeparatorThrows('/', '/');
      assertSeparatorThrows('C', 'C');
    });

    it('Word Delimiters', () => {
      const someTestString = '.../---/--/. -/./.../- .../-/.-./../-./--.';
      expect(new MorseString(someTestString).toString()).toBe(
        'SOME TEST STRING',
      );
      expect(new MorseString(someTestString).reverse().toString()).toBe(
        'WAIRTS TSET EMOS',
      );
      expect(
        new MorseString(someTestString).invertDotsAndDashes().toString(),
      ).toBe('OSIT ETOE OEKMAU');
    });
  });
});

function assertSeparatorThrows(charSep: string, wordSep: string) {
  expect(() => {
    const m = new MorseString('.', charSep, wordSep);
    m.toString();
  }).toThrow();
}
