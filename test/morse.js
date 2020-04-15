/* global describe, it */

const assert = require('assert');
const {MorseCharacter, MorseString} = require('../');

describe('Morse', () => {
  describe('Character', () => {
    it('constructor - Basic', () => {
      const ch = new MorseCharacter('.');
      assert.strictEqual(ch.toString(), 'E');
      assert.strictEqual(ch.morseString, '.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 26);
      assert.strictEqual(partial[0].toString(), 'A');
      assert.strictEqual(partial[1].toString(), 'F');
    });

    it('constructor - Extended', () => {
      const ch = new MorseCharacter('--.');
      assert.strictEqual(ch.toString(), 'G');
      assert.strictEqual(ch.morseString, '--.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 4);
      assert.strictEqual(partial[0].toString(), 'Q');
      assert.strictEqual(partial[1].toString(), 'Z');
    });

    it('constructor - Empty', () => {
      const ch = new MorseCharacter();
      assert.strictEqual(ch.toString(), '');
      assert.strictEqual(ch.morseString, '');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 54);
      assert.strictEqual(partial[0].toString(), 'A');
    });

    it('dot/dash - Basic', () => {
      const ch = new MorseCharacter();
      ch.dash();
      assert.strictEqual(ch.toString(), 'T');
      assert.strictEqual(ch.morseString, '-');

      ch.dash();
      assert.strictEqual(ch.toString(), 'M');
      assert.strictEqual(ch.morseString, '--');

      ch.dot();
      assert.strictEqual(ch.toString(), 'G');
      assert.strictEqual(ch.morseString, '--.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 4);
      assert.strictEqual(partial[0].toString(), 'Q');
      assert.strictEqual(partial[1].toString(), 'Z');
    });

    it('dot/dash - Additive', () => {
      const ch = new MorseCharacter('-.');
      assert.strictEqual(ch.toString(), 'N');
      assert.strictEqual(ch.morseString, '-.');

      ch.dash();
      assert.strictEqual(ch.toString(), 'K');
      assert.strictEqual(ch.morseString, '-.-');

      ch.dot();
      assert.strictEqual(ch.toString(), 'C');
      assert.strictEqual(ch.morseString, '-.-.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 2);
      assert.strictEqual(partial[0].toString(), '!');
      assert.strictEqual(partial[1].toString(), ';');
    });

    it('toString - No match', () => {
      const ch = new MorseCharacter('-.-.-');
      assert.strictEqual(ch.toString(), '');
      assert.strictEqual(ch.morseString, '-.-.-');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 2);
      assert.strictEqual(partial[0].toString(), '!');
      assert.strictEqual(partial[1].toString(), ';');
    });

    it('getPotentialMatches - No potential matches', () => {
      const ch = new MorseCharacter('...--');
      assert.strictEqual(ch.toString(), '3');
      assert.strictEqual(ch.morseString, '...--');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 0);
    });

    it('backspace', () => {
      const ch = new MorseCharacter();
      ch.backspace();
      assert.strictEqual(ch.empty(), true);

      ch.dot();
      ch.backspace();
      assert.strictEqual(ch.empty(), true);

      ch.dot();
      ch.dash();
      ch.backspace();
      ch.dot();
      assert.strictEqual(ch.morseString, '..');
    });

    it('empty', () => {
      const ch = new MorseCharacter();
      assert.strictEqual(ch.empty(), true);

      ch.dot();
      assert.strictEqual(ch.empty(), false);

      ch.clear();
      assert.strictEqual(ch.empty(), true);
    });

    it('valid', () => {
      const ch = new MorseCharacter();
      assert.strictEqual(ch.valid(), false);

      ch.dot();
      assert.strictEqual(ch.valid(), true);

      ch.dot();
      assert.strictEqual(ch.valid(), true);

      ch.dot();
      assert.strictEqual(ch.valid(), true);

      ch.dot();
      assert.strictEqual(ch.valid(), true);

      ch.dot();
      assert.strictEqual(ch.valid(), true);

      ch.dot();
      assert.strictEqual(ch.valid(), false);
    });
  });

  describe('String', () => {
    it('constructor - Basic', () => {
      assert.strictEqual(new MorseString('.').toString(), 'E');
      assert.strictEqual(new MorseString('.../---/...').toString(), 'SOS');

      assert.strictEqual(new MorseString('./.-/--./-').toString(), 'EAGT');
    });

    it('Invert dots/dashes', () => {
      // Becomes ---/.../---
      assert.strictEqual(
        new MorseString('.../---/...').invertDotsAndDashes().toString(),
        'OSO'
      );

      // Becomes -/-./..-/.
      assert.strictEqual(
        new MorseString('./.-/--./-').invertDotsAndDashes().toString(),
        'TNUE'
      );

      // Should undo itself if repeated
      assert.strictEqual(
        new MorseString('./.-/--./-')
          .invertDotsAndDashes()
          .invertDotsAndDashes()
          .toString(),
        'EAGT'
      );
    });

    it('Reverse', () => {
      // Becomes -/.--/-./.
      assert.strictEqual(
        new MorseString('./.-/--./-').reverse().toString(),
        'TWNE'
      );

      // Should undo itself if repeated
      assert.strictEqual(
        new MorseString('./.-/--./-').reverse().reverse().toString(),
        'EAGT'
      );
    });

    it('Chaining', () => {
      assert.strictEqual(
        new MorseString('./.-/--./-')
          .invertDotsAndDashes()
          .reverse()
          .toString(),
        'EDAT'
      );
      assert.strictEqual(
        new MorseString('./.-/--./-')
          .reverse()
          .invertDotsAndDashes()
          .toString(),
        'EDAT'
      );
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
      assert.strictEqual(
        new MorseString(someTestString).toString(),
        'SOME TEST STRING'
      );
      assert.strictEqual(
        new MorseString(someTestString).reverse().toString(),
        'WAIRTS TSET EMOS'
      );
      assert.strictEqual(
        new MorseString(someTestString).invertDotsAndDashes().toString(),
        'OSIT ETOE OEKMAU'
      );
    });
  });
});

function assertSeparatorThrows(charSep, wordSep) {
  assert.throws(() => {
    const m = new MorseString('.', charSep, wordSep);
    m.toString();
  });
}
