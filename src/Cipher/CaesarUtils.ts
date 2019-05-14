import { CharacterConversion } from '../Conversion/CharacterConversion';

export class CaesarUtils {
  static rotateLetter(ch: string, rot: number) {
    if (ch.length !== 1) {
      throw new Error('Expected a single character');
    }

    rot %= this.alphaLength;
    if (rot < 0) {
      rot += this.alphaLength;
    }

    const code = ch.charCodeAt(0);
    let base = 0;
    if (this.isLowerAlpha(code)) {
      base = this.lowerA;
    } else if (this.isUpperAlpha(code)) {
      base = this.upperA;
    } else {
      return ch;
    }

    return String.fromCharCode(((code - base + rot) % this.alphaLength) + base);
  }

  static rotateLetterWithKey(
    ch: string,
    key: string,
    keyIndex: number,
    decrypt = false
  ) {
    if (key.length === 0) {
      return ch;
    }

    const keyCh = this.getCharacterWithMod(key, keyIndex);
    let rot = CharacterConversion.toOrdinal(keyCh) - 1;

    if (decrypt) {
      rot = -rot;
    }

    return this.rotateLetter(ch, rot);
  }

  static isAlpha(ch: string) {
    const code = ch.charCodeAt(0);
    return this.isUpperAlpha(code) || this.isLowerAlpha(code);
  }

  private static upperA: number = 'A'.charCodeAt(0);
  private static upperZ: number = 'Z'.charCodeAt(0);
  private static lowerA: number = 'a'.charCodeAt(0);
  private static lowerZ: number = 'z'.charCodeAt(0);
  private static alphaLength = 26;

  private static getCharacterWithMod(str: string, index: number) {
    return str.charAt(index % str.length);
  }

  private static isUpperAlpha(code: number) {
    return code >= this.upperA && code <= this.upperZ;
  }

  private static isLowerAlpha(code: number) {
    return code >= this.lowerA && code <= this.lowerZ;
  }
}
