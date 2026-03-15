/**
 * Standard telephone keypad mapping (ITU E.161 / T9).
 * Maps digit characters to their corresponding letters.
 */
export const PHONE_MAPPING: Partial<Record<string, readonly string[]>> = {
  '2': ['a', 'b', 'c'],
  '3': ['d', 'e', 'f'],
  '4': ['g', 'h', 'i'],
  '5': ['j', 'k', 'l'],
  '6': ['m', 'n', 'o'],
  '7': ['p', 'q', 'r', 's'],
  '8': ['t', 'u', 'v'],
  '9': ['w', 'x', 'y', 'z'],
};

/**
 * Reverse mapping: letter to digit.
 * Built automatically from PHONE_MAPPING.
 */
export const LETTER_TO_DIGIT: Record<string, string> = {};
for (const [digit, letters] of Object.entries(PHONE_MAPPING)) {
  if (letters) {
    for (const letter of letters) {
      LETTER_TO_DIGIT[letter] = digit;
    }
  }
}
