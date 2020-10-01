import {CharacterEncoding} from './CharacterEncoding';

export class CharacterAutoConvert {
  // Forced encoding can be useful when converting an entire string
  // or simply dealing with binary which has no leading zeros
  static convertCharacter(
    input: string,
    forcedCharacterEncoding?: CharacterEncoding
  ) {
    let encoding = null;
    if (!forcedCharacterEncoding) {
      encoding = this.determineCharacterEncoding(input);
    } else {
      encoding = forcedCharacterEncoding;
    }

    if (encoding === CharacterEncoding.None) {
      return '';
    }

    // Assume that Latin characters should remain
    if (encoding === CharacterEncoding.Latin) {
      return input;
    }

    const baseTen = Number.parseInt(input, 10);
    if (encoding === CharacterEncoding.Ascii) {
      return CharacterAutoConvert.asciiPrintable(baseTen);
    }
    const asciiOffset = 64;
    if (encoding === CharacterEncoding.Ordinal) {
      return CharacterAutoConvert.asciiPrintable(baseTen + asciiOffset);
    }

    const binary = Number.parseInt(input, 2);
    if (
      encoding === CharacterEncoding.FiveBitBinary &&
      this.appearsBinary(input)
    ) {
      return CharacterAutoConvert.asciiPrintable(binary + asciiOffset);
    }
    if (
      encoding === CharacterEncoding.EightBitBinary &&
      this.appearsBinary(input)
    ) {
      return CharacterAutoConvert.asciiPrintable(binary);
    }

    if (encoding === CharacterEncoding.Ternary) {
      const ternary = Number.parseInt(input, 3);
      return CharacterAutoConvert.asciiPrintable(ternary + asciiOffset);
    }

    return '';
  }

  static asciiPrintable(index: number) {
    if (index < 32 || index > 126) {
      return '';
    }
    return String.fromCharCode(index);
  }

  static determineCharacterEncoding(input: string) {
    if (input.match(/[a-z]/i)) {
      return CharacterEncoding.Latin;
    }

    const numeric = Number.parseInt(input, 10);

    if (this.appearsBinary(input)) {
      if (input.length === 5) {
        return CharacterEncoding.FiveBitBinary;
      } else if (input.length === 8 || input.length === 7) {
        return CharacterEncoding.EightBitBinary;
      }
    }

    if (this.appearsTernary(input)) {
      return CharacterEncoding.Ternary;
    }

    if (input.length < 3 && numeric > 0 && numeric < 27) {
      return CharacterEncoding.Ordinal;
    }

    if (numeric > 64 && numeric < 91) {
      return CharacterEncoding.Ascii;
    }
    if (numeric > 97 && numeric < 123) {
      return CharacterEncoding.Ascii;
    }

    return CharacterEncoding.None;
  }

  private static readonly BINARY_REGEX = new RegExp('^[01]+$')

  private static appearsBinary(str: string): boolean {
    return this.BINARY_REGEX.test(str);
  }

  private static readonly TERNARY_REGEX = new RegExp('^[0-2]{3}$')

  private static appearsTernary(str: string): boolean {
    return this.TERNARY_REGEX.test(str);
  }
}
