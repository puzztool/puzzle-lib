import {EncodingCategory} from '../Common/EncodingCategory';
import {SemaphoreCharacter} from './SemaphoreCharacter';
import {SemaphoreData} from './SemaphoreData';
import {SemaphoreEncoding} from './SemaphoreEncoding';

interface SemaphoreStreamState {
  numberMode: boolean;
}

export class SemaphoreStream {
  private readonly _chars: SemaphoreEncoding[] = [];
  private readonly _state: SemaphoreStreamState;
  private _currentStr = '';
  private _processPosition = 0;

  constructor(chars?: SemaphoreEncoding[]) {
    if (chars) {
      this._chars = Array.from(chars);
    }

    this._state = {
      numberMode: false,
    };

    this.invalidate();
  }

  get chars() {
    return this._chars;
  }

  set chars(value: SemaphoreEncoding[]) {
    this.clear();

    for (const ch of value) {
      this._chars.push(ch);
    }
  }

  append(ch: SemaphoreCharacter) {
    this._chars.push(ch.valueOf());
  }

  clear() {
    this._chars.length = 0;
    this.invalidate();
  }

  space() {
    this._chars.push(SemaphoreEncoding.None);
  }

  toString() {
    this.update();
    return this._currentStr;
  }

  private invalidate() {
    this._currentStr = '';
    this._processPosition = 0;
  }

  private update() {
    while (this._processPosition < this._chars.length) {
      const ch = this._chars[this._processPosition];

      if (ch === SemaphoreEncoding.None) {
        this._state.numberMode = false;
        this._currentStr += ' ';
      } else if (ch === SemaphoreEncoding.FormattingNumber) {
        this._state.numberMode = true;
        this._currentStr += '#';
      } else {
        const category =
          EncodingCategory.Punctuation |
          (this._state.numberMode
            ? EncodingCategory.Number
            : EncodingCategory.Letter);
        const exact = SemaphoreData.instance.lookup(ch, category).exact;

        if (exact.length > 0) {
          this._currentStr += exact[0].toString();
        }
      }

      this._processPosition++;
    }
  }
}
