import {describe, it, expect} from 'vitest';
import {scoreNextLetter, scoreText} from '../src/ngrams/index.js';

describe('scoreNextLetter', () => {
  it('scores common letter higher with no context', () => {
    expect(scoreNextLetter('', 'e')).toBeGreaterThan(scoreNextLetter('', 'z'));
  });

  it('scores common bigram higher with one char context', () => {
    expect(scoreNextLetter('t', 'h')).toBeGreaterThan(
      scoreNextLetter('q', 'z'),
    );
  });

  it('scores common trigram higher with two char context', () => {
    expect(scoreNextLetter('th', 'e')).toBeGreaterThan(
      scoreNextLetter('qz', 'x'),
    );
  });

  it('handles uppercase input', () => {
    expect(scoreNextLetter('', 'E')).toBe(scoreNextLetter('', 'e'));
  });
});

describe('scoreText', () => {
  it('returns 0 for empty string', () => {
    expect(scoreText('')).toBe(0);
  });

  it('English text scores higher than gibberish', () => {
    expect(scoreText('an example sentence')).toBeGreaterThan(
      scoreText('mqwhfhuioo iosjioj'),
    );
  });

  it('common words score higher than random letters', () => {
    expect(scoreText('hello world')).toBeGreaterThan(scoreText('xqzjkvbnm'));
  });

  it('handles mixed case', () => {
    expect(scoreText('Hello')).toBe(scoreText('hello'));
  });

  it('skips non-letter characters', () => {
    expect(scoreText('hello')).toBe(scoreText('h.e" l!l?o'));
  });

  it('returns 0 for string with no letters', () => {
    expect(scoreText('123 !@#')).toBe(0);
  });
});
