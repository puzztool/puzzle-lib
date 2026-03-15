import {BIGRAM_LOG_PROB, MIN_BIGRAM_LOG_PROB} from './bigrams.js';
import {TRIGRAM_LOG_PROB, MIN_TRIGRAM_LOG_PROB} from './trigrams.js';
import {UNIGRAM_LOG_PROB, MIN_UNIGRAM_LOG_PROB} from './unigrams.js';

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
 * and trigrams for all subsequent characters.
 */
export function scoreText(text: string): number {
  if (text.length === 0) return 0;
  let score = scoreUnigram(text[0]);
  for (let i = 1; i < text.length; i++) {
    score += scoreNextLetter(text.substring(0, i), text[i]);
  }
  return score;
}
