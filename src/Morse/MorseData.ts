import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingDataBase} from '../Common/EncodingDataBase';
import {MorseEncoding} from './MorseEncoding';

export class MorseData extends EncodingDataBase<MorseEncoding> {
  static readonly instance: MorseData = new MorseData();

  constructor() {
    super();

    // Letters
    this.addToList(MorseEncoding.LetterA, EncodingCategory.Letter, 'A');
    this.addToList(MorseEncoding.LetterB, EncodingCategory.Letter, 'B');
    this.addToList(MorseEncoding.LetterC, EncodingCategory.Letter, 'C');
    this.addToList(MorseEncoding.LetterD, EncodingCategory.Letter, 'D');
    this.addToList(MorseEncoding.LetterE, EncodingCategory.Letter, 'E');
    this.addToList(MorseEncoding.LetterF, EncodingCategory.Letter, 'F');
    this.addToList(MorseEncoding.LetterG, EncodingCategory.Letter, 'G');
    this.addToList(MorseEncoding.LetterH, EncodingCategory.Letter, 'H');
    this.addToList(MorseEncoding.LetterI, EncodingCategory.Letter, 'I');
    this.addToList(MorseEncoding.LetterJ, EncodingCategory.Letter, 'J');
    this.addToList(MorseEncoding.LetterK, EncodingCategory.Letter, 'K');
    this.addToList(MorseEncoding.LetterL, EncodingCategory.Letter, 'L');
    this.addToList(MorseEncoding.LetterM, EncodingCategory.Letter, 'M');
    this.addToList(MorseEncoding.LetterN, EncodingCategory.Letter, 'N');
    this.addToList(MorseEncoding.LetterO, EncodingCategory.Letter, 'O');
    this.addToList(MorseEncoding.LetterP, EncodingCategory.Letter, 'P');
    this.addToList(MorseEncoding.LetterQ, EncodingCategory.Letter, 'Q');
    this.addToList(MorseEncoding.LetterR, EncodingCategory.Letter, 'R');
    this.addToList(MorseEncoding.LetterS, EncodingCategory.Letter, 'S');
    this.addToList(MorseEncoding.LetterT, EncodingCategory.Letter, 'T');
    this.addToList(MorseEncoding.LetterU, EncodingCategory.Letter, 'U');
    this.addToList(MorseEncoding.LetterV, EncodingCategory.Letter, 'V');
    this.addToList(MorseEncoding.LetterW, EncodingCategory.Letter, 'W');
    this.addToList(MorseEncoding.LetterX, EncodingCategory.Letter, 'X');
    this.addToList(MorseEncoding.LetterY, EncodingCategory.Letter, 'Y');
    this.addToList(MorseEncoding.LetterZ, EncodingCategory.Letter, 'Z');

    // Numbers
    this.addToList(MorseEncoding.Number0, EncodingCategory.Number, '0');
    this.addToList(MorseEncoding.Number1, EncodingCategory.Number, '1');
    this.addToList(MorseEncoding.Number2, EncodingCategory.Number, '2');
    this.addToList(MorseEncoding.Number3, EncodingCategory.Number, '3');
    this.addToList(MorseEncoding.Number4, EncodingCategory.Number, '4');
    this.addToList(MorseEncoding.Number5, EncodingCategory.Number, '5');
    this.addToList(MorseEncoding.Number6, EncodingCategory.Number, '6');
    this.addToList(MorseEncoding.Number7, EncodingCategory.Number, '7');
    this.addToList(MorseEncoding.Number8, EncodingCategory.Number, '8');
    this.addToList(MorseEncoding.Number9, EncodingCategory.Number, '9');

    // Punctuation
    this.addToList(
      MorseEncoding.PunctuationPeriod,
      EncodingCategory.Punctuation,
      '.'
    );
    this.addToList(
      MorseEncoding.PunctuationComma,
      EncodingCategory.Punctuation,
      ','
    );
    this.addToList(
      MorseEncoding.PunctuationQuestionMark,
      EncodingCategory.Punctuation,
      '?'
    );
    this.addToList(
      MorseEncoding.PunctuationApostrophe,
      EncodingCategory.Punctuation,
      "'"
    );
    this.addToList(
      MorseEncoding.PunctuationExclamationPoint,
      EncodingCategory.Punctuation,
      '!'
    );
    this.addToList(
      MorseEncoding.PunctuationForwardSlash,
      EncodingCategory.Punctuation,
      '/'
    );
    this.addToList(
      MorseEncoding.PunctuationOpenParenthesis,
      EncodingCategory.Punctuation,
      '('
    );
    this.addToList(
      MorseEncoding.PunctuationCloseParenthesis,
      EncodingCategory.Punctuation,
      ')'
    );
    this.addToList(
      MorseEncoding.PunctuationAmpersand,
      EncodingCategory.Punctuation,
      '&'
    );
    this.addToList(
      MorseEncoding.PunctuationColon,
      EncodingCategory.Punctuation,
      ':'
    );
    this.addToList(
      MorseEncoding.PunctuationSemicolon,
      EncodingCategory.Punctuation,
      ';'
    );
    this.addToList(
      MorseEncoding.PunctuationDoubleDash,
      EncodingCategory.Punctuation,
      '='
    );
    this.addToList(
      MorseEncoding.PunctuationPlusSign,
      EncodingCategory.Punctuation,
      '+'
    );
    this.addToList(
      MorseEncoding.PunctuationHyphen,
      EncodingCategory.Punctuation,
      '-'
    );
    this.addToList(
      MorseEncoding.PunctuationUnderscore,
      EncodingCategory.Punctuation,
      '_'
    );
    this.addToList(
      MorseEncoding.PunctuationQuotationMark,
      EncodingCategory.Punctuation,
      '"'
    );
    this.addToList(
      MorseEncoding.PunctuationDollarSign,
      EncodingCategory.Punctuation,
      '$'
    );
    this.addToList(
      MorseEncoding.PunctuationAtSign,
      EncodingCategory.Punctuation,
      '@'
    );
  }
}
