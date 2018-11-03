import {EncodingCategory} from '../Common/EncodingCategory';
import {BrailleCharacter} from './BrailleCharacter';
import {BrailleData} from './BrailleData';
import {BrailleEncoding} from './BrailleEncoding';

export class BrailleStream {
  private readonly _chars: BrailleEncoding[] = [];
  private _currentStr = '';
  private _processPosition = 0;
  private _numberMode = false;

  constructor() {
    this.invalidate();
  }

  get chars() {
    return this._chars;
  }

  set chars(value: BrailleEncoding[]) {
    this.clear();

    for (const ch of value) {
      this._chars.push(ch);
    }
  }

  append(ch: BrailleCharacter) {
    this._chars.push(ch.valueOf());
  }

  clear() {
    this._chars.length = 0;
    this.invalidate();
  }

  backspace() {
    this._chars.pop();
    this.invalidate();
  }

  space() {
    this._chars.push(BrailleEncoding.None);
  }

  toString() {
    this.update();
    return this._currentStr;
  }

  private invalidate() {
    this._currentStr = '';
    this._processPosition = 0;
    this._numberMode = false;
  }

  private update() {
    while (this._processPosition < this._chars.length) {
      const ch = this._chars[this._processPosition];

      switch (ch) {
        case BrailleEncoding.None:
          this._numberMode = false;
          this._currentStr += ' ';
          break;

        case BrailleEncoding.FormattingNumber:
          this._numberMode = true;
          this._currentStr += '#';
          break;

        default:
          const category =
              EncodingCategory.Punctuation | (this._numberMode ? EncodingCategory.Number : EncodingCategory.Letter);
          const exact = BrailleData.instance.lookup(ch, category).exact;

          if (exact.length > 0) {
            this._currentStr += exact[0].toString();
          }
      }

      this._processPosition++;
    }
  }
}
