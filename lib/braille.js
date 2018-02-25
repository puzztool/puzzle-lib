const BrailleDot = Object.freeze({
  None: 0x0,
  UpperLeft: 0x1,
  MiddleLeft: 0x2,
  LowerLeft: 0x4,
  UpperRight: 0x8,
  MiddleRight: 0x10,
  LowerRight: 0x20
});

const BrailleEncoding = Object.freeze({
  None: 0x0,

  // Letters (first decade)
  LetterA: BrailleDot.UpperLeft,
  LetterB: BrailleDot.UpperLeft | BrailleDot.MiddleLeft,
  LetterC: BrailleDot.UpperLeft | BrailleDot.UpperRight,
  LetterD: BrailleDot.UpperLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,
  LetterE: BrailleDot.UpperLeft | BrailleDot.MiddleRight,
  LetterF: BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.UpperRight,
  LetterG: BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,
  LetterH: BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.MiddleRight,
  LetterI: BrailleDot.MiddleLeft | BrailleDot.UpperRight,
  LetterJ: BrailleDot.MiddleLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,

  // Letters (second decade)
  LetterK: BrailleDot.LowerLeft | BrailleDot.UpperLeft,
  LetterL: BrailleDot.LowerLeft | BrailleDot.UpperLeft | BrailleDot.MiddleLeft,
  LetterM: BrailleDot.LowerLeft | BrailleDot.UpperLeft | BrailleDot.UpperRight,
  LetterN: BrailleDot.LowerLeft | BrailleDot.UpperLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,
  LetterO: BrailleDot.LowerLeft | BrailleDot.UpperLeft | BrailleDot.MiddleRight,
  LetterP: BrailleDot.LowerLeft | BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.UpperRight,
  LetterQ: BrailleDot.LowerLeft | BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,
  LetterR: BrailleDot.LowerLeft | BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.MiddleRight,
  LetterS: BrailleDot.LowerLeft | BrailleDot.MiddleLeft | BrailleDot.UpperRight,
  LetterT: BrailleDot.LowerLeft | BrailleDot.MiddleLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,

  // Letters (third decade)
  LetterU: BrailleDot.LowerLeft | BrailleDot.LowerRight | BrailleDot.UpperLeft,
  LetterV: BrailleDot.LowerLeft | BrailleDot.LowerRight | BrailleDot.UpperLeft | BrailleDot.MiddleLeft,
  LetterX: BrailleDot.LowerLeft | BrailleDot.LowerRight | BrailleDot.UpperLeft | BrailleDot.UpperRight,
  LetterY: BrailleDot.LowerLeft | BrailleDot.LowerRight | BrailleDot.UpperLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,
  LetterZ: BrailleDot.LowerLeft | BrailleDot.LowerRight | BrailleDot.UpperLeft | BrailleDot.MiddleRight,

  // Letters (fourth decade)
  LetterW: BrailleDot.LowerRight | BrailleDot.MiddleLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,

  // Numbers
  Number1: BrailleDot.UpperLeft,
  Number2: BrailleDot.UpperLeft | BrailleDot.MiddleLeft,
  Number3: BrailleDot.UpperLeft | BrailleDot.UpperRight,
  Number4: BrailleDot.UpperLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,
  Number5: BrailleDot.UpperLeft | BrailleDot.MiddleRight,
  Number6: BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.UpperRight,
  Number7: BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,
  Number8: BrailleDot.UpperLeft | BrailleDot.MiddleLeft | BrailleDot.MiddleRight,
  Number9: BrailleDot.MiddleLeft | BrailleDot.UpperRight,
  Number0: BrailleDot.MiddleLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight,

  // Formatting
  FormattingNumber: BrailleDot.LowerLeft | BrailleDot.UpperRight | BrailleDot.MiddleRight | BrailleDot.LowerRight,
  FormattingCapital: BrailleDot.LowerRight,

  // Punctuation
  PunctuationComma: BrailleDot.MiddleLeft,
  PunctuationSemicolon: BrailleDot.MiddleLeft | BrailleDot.LowerLeft,
  PunctuationApostrophe: BrailleDot.LowerLeft,
  PunctuationColon: BrailleDot.MiddleLeft | BrailleDot.MiddleRight,
  PunctuationHyphen: BrailleDot.LowerLeft | BrailleDot.LowerRight,
  PunctuationDecimalPoint: BrailleDot.UpperRight | BrailleDot.LowerRight,
  PunctuationFullStop: BrailleDot.MiddleLeft | BrailleDot.MiddleRight | BrailleDot.LowerRight,
  PunctuationExclamationPoint: BrailleDot.MiddleLeft | BrailleDot.LowerLeft | BrailleDot.MiddleRight,
  PunctuationOpenQuote: BrailleDot.MiddleLeft | BrailleDot.LowerLeft | BrailleDot.LowerRight,
  PunctuationQuestionMark: BrailleDot.MiddleLeft | BrailleDot.LowerLeft | BrailleDot.LowerRight,
  PunctuationCloseQuote: BrailleDot.LowerLeft | BrailleDot.MiddleRight | BrailleDot.LowerRight,
  PunctuationBracket: BrailleDot.MiddleLeft | BrailleDot.LowerLeft | BrailleDot.MiddleRight | BrailleDot.LowerRight,
  PunctuationSlash: BrailleDot.LowerLeft | BrailleDot.UpperRight
});

