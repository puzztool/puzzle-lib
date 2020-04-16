import {Helpers} from '../Common/Helpers';
import {MorseCharacter} from './MorseCharacter';

// MorseString represents a string of multiple morse characters.  It allows for a longer representation
// to be converted to a single string and allows for sentence-level transforms such as reversing
// the order of tokens.
export class MorseString {
  static readonly CHARACTER_DIVIDER: string = '/';
  static readonly WORD_DIVIDER = ' ';

  constructor(
    morse = '',
    characterDivider = MorseString.CHARACTER_DIVIDER,
    wordDivider = MorseString.WORD_DIVIDER
  ) {
    // The dividers should be single characters which don't clash with the other string content
    Helpers.assertMsg(
      characterDivider.length === 1,
      'Divider must be a single character'
    );
    Helpers.assertMsg(
      wordDivider.length === 1,
      'Divider must be a single character'
    );
    Helpers.assertMsg(
      characterDivider !== wordDivider,
      'Dividers must be different from each other'
    );
    Helpers.assertMsg(
      characterDivider !== MorseCharacter.DASH,
      'Character divider must not be a reserved value'
    );
    Helpers.assertMsg(
      characterDivider !== MorseCharacter.DOT,
      'Character divider must not be a reserved value'
    );
    Helpers.assertMsg(
      characterDivider !== MorseCharacter.RESERVED_DIVIDER,
      'Character divider must not be a reserved value'
    );
    Helpers.assertMsg(
      wordDivider !== MorseCharacter.DASH,
      'Word divider must not be a reserved value'
    );
    Helpers.assertMsg(
      wordDivider !== MorseCharacter.DOT,
      'Word divider must not be a reserved value'
    );
    Helpers.assertMsg(
      wordDivider !== MorseCharacter.RESERVED_DIVIDER,
      'Word divider must not be a reserved value'
    );

    const words = morse.split(wordDivider).filter(w => w.length > 0);
    // Discard any empty characters (caused by trailing separator)
    const wordCharacters = words.map(w =>
      w.split(characterDivider).filter(wc => wc.length > 0)
    );
    this._words = wordCharacters.map(subarray =>
      subarray.map(wc => new MorseCharacter(wc))
    );
  }

  // reverse reverses the order of all tokens in the string (including separators), such as would be
  // the case if you were reading the data for a puzzle backwards.
  reverse(): MorseString {
    for (let i = 0; i < this._words.length; i++) {
      for (const c of this._words[i]) {
        // Reverse the dots/dashes in each letter
        c.reverse();
      }
      // Reverse the letters in each word
      this._words[i] = this._words[i].reverse();
    }

    // Reverse the order of the words
    this._words = this._words.reverse();
    return this;
  }

  // invertDotsAndDashes switches all dots and dashes in the input, such as would be the case if
  // you had two ambiguous symbols for dot/dash and selected the wrong mapping.
  invertDotsAndDashes(): MorseString {
    for (const word of this._words) {
      for (const c of word) {
        c.invertDotsAndDashes();
      }
    }
    return this;
  }

  toString(): string {
    let s = '';
    for (let i = 0; i < this._words.length; i++) {
      if (i > 0) {
        s += ' '; // This is a new word
      }
      for (const c of this._words[i]) {
        s += c.toString() || '?';
      }
    }
    return s;
  }

  protected _words: MorseCharacter[][];
}
