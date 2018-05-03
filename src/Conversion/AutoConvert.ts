import Encoding from './Encoding';

// Attempts to automatically detect an encoding and convert it to English
class AutoConvert {

  // This method converts tries to convert a single character (ie does not tokenize)
  // Returns null if conversions failed
  // public static convertCharacter(input: string) {
  // }

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
