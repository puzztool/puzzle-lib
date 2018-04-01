import BrailleCategory from './BrailleCategory';
import BrailleEncoding from './BrailleEncoding';
import BrailleEntry from './BrailleEntry';
import BrailleLookupResult from './BrailleLookupResult';

class BrailleData {
  public static readonly instance: BrailleData = new BrailleData();
  private readonly _entries: BrailleEntry[] = [];

  constructor() {
    this.addToList(BrailleEncoding.LetterA, BrailleCategory.Letter, 'A');
    this.addToList(BrailleEncoding.LetterB, BrailleCategory.Letter, 'B');
    this.addToList(BrailleEncoding.LetterC, BrailleCategory.Letter, 'C');
    this.addToList(BrailleEncoding.LetterD, BrailleCategory.Letter, 'D');
    this.addToList(BrailleEncoding.LetterE, BrailleCategory.Letter, 'E');
    this.addToList(BrailleEncoding.LetterF, BrailleCategory.Letter, 'F');
    this.addToList(BrailleEncoding.LetterG, BrailleCategory.Letter, 'G');
    this.addToList(BrailleEncoding.LetterH, BrailleCategory.Letter, 'H');
    this.addToList(BrailleEncoding.LetterI, BrailleCategory.Letter, 'I');
    this.addToList(BrailleEncoding.LetterJ, BrailleCategory.Letter, 'J');
    this.addToList(BrailleEncoding.LetterK, BrailleCategory.Letter, 'K');
    this.addToList(BrailleEncoding.LetterL, BrailleCategory.Letter, 'L');
    this.addToList(BrailleEncoding.LetterM, BrailleCategory.Letter, 'M');
    this.addToList(BrailleEncoding.LetterN, BrailleCategory.Letter, 'N');
    this.addToList(BrailleEncoding.LetterO, BrailleCategory.Letter, 'O');
    this.addToList(BrailleEncoding.LetterP, BrailleCategory.Letter, 'P');
    this.addToList(BrailleEncoding.LetterQ, BrailleCategory.Letter, 'Q');
    this.addToList(BrailleEncoding.LetterR, BrailleCategory.Letter, 'R');
    this.addToList(BrailleEncoding.LetterS, BrailleCategory.Letter, 'S');
    this.addToList(BrailleEncoding.LetterT, BrailleCategory.Letter, 'T');
    this.addToList(BrailleEncoding.LetterU, BrailleCategory.Letter, 'U');
    this.addToList(BrailleEncoding.LetterV, BrailleCategory.Letter, 'V');
    this.addToList(BrailleEncoding.LetterW, BrailleCategory.Letter, 'W');
    this.addToList(BrailleEncoding.LetterX, BrailleCategory.Letter, 'X');
    this.addToList(BrailleEncoding.LetterY, BrailleCategory.Letter, 'Y');
    this.addToList(BrailleEncoding.LetterZ, BrailleCategory.Letter, 'Z');

    this.addToList(BrailleEncoding.Number0, BrailleCategory.Number, '0');
    this.addToList(BrailleEncoding.Number1, BrailleCategory.Number, '1');
    this.addToList(BrailleEncoding.Number2, BrailleCategory.Number, '2');
    this.addToList(BrailleEncoding.Number3, BrailleCategory.Number, '3');
    this.addToList(BrailleEncoding.Number4, BrailleCategory.Number, '4');
    this.addToList(BrailleEncoding.Number5, BrailleCategory.Number, '5');
    this.addToList(BrailleEncoding.Number6, BrailleCategory.Number, '6');
    this.addToList(BrailleEncoding.Number7, BrailleCategory.Number, '7');
    this.addToList(BrailleEncoding.Number8, BrailleCategory.Number, '8');
    this.addToList(BrailleEncoding.Number9, BrailleCategory.Number, '9');

    this.addToList(BrailleEncoding.FormattingNumber, BrailleCategory.Formatting, '#');
    this.addToList(BrailleEncoding.FormattingCapital, BrailleCategory.Formatting, '^');

    this.addToList(BrailleEncoding.PunctuationComma, BrailleCategory.Punctuation, ',');
    this.addToList(BrailleEncoding.PunctuationSemicolon, BrailleCategory.Punctuation, ';');
    this.addToList(BrailleEncoding.PunctuationApostrophe, BrailleCategory.Punctuation, "'");
    this.addToList(BrailleEncoding.PunctuationColon, BrailleCategory.Punctuation, ':');
    this.addToList(BrailleEncoding.PunctuationHyphen, BrailleCategory.Punctuation, '-');
    this.addToList(BrailleEncoding.PunctuationDecimalPoint, BrailleCategory.Punctuation, '.');
    this.addToList(BrailleEncoding.PunctuationFullStop, BrailleCategory.Punctuation, '.');
    this.addToList(BrailleEncoding.PunctuationExclamationPoint, BrailleCategory.Punctuation, '!');
    this.addToList(BrailleEncoding.PunctuationOpenQuote, BrailleCategory.Punctuation, '"');
    this.addToList(BrailleEncoding.PunctuationQuestionMark, BrailleCategory.Punctuation, '?');
    this.addToList(BrailleEncoding.PunctuationCloseQuote, BrailleCategory.Punctuation, '"');
    this.addToList(BrailleEncoding.PunctuationBracket, BrailleCategory.Punctuation, '(');
    this.addToList(BrailleEncoding.PunctuationBracket, BrailleCategory.Punctuation, ')');
    this.addToList(BrailleEncoding.PunctuationSlash, BrailleCategory.Punctuation, '/');
  }

  public lookup(encoding: BrailleEncoding, category: BrailleCategory = BrailleCategory.All) {
    const result = new BrailleLookupResult();

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

  private addToList(encoding: BrailleEncoding, category: BrailleCategory, display: string) {
    this._entries.push(new BrailleEntry(encoding, category, display));
  }
}

export default BrailleData;
