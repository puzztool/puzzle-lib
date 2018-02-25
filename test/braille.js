/* global describe, it */

const assert = require('assert');
const { Category, Character, Dot, Encoding, Stream } = require('../').Braille;

describe('Braille', function () {
  describe('Character', function () {
    it('constructor - Letter/Number', function () {
      const ch = new Character(Encoding.LetterA);
      assert.strictEqual(ch.toString(), 'A/1');

      const exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 2);
      assert.strictEqual(exact[0].toString(), 'A');
      assert.strictEqual(exact[1].toString(), '1');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 27);
      assert.strictEqual(partial[0].toString(), 'B');
    });

    it('constructor - Letter', function () {
      const ch = new Character(Encoding.LetterK);
      assert.strictEqual(ch.toString(), 'K');

      const exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0].toString(), 'K');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 12);
      assert.strictEqual(partial[0].toString(), 'L');
    });

    it('constructor - Empty', function () {
      const ch = new Character();
      assert.strictEqual(ch.toString(), '');

      const exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 0);

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 52);
      assert.strictEqual(partial[0].toString(), 'A');
    });

    it('toggle - Basic', function () {
      const ch = new Character(Encoding.LetterA);
      assert.strictEqual(ch.toString(), 'A/1');

      let exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 2);
      assert.strictEqual(exact[0].toString(), 'A');
      assert.strictEqual(exact[1].toString(), '1');

      let partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 27);
      assert.strictEqual(partial[0].toString(), 'B');

      ch.toggle(Encoding.LetterT);
      assert.strictEqual(ch.toString(), 'Q');

      exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0].toString(), 'Q');

      partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 0);

      ch.toggle(Encoding.LetterS);
      assert.strictEqual(ch.toString(), 'E/5');

      exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 2);
      assert.strictEqual(exact[0].toString(), 'E');
      assert.strictEqual(exact[1].toString(), '5');

      partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 12);
      assert.strictEqual(partial[0].toString(), 'D');
    });

    it('category - Basic', function () {
      const ch = new Character(Encoding.LetterA, Category.Letter);
      assert.strictEqual(ch.toString(), 'A');

      let exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0].toString(), 'A');

      let partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 20);
      assert.strictEqual(partial[0].toString(), 'B');

      ch.category = Category.Number;
      assert.strictEqual(ch.toString(), '1');

      exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0].toString(), '1');

      partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 7);
      assert.strictEqual(partial[0].toString(), '2');
    });

    it('clear - Basic', function () {
      const ch = new Character(Encoding.LetterA);
      assert.strictEqual(ch.toString(), 'A/1');

      ch.clear();
      assert.strictEqual(ch.toString(), '');
    });
  });

  describe('Stream', function () {
    it('Basic test - starts with a letter', function () {
      const stream = new Stream();
      const ch = new Character(Encoding.LetterA);
      stream.append(ch);

      assert.strictEqual(stream.toString(), 'A');

      ch.toggle(Dot.MiddleLeft);
      stream.space();
      stream.append(ch);

      ch.toggle(Dot.MiddleLeft | Dot.UpperRight);
      stream.append(ch);

      assert.strictEqual(stream.toString(), 'A BC');

      stream.space();
      stream.append(Encoding.LetterD);

      assert.strictEqual(stream.toString(), 'A BC D');
    });

    it('Basic test - starts with number', function () {
      const stream = new Stream();
      const ch = new Character(Encoding.FormattingNumber);
      stream.append(ch);

      assert.strictEqual(stream.toString(), '#');

      ch.clear();
      ch.toggle(Encoding.Number1);
      stream.append(ch);

      assert.strictEqual(stream.toString(), '#1');

      ch.toggle(Dot.MiddleLeft);
      stream.append(ch);

      ch.toggle(Dot.MiddleLeft | Dot.UpperRight);
      stream.append(ch);

      assert.strictEqual(stream.toString(), '#123');

      stream.space();
      stream.append(Encoding.LetterD);

      assert.strictEqual(stream.toString(), '#123 D');
    });

    it('clear', function () {
      const stream = new Stream();
      const ch = new Character(Encoding.LetterA);
      stream.append(ch);

      ch.toggle(Dot.MiddleLeft);
      stream.space();
      stream.append(ch);

      assert.strictEqual(stream.toString(), 'A B');

      stream.clear();

      ch.toggle(Dot.MiddleLeft | Dot.UpperRight);
      stream.append(ch);

      stream.space();
      stream.append(Encoding.LetterD);

      assert.strictEqual(stream.toString(), 'C D');
    });
  });
});
