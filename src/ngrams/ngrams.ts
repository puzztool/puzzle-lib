import {BIGRAM_LOG_PROB, MIN_BIGRAM_LOG_PROB} from './bigrams.js';
import {TRIGRAM_LOG_PROB, MIN_TRIGRAM_LOG_PROB} from './trigrams.js';
import {UNIGRAM_LOG_PROB, MIN_UNIGRAM_LOG_PROB} from './unigrams.js';

function isLetter(c: string): boolean {
  return c >= 'a' && c <= 'z';
}

/**
 * Returns the unigram log-probability for a single letter.
 */
export function scoreUnigram(a: string): number {
  return UNIGRAM_LOG_PROB[a.toLowerCase()] ?? MIN_UNIGRAM_LOG_PROB;
}

/**
 * Returns the bigram log-probability for a pair of letters.
 */
export function scoreBigram(a: string, b: string): number {
  const key = (a + b).toLowerCase();
  return BIGRAM_LOG_PROB[key] ?? MIN_BIGRAM_LOG_PROB;
}

/**
 * Returns the trigram log-probability for three letters.
 */
export function scoreTrigram(a: string, b: string, c: string): number {
  const key = (a + b + c).toLowerCase();
  return TRIGRAM_LOG_PROB[key] ?? MIN_TRIGRAM_LOG_PROB;
}

/**
 * Scores adding a new letter given the preceding context.
 * Uses the highest available n-gram: trigram if 2+ prior chars,
 * bigram if 1 prior char, unigram if starting fresh.
 */
export function scoreNextLetter(context: string, letter: string): number {
  const len = context.length;
  if (len >= 2) {
    return scoreTrigram(context[len - 2], context[len - 1], letter);
  } else if (len === 1) {
    return scoreBigram(context[0], letter);
  }
  return scoreUnigram(letter);
}

/**
 * Scores a complete text string by summing n-gram log-probabilities.
 * Uses unigram for the first character, bigram for the second,
 * and trigrams for all subsequent characters. Non-letter characters
 * are skipped. Input is normalized to lowercase once before scoring.
 */
export function scoreText(text: string): number {
  const lower = text.toLowerCase();
  const letters: string[] = [];
  for (const c of lower) {
    if (isLetter(c)) {
      letters.push(c);
    }
  }
  if (letters.length === 0) return 0;
  let score = UNIGRAM_LOG_PROB[letters[0]] ?? MIN_UNIGRAM_LOG_PROB;
  for (let i = 1; i < letters.length; i++) {
    if (i >= 2) {
      const key = letters[i - 2] + letters[i - 1] + letters[i];
      score += TRIGRAM_LOG_PROB[key] ?? MIN_TRIGRAM_LOG_PROB;
    } else {
      const key = letters[i - 1] + letters[i];
      score += BIGRAM_LOG_PROB[key] ?? MIN_BIGRAM_LOG_PROB;
    }
  }
  return score;
}
