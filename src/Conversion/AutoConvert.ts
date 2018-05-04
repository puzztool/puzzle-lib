import Encoding from './Encoding';

class AutoConvert {
  // Forced encoding can be useful when converting an entire string
  // or simply dealing with binary which has no leading zeros
  public static convertCharacter(input: string, forcedEncoding?: Encoding) {
    let encoding = null;
    if (!forcedEncoding) {
      encoding = this.determineCharacterEncoding(input);
    } else {
      encoding = forcedEncoding;
    }

    // Assume that Latin characters should remain
    if (encoding === Encoding.Latin) {
      return input;
    }

    const baseTen = parseInt(input, 10);
    if (encoding === Encoding.Ascii) {
      return String.fromCharCode(baseTen);
    }
    const asciiOffset = 64;
    if (encoding === Encoding.Ordinal) {
      return String.fromCharCode(baseTen + asciiOffset);
    }

    const binary = parseInt(input, 2);
    if (encoding === Encoding.FiveBitBinary) {
      return String.fromCharCode(binary + asciiOffset);
    }
    if (encoding === Encoding.EightBitBinary) {
      return String.fromCharCode(binary);
    }

    return '?';
  }

  public static determineCharacterEncoding(input: string) {
    const lower = input.toLowerCase();
    if (lower.match(/[a-z]/i)) {
      return Encoding.Latin;
    }

    const numeric = parseInt(input, 10);
    if (numeric > 0 && numeric < 27) {
      return Encoding.Ordinal;
    } else if (numeric > 64 && numeric < 123) {
      return Encoding.Ascii;
    }

    // Just contains ones and zeros?
    let isBinary = true;
    for (const letter of input) {
      if (letter !== '0' && letter !== '1') {
        isBinary = false;
      }
    }

    if (isBinary) {
      if (input.length === 5) {
        return Encoding.FiveBitBinary;
      } else if (input.length === 8) {
        return Encoding.EightBitBinary;
      }
    }

    return Encoding.None;
  }

}

export default AutoConvert;
