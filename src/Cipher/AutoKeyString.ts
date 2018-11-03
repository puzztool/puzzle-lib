import {CaesarUtils} from './CaesarUtils';
import {KeyedCipherStringBase} from './KeyedCipherStringBase';

export class AutoKeyString extends KeyedCipherStringBase {
  protected convert(decrypt: boolean) {
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
