import CaesarUtils from './CaesarUtils';

class VigenereString {
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
    const rotStr = [];
    let keyIndex = 0;

    for (const ch of this._text) {
      if (CaesarUtils.isAlpha(ch)) {
        rotStr.push(CaesarUtils.rotateLetterWithKey(ch, this._key, keyIndex++, decrypt));
      } else {
        rotStr.push(ch);
      }
    }

    return rotStr.join('');
  }
}

export default VigenereString;
