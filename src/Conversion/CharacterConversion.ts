import { CharacterTableEntry } from './CharacterTableEntry';

export class CharacterConversion {
  static getAsciiTable() {
    const retVal: CharacterTableEntry[] = [];
    CharacterConversion.addAsciiRange(
      retVal,
      48,
      57,
      CharacterConversion.toAscii,
      127
    );
    CharacterConversion.addAsciiRange(
      retVal,
      65,
      90,
      CharacterConversion.toAscii,
      127
    );
    CharacterConversion.addAsciiRange(
      retVal,
      97,
      122,
      CharacterConversion.toAscii,
      127
    );

    return retVal;
  }

  static getOrdinalTable() {
    const retVal: CharacterTableEntry[] = [];
    CharacterConversion.addAsciiRange(
      retVal,
      65,
      90,
      CharacterConversion.toOrdinal,
      26
    );

    return retVal;
  }

  static toAscii(ch: string) {
    if (typeof ch !== 'string' || ch.length !== 1) {
      throw new Error('A single character is required');
    }

    const ascii = ch.charCodeAt(0);
    if (ascii >= 0 && ascii <= 127) {
      return ascii;
    }

    return -1;
  }

  static toOrdinal(ch: string) {
    if (typeof ch !== 'string' || ch.length !== 1) {
      throw new Error('A single character is required');
    }

    const chCode = ch.charCodeAt(0);

    let ordinalCode = chCode - 'a'.charCodeAt(0);
    if (ordinalCode >= 0 && ordinalCode < 26) {
      return ordinalCode + 1;
    }

    ordinalCode = chCode - 'A'.charCodeAt(0);
    if (ordinalCode >= 0 && ordinalCode < 26) {
      return ordinalCode + 1;
    }

    return -1;
  }

  private static addAsciiRange(
    array: CharacterTableEntry[],
    start: number,
    end: number,
    conversion: (value: string) => number,
    maxValue: number
  ) {
    for (let i = start; i <= end; i++) {
      const letter = String.fromCharCode(i);
      array.push(new CharacterTableEntry(letter, conversion(letter), maxValue));
    }
  }
}
