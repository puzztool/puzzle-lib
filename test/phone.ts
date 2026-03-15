import {describe, it, expect} from 'vitest';
import {
  lettersToPhone,
  phoneToLetters,
  phoneToText,
} from '../src/phone/index.js';

describe('Phone', () => {
  describe('phoneToLetters', () => {
    it('returns letters for valid digits', () => {
      expect(phoneToLetters('2')).toEqual(['a', 'b', 'c']);
      expect(phoneToLetters('7')).toEqual(['p', 'q', 'r', 's']);
      expect(phoneToLetters('8')).toEqual(['t', 'u', 'v']);
      expect(phoneToLetters('9')).toEqual(['w', 'x', 'y', 'z']);
    });

    it('returns empty for invalid digits', () => {
      expect(phoneToLetters('0')).toEqual([]);
      expect(phoneToLetters('1')).toEqual([]);
      expect(phoneToLetters('x')).toEqual([]);
    });
  });

  describe('phoneToText', () => {
    it('returns empty for no valid digits', () => {
      expect(phoneToText('')).toEqual([]);
      expect(phoneToText('01')).toEqual([]);
    });

    it('returns all letters for a single digit', () => {
      const results = phoneToText('2');
      expect(results).toHaveLength(3);
      const texts = results.map(r => r.text);
      expect(texts).toContain('a');
      expect(texts).toContain('b');
      expect(texts).toContain('c');
    });

    it('ranks common bigrams higher', () => {
      const results = phoneToText('84');
      const texts = results.map(r => r.text);
      // "th" is the most common bigram starting with t
      expect(texts.indexOf('th')).toBeLessThan(texts.indexOf('tg'));
    });

    it('finds HELLO in top results for 43556', () => {
      const results = phoneToText('43556');
      const texts = results.map(r => r.text);
      expect(texts).toContain('hello');
    });

    it('finds THE in top results for 843', () => {
      const results = phoneToText('843');
      const texts = results.map(r => r.text);
      expect(texts).toContain('the');
      // "the" should rank very high
      expect(texts.indexOf('the')).toBeLessThan(5);
    });

    it('respects maxResults', () => {
      const results = phoneToText('2345', 5);
      expect(results.length).toBeLessThanOrEqual(5);
    });

    it('results are sorted by score descending', () => {
      const results = phoneToText('4355');
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
      }
    });

    it('skips invalid digits in input', () => {
      const withInvalid = phoneToText('4-3-5-5-6');
      const withoutInvalid = phoneToText('43556');
      expect(withInvalid.map(r => r.text)).toEqual(
        withoutInvalid.map(r => r.text),
      );
    });
  });

  describe('lettersToPhone', () => {
    it('converts lowercase letters to digits', () => {
      expect(lettersToPhone('hello')).toBe('43556');
    });

    it('converts uppercase letters to digits', () => {
      expect(lettersToPhone('WORLD')).toBe('96753');
    });

    it('passes through non-letter characters', () => {
      expect(lettersToPhone('hi there')).toBe('44 84373');
    });

    it('returns empty string for empty input', () => {
      expect(lettersToPhone('')).toBe('');
    });

    it('handles mixed content', () => {
      expect(lettersToPhone('Call 911!')).toBe('2255 911!');
    });
  });
});
