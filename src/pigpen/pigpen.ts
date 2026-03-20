import {EncodingCategory} from '../common/encoding-category.js';
import {EncodingEntry} from '../common/encoding-entry.js';
import {EncodingLookupResult} from '../common/encoding-lookup-result.js';
import {PigpenEncoding} from './encoding.js';
import {PigpenSegment} from './segment.js';

// Build the lookup table once
const PIGPEN_ENTRIES: Array<EncodingEntry<PigpenEncoding>> = [];

function addEntry(
  encoding: PigpenEncoding,
  category: EncodingCategory,
  display: string,
) {
  PIGPEN_ENTRIES.push(new EncodingEntry(encoding, category, display));
}

// Letters
addEntry(PigpenEncoding.LetterA, EncodingCategory.Letter, 'A');
addEntry(PigpenEncoding.LetterB, EncodingCategory.Letter, 'B');
addEntry(PigpenEncoding.LetterC, EncodingCategory.Letter, 'C');
addEntry(PigpenEncoding.LetterD, EncodingCategory.Letter, 'D');
addEntry(PigpenEncoding.LetterE, EncodingCategory.Letter, 'E');
addEntry(PigpenEncoding.LetterF, EncodingCategory.Letter, 'F');
addEntry(PigpenEncoding.LetterG, EncodingCategory.Letter, 'G');
addEntry(PigpenEncoding.LetterH, EncodingCategory.Letter, 'H');
addEntry(PigpenEncoding.LetterI, EncodingCategory.Letter, 'I');
addEntry(PigpenEncoding.LetterJ, EncodingCategory.Letter, 'J');
addEntry(PigpenEncoding.LetterK, EncodingCategory.Letter, 'K');
addEntry(PigpenEncoding.LetterL, EncodingCategory.Letter, 'L');
addEntry(PigpenEncoding.LetterM, EncodingCategory.Letter, 'M');
addEntry(PigpenEncoding.LetterN, EncodingCategory.Letter, 'N');
addEntry(PigpenEncoding.LetterO, EncodingCategory.Letter, 'O');
addEntry(PigpenEncoding.LetterP, EncodingCategory.Letter, 'P');
addEntry(PigpenEncoding.LetterQ, EncodingCategory.Letter, 'Q');
addEntry(PigpenEncoding.LetterR, EncodingCategory.Letter, 'R');
addEntry(PigpenEncoding.LetterS, EncodingCategory.Letter, 'S');
addEntry(PigpenEncoding.LetterT, EncodingCategory.Letter, 'T');
addEntry(PigpenEncoding.LetterU, EncodingCategory.Letter, 'U');
addEntry(PigpenEncoding.LetterV, EncodingCategory.Letter, 'V');
addEntry(PigpenEncoding.LetterW, EncodingCategory.Letter, 'W');
addEntry(PigpenEncoding.LetterX, EncodingCategory.Letter, 'X');
addEntry(PigpenEncoding.LetterY, EncodingCategory.Letter, 'Y');
addEntry(PigpenEncoding.LetterZ, EncodingCategory.Letter, 'Z');

/** Mask covering all cardinal segments (grid shapes). */
const CARDINAL_MASK =
  PigpenSegment.North |
  PigpenSegment.East |
  PigpenSegment.South |
  PigpenSegment.West;

/** Mask covering all intercardinal segments (X shapes). */
const INTERCARDINAL_MASK =
  PigpenSegment.NorthEast |
  PigpenSegment.SouthEast |
  PigpenSegment.SouthWest |
  PigpenSegment.NorthWest;

/**
 * Looks up a pigpen encoding in the data table.
 */
export function lookupPigpenEncoding(
  encoding: PigpenEncoding,
  category: EncodingCategory = EncodingCategory.All,
): EncodingLookupResult<PigpenEncoding> {
  const result = new EncodingLookupResult<PigpenEncoding>();

  for (const entry of PIGPEN_ENTRIES) {
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
 * Toggles a segment flag in an encoding. Returns the encoding unchanged
 * if toggling the segment on would mix cardinal and intercardinal segments.
 * Toggling a segment off or toggling the dot is always allowed.
 */
export function togglePigpenSegment(
  encoding: PigpenEncoding,
  segment: PigpenSegment,
): PigpenEncoding {
  if (!canTogglePigpenSegment(encoding, segment)) {
    return encoding;
  }
  return (encoding ^ segment) as PigpenEncoding;
}

/**
 * Checks if a segment flag is set in an encoding.
 */
export function hasPigpenSegment(
  encoding: PigpenEncoding,
  segment: PigpenSegment,
): boolean {
  return (encoding & segment) === segment;
}

/**
 * Returns true if the encoding uses cardinal (grid) segments.
 */
export function isCardinal(encoding: PigpenEncoding): boolean {
  return ((encoding as number) & CARDINAL_MASK) !== 0;
}

/**
 * Returns true if the encoding uses intercardinal (X) segments.
 */
export function isIntercardinal(encoding: PigpenEncoding): boolean {
  return ((encoding as number) & INTERCARDINAL_MASK) !== 0;
}

/**
 * Checks if a segment can be toggled without mixing cardinal and intercardinal
 * segments. Toggling off and toggling the dot are always allowed.
 */
export function canTogglePigpenSegment(
  encoding: PigpenEncoding,
  segment: PigpenSegment,
): boolean {
  // Toggling off is always allowed
  if (hasPigpenSegment(encoding, segment)) {
    return true;
  }
  // Dot is always compatible
  if (segment === PigpenSegment.Dot) {
    return true;
  }
  // Reject masks that mix cardinal and intercardinal bits
  const segmentAsEncoding = segment as number as PigpenEncoding;
  const segmentHasCardinal = isCardinal(segmentAsEncoding);
  const segmentHasIntercardinal = isIntercardinal(segmentAsEncoding);
  if (segmentHasCardinal && segmentHasIntercardinal) {
    return false;
  }
  if (segmentHasCardinal) {
    return !isIntercardinal(encoding);
  }
  return !isCardinal(encoding);
}

/**
 * Encodes plain text to an array of pigpen encodings.
 * Unknown characters map to PigpenEncoding.None.
 */
export function encodePigpenStream(text: string): PigpenEncoding[] {
  return text
    .toUpperCase()
    .split('')
    .map(ch => {
      const entry = PIGPEN_ENTRIES.find(e => e.display === ch);
      return entry ? entry.encoding : PigpenEncoding.None;
    });
}

/**
 * Decodes an array of pigpen encodings to a string.
 */
export function decodePigpenStream(encodings: PigpenEncoding[]): string {
  let result = '';

  for (const ch of encodings) {
    if (ch === PigpenEncoding.None) {
      result += ' ';
    } else {
      const lookup = lookupPigpenEncoding(ch, EncodingCategory.Letter);
      if (lookup.exact.length > 0) {
        result += lookup.exact[0].toString();
      }
    }
  }

  return result;
}
