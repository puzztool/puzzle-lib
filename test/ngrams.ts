import {describe, it, expect} from 'vitest';
import {scoreNextLetter, scoreText} from '../src/ngrams/index.js';
import {scoreBigram, scoreTrigram, scoreUnigram} from '../src/ngrams/ngrams.js';

describe('scoreUnigram', () => {
  it('returns a score for a valid letter', () => {
    expect(scoreUnigram('e')).toBeGreaterThan(scoreUnigram('z'));
  });

  it('handles uppercase input', () => {
    expect(scoreUnigram('E')).toBe(scoreUnigram('e'));
  });
});

describe('scoreBigram', () => {
  it('common pair scores higher than uncommon', () => {
    expect(scoreBigram('t', 'h')).toBeGreaterThan(scoreBigram('q', 'z'));
  });
});

describe('scoreTrigram', () => {
  it('common triple scores higher than uncommon', () => {
    expect(scoreTrigram('t', 'h', 'e')).toBeGreaterThan(
      scoreTrigram('q', 'z', 'x'),
    );
  });
});

describe('scoreNextLetter', () => {
  it('uses unigram with no context', () => {
    expect(scoreNextLetter('', 'e')).toBe(scoreUnigram('e'));
  });

  it('uses bigram with one char of context', () => {
    expect(scoreNextLetter('t', 'h')).toBe(scoreBigram('t', 'h'));
  });

  it('uses trigram with two+ chars of context', () => {
    expect(scoreNextLetter('th', 'e')).toBe(scoreTrigram('t', 'h', 'e'));
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
