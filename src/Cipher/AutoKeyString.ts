import CaesarUtils from './CaesarUtils';

class AutoKeyString {
  private _text: string;
  private _key: string;

  constructor(text: string = '', key: string = '') {
    this._text = text;
    this._key = key;
  }

  get text() {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get key() {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  public encrypt() {
    return this.convert();
  }

  public decrypt() {
    return this.convert(true);
  }

  private convert(decrypt: boolean = false) {
    if (this._key.length < 1) {
      return this._text;
    } else {
      const rotStr = [];
      let keyIndex = 0;
      let fullKey = this._key;

      for (const ch of this._text) {
        if (CaesarUtils.isAlpha(ch)) {
          const currentLetter = CaesarUtils.rotateLetterWithKey(ch, fullKey, keyIndex++, decrypt);
          rotStr.push(currentLetter);
          if (decrypt) {
            fullKey += currentLetter;
          } else {
            fullKey += ch;
          }
        } else {
          rotStr.push(ch);
        }
      }

      return rotStr.join('');
    }
  }
}

export default AutoKeyString;
