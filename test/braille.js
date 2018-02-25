/* global describe, it */

const assert = require('assert');
const { Category, Character, Dot } = require('../').Braille;

describe('Braille', function () {
  describe('BrailleCharacter', function () {
    it('constructor - Letter/Number', function () {
      const ch = new Character(Dot.UpperLeft);
      assert.strictEqual(ch.toString(), 'A/1');

      const exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 2);
      assert.strictEqual(exact[0], 'A');
      assert.strictEqual(exact[1], '1');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 27);
      assert.strictEqual(partial[0], 'B');
    });

    it('constructor - Letter', function () {
      const ch = new Character(Dot.LowerLeft | Dot.UpperLeft);
      assert.strictEqual(ch.toString(), 'K');

      const exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0], 'K');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 12);
      assert.strictEqual(partial[0], 'L');
    });

    it('constructor - Empty', function () {
      const ch = new Character();
      assert.strictEqual(ch.toString(), '');

      const exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 0);

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 52);
      assert.strictEqual(partial[0], 'A');
    });

    it('toggle - Basic', function () {
      const ch = new Character(Dot.UpperLeft);
      assert.strictEqual(ch.toString(), 'A/1');

      let exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 2);
      assert.strictEqual(exact[0], 'A');
      assert.strictEqual(exact[1], '1');

      let partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 27);
      assert.strictEqual(partial[0], 'B');

      ch.toggle(Dot.LowerLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight);
      assert.strictEqual(ch.toString(), 'Q');

      exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0], 'Q');

      partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 0);

      ch.toggle(Dot.LowerLeft | Dot.MiddleLeft | Dot.UpperRight);
      assert.strictEqual(ch.toString(), 'E/5');

      exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 2);
      assert.strictEqual(exact[0], 'E');
      assert.strictEqual(exact[1], '5');

      partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 12);
      assert.strictEqual(partial[0], 'D');
    });

    it('category - Basic', function () {
      const ch = new Character(Dot.UpperLeft, Category.Letter);
      assert.strictEqual(ch.toString(), 'A');

      let exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0], 'A');

      let partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 20);
      assert.strictEqual(partial[0], 'B');

      ch.category = Category.Number;
      assert.strictEqual(ch.toString(), '1');

      exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0], '1');

      partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 7);
      assert.strictEqual(partial[0], '2');
    });

    it('clear - Basic', function () {
      const ch = new Character(Dot.UpperLeft);
      assert.strictEqual(ch.toString(), 'A/1');

      ch.clear();
      assert.strictEqual(ch.toString(), '');
    });
  });
});
