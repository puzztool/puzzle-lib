const Dot = Object.freeze({
  None: 0x0,
  UpperLeft: 0x1,
  MiddleLeft: 0x2,
  LowerLeft: 0x4,
  UpperRight: 0x8,
  MiddleRight: 0x10,
  LowerRight: 0x20
});

const Encoding = Object.freeze({
  None: 0x0,

  // Letters (first decade)
  LetterA: Dot.UpperLeft,
  LetterB: Dot.UpperLeft | Dot.MiddleLeft,
  LetterC: Dot.UpperLeft | Dot.UpperRight,
  LetterD: Dot.UpperLeft | Dot.UpperRight | Dot.MiddleRight,
  LetterE: Dot.UpperLeft | Dot.MiddleRight,
  LetterF: Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight,
  LetterG: Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,
  LetterH: Dot.UpperLeft | Dot.MiddleLeft | Dot.MiddleRight,
  LetterI: Dot.MiddleLeft | Dot.UpperRight,
  LetterJ: Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,

  // Letters (second decade)
  LetterK: Dot.LowerLeft | Dot.UpperLeft,
  LetterL: Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleLeft,
  LetterM: Dot.LowerLeft | Dot.UpperLeft | Dot.UpperRight,
  LetterN: Dot.LowerLeft | Dot.UpperLeft | Dot.UpperRight | Dot.MiddleRight,
  LetterO: Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleRight,
  LetterP: Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight,
  LetterQ: Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,
  LetterR: Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleLeft | Dot.MiddleRight,
  LetterS: Dot.LowerLeft | Dot.MiddleLeft | Dot.UpperRight,
  LetterT: Dot.LowerLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,

  // Letters (third decade)
  LetterU: Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft,
  LetterV: Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft | Dot.MiddleLeft,
  LetterX: Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft | Dot.UpperRight,
  LetterY: Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft | Dot.UpperRight | Dot.MiddleRight,
  LetterZ: Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft | Dot.MiddleRight,

  // Letters (fourth decade)
  LetterW: Dot.LowerRight | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,

  // Numbers
  Number1: Dot.UpperLeft,
  Number2: Dot.UpperLeft | Dot.MiddleLeft,
  Number3: Dot.UpperLeft | Dot.UpperRight,
  Number4: Dot.UpperLeft | Dot.UpperRight | Dot.MiddleRight,
  Number5: Dot.UpperLeft | Dot.MiddleRight,
  Number6: Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight,
  Number7: Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,
  Number8: Dot.UpperLeft | Dot.MiddleLeft | Dot.MiddleRight,
  Number9: Dot.MiddleLeft | Dot.UpperRight,
  Number0: Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,

  // Formatting
  FormattingNumber: Dot.LowerLeft | Dot.UpperRight | Dot.MiddleRight | Dot.LowerRight,
  FormattingCapital: Dot.LowerRight,

  // Punctuation
  PunctuationComma: Dot.MiddleLeft,
  PunctuationSemicolon: Dot.MiddleLeft | Dot.LowerLeft,
  PunctuationApostrophe: Dot.LowerLeft,
  PunctuationColon: Dot.MiddleLeft | Dot.MiddleRight,
  PunctuationHyphen: Dot.LowerLeft | Dot.LowerRight,
  PunctuationDecimalPoint: Dot.UpperRight | Dot.LowerRight,
  PunctuationFullStop: Dot.MiddleLeft | Dot.MiddleRight | Dot.LowerRight,
  PunctuationExclamationPoint: Dot.MiddleLeft | Dot.LowerLeft | Dot.MiddleRight,
  PunctuationOpenQuote: Dot.MiddleLeft | Dot.LowerLeft | Dot.LowerRight,
  PunctuationQuestionMark: Dot.MiddleLeft | Dot.LowerLeft | Dot.LowerRight,
  PunctuationCloseQuote: Dot.LowerLeft | Dot.MiddleRight | Dot.LowerRight,
  PunctuationBracket: Dot.MiddleLeft | Dot.LowerLeft | Dot.MiddleRight | Dot.LowerRight,
  PunctuationSlash: Dot.LowerLeft | Dot.UpperRight
});

const Category = Object.freeze({
  None: 0x0,

  Letter: 0x1,
  Number: 0x2,
  Formatting: 0x4,
  Punctuation: 0x8,

  All: 0xFF
});

class Entry {
  constructor (bits, category, display) {
    this._bits = bits;
    this._category = category;
    this._display = display;
  }

  get bits () {
    return this._bits;
  }

  get category () {
    return this._category;
  }

  get display () {
    return this._display;
  }

  toString () {
    return this._display;
  }
}