const BrailleType = Object.freeze({
  None: 0x0,

  Letter: 0x1,
  Number: 0x2,
  Formatting: 0x4,
  Punctuation: 0x8,

  All: 0xFF
});

class BrailleEntry {
  constructor (bits, type, display) {
    this._bits = bits;
    this._type = type;
    this._display = display;
  }

  get bits () {
    return this._bits;
  }

  get type () {
    return this._type;
  }

  get display () {
    return this._display;
  }

  toString () {
    return this._display;
  }
}

class BrailleData {
  constructor () {
    this._entries = [];
    this._addToList(BrailleEncoding.LetterA, BrailleType.Letter, 'A');
    this._addToList(BrailleEncoding.LetterB, BrailleType.Letter, 'B');
    this._addToList(BrailleEncoding.LetterC, BrailleType.Letter, 'C');
    this._addToList(BrailleEncoding.LetterD, BrailleType.Letter, 'D');
    this._addToList(BrailleEncoding.LetterE, BrailleType.Letter, 'E');
    this._addToList(BrailleEncoding.LetterF, BrailleType.Letter, 'F');
    this._addToList(BrailleEncoding.LetterG, BrailleType.Letter, 'G');
    this._addToList(BrailleEncoding.LetterH, BrailleType.Letter, 'H');
    this._addToList(BrailleEncoding.LetterI, BrailleType.Letter, 'I');
    this._addToList(BrailleEncoding.LetterJ, BrailleType.Letter, 'J');
    this._addToList(BrailleEncoding.LetterK, BrailleType.Letter, 'K');
    this._addToList(BrailleEncoding.LetterL, BrailleType.Letter, 'L');
    this._addToList(BrailleEncoding.LetterM, BrailleType.Letter, 'M');
    this._addToList(BrailleEncoding.LetterN, BrailleType.Letter, 'N');
    this._addToList(BrailleEncoding.LetterO, BrailleType.Letter, 'O');
    this._addToList(BrailleEncoding.LetterP, BrailleType.Letter, 'P');
    this._addToList(BrailleEncoding.LetterQ, BrailleType.Letter, 'Q');
    this._addToList(BrailleEncoding.LetterR, BrailleType.Letter, 'R');
    this._addToList(BrailleEncoding.LetterS, BrailleType.Letter, 'S');
    this._addToList(BrailleEncoding.LetterT, BrailleType.Letter, 'T');
    this._addToList(BrailleEncoding.LetterU, BrailleType.Letter, 'U');
    this._addToList(BrailleEncoding.LetterV, BrailleType.Letter, 'V');
    this._addToList(BrailleEncoding.LetterW, BrailleType.Letter, 'W');
    this._addToList(BrailleEncoding.LetterX, BrailleType.Letter, 'X');
    this._addToList(BrailleEncoding.LetterY, BrailleType.Letter, 'Y');
    this._addToList(BrailleEncoding.LetterZ, BrailleType.Letter, 'Z');

    this._addToList(BrailleEncoding.Number0, BrailleType.Number, '0');
    this._addToList(BrailleEncoding.Number1, BrailleType.Number, '1');
    this._addToList(BrailleEncoding.Number2, BrailleType.Number, '2');
    this._addToList(BrailleEncoding.Number3, BrailleType.Number, '3');
    this._addToList(BrailleEncoding.Number4, BrailleType.Number, '4');
    this._addToList(BrailleEncoding.Number5, BrailleType.Number, '5');
    this._addToList(BrailleEncoding.Number6, BrailleType.Number, '6');
    this._addToList(BrailleEncoding.Number7, BrailleType.Number, '7');
    this._addToList(BrailleEncoding.Number8, BrailleType.Number, '8');
    this._addToList(BrailleEncoding.Number9, BrailleType.Number, '9');

    this._addToList(BrailleEncoding.FormattingNumber, BrailleType.Formatting, '#');
    this._addToList(BrailleEncoding.FormattingCapital, BrailleType.Formatting, '^');

    this._addToList(BrailleEncoding.PunctuationComma, BrailleType.Punctuation, ',');
    this._addToList(BrailleEncoding.PunctuationSemicolon, BrailleType.Punctuation, ';');
    this._addToList(BrailleEncoding.PunctuationApostrophe, BrailleType.Punctuation, '\'');
    this._addToList(BrailleEncoding.PunctuationColon, BrailleType.Punctuation, ':');
    this._addToList(BrailleEncoding.PunctuationHyphen, BrailleType.Punctuation, '-');
    this._addToList(BrailleEncoding.PunctuationDecimalPoint, BrailleType.Punctuation, '.');
    this._addToList(BrailleEncoding.PunctuationFullStop, BrailleType.Punctuation, '.');
    this._addToList(BrailleEncoding.PunctuationExclamationPoint, BrailleType.Punctuation, '!');
    this._addToList(BrailleEncoding.PunctuationOpenQuote, BrailleType.Punctuation, '"');
    this._addToList(BrailleEncoding.PunctuationQuestionMark, BrailleType.Punctuation, '?');
    this._addToList(BrailleEncoding.PunctuationCloseQuote, BrailleType.Punctuation, '"');
    this._addToList(BrailleEncoding.PunctuationBracket, BrailleType.Punctuation, '(');
    this._addToList(BrailleEncoding.PunctuationBracket, BrailleType.Punctuation, ')');
    this._addToList(BrailleEncoding.PunctuationSlash, BrailleType.Punctuation, '/');
  }

