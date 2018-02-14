/* global describe, it */

const assert = require('assert');
const { MorseCharacter } = require('../').morse;

describe('Morse', function () {
  describe('MorseCharacter', function () {
    it('constructor - Basic', function () {
      const ch = new MorseCharacter('.');
      assert.strictEqual(ch.toString(), 'E');
      assert.strictEqual(ch.toMorseString(), '.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 30);
      assert.strictEqual(partial[0], 'A');
      assert.strictEqual(partial[1], 'F');
    });

    it('constructor - Extended', function () {
      const ch = new MorseCharacter('--.');
      assert.strictEqual(ch.toString(), 'G');
      assert.strictEqual(ch.toMorseString(), '--.');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 5);
      assert.strictEqual(partial[0], 'Q');
      assert.strictEqual(partial[1], 'Z');
    });

    it('constructor - Empty', function () {
      const ch = new MorseCharacter();
      assert.strictEqual(ch.toString(), '');
      assert.strictEqual(ch.toMorseString(), '');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 61);
      assert.strictEqual(partial[0], 'A');
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
      assert.strictEqual(partial[0], 'Q');
      assert.strictEqual(partial[1], 'Z');
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
      assert.strictEqual(partial[0], '!');
      assert.strictEqual(partial[1], ';');
    });

    it('toString - No match', function () {
      const ch = new MorseCharacter('-.-.-');
      assert.strictEqual(ch.toString(), '');
      assert.strictEqual(ch.toMorseString(), '-.-.-');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 2);
      assert.strictEqual(partial[0], '!');
      assert.strictEqual(partial[1], ';');
    });

    it('getPotentialMatches - No potential matches', function () {
      const ch = new MorseCharacter('...--');
      assert.strictEqual(ch.toString(), '3');
      assert.strictEqual(ch.toMorseString(), '...--');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 0);
    });
  });
});
