import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingEntry} from '../Common/EncodingEntry';
import {EncodingLookupResult} from '../Common/EncodingLookupResult';
import {SemaphoreDirection} from './SemaphoreDirection';
import {SemaphoreEncoding} from './SemaphoreEncoding';

// Build the lookup table once
const SEMAPHORE_ENTRIES: Array<EncodingEntry<SemaphoreEncoding>> = [];

function addEntry(
  encoding: SemaphoreEncoding,
  category: EncodingCategory,
  display: string,
) {
  SEMAPHORE_ENTRIES.push(new EncodingEntry(encoding, category, display));
}

// Letters
addEntry(SemaphoreEncoding.LetterA, EncodingCategory.Letter, 'A');
addEntry(SemaphoreEncoding.LetterB, EncodingCategory.Letter, 'B');
addEntry(SemaphoreEncoding.LetterC, EncodingCategory.Letter, 'C');
addEntry(SemaphoreEncoding.LetterD, EncodingCategory.Letter, 'D');
addEntry(SemaphoreEncoding.LetterE, EncodingCategory.Letter, 'E');
addEntry(SemaphoreEncoding.LetterF, EncodingCategory.Letter, 'F');
addEntry(SemaphoreEncoding.LetterG, EncodingCategory.Letter, 'G');
addEntry(SemaphoreEncoding.LetterH, EncodingCategory.Letter, 'H');
addEntry(SemaphoreEncoding.LetterI, EncodingCategory.Letter, 'I');
addEntry(SemaphoreEncoding.LetterJ, EncodingCategory.Letter, 'J');
addEntry(SemaphoreEncoding.LetterK, EncodingCategory.Letter, 'K');
addEntry(SemaphoreEncoding.LetterL, EncodingCategory.Letter, 'L');
addEntry(SemaphoreEncoding.LetterM, EncodingCategory.Letter, 'M');
addEntry(SemaphoreEncoding.LetterN, EncodingCategory.Letter, 'N');
addEntry(SemaphoreEncoding.LetterO, EncodingCategory.Letter, 'O');
addEntry(SemaphoreEncoding.LetterP, EncodingCategory.Letter, 'P');
addEntry(SemaphoreEncoding.LetterQ, EncodingCategory.Letter, 'Q');
addEntry(SemaphoreEncoding.LetterR, EncodingCategory.Letter, 'R');
addEntry(SemaphoreEncoding.LetterS, EncodingCategory.Letter, 'S');
addEntry(SemaphoreEncoding.LetterT, EncodingCategory.Letter, 'T');
addEntry(SemaphoreEncoding.LetterU, EncodingCategory.Letter, 'U');
addEntry(SemaphoreEncoding.LetterV, EncodingCategory.Letter, 'V');
addEntry(SemaphoreEncoding.LetterW, EncodingCategory.Letter, 'W');
addEntry(SemaphoreEncoding.LetterX, EncodingCategory.Letter, 'X');
addEntry(SemaphoreEncoding.LetterY, EncodingCategory.Letter, 'Y');
addEntry(SemaphoreEncoding.LetterZ, EncodingCategory.Letter, 'Z');

// Numbers
addEntry(SemaphoreEncoding.Number1, EncodingCategory.Number, '1');
addEntry(SemaphoreEncoding.Number2, EncodingCategory.Number, '2');
addEntry(SemaphoreEncoding.Number3, EncodingCategory.Number, '3');
addEntry(SemaphoreEncoding.Number4, EncodingCategory.Number, '4');
addEntry(SemaphoreEncoding.Number5, EncodingCategory.Number, '5');
addEntry(SemaphoreEncoding.Number6, EncodingCategory.Number, '6');
addEntry(SemaphoreEncoding.Number7, EncodingCategory.Number, '7');
addEntry(SemaphoreEncoding.Number8, EncodingCategory.Number, '8');
addEntry(SemaphoreEncoding.Number9, EncodingCategory.Number, '9');
addEntry(SemaphoreEncoding.Number0, EncodingCategory.Number, '0');

// Formatting
addEntry(SemaphoreEncoding.FormattingNumber, EncodingCategory.Formatting, '#');

/**
 * Looks up a semaphore encoding in the data table.
 */
export function lookupSemaphoreEncoding(
  encoding: SemaphoreEncoding,
  category: EncodingCategory = EncodingCategory.All,
): EncodingLookupResult<SemaphoreEncoding> {
  const result = new EncodingLookupResult<SemaphoreEncoding>();

  for (const entry of SEMAPHORE_ENTRIES) {
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
 * Adds a direction flag to an encoding, returns a new encoding.
 */
export function addSemaphoreDirection(
  encoding: SemaphoreEncoding,
  direction: SemaphoreDirection,
): SemaphoreEncoding {
  return (encoding | direction) as SemaphoreEncoding;
}

/**
 * Removes a direction flag from an encoding, returns a new encoding.
 */
export function removeSemaphoreDirection(
  encoding: SemaphoreEncoding,
  direction: SemaphoreDirection,
): SemaphoreEncoding {
  return (encoding & ~direction) as SemaphoreEncoding;
}

/**
 * Checks if a direction flag is set in an encoding.
 */
export function hasSemaphoreDirection(
  encoding: SemaphoreEncoding,
  direction: SemaphoreDirection,
): boolean {
  return (encoding & direction) === direction;
}

/**
 * Converts an array of SemaphoreDirection values to a SemaphoreEncoding.
 */
export function directionsToEncoding(
  directions: SemaphoreDirection[],
): SemaphoreEncoding {
  let result: SemaphoreEncoding = SemaphoreEncoding.None;
  for (const dir of directions) {
    result = (result | dir) as SemaphoreEncoding;
  }
  return result;
}

/**
 * Converts degrees (must be a multiple of 45, >= 0) to a SemaphoreDirection.
 */
export function degreesToSemaphoreDirection(
  degrees: number,
): SemaphoreDirection {
  if (degrees >= 360) {
    degrees = degrees % 360;
  }

  if (degrees % 45 !== 0 || degrees < 0) {
    throw new Error('Invalid degrees');
  }

  const position = degrees / 45;
  return SemaphoreDirection.North << position;
}

/**
 * Converts a SemaphoreDirection to degrees.
 */
export function semaphoreDirectionToDegrees(
  direction: SemaphoreDirection,
): number {
  let position = SemaphoreDirection.North;
  let counter = 0;
  while (counter < 9 && position !== direction) {
    position = position << 1;
    counter++;
  }

  return counter * 45;
}

/**
 * Decodes an array of semaphore encodings to a string, handling number mode.
 */
export function decodeSemaphoreStream(encodings: SemaphoreEncoding[]): string {
  let result = '';
  let numberMode = false;

  for (const ch of encodings) {
    if (ch === SemaphoreEncoding.None) {
      numberMode = false;
      result += ' ';
    } else if (ch === SemaphoreEncoding.FormattingNumber) {
      numberMode = true;
      result += '#';
    } else {
      const category =
        EncodingCategory.Punctuation |
        (numberMode ? EncodingCategory.Number : EncodingCategory.Letter);
      const lookup = lookupSemaphoreEncoding(ch, category);

      if (lookup.exact.length > 0) {
        result += lookup.exact[0].toString();
      }
    }
  }

  return result;
}