  static instance () {
    if (!BrailleData._instance) {
      BrailleData._instance = new BrailleData();
    }

    return BrailleData._instance;
  }

  lookup (bits, type = BrailleType.All) {
    let exact = [];
    const partial = [];

    for (const entry of this._entries) {
      if ((entry.type & type) !== 0) {
        if (entry.bits === bits) {
          exact.push(entry.toString());
        } else if ((entry.bits & bits) === bits) {
          partial.push(entry.toString());
        }
      }
    }

    return { exact, partial };
  }

  _addToList (bits, type, display) {
    this._entries.push(new BrailleEntry(bits, type, display));
  }
}

class BrailleCharacter {
  constructor (bits = 0, type = BrailleType.All) {
    this._bits = bits;
    this._type = type;
    this._invalidateLookup();
  }

  get type () {
    return this._type;
  }

  set type (value) {
    if (this._type !== value) {
      this._type = value;
      this._invalidateLookup();
    }
  }

  clear () {
    this._bits = BrailleDot.None;
    this._invalidateLookup();
  }

  toggle (mask) {
    this._bits ^= mask;
    this._invalidateLookup();
  }

  getExactMatches () {
    return this._ensureLookup().exact;
  }

  getPotentialMatches () {
    return this._ensureLookup().partial;
  }

  toString () {
    return this._ensureLookup().exact.join('/');
  }

  valueOf () {
    return this._bits;
  }

  _ensureLookup () {
    if (!this._lookup) {
      this._lookup = BrailleData.instance().lookup(this._bits, this._type);
    }

    return this._lookup;
  }

  _invalidateLookup () {
    this._lookup = null;
  }
}

exports.BrailleCharacter = BrailleCharacter;
exports.BrailleDot = BrailleDot;
exports.BrailleType = BrailleType;
