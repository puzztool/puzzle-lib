import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingDataBase} from '../Common/EncodingDataBase';
import {BrailleEncoding} from './BrailleEncoding';

export class BrailleData extends EncodingDataBase<BrailleEncoding> {
  static readonly instance: BrailleData = new BrailleData();

  constructor() {
    super();

    this.addToList(BrailleEncoding.LetterA, EncodingCategory.Letter, 'A');
    this.addToList(BrailleEncoding.LetterB, EncodingCategory.Letter, 'B');
    this.addToList(BrailleEncoding.LetterC, EncodingCategory.Letter, 'C');
    this.addToList(BrailleEncoding.LetterD, EncodingCategory.Letter, 'D');
    this.addToList(BrailleEncoding.LetterE, EncodingCategory.Letter, 'E');
    this.addToList(BrailleEncoding.LetterF, EncodingCategory.Letter, 'F');
    this.addToList(BrailleEncoding.LetterG, EncodingCategory.Letter, 'G');
    this.addToList(BrailleEncoding.LetterH, EncodingCategory.Letter, 'H');
    this.addToList(BrailleEncoding.LetterI, EncodingCategory.Letter, 'I');
    this.addToList(BrailleEncoding.LetterJ, EncodingCategory.Letter, 'J');
    this.addToList(BrailleEncoding.LetterK, EncodingCategory.Letter, 'K');
    this.addToList(BrailleEncoding.LetterL, EncodingCategory.Letter, 'L');
    this.addToList(BrailleEncoding.LetterM, EncodingCategory.Letter, 'M');
    this.addToList(BrailleEncoding.LetterN, EncodingCategory.Letter, 'N');
    this.addToList(BrailleEncoding.LetterO, EncodingCategory.Letter, 'O');
    this.addToList(BrailleEncoding.LetterP, EncodingCategory.Letter, 'P');
    this.addToList(BrailleEncoding.LetterQ, EncodingCategory.Letter, 'Q');
    this.addToList(BrailleEncoding.LetterR, EncodingCategory.Letter, 'R');
    this.addToList(BrailleEncoding.LetterS, EncodingCategory.Letter, 'S');
    this.addToList(BrailleEncoding.LetterT, EncodingCategory.Letter, 'T');
    this.addToList(BrailleEncoding.LetterU, EncodingCategory.Letter, 'U');
    this.addToList(BrailleEncoding.LetterV, EncodingCategory.Letter, 'V');
    this.addToList(BrailleEncoding.LetterW, EncodingCategory.Letter, 'W');
    this.addToList(BrailleEncoding.LetterX, EncodingCategory.Letter, 'X');
    this.addToList(BrailleEncoding.LetterY, EncodingCategory.Letter, 'Y');
    this.addToList(BrailleEncoding.LetterZ, EncodingCategory.Letter, 'Z');

    this.addToList(BrailleEncoding.Number0, EncodingCategory.Number, '0');
    this.addToList(BrailleEncoding.Number1, EncodingCategory.Number, '1');
    this.addToList(BrailleEncoding.Number2, EncodingCategory.Number, '2');
    this.addToList(BrailleEncoding.Number3, EncodingCategory.Number, '3');
    this.addToList(BrailleEncoding.Number4, EncodingCategory.Number, '4');
    this.addToList(BrailleEncoding.Number5, EncodingCategory.Number, '5');
    this.addToList(BrailleEncoding.Number6, EncodingCategory.Number, '6');
    this.addToList(BrailleEncoding.Number7, EncodingCategory.Number, '7');
    this.addToList(BrailleEncoding.Number8, EncodingCategory.Number, '8');
    this.addToList(BrailleEncoding.Number9, EncodingCategory.Number, '9');

    this.addToList(BrailleEncoding.FormattingNumber, EncodingCategory.Formatting, '#');
    this.addToList(BrailleEncoding.FormattingCapital, EncodingCategory.Formatting, '^');

    this.addToList(BrailleEncoding.PunctuationComma, EncodingCategory.Punctuation, ',');
    this.addToList(BrailleEncoding.PunctuationSemicolon, EncodingCategory.Punctuation, ';');
    this.addToList(BrailleEncoding.PunctuationApostrophe, EncodingCategory.Punctuation, '\'');
    this.addToList(BrailleEncoding.PunctuationColon, EncodingCategory.Punctuation, ':');
    this.addToList(BrailleEncoding.PunctuationHyphen, EncodingCategory.Punctuation, '-');
    this.addToList(BrailleEncoding.PunctuationDecimalPoint, EncodingCategory.Punctuation, '.');
    this.addToList(BrailleEncoding.PunctuationFullStop, EncodingCategory.Punctuation, '.');
    this.addToList(BrailleEncoding.PunctuationExclamationPoint, EncodingCategory.Punctuation, '!');
    this.addToList(BrailleEncoding.PunctuationOpenQuote, EncodingCategory.Punctuation, '"');
    this.addToList(BrailleEncoding.PunctuationQuestionMark, EncodingCategory.Punctuation, '?');
    this.addToList(BrailleEncoding.PunctuationCloseQuote, EncodingCategory.Punctuation, '"');
    this.addToList(BrailleEncoding.PunctuationBracket, EncodingCategory.Punctuation, '(');
    this.addToList(BrailleEncoding.PunctuationBracket, EncodingCategory.Punctuation, ')');
    this.addToList(BrailleEncoding.PunctuationSlash, EncodingCategory.Punctuation, '/');
  }
}
