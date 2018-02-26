export namespace Braille {
  export enum Dot {
    None,
    UpperLeft = 1 << 1,
    MiddleLeft = 1 << 2,
    LowerLeft = 1 << 3,
    UpperRight = 1 << 4,
    MiddleRight = 1 << 5,
    LowerRight = 1 << 6,
  }

  export enum Encoding {
    None,

    // Letters (first decade)
    LetterA = Dot.UpperLeft,
    LetterB = Dot.UpperLeft | Dot.MiddleLeft,
    LetterC = Dot.UpperLeft | Dot.UpperRight,
    LetterD = Dot.UpperLeft | Dot.UpperRight | Dot.MiddleRight,
    LetterE = Dot.UpperLeft | Dot.MiddleRight,
    LetterF = Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight,
    LetterG = Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,
    LetterH = Dot.UpperLeft | Dot.MiddleLeft | Dot.MiddleRight,
    LetterI = Dot.MiddleLeft | Dot.UpperRight,
    LetterJ = Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,

    // Letters (second decade)
    LetterK = Dot.LowerLeft | Dot.UpperLeft,
    LetterL = Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleLeft,
    LetterM = Dot.LowerLeft | Dot.UpperLeft | Dot.UpperRight,
    LetterN = Dot.LowerLeft | Dot.UpperLeft | Dot.UpperRight | Dot.MiddleRight,
    LetterO = Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleRight,
    LetterP = Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight,
    LetterQ = Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,
    LetterR = Dot.LowerLeft | Dot.UpperLeft | Dot.MiddleLeft | Dot.MiddleRight,
    LetterS = Dot.LowerLeft | Dot.MiddleLeft | Dot.UpperRight,
    LetterT = Dot.LowerLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,

    // Letters (third decade)
    LetterU = Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft,
    LetterV = Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft | Dot.MiddleLeft,
    LetterX = Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft | Dot.UpperRight,
    LetterY = Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft | Dot.UpperRight | Dot.MiddleRight,
    LetterZ = Dot.LowerLeft | Dot.LowerRight | Dot.UpperLeft | Dot.MiddleRight,

    // Letters (fourth decade)
    LetterW = Dot.LowerRight | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,

    // Numbers
    Number1 = Dot.UpperLeft,
    Number2 = Dot.UpperLeft | Dot.MiddleLeft,
    Number3 = Dot.UpperLeft | Dot.UpperRight,
    Number4 = Dot.UpperLeft | Dot.UpperRight | Dot.MiddleRight,
    Number5 = Dot.UpperLeft | Dot.MiddleRight,
    Number6 = Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight,
    Number7 = Dot.UpperLeft | Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,
    Number8 = Dot.UpperLeft | Dot.MiddleLeft | Dot.MiddleRight,
    Number9 = Dot.MiddleLeft | Dot.UpperRight,
    Number0 = Dot.MiddleLeft | Dot.UpperRight | Dot.MiddleRight,

    // Formatting
    FormattingNumber = Dot.LowerLeft | Dot.UpperRight | Dot.MiddleRight | Dot.LowerRight,
    FormattingCapital = Dot.LowerRight,

    // Punctuation
    PunctuationComma = Dot.MiddleLeft,
    PunctuationSemicolon = Dot.MiddleLeft | Dot.LowerLeft,
    PunctuationApostrophe = Dot.LowerLeft,
    PunctuationColon = Dot.MiddleLeft | Dot.MiddleRight,
    PunctuationHyphen = Dot.LowerLeft | Dot.LowerRight,
    PunctuationDecimalPoint = Dot.UpperRight | Dot.LowerRight,
    PunctuationFullStop = Dot.MiddleLeft | Dot.MiddleRight | Dot.LowerRight,
    PunctuationExclamationPoint = Dot.MiddleLeft | Dot.LowerLeft | Dot.MiddleRight,
    PunctuationOpenQuote = Dot.MiddleLeft | Dot.LowerLeft | Dot.LowerRight,
    PunctuationQuestionMark = Dot.MiddleLeft | Dot.LowerLeft | Dot.LowerRight,
    PunctuationCloseQuote = Dot.LowerLeft | Dot.MiddleRight | Dot.LowerRight,
    PunctuationBracket = Dot.MiddleLeft | Dot.LowerLeft | Dot.MiddleRight | Dot.LowerRight,
    PunctuationSlash = Dot.LowerLeft | Dot.UpperRight,
  }

  export enum Category {
    None,

    Letter = 1 << 1,
    Number = 1 << 2,
    Formatting = 1 << 3,
    Punctuation = 1 << 4,

    All = 0xFF,
  }

  class Entry {
    public readonly encoding: Encoding;
    public readonly category: Category;
    public readonly display: string;

    constructor(encoding: Encoding, category: Category, display: string) {
      this.encoding = encoding;
      this.category = category;
      this.display = display;
    }

    public toString() {
      return this.display;
    }
  }

  class LookupResult {
    public readonly exact: Entry[] = [];
    public readonly partial: Entry[] = [];

    get exactString() {
      return this.exact.map((value) => value.toString()).join("/");
    }
  }

  class Data {
    public static readonly instance: Data = new Data();
    private readonly _entries: Entry[] = [];

    constructor() {
      this.addToList(Encoding.LetterA, Category.Letter, "A");
      this.addToList(Encoding.LetterB, Category.Letter, "B");
      this.addToList(Encoding.LetterC, Category.Letter, "C");
      this.addToList(Encoding.LetterD, Category.Letter, "D");
      this.addToList(Encoding.LetterE, Category.Letter, "E");
      this.addToList(Encoding.LetterF, Category.Letter, "F");
      this.addToList(Encoding.LetterG, Category.Letter, "G");
      this.addToList(Encoding.LetterH, Category.Letter, "H");
      this.addToList(Encoding.LetterI, Category.Letter, "I");
      this.addToList(Encoding.LetterJ, Category.Letter, "J");
      this.addToList(Encoding.LetterK, Category.Letter, "K");
      this.addToList(Encoding.LetterL, Category.Letter, "L");
      this.addToList(Encoding.LetterM, Category.Letter, "M");
      this.addToList(Encoding.LetterN, Category.Letter, "N");
      this.addToList(Encoding.LetterO, Category.Letter, "O");
      this.addToList(Encoding.LetterP, Category.Letter, "P");
      this.addToList(Encoding.LetterQ, Category.Letter, "Q");
      this.addToList(Encoding.LetterR, Category.Letter, "R");
      this.addToList(Encoding.LetterS, Category.Letter, "S");
      this.addToList(Encoding.LetterT, Category.Letter, "T");
      this.addToList(Encoding.LetterU, Category.Letter, "U");
      this.addToList(Encoding.LetterV, Category.Letter, "V");
      this.addToList(Encoding.LetterW, Category.Letter, "W");
      this.addToList(Encoding.LetterX, Category.Letter, "X");
      this.addToList(Encoding.LetterY, Category.Letter, "Y");
      this.addToList(Encoding.LetterZ, Category.Letter, "Z");

      this.addToList(Encoding.Number0, Category.Number, "0");
      this.addToList(Encoding.Number1, Category.Number, "1");
      this.addToList(Encoding.Number2, Category.Number, "2");
      this.addToList(Encoding.Number3, Category.Number, "3");
      this.addToList(Encoding.Number4, Category.Number, "4");
      this.addToList(Encoding.Number5, Category.Number, "5");
      this.addToList(Encoding.Number6, Category.Number, "6");
      this.addToList(Encoding.Number7, Category.Number, "7");
      this.addToList(Encoding.Number8, Category.Number, "8");
      this.addToList(Encoding.Number9, Category.Number, "9");

      this.addToList(Encoding.FormattingNumber, Category.Formatting, "#");
      this.addToList(Encoding.FormattingCapital, Category.Formatting, "^");

      this.addToList(Encoding.PunctuationComma, Category.Punctuation, ",");
      this.addToList(Encoding.PunctuationSemicolon, Category.Punctuation, ";");
      this.addToList(Encoding.PunctuationApostrophe, Category.Punctuation, "'");
      this.addToList(Encoding.PunctuationColon, Category.Punctuation, ":");
      this.addToList(Encoding.PunctuationHyphen, Category.Punctuation, "-");
      this.addToList(Encoding.PunctuationDecimalPoint, Category.Punctuation, ".");
      this.addToList(Encoding.PunctuationFullStop, Category.Punctuation, ".");
      this.addToList(Encoding.PunctuationExclamationPoint, Category.Punctuation, "!");
      this.addToList(Encoding.PunctuationOpenQuote, Category.Punctuation, "\"");
      this.addToList(Encoding.PunctuationQuestionMark, Category.Punctuation, "?");
      this.addToList(Encoding.PunctuationCloseQuote, Category.Punctuation, "\"");
      this.addToList(Encoding.PunctuationBracket, Category.Punctuation, "(");
      this.addToList(Encoding.PunctuationBracket, Category.Punctuation, ")");
      this.addToList(Encoding.PunctuationSlash, Category.Punctuation, "/");
    }

    public lookup(encoding: Encoding, category: Category = Category.All) {
      const result = new LookupResult();

      for (const entry of this._entries) {
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

    private addToList(encoding: Encoding, category: Category, display: string) {
      this._entries.push(new Entry(encoding, category, display));
    }
  }

  export class Character {
    private _encoding: Encoding;
    private _category: Category;
    private _lookup: LookupResult;

    constructor(encoding: Encoding = Encoding.None, category: Category = Category.All) {
      this._encoding = encoding;
      this._category = category;
      this.invalidateLookup();
    }

    get category() {
      return this._category;
    }

    set category(value: Category) {
      if (this._category !== value) {
        this._category = value;
        this.invalidateLookup();
      }
    }

    public clear() {
      this._encoding = Encoding.None;
      this.invalidateLookup();
    }

    public empty() {
      return this._encoding === Encoding.None;
    }

    public toggle(mask: Encoding) {
      this._encoding ^= mask;
      this.invalidateLookup();
    }

    public getExactMatches() {
      return this.ensureLookup().exact;
    }

    public getPotentialMatches() {
      return this.ensureLookup().partial;
    }

    public toString() {
      return this.ensureLookup().exactString;
    }

    public valueOf() {
      return this._encoding;
    }

    private ensureLookup() {
      if (!this._lookup) {
        this._lookup = Data.instance.lookup(this._encoding, this._category);
      }

      return this._lookup;
    }

    private invalidateLookup() {
      this._lookup = null;
    }
  }

  class StreamState {
    public numberMode: boolean = false;
    public previousWhitespace: boolean = true;
  }

  export class Stream {
    private readonly _chars: number[] = [];
    private readonly _state: StreamState = new StreamState();
    private _currentStr: string;
    private _processPosition: number;

    constructor() {
      this.invalidate();
    }

    public append(ch: Character) {
      this._chars.push(ch.valueOf());
    }

    public clear() {
      this._chars.length = 0;
      this.invalidate();
    }

    public space() {
      this._chars.push(Dot.None);
    }

    public toString() {
      this.update();
      return this._currentStr;
    }

    private invalidate() {
      this._currentStr = "";
      this._processPosition = 0;
    }

    private update() {
      while (this._processPosition < this._chars.length) {
        const ch = this._chars[this._processPosition];

        switch (ch) {
          case Encoding.None:
            this._state.numberMode = false;
            this._state.previousWhitespace = true;
            this._currentStr += " ";
            break;

          case Encoding.FormattingNumber:
            this._state.numberMode = true;
            this._state.previousWhitespace = false;
            this._currentStr += "#";
            break;

          default:
            this._state.previousWhitespace = false;
            const category = Category.Punctuation | (this._state.numberMode ? Category.Number : Category.Letter);
            const exact = Data.instance.lookup(ch, category).exact;

            if (exact.length > 0) {
              this._currentStr += exact[0].toString();
            }
        }

        this._processPosition++;
      }
    }
  }
}
