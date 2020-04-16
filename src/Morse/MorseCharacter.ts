import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingCharacterBase} from '../Common/EncodingCharacterBase';
import {Helpers} from '../Common/Helpers';
import {MorseData} from './MorseData';
import {MorseEncoding} from './MorseEncoding';

const MORSE_BITMASK = MorseEncoding.Dot | MorseEncoding.Dash;

export class MorseCharacter extends EncodingCharacterBase<MorseEncoding> {
  static readonly DOT: string = '.';
  static readonly DASH: string = '-';
  // Character which may not appear in morse and is reserved for use by this class
  static readonly RESERVED_DIVIDER: string = 'A';

  static toMorseString(encoding: MorseEncoding) {
    let morseChars = '';

    while (encoding !== MorseEncoding.None) {
      if ((encoding & MORSE_BITMASK) === MorseEncoding.Dot) {
        morseChars += MorseCharacter.DOT;
      } else if ((encoding & MORSE_BITMASK) === MorseEncoding.Dash) {
        morseChars += MorseCharacter.DASH;
      } else {
        throw new Error('Invalid morse bits');
      }

      encoding >>>= 2;
    }

    return morseChars;
  }

  static parseMorseString(morse: string): MorseEncoding {
    let bits = MorseEncoding.None;

    for (let i = morse.length - 1; i >= 0; i--) {
      const ch = morse[i];
      if (ch === MorseCharacter.DOT) {
        bits |= MorseEncoding.Dot;
      } else if (ch === MorseCharacter.DASH) {
        bits |= MorseEncoding.Dash;
      } else {
        throw new Error('Invalid morse character');
      }

      bits <<= 2;
    }

    bits >>>= 2;
    return bits;
  }

  private _morse: string;

  constructor(str = '', category: EncodingCategory = EncodingCategory.All) {
    super(MorseData.instance, category);

    this._morse = str;
  }

  get morseString() {
    return this._morse;
  }

  set morseString(value: string) {
    this._morse = value;
    this.invalidateLookup();
  }

  backspace() {
    if (this._morse.length > 0) {
      this._morse = this._morse.substring(0, this._morse.length - 1);
      this.invalidateLookup();
    }
  }

  dot() {
    this._morse += MorseCharacter.DOT;
    this.invalidateLookup();
  }

  dash() {
    this._morse += MorseCharacter.DASH;
    this.invalidateLookup();
  }

  invertDotsAndDashes() {
    // Replace dots with a placeholder, dashes with dots, then placeholders with dashes
    Helpers.assert(this._morse.indexOf(MorseCharacter.RESERVED_DIVIDER) < 0);
    this._morse = this._morse
      .replace(/\./g, 'A')
      .replace(/-/g, MorseCharacter.DOT)
      .replace(/A/g, MorseCharacter.DASH);
  }

  reverse() {
    this._morse = this._morse.split('').reverse().join('');
  }

  protected onClear() {
    this._morse = '';
    this.invalidateLookup();
  }

  protected onEmpty() {
    return this._morse.length === 0;
  }

  protected getEncoding() {
    return MorseCharacter.parseMorseString(this._morse);
  }
}
