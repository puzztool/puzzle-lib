import {describe, it, expect} from 'vitest';
import {
  EncodingCategory,
  BrailleCharacter,
  BrailleDot,
  BrailleEncoding,
  BrailleStream,
} from '../src';

describe('Braille', () => {
  describe('Character', () => {
    it('constructor - Letter/Number', () => {
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      expect(ch.toString()).toBe('A/1');

      const exact = ch.getExactMatches();
      expect(exact.length).toBe(2);
      expect(exact[0].toString()).toBe('A');
      expect(exact[1].toString()).toBe('1');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(27);
      expect(partial[0].toString()).toBe('B');
    });

    it('constructor - Letter', () => {
      const ch = new BrailleCharacter(BrailleEncoding.LetterK);
      expect(ch.toString()).toBe('K');

      const exact = ch.getExactMatches();
      expect(exact.length).toBe(1);
      expect(exact[0].toString()).toBe('K');

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(12);
      expect(partial[0].toString()).toBe('L');
    });

    it('constructor - Empty', () => {
      const ch = new BrailleCharacter();
      expect(ch.toString()).toBe('');

      const exact = ch.getExactMatches();
      expect(exact.length).toBe(0);

      const partial = ch.getPotentialMatches();
      expect(partial.length).toBe(52);
      expect(partial[0].toString()).toBe('A');
    });

    it('toggle - Basic', () => {
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      expect(ch.toString()).toBe('A/1');

      let exact = ch.getExactMatches();
      expect(exact.length).toBe(2);
      expect(exact[0].toString()).toBe('A');
      expect(exact[1].toString()).toBe('1');

      let partial = ch.getPotentialMatches();
      expect(partial.length).toBe(27);
      expect(partial[0].toString()).toBe('B');

      ch.toggle(BrailleEncoding.LetterT);
      expect(ch.toString()).toBe('Q');

      exact = ch.getExactMatches();
      expect(exact.length).toBe(1);
      expect(exact[0].toString()).toBe('Q');

      partial = ch.getPotentialMatches();
      expect(partial.length).toBe(0);

      ch.toggle(BrailleEncoding.LetterS);
      expect(ch.toString()).toBe('E/5');

      exact = ch.getExactMatches();
      expect(exact.length).toBe(2);
      expect(exact[0].toString()).toBe('E');
      expect(exact[1].toString()).toBe('5');

      partial = ch.getPotentialMatches();
      expect(partial.length).toBe(12);
      expect(partial[0].toString()).toBe('D');
    });

    it('category - Basic', () => {
      const ch = new BrailleCharacter(
        BrailleEncoding.LetterA,
        EncodingCategory.Letter,
      );
      expect(ch.toString()).toBe('A');

      let exact = ch.getExactMatches();
      expect(exact.length).toBe(1);
      expect(exact[0].toString()).toBe('A');

      let partial = ch.getPotentialMatches();
      expect(partial.length).toBe(20);
      expect(partial[0].toString()).toBe('B');

      ch.category = EncodingCategory.Number;
      expect(ch.toString()).toBe('1');

      exact = ch.getExactMatches();
      expect(exact.length).toBe(1);
      expect(exact[0].toString()).toBe('1');

      partial = ch.getPotentialMatches();
      expect(partial.length).toBe(7);
      expect(partial[0].toString()).toBe('2');
    });

    it('clear - Basic', () => {
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      expect(ch.toString()).toBe('A/1');

      ch.clear();
      expect(ch.toString()).toBe('');
    });

    it('empty', () => {
      const ch = new BrailleCharacter();
      expect(ch.empty()).toBe(true);

      ch.toggle(BrailleDot.UpperRight);
      expect(ch.empty()).toBe(false);

      ch.clear();
      expect(ch.empty()).toBe(true);
    });

    it('valid', () => {
      const ch = new BrailleCharacter();
      expect(ch.valid()).toBe(false);

      ch.toggle(BrailleDot.UpperRight);
      expect(ch.valid()).toBe(false);

      ch.toggle(BrailleDot.UpperLeft);
      expect(ch.valid()).toBe(true);

      ch.toggle(BrailleDot.LowerRight);
      expect(ch.valid()).toBe(false);

      ch.toggle(BrailleDot.LowerLeft);
      expect(ch.valid()).toBe(true);
    });
  });

  describe('Stream', () => {
    it('Basic test - starts with a letter', () => {
      const stream = new BrailleStream();
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      stream.append(ch);

      expect(stream.toString()).toBe('A');

      ch.toggle(BrailleDot.MiddleLeft);
      stream.space();
      stream.append(ch);

      ch.toggle(BrailleDot.MiddleLeft | BrailleDot.UpperRight);
      stream.append(ch);

      expect(stream.toString()).toBe('A BC');

      stream.space();
      stream.append(new BrailleCharacter(BrailleEncoding.LetterD));

      expect(stream.toString()).toBe('A BC D');
    });

    it('Basic test - starts with number', () => {
      const stream = new BrailleStream();
      const ch = new BrailleCharacter(BrailleEncoding.FormattingNumber);
      stream.append(ch);

      expect(stream.toString()).toBe('#');

      ch.clear();
      ch.toggle(BrailleEncoding.Number1);
      stream.append(ch);

      expect(stream.toString()).toBe('#1');

      ch.toggle(BrailleDot.MiddleLeft);
      stream.append(ch);

      ch.toggle(BrailleDot.MiddleLeft | BrailleDot.UpperRight);
      stream.append(ch);

      expect(stream.toString()).toBe('#123');

      stream.space();
      stream.append(new BrailleCharacter(BrailleEncoding.LetterD));

      expect(stream.toString()).toBe('#123 D');
    });

    it('constructor - with parameter', () => {
      const stream = new BrailleStream();
      stream.append(new BrailleCharacter(BrailleEncoding.LetterA));
      stream.space();
      stream.append(new BrailleCharacter(BrailleEncoding.LetterB));
      expect(stream.toString()).toBe('A B');

      const stream2 = new BrailleStream(stream.chars);
      expect(stream2.toString()).toBe('A B');
      stream2.append(new BrailleCharacter(BrailleEncoding.LetterC));

      expect(stream.toString()).toBe('A B');
      expect(stream2.toString()).toBe('A BC');
    });

    it('clear', () => {
      const stream = new BrailleStream();
      const ch = new BrailleCharacter(BrailleEncoding.LetterA);
      stream.append(ch);

      ch.toggle(BrailleDot.MiddleLeft);
      stream.space();
      stream.append(ch);

      expect(stream.toString()).toBe('A B');

      stream.clear();

      ch.toggle(BrailleDot.MiddleLeft | BrailleDot.UpperRight);
      stream.append(ch);

      stream.space();
      stream.append(new BrailleCharacter(BrailleEncoding.LetterD));

      expect(stream.toString()).toBe('C D');
    });

    it('backspace', () => {
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

      expect(stream.toString()).toBe('AB #1');

      stream.backspace();
      expect(stream.toString()).toBe('AB #');

      ch.encoding = BrailleEncoding.Number2;
      stream.append(ch);
      expect(stream.toString()).toBe('AB #2');

      stream.backspace();
      stream.backspace();
      expect(stream.toString()).toBe('AB ');

      ch.encoding = BrailleEncoding.LetterC;
      stream.append(ch);
      expect(stream.toString()).toBe('AB C');

      stream.backspace();
      stream.backspace();
      stream.backspace();
      expect(stream.toString()).toBe('A');

      stream.backspace();
      expect(stream.toString()).toBe('');

      stream.backspace();
      stream.backspace();
      stream.backspace();
      expect(stream.toString()).toBe('');
    });
  });
});
