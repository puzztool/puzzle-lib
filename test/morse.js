/* global describe, it */

const assert = require('assert');
const { MorseCharacter } = require('../');

describe('Morse', function () {
  describe('Character', function () {
    it('constructor - Basic', function () {
      const ch = new MorseCharacter('.');
      assert.strictEqual(ch.toString(), 'E');
      assert.strictEqual(ch.toMorseString(), '.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 30);
      assert.strictEqual(partial[0].toString(), 'A');
      assert.strictEqual(partial[1].toString(), 'F');
    });

    it('constructor - Extended', function () {
      const ch = new MorseCharacter('--.');
      assert.strictEqual(ch.toString(), 'G');
      assert.strictEqual(ch.toMorseString(), '--.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 5);
      assert.strictEqual(partial[0].toString(), 'Q');
      assert.strictEqual(partial[1].toString(), 'Z');
    });

    it('constructor - Empty', function () {
      const ch = new MorseCharacter();
      assert.strictEqual(ch.toString(), '');
      assert.strictEqual(ch.toMorseString(), '');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 61);
      assert.strictEqual(partial[0].toString(), 'A');
    });

    it('dot/dash - Basic', function () {
      const ch = new MorseCharacter();
      ch.dash();
      assert.strictEqual(ch.toString(), 'T');
      assert.strictEqual(ch.toMorseString(), '-');

      ch.dash();
      assert.strictEqual(ch.toString(), 'M');
      assert.strictEqual(ch.toMorseString(), '--');

      ch.dot();
      assert.strictEqual(ch.toString(), 'G');
      assert.strictEqual(ch.toMorseString(), '--.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 5);
      assert.strictEqual(partial[0].toString(), 'Q');
      assert.strictEqual(partial[1].toString(), 'Z');
    });

    it('dot/dash - Additive', function () {
      const ch = new MorseCharacter('-.');
      assert.strictEqual(ch.toString(), 'N');
      assert.strictEqual(ch.toMorseString(), '-.');

      ch.dash();
      assert.strictEqual(ch.toString(), 'K');
      assert.strictEqual(ch.toMorseString(), '-.-');

      ch.dot();
      assert.strictEqual(ch.toString(), 'C');
      assert.strictEqual(ch.toMorseString(), '-.-.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 2);
      assert.strictEqual(partial[0].toString(), '!');
      assert.strictEqual(partial[1].toString(), ';');
    });

    it('toString - No match', function () {
      const ch = new MorseCharacter('-.-.-');
      assert.strictEqual(ch.toString(), '');
      assert.strictEqual(ch.toMorseString(), '-.-.-');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 2);
      assert.strictEqual(partial[0].toString(), '!');
      assert.strictEqual(partial[1].toString(), ';');
    });

    it('getPotentialMatches - No potential matches', function () {
      const ch = new MorseCharacter('...--');
      assert.strictEqual(ch.toString(), '3');
      assert.strictEqual(ch.toMorseString(), '...--');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 0);
    });

    it('backspace', function () {
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
      assert.strictEqual(ch.toMorseString(), '..');
    });

    it('empty', function () {
      const ch = new MorseCharacter();
      assert.strictEqual(ch.empty(), true);

      ch.dot();
      assert.strictEqual(ch.empty(), false);

      ch.clear();
      assert.strictEqual(ch.empty(), true);
    });

    it('valid', function () {
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
});
