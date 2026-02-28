import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingEntry} from '../Common/EncodingEntry';
import {EncodingLookupResult} from '../Common/EncodingLookupResult';
import {BrailleDot} from './BrailleDot';
import {BrailleEncoding} from './BrailleEncoding';

// Build the lookup table once
const BRAILLE_ENTRIES: Array<EncodingEntry<BrailleEncoding>> = [];

function addEntry(
  encoding: BrailleEncoding,
  category: EncodingCategory,
  display: string,
) {
  BRAILLE_ENTRIES.push(new EncodingEntry(encoding, category, display));
}

// Letters
addEntry(BrailleEncoding.LetterA, EncodingCategory.Letter, 'A');
addEntry(BrailleEncoding.LetterB, EncodingCategory.Letter, 'B');
addEntry(BrailleEncoding.LetterC, EncodingCategory.Letter, 'C');
addEntry(BrailleEncoding.LetterD, EncodingCategory.Letter, 'D');
addEntry(BrailleEncoding.LetterE, EncodingCategory.Letter, 'E');
addEntry(BrailleEncoding.LetterF, EncodingCategory.Letter, 'F');
addEntry(BrailleEncoding.LetterG, EncodingCategory.Letter, 'G');
addEntry(BrailleEncoding.LetterH, EncodingCategory.Letter, 'H');
addEntry(BrailleEncoding.LetterI, EncodingCategory.Letter, 'I');
addEntry(BrailleEncoding.LetterJ, EncodingCategory.Letter, 'J');
addEntry(BrailleEncoding.LetterK, EncodingCategory.Letter, 'K');
addEntry(BrailleEncoding.LetterL, EncodingCategory.Letter, 'L');
addEntry(BrailleEncoding.LetterM, EncodingCategory.Letter, 'M');
addEntry(BrailleEncoding.LetterN, EncodingCategory.Letter, 'N');
addEntry(BrailleEncoding.LetterO, EncodingCategory.Letter, 'O');
addEntry(BrailleEncoding.LetterP, EncodingCategory.Letter, 'P');
addEntry(BrailleEncoding.LetterQ, EncodingCategory.Letter, 'Q');
addEntry(BrailleEncoding.LetterR, EncodingCategory.Letter, 'R');
addEntry(BrailleEncoding.LetterS, EncodingCategory.Letter, 'S');
addEntry(BrailleEncoding.LetterT, EncodingCategory.Letter, 'T');
addEntry(BrailleEncoding.LetterU, EncodingCategory.Letter, 'U');
addEntry(BrailleEncoding.LetterV, EncodingCategory.Letter, 'V');
addEntry(BrailleEncoding.LetterW, EncodingCategory.Letter, 'W');
addEntry(BrailleEncoding.LetterX, EncodingCategory.Letter, 'X');
addEntry(BrailleEncoding.LetterY, EncodingCategory.Letter, 'Y');
addEntry(BrailleEncoding.LetterZ, EncodingCategory.Letter, 'Z');

// Numbers
addEntry(BrailleEncoding.Number0, EncodingCategory.Number, '0');
addEntry(BrailleEncoding.Number1, EncodingCategory.Number, '1');
addEntry(BrailleEncoding.Number2, EncodingCategory.Number, '2');
addEntry(BrailleEncoding.Number3, EncodingCategory.Number, '3');
addEntry(BrailleEncoding.Number4, EncodingCategory.Number, '4');
addEntry(BrailleEncoding.Number5, EncodingCategory.Number, '5');
addEntry(BrailleEncoding.Number6, EncodingCategory.Number, '6');
addEntry(BrailleEncoding.Number7, EncodingCategory.Number, '7');
addEntry(BrailleEncoding.Number8, EncodingCategory.Number, '8');
addEntry(BrailleEncoding.Number9, EncodingCategory.Number, '9');

// Formatting
addEntry(BrailleEncoding.FormattingNumber, EncodingCategory.Formatting, '#');
addEntry(BrailleEncoding.FormattingCapital, EncodingCategory.Formatting, '^');

// Punctuation
addEntry(BrailleEncoding.PunctuationComma, EncodingCategory.Punctuation, ',');
addEntry(
  BrailleEncoding.PunctuationSemicolon,
  EncodingCategory.Punctuation,
  ';',
);
addEntry(
  BrailleEncoding.PunctuationApostrophe,
  EncodingCategory.Punctuation,
  "'",
);
addEntry(BrailleEncoding.PunctuationColon, EncodingCategory.Punctuation, ':');
addEntry(BrailleEncoding.PunctuationHyphen, EncodingCategory.Punctuation, '-');
addEntry(
  BrailleEncoding.PunctuationDecimalPoint,
  EncodingCategory.Punctuation,
  '.',
);
addEntry(
  BrailleEncoding.PunctuationFullStop,
  EncodingCategory.Punctuation,
  '.',
);
addEntry(
  BrailleEncoding.PunctuationExclamationPoint,
  EncodingCategory.Punctuation,
  '!',
);
addEntry(
  BrailleEncoding.PunctuationOpenQuote,
  EncodingCategory.Punctuation,
  '"',
);
addEntry(
  BrailleEncoding.PunctuationQuestionMark,
  EncodingCategory.Punctuation,
  '?',
);
addEntry(
  BrailleEncoding.PunctuationCloseQuote,
  EncodingCategory.Punctuation,
  '"',
);
addEntry(BrailleEncoding.PunctuationBracket, EncodingCategory.Punctuation, '(');
addEntry(BrailleEncoding.PunctuationBracket, EncodingCategory.Punctuation, ')');
addEntry(BrailleEncoding.PunctuationSlash, EncodingCategory.Punctuation, '/');

/**
 * Looks up a braille encoding in the data table.
 */
export function lookupBrailleEncoding(
  encoding: BrailleEncoding,
  category: EncodingCategory = EncodingCategory.All,
): EncodingLookupResult<BrailleEncoding> {
  const result = new EncodingLookupResult<BrailleEncoding>();

  for (const entry of BRAILLE_ENTRIES) {
    if ((entry.category & category) !== 0) {
      if (entry.encoding === encoding) {
        result.exact.push(entry);
      } else if ((entry.encoding & encoding) === encoding) {
        result.partial.push(entry);
      }
    }
  }

  return result;
}

/**
 * Toggles a dot (or encoding bitmask) on/off, returns the new encoding.
 */
export function toggleBrailleDot(
  encoding: BrailleEncoding,
  dot: BrailleDot | BrailleEncoding,
): BrailleEncoding {
  return encoding ^ dot;
}

/**
 * Checks if a dot (or encoding bitmask) is set.
 */
export function getBrailleDot(
  encoding: BrailleEncoding,
  dot: BrailleDot | BrailleEncoding,
): boolean {
  return (encoding & dot) === dot;
}

/**
 * Decodes an array of braille encodings to a string, handling number mode.
 */
export function decodeBrailleStream(encodings: BrailleEncoding[]): string {
  let result = '';
  let numberMode = false;

  for (const ch of encodings) {
    if (ch === BrailleEncoding.None) {
      numberMode = false;
      result += ' ';
    } else if (ch === BrailleEncoding.FormattingNumber) {
      numberMode = true;
      result += '#';
    } else {
      const category =
        EncodingCategory.Punctuation |
        (numberMode ? EncodingCategory.Number : EncodingCategory.Letter);
      const lookup = lookupBrailleEncoding(ch, category);

      if (lookup.exact.length > 0) {
        result += lookup.exact[0].toString();
      }
    }
  }

  return result;
}
