/* global describe, it */

const assert = require('assert');
const { EncodingCategory, BrailleCharacter, BrailleDot, BrailleEncoding, BrailleStream } = require('../');

describe('Braille', function () {
  describe('Character', function () {
    it('constructor - Letter/Number', function () {
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
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
      const ch = new BrailleCharacter(BrailleEncoding.LetterK);
      assert.strictEqual(ch.toString(), 'K');

      const exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0].toString(), 'K');

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 12);
      assert.strictEqual(partial[0].toString(), 'L');
    });

    it('constructor - Empty', function () {
      const ch = new BrailleCharacter();
      assert.strictEqual(ch.toString(), '');

      const exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 0);

      const partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 52);
      assert.strictEqual(partial[0].toString(), 'A');
    });

    it('toggle - Basic', function () {
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      assert.strictEqual(ch.toString(), 'A/1');

      let exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 2);
      assert.strictEqual(exact[0].toString(), 'A');
      assert.strictEqual(exact[1].toString(), '1');

      let partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 27);
      assert.strictEqual(partial[0].toString(), 'B');

      ch.toggle(BrailleEncoding.LetterT);
      assert.strictEqual(ch.toString(), 'Q');

      exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0].toString(), 'Q');

      partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 0);

      ch.toggle(BrailleEncoding.LetterS);
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
      const ch = new BrailleCharacter(BrailleEncoding.LetterA, EncodingCategory.Letter);
      assert.strictEqual(ch.toString(), 'A');

      let exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0].toString(), 'A');

      let partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 20);
      assert.strictEqual(partial[0].toString(), 'B');

      ch.category = EncodingCategory.Number;
      assert.strictEqual(ch.toString(), '1');

      exact = ch.getExactMatches();
      assert.strictEqual(exact.length, 1);
      assert.strictEqual(exact[0].toString(), '1');

      partial = ch.getPotentialMatches();
      assert.strictEqual(partial.length, 7);
      assert.strictEqual(partial[0].toString(), '2');
    });

    it('clear - Basic', function () {
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      assert.strictEqual(ch.toString(), 'A/1');

      ch.clear();
      assert.strictEqual(ch.toString(), '');
    });

    it('empty', function () {
      const ch = new BrailleCharacter();
      assert.strictEqual(ch.empty(), true);

      ch.toggle(BrailleDot.UpperRight);
      assert.strictEqual(ch.empty(), false);

      ch.clear();
      assert.strictEqual(ch.empty(), true);
    });

    it('valid', function () {
      const ch = new BrailleCharacter();
      assert.strictEqual(ch.valid(), false);

      ch.toggle(BrailleDot.UpperRight);
      assert.strictEqual(ch.valid(), false);

      ch.toggle(BrailleDot.UpperLeft);
      assert.strictEqual(ch.valid(), true);

      ch.toggle(BrailleDot.LowerRight);
      assert.strictEqual(ch.valid(), false);

      ch.toggle(BrailleDot.LowerLeft);
      assert.strictEqual(ch.valid(), true);
    });
  });

  describe('Stream', function () {
    it('Basic test - starts with a letter', function () {
      const stream = new BrailleStream();
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      stream.append(ch);

      assert.strictEqual(stream.toString(), 'A');

      ch.toggle(BrailleDot.MiddleLeft);
      stream.space();
      stream.append(ch);

      ch.toggle(BrailleDot.MiddleLeft | BrailleDot.UpperRight);
      stream.append(ch);

      assert.strictEqual(stream.toString(), 'A BC');

      stream.space();
      stream.append(BrailleEncoding.LetterD);

      assert.strictEqual(stream.toString(), 'A BC D');
    });

    it('Basic test - starts with number', function () {
      const stream = new BrailleStream();
      const ch = new BrailleCharacter(BrailleEncoding.FormattingNumber);
      stream.append(ch);

      assert.strictEqual(stream.toString(), '#');

      ch.clear();
      ch.toggle(BrailleEncoding.Number1);
      stream.append(ch);

      assert.strictEqual(stream.toString(), '#1');

      ch.toggle(BrailleDot.MiddleLeft);
      stream.append(ch);

      ch.toggle(BrailleDot.MiddleLeft | BrailleDot.UpperRight);
      stream.append(ch);

      assert.strictEqual(stream.toString(), '#123');

      stream.space();
      stream.append(BrailleEncoding.LetterD);

      assert.strictEqual(stream.toString(), '#123 D');
    });

    it('clear', function () {
      const stream = new BrailleStream();
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      stream.append(ch);

      ch.toggle(BrailleDot.MiddleLeft);
      stream.space();
      stream.append(ch);

      assert.strictEqual(stream.toString(), 'A B');

      stream.clear();

      ch.toggle(BrailleDot.MiddleLeft | BrailleDot.UpperRight);
      stream.append(ch);

      stream.space();
      stream.append(BrailleEncoding.LetterD);

      assert.strictEqual(stream.toString(), 'C D');
    });

    it('backspace', function () {
      const stream = new BrailleStream();
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      stream.append(ch);

      ch.toggle(BrailleDot.MiddleLeft);
      stream.append(ch);
      stream.space();

      ch.encoding = BrailleEncoding.FormattingNumber;
      stream.append(ch);

      ch.encoding = BrailleEncoding.Number1;
      stream.append(ch);

      assert.strictEqual(stream.toString(), 'AB #1');

      stream.backspace();
      assert.strictEqual(stream.toString(), 'AB #');

      ch.encoding = BrailleEncoding.Number2;
      stream.append(ch);
      assert.strictEqual(stream.toString(), 'AB #2');

      stream.backspace();
      stream.backspace();
      assert.strictEqual(stream.toString(), 'AB ');

      ch.encoding = BrailleEncoding.LetterC;
      stream.append(ch);
      assert.strictEqual(stream.toString(), 'AB C');

      stream.backspace();
      stream.backspace();
      stream.backspace();
      assert.strictEqual(stream.toString(), 'A');

      stream.backspace();
      assert.strictEqual(stream.toString(), '');

      stream.backspace();
      stream.backspace();
      stream.backspace();
      assert.strictEqual(stream.toString(), '');
    });
  });
});
