import {describe, it, expect} from 'vitest';
import {
  EncodingCategory,
  BrailleDot,
  BrailleEncoding,
  lookupBrailleEncoding,
  toggleBrailleDot,
  getBrailleDot,
  decodeBrailleStream,
} from '../src';

describe('Braille', () => {
  describe('lookupBrailleEncoding', () => {
    it('Letter/Number', () => {
      const result = lookupBrailleEncoding(BrailleEncoding.LetterA);
      expect(result.exactString).toBe('A/1');
      expect(result.exact.length).toBe(2);
      expect(result.exact[0].toString()).toBe('A');
      expect(result.exact[1].toString()).toBe('1');
      expect(result.partial.length).toBe(27);
      expect(result.partial[0].toString()).toBe('B');
    });

    it('Letter only', () => {
      const result = lookupBrailleEncoding(BrailleEncoding.LetterK);
      expect(result.exactString).toBe('K');
      expect(result.exact.length).toBe(1);
      expect(result.exact[0].toString()).toBe('K');
      expect(result.partial.length).toBe(12);
      expect(result.partial[0].toString()).toBe('L');
    });

    it('None encoding', () => {
      const result = lookupBrailleEncoding(BrailleEncoding.None);
      expect(result.exactString).toBe('');
      expect(result.exact.length).toBe(0);
      expect(result.partial.length).toBe(52);
      expect(result.partial[0].toString()).toBe('A');
    });

    it('category - Letter', () => {
      const result = lookupBrailleEncoding(
        BrailleEncoding.LetterA,
        EncodingCategory.Letter,
      );
      expect(result.exactString).toBe('A');
      expect(result.exact.length).toBe(1);
      expect(result.exact[0].toString()).toBe('A');
      expect(result.partial.length).toBe(20);
      expect(result.partial[0].toString()).toBe('B');
    });

    it('category - Number', () => {
      const result = lookupBrailleEncoding(
        BrailleEncoding.LetterA,
        EncodingCategory.Number,
      );
      expect(result.exactString).toBe('1');
      expect(result.exact.length).toBe(1);
      expect(result.exact[0].toString()).toBe('1');
      expect(result.partial.length).toBe(7);
      expect(result.partial[0].toString()).toBe('2');
    });
  });

  describe('toggleBrailleDot', () => {
    it('basic toggle', () => {
      let encoding = BrailleEncoding.LetterA;
      const result1 = lookupBrailleEncoding(encoding);
      expect(result1.exactString).toBe('A/1');

      encoding = toggleBrailleDot(encoding, BrailleEncoding.LetterT);
      const result2 = lookupBrailleEncoding(encoding);
      expect(result2.exactString).toBe('Q');
      expect(result2.exact.length).toBe(1);
      expect(result2.partial.length).toBe(0);

      encoding = toggleBrailleDot(encoding, BrailleEncoding.LetterS);
      const result3 = lookupBrailleEncoding(encoding);
      expect(result3.exactString).toBe('E/5');
      expect(result3.exact.length).toBe(2);
      expect(result3.partial.length).toBe(12);
      expect(result3.partial[0].toString()).toBe('D');
    });
  });

  describe('getBrailleDot', () => {
    it('check dot state', () => {
      expect(getBrailleDot(BrailleEncoding.None, BrailleDot.UpperRight)).toBe(
        false,
      );
      const encoding = toggleBrailleDot(
        BrailleEncoding.None,
        BrailleDot.UpperRight,
      );
      expect(getBrailleDot(encoding, BrailleDot.UpperRight)).toBe(true);
    });

    it('valid encoding', () => {
      const encoding = BrailleEncoding.LetterC;
      const result = lookupBrailleEncoding(encoding);
      expect(result.exact.length).toBeGreaterThan(0);
    });
  });

  describe('decodeBrailleStream', () => {
    it('starts with a letter', () => {
      const encodings: BrailleEncoding[] = [];
      encodings.push(BrailleEncoding.LetterA);
      expect(decodeBrailleStream(encodings)).toBe('A');

      encodings.push(BrailleEncoding.None);
      encodings.push(BrailleEncoding.LetterB);
      encodings.push(BrailleEncoding.LetterC);
      expect(decodeBrailleStream(encodings)).toBe('A BC');

      encodings.push(BrailleEncoding.None);
      encodings.push(BrailleEncoding.LetterD);
      expect(decodeBrailleStream(encodings)).toBe('A BC D');
    });

    it('starts with number', () => {
      const encodings: BrailleEncoding[] = [];
      encodings.push(BrailleEncoding.FormattingNumber);
      expect(decodeBrailleStream(encodings)).toBe('#');

      encodings.push(BrailleEncoding.Number1);
      expect(decodeBrailleStream(encodings)).toBe('#1');

      encodings.push(BrailleEncoding.Number2);
      encodings.push(BrailleEncoding.Number3);
      expect(decodeBrailleStream(encodings)).toBe('#123');

      encodings.push(BrailleEncoding.None);
      encodings.push(BrailleEncoding.LetterD);
      expect(decodeBrailleStream(encodings)).toBe('#123 D');
    });

    it('copy independence', () => {
      const encodings: BrailleEncoding[] = [
        BrailleEncoding.LetterA,
        BrailleEncoding.None,
        BrailleEncoding.LetterB,
      ];
      expect(decodeBrailleStream(encodings)).toBe('A B');

      const copy = [...encodings];
      expect(decodeBrailleStream(copy)).toBe('A B');
      copy.push(BrailleEncoding.LetterC);

      expect(decodeBrailleStream(encodings)).toBe('A B');
      expect(decodeBrailleStream(copy)).toBe('A BC');
    });
  });
});
