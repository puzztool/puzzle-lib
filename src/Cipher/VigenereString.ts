import { CaesarUtils } from './CaesarUtils';
import { KeyedCipherStringBase } from './KeyedCipherStringBase';

export class VigenereString extends KeyedCipherStringBase {
  protected convert(decrypt: boolean) {
    const rotStr = [];
    let keyIndex = 0;

    for (const ch of this._text) {
      if (CaesarUtils.isAlpha(ch)) {
        rotStr.push(
          CaesarUtils.rotateLetterWithKey(ch, this._key, keyIndex++, decrypt)
        );
      } else {
        rotStr.push(ch);
      }
    }

    return rotStr.join('');
  }
}
