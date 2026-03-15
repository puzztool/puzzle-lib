import {scoreNextLetter} from '../ngrams/ngrams.js';
import {LETTER_TO_DIGIT, PHONE_MAPPING} from './phone-mapping.js';

export interface PhoneResult {
  /** The candidate text string. */
  text: string;
  /** Log-probability score (higher = more likely). */
  score: number;
}

/**
 * Returns the possible letters for a single digit.
 * Returns an empty array for digits without letter mappings (0, 1).
 */
export function phoneToLetters(digit: string): readonly string[] {
  return PHONE_MAPPING[digit] ?? [];
}

/**
 * Converts a string of letters to their corresponding phone digits.
 * Non-letter characters are passed through unchanged.
 */
export function lettersToPhone(text: string): string {
  return text
    .split('')
    .map(ch => LETTER_TO_DIGIT[ch.toLowerCase()] ?? ch)
    .join('');
}

/**
 * Converts a string of phone digits (2-9) to ranked text candidates
 * using beam search with n-gram scoring (unigram + bigram + trigram).
 * Starts with unigram scoring for the first letter, bigram for the
 * second, and trigrams for all subsequent letters.
 *
 * @param digits - String of digit characters (e.g., "43556")
 * @param maxResults - Maximum number of results to return (default: 20)
 * @returns Array of PhoneResult sorted by score (highest first)
 */
export function phoneToText(digits: string, maxResults = 20): PhoneResult[] {
  const beamWidth = Math.max(100, maxResults);
  // Filter to valid digits with letter mappings
  const validDigits = digits.split('').filter(d => PHONE_MAPPING[d]);

  if (validDigits.length === 0) {
    return [];
  }

  // Start with letters from the first digit, scored by unigram frequency
  let candidates: PhoneResult[] = phoneToLetters(validDigits[0]).map(ch => ({
    text: ch,
    score: scoreNextLetter('', ch),
  }));

  // Expand one digit at a time with beam search
  for (let i = 1; i < validDigits.length; i++) {
    const letters = phoneToLetters(validDigits[i]);
    const next: PhoneResult[] = [];

    for (const candidate of candidates) {
      for (const letter of letters) {
        const text = candidate.text + letter;
        const score = candidate.score + scoreNextLetter(candidate.text, letter);
        next.push({text, score});
      }
    }

    // Keep only top beamWidth candidates
    next.sort((a, b) => b.score - a.score);
    candidates = next.slice(0, beamWidth);
  }

  // Final sort and trim
  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, maxResults);
}
