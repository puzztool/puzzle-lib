import CharacterEncoding from './CharacterEncoding';

class CharacterAutoConvert {
  // Forced encoding can be useful when converting an entire string
  // or simply dealing with binary which has no leading zeros
  public static convertCharacter(input: string, forcedCharacterEncoding?: CharacterEncoding) {
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

    const baseTen = parseInt(input, 10);
    if (encoding === CharacterEncoding.Ascii) {
      return String.fromCharCode(baseTen);
    }
    const asciiOffset = 64;
    if (encoding === CharacterEncoding.Ordinal) {
      return String.fromCharCode(baseTen + asciiOffset);
    }

    const binary = parseInt(input, 2);
    if (encoding === CharacterEncoding.FiveBitBinary && this.appearsBinary(input)) {
      return String.fromCharCode(binary + asciiOffset);
    }
    if (encoding === CharacterEncoding.EightBitBinary && this.appearsBinary(input)) {
      return String.fromCharCode(binary);
    }

    return '';
  }

  public static determineCharacterEncoding(input: string) {
    if (input.match(/[a-z]/i)) {
      return CharacterEncoding.Latin;
    }

    const numeric = parseInt(input, 10);

    if (this.appearsBinary(input)) {
      if (input.length === 5) {
        return CharacterEncoding.FiveBitBinary;
      } else if (input.length === 8) {
        return CharacterEncoding.EightBitBinary;
      }
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

  private static appearsBinary(character: string) {
    for (const letter of character) {
      if (letter !== '0' && letter !== '1') {
        return false;
      }
    }
    return true;
  }

}

export default CharacterAutoConvert;
