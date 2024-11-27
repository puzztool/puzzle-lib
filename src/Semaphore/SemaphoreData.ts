import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingDataBase} from '../Common/EncodingDataBase';
import {SemaphoreEncoding} from './SemaphoreEncoding';

export class SemaphoreData extends EncodingDataBase<SemaphoreEncoding> {
  static readonly instance: SemaphoreData = new SemaphoreData();

  constructor() {
    super();

    // Letters
    this.addToList(SemaphoreEncoding.LetterA, EncodingCategory.Letter, 'A');
    this.addToList(SemaphoreEncoding.LetterB, EncodingCategory.Letter, 'B');
    this.addToList(SemaphoreEncoding.LetterC, EncodingCategory.Letter, 'C');
    this.addToList(SemaphoreEncoding.LetterD, EncodingCategory.Letter, 'D');
    this.addToList(SemaphoreEncoding.LetterE, EncodingCategory.Letter, 'E');
    this.addToList(SemaphoreEncoding.LetterF, EncodingCategory.Letter, 'F');
    this.addToList(SemaphoreEncoding.LetterG, EncodingCategory.Letter, 'G');
    this.addToList(SemaphoreEncoding.LetterH, EncodingCategory.Letter, 'H');
    this.addToList(SemaphoreEncoding.LetterI, EncodingCategory.Letter, 'I');
    this.addToList(SemaphoreEncoding.LetterJ, EncodingCategory.Letter, 'J');
    this.addToList(SemaphoreEncoding.LetterK, EncodingCategory.Letter, 'K');
    this.addToList(SemaphoreEncoding.LetterL, EncodingCategory.Letter, 'L');
    this.addToList(SemaphoreEncoding.LetterM, EncodingCategory.Letter, 'M');
    this.addToList(SemaphoreEncoding.LetterN, EncodingCategory.Letter, 'N');
    this.addToList(SemaphoreEncoding.LetterO, EncodingCategory.Letter, 'O');
    this.addToList(SemaphoreEncoding.LetterP, EncodingCategory.Letter, 'P');
    this.addToList(SemaphoreEncoding.LetterQ, EncodingCategory.Letter, 'Q');
    this.addToList(SemaphoreEncoding.LetterR, EncodingCategory.Letter, 'R');
    this.addToList(SemaphoreEncoding.LetterS, EncodingCategory.Letter, 'S');
    this.addToList(SemaphoreEncoding.LetterT, EncodingCategory.Letter, 'T');
    this.addToList(SemaphoreEncoding.LetterU, EncodingCategory.Letter, 'U');
    this.addToList(SemaphoreEncoding.LetterV, EncodingCategory.Letter, 'V');
    this.addToList(SemaphoreEncoding.LetterW, EncodingCategory.Letter, 'W');
    this.addToList(SemaphoreEncoding.LetterX, EncodingCategory.Letter, 'X');
    this.addToList(SemaphoreEncoding.LetterY, EncodingCategory.Letter, 'Y');
    this.addToList(SemaphoreEncoding.LetterZ, EncodingCategory.Letter, 'Z');

    // Numbers
    this.addToList(SemaphoreEncoding.Number1, EncodingCategory.Number, '1');
    this.addToList(SemaphoreEncoding.Number2, EncodingCategory.Number, '2');
    this.addToList(SemaphoreEncoding.Number3, EncodingCategory.Number, '3');
    this.addToList(SemaphoreEncoding.Number4, EncodingCategory.Number, '4');
    this.addToList(SemaphoreEncoding.Number5, EncodingCategory.Number, '5');
    this.addToList(SemaphoreEncoding.Number6, EncodingCategory.Number, '6');
    this.addToList(SemaphoreEncoding.Number7, EncodingCategory.Number, '7');
    this.addToList(SemaphoreEncoding.Number8, EncodingCategory.Number, '8');
    this.addToList(SemaphoreEncoding.Number9, EncodingCategory.Number, '9');
    this.addToList(SemaphoreEncoding.Number0, EncodingCategory.Number, '0');

    // Formatting
    this.addToList(
      SemaphoreEncoding.FormattingNumber,
      EncodingCategory.Formatting,
      '#',
    );
  }
}
