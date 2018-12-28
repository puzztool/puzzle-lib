import {MorseCharacter} from './MorseCharacter';

// MorseString represents a string of multiple morse characters.  It allows for a longer representation
// to be converted to a single string and allows for sentence-level transforms such as reversing
// the order of tokens.
export class MorseString {
  constructor(morse = '', divider = MorseCharacter.DIVIDER) {
    const morseCharStrings = morse.split(divider);
    // Discard any empty characters (caused by trailing separator)
    this._chars = morseCharStrings.filter(mcs => mcs.length > 0).map(mcs => new MorseCharacter(mcs));
  }

  // reverse reverses the order of all tokens in the string (including separators), such as would be
  // the case if you were reading the data for a puzzle backwards.
  reverse(): MorseString {
    for (const c of this._chars) {
      c.reverse();
    }
    this._chars = this._chars.reverse();
    return this;
  }

  // invertDotsAndDashes switches all dots and dashes in the input, such as would be the case if
  // you had two ambiguous symbols for dot/dash and selected the wrong mapping.
  invertDotsAndDashes(): MorseString {
    for (const c of this._chars) {
      c.invertDotsAndDashes();
    }
    return this;
  }

  toString(): string {
    let s = '';
    for (const c of this._chars) {
      s += (c.toString() || '?');
    }
    return s;
  }

  get chars() {
    return this._chars;
  }

  protected _chars: MorseCharacter[];
}