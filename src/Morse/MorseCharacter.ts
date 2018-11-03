import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingCharacterBase} from '../Common/EncodingCharacterBase';
import {MorseData} from './MorseData';
import {MorseEncoding} from './MorseEncoding';

const MORSE_BITMASK = MorseEncoding.Dot | MorseEncoding.Dash;

export class MorseCharacter extends EncodingCharacterBase<MorseEncoding> {
  static toMorseString(encoding: MorseEncoding) {
    let morseChars = '';

    while (encoding !== MorseEncoding.None) {
      if ((encoding & MORSE_BITMASK) === MorseEncoding.Dot) {
        morseChars += '.';
      } else if ((encoding & MORSE_BITMASK) === MorseEncoding.Dash) {
        morseChars += '-';
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
      if (ch === '.') {
        bits |= MorseEncoding.Dot;
      } else if (ch === '-') {
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
    this._morse += '.';
    this.invalidateLookup();
  }

  dash() {
    this._morse += '-';
    this.invalidateLookup();
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
