import { BrailleCharacter } from "./BrailleCharacter";
import { BrailleData } from "./BrailleData";
import { BrailleCategory, BrailleDot, BrailleEncoding } from "./BrailleEnums";

interface IBrailleStreamState {
  numberMode: boolean;
  previousWhitespace: boolean;
}

export class BrailleStream {
  private readonly _chars: number[] = [];
  private readonly _state: IBrailleStreamState;
  private _currentStr: string;
  private _processPosition: number;

  constructor() {
    this._state = {
      numberMode: false,
      previousWhitespace: true,
    };

    this.invalidate();
  }

  public append(ch: BrailleCharacter) {
    this._chars.push(ch.valueOf());
  }

  public clear() {
    this._chars.length = 0;
    this.invalidate();
  }

  public space() {
    this._chars.push(BrailleDot.None);
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
        case BrailleEncoding.None:
          this._state.numberMode = false;
          this._state.previousWhitespace = true;
          this._currentStr += " ";
          break;

        case BrailleEncoding.FormattingNumber:
          this._state.numberMode = true;
          this._state.previousWhitespace = false;
          this._currentStr += "#";
          break;

        default:
          this._state.previousWhitespace = false;
          const category = BrailleCategory.Punctuation |
              (this._state.numberMode ? BrailleCategory.Number : BrailleCategory.Letter);
          const exact = BrailleData.instance.lookup(ch, category).exact;

          if (exact.length > 0) {
            this._currentStr += exact[0].toString();
          }
      }

      this._processPosition++;
    }
  }
}
