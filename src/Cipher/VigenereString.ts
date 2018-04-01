import CaesarUtils from './CaesarUtils';

class VigenereString {
  private _str: string;
  private _key: string;

  constructor(str: string = '', key: string = '') {
    this._str = str;
    this._key = key;
  }

  public encrypt() {
    return this.convert();
  }

  public decrypt() {
    return this.convert(true);
  }

  public update(str: string = '', key: string = '') {
    this._str = str;
    this._key = key;
  }

  private convert(decrypt: boolean = false) {
    const rotStr = [];
    let keyIndex = 0;

    for (const ch of this._str) {
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