class Data {
  constructor () {
    this._entries = [];
    this._addToList(Encoding.LetterA, Category.Letter, 'A');
    this._addToList(Encoding.LetterB, Category.Letter, 'B');
    this._addToList(Encoding.LetterC, Category.Letter, 'C');
    this._addToList(Encoding.LetterD, Category.Letter, 'D');
    this._addToList(Encoding.LetterE, Category.Letter, 'E');
    this._addToList(Encoding.LetterF, Category.Letter, 'F');
    this._addToList(Encoding.LetterG, Category.Letter, 'G');
    this._addToList(Encoding.LetterH, Category.Letter, 'H');
    this._addToList(Encoding.LetterI, Category.Letter, 'I');
    this._addToList(Encoding.LetterJ, Category.Letter, 'J');
    this._addToList(Encoding.LetterK, Category.Letter, 'K');
    this._addToList(Encoding.LetterL, Category.Letter, 'L');
    this._addToList(Encoding.LetterM, Category.Letter, 'M');
    this._addToList(Encoding.LetterN, Category.Letter, 'N');
    this._addToList(Encoding.LetterO, Category.Letter, 'O');
    this._addToList(Encoding.LetterP, Category.Letter, 'P');
    this._addToList(Encoding.LetterQ, Category.Letter, 'Q');
    this._addToList(Encoding.LetterR, Category.Letter, 'R');
    this._addToList(Encoding.LetterS, Category.Letter, 'S');
    this._addToList(Encoding.LetterT, Category.Letter, 'T');
    this._addToList(Encoding.LetterU, Category.Letter, 'U');
    this._addToList(Encoding.LetterV, Category.Letter, 'V');
    this._addToList(Encoding.LetterW, Category.Letter, 'W');
    this._addToList(Encoding.LetterX, Category.Letter, 'X');
    this._addToList(Encoding.LetterY, Category.Letter, 'Y');
    this._addToList(Encoding.LetterZ, Category.Letter, 'Z');

    this._addToList(Encoding.Number0, Category.Number, '0');
    this._addToList(Encoding.Number1, Category.Number, '1');
    this._addToList(Encoding.Number2, Category.Number, '2');
    this._addToList(Encoding.Number3, Category.Number, '3');
    this._addToList(Encoding.Number4, Category.Number, '4');
    this._addToList(Encoding.Number5, Category.Number, '5');
    this._addToList(Encoding.Number6, Category.Number, '6');
    this._addToList(Encoding.Number7, Category.Number, '7');
    this._addToList(Encoding.Number8, Category.Number, '8');
    this._addToList(Encoding.Number9, Category.Number, '9');

    this._addToList(Encoding.FormattingNumber, Category.Formatting, '#');
    this._addToList(Encoding.FormattingCapital, Category.Formatting, '^');

    this._addToList(Encoding.PunctuationComma, Category.Punctuation, ',');
    this._addToList(Encoding.PunctuationSemicolon, Category.Punctuation, ';');
    this._addToList(Encoding.PunctuationApostrophe, Category.Punctuation, '\'');
    this._addToList(Encoding.PunctuationColon, Category.Punctuation, ':');
    this._addToList(Encoding.PunctuationHyphen, Category.Punctuation, '-');
    this._addToList(Encoding.PunctuationDecimalPoint, Category.Punctuation, '.');
    this._addToList(Encoding.PunctuationFullStop, Category.Punctuation, '.');
    this._addToList(Encoding.PunctuationExclamationPoint, Category.Punctuation, '!');
    this._addToList(Encoding.PunctuationOpenQuote, Category.Punctuation, '"');
    this._addToList(Encoding.PunctuationQuestionMark, Category.Punctuation, '?');
    this._addToList(Encoding.PunctuationCloseQuote, Category.Punctuation, '"');
    this._addToList(Encoding.PunctuationBracket, Category.Punctuation, '(');
    this._addToList(Encoding.PunctuationBracket, Category.Punctuation, ')');
    this._addToList(Encoding.PunctuationSlash, Category.Punctuation, '/');
  }

  static instance () {
    if (!Data._instance) {
      Data._instance = new Data();
    }

    return Data._instance;
  }

  lookup (bits, category = Category.All) {
    let exact = [];
    const partial = [];

    for (const entry of this._entries) {
      if ((entry.category & category) !== 0) {
        if (entry.bits === bits) {
          exact.push(entry.toString());
        } else if ((entry.bits & bits) === bits) {
          partial.push(entry.toString());
        }
      }
    }

    return { exact, partial };
  }

  _addToList (bits, category, display) {
    this._entries.push(new Entry(bits, category, display));
  }
}

class Character {
  constructor (bits = 0, category = Category.All) {
    this._bits = bits;
    this._category = category;
    this._invalidateLookup();
  }

  get category () {
    return this._category;
  }

  set category (value) {
    if (this._category !== value) {
      this._category = value;
      this._invalidateLookup();
    }
  }

  clear () {
    this._bits = Dot.None;
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
      this._lookup = Data.instance().lookup(this._bits, this._category);
    }

    return this._lookup;
  }

  _invalidateLookup () {
    this._lookup = null;
  }
}

exports.Character = Character;
exports.Dot = Dot;
exports.Category = Category;
