import EncodingCategory from '../Common/EncodingCategory';
import SemaphoreCharacter from './SemaphoreCharacter';
import SemaphoreData from './SemaphoreData';
import SemaphoreEncoding from './SemaphoreEncoding';

interface ISemaphoreStreamState {
  numberMode: boolean;
}

class SemaphoreStream {
  private readonly _chars: SemaphoreEncoding[] = [];
  private readonly _state: ISemaphoreStreamState;
  private _currentStr: string;
  private _processPosition: number;

  constructor() {
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

  public append(ch: SemaphoreCharacter) {
    this._chars.push(ch.valueOf());
  }

  public clear() {
    this._chars.length = 0;
    this.invalidate();
  }

  public space() {
    this._chars.push(SemaphoreEncoding.None);
  }

  public toString() {
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

      switch (ch) {
        case SemaphoreEncoding.None:
          this._state.numberMode = false;
          this._currentStr += ' ';
          break;

        case SemaphoreEncoding.FormattingNumber:
          this._state.numberMode = true;
          this._currentStr += '#';
          break;

        default:
          const category = EncodingCategory.Punctuation |
              (this._state.numberMode ? EncodingCategory.Number : EncodingCategory.Letter);
          const exact = SemaphoreData.instance.lookup(ch, category).exact;

          if (exact.length > 0) {
            this._currentStr += exact[0].toString();
          }
      }

      this._processPosition++;
    }
  }
}

export default SemaphoreStream;
