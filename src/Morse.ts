export namespace Morse {
  export class Entry {
    public readonly encoding: number;
    public readonly display: string;

    constructor(encoding: number, display: string) {
      this.encoding = encoding;
      this.display = display;
    }

    public toMorseString() {
      let encoding = this.encoding;
      let morseChars = "";

      while (encoding !== 0) {
        if ((encoding & 0b11) === 0b01) {
          morseChars += ".";
        } else if ((this.encoding & 0b11) === 0b10) {
          morseChars += "-";
        } else {
          throw new Error("Invalid morse bits");
        }

        encoding >>>= 2;
      }

      return morseChars;
    }

    public toString() {
      return this.display;
    }
  }

  class LookupResult {
    public exact: Entry;
    public readonly partial: Entry[] = [];
  }

  class Data {
    public static readonly instance: Data = new Data();

    private static parse(morse: string) {
      let bits = 0;

      for (let i = morse.length - 1; i >= 0; i--) {
        const ch = morse[i];
        if (ch === ".") {
          bits |= 0b01;
        } else if (ch === "-") {
          bits |= 0b10;
        } else {
          throw new Error("Invalid morse character");
        }

        bits <<= 2;
      }

      bits >>>= 2;
      return bits;
    }

    private readonly _data: Entry[] = [];

    constructor() {
      this.addToList(0x0009, "A");
      this.addToList(0x0056, "B");
      this.addToList(0x0066, "C");
      this.addToList(0x0016, "D");
      this.addToList(0x0001, "E");
      this.addToList(0x0065, "F");
      this.addToList(0x001A, "G");
      this.addToList(0x0055, "H");
      this.addToList(0x0005, "I");
      this.addToList(0x00A9, "J");
      this.addToList(0x0026, "K");
      this.addToList(0x0059, "L");
      this.addToList(0x000A, "M");
      this.addToList(0x0006, "N");
      this.addToList(0x002A, "O");
      this.addToList(0x0069, "P");
      this.addToList(0x009A, "Q");
      this.addToList(0x0019, "R");
      this.addToList(0x0015, "S");
      this.addToList(0x0002, "T");
      this.addToList(0x0025, "U");
      this.addToList(0x0095, "V");
      this.addToList(0x0029, "W");
      this.addToList(0x0096, "X");
      this.addToList(0x00A6, "Y");
      this.addToList(0x005A, "Z");
      this.addToList(0x02AA, "0");
      this.addToList(0x02A9, "1");
      this.addToList(0x02A5, "2");
      this.addToList(0x0295, "3");
      this.addToList(0x0255, "4");
      this.addToList(0x0155, "5");
      this.addToList(0x0156, "6");
      this.addToList(0x015A, "7");
      this.addToList(0x016A, "8");
      this.addToList(0x01AA, "9");
      this.addToList(0x0099, "Ä");
      this.addToList(0x0269, "Á");
      this.addToList(0x00AA, "CH");
      this.addToList(0x0165, "É");
      this.addToList(0x029A, "Ñ");
      this.addToList(0x006A, "Ö");
      this.addToList(0x00A5, "Ü");
      this.addToList(0x0999, ".");
      this.addToList(0x0A5A, ",");
      this.addToList(0x05A5, "?");
      this.addToList(0x06A9, "'");
      this.addToList(0x0A66, "!");
      this.addToList(0x0196, "/");
      this.addToList(0x01A6, "(");
      this.addToList(0x09A6, ")");
      this.addToList(0x0159, "&");
      this.addToList(0x056A, ":");
      this.addToList(0x0666, ";");
      this.addToList(0x0256, "=");
      this.addToList(0x0199, "+");
      this.addToList(0x0956, "-");
      this.addToList(0x09A5, "_");
      this.addToList(0x0659, "\"");
      this.addToList(0x2595, "$");
      this.addToList(0x0669, "@");
    }

    public lookup(input: string | number) {
      if (typeof input !== "number") {
        input = Data.parse(input);
      }

      const result = new LookupResult();

      for (const entry of this._data) {
        if (entry.encoding === input) {
          result.exact = entry;
        } else if ((entry.encoding & input) === input) {
          result.partial.push(entry);
        }
      }

      return result;
    }

    private addToList(encoding: number, display: string) {
      this._data.push(new Entry(encoding, display));
    }
  }

  export class Character {
    private _morse: string;
    private _lookup: LookupResult | null;

    constructor(str: string) {
      this._morse = str || "";
      this.invalidateLookup();
    }

    public dot() {
      this._morse += ".";
      this.invalidateLookup();
    }

    public dash() {
      this._morse += "-";
      this.invalidateLookup();
    }

    public backspace() {
      this._morse.substring(0, -1);
      this.invalidateLookup();
    }

    public getPotentialMatches() {
      return this.ensureLookup().partial;
    }

    public toMorseString() {
      return this._morse;
    }

    public toString() {
      const exact = this.ensureLookup().exact;
      return exact ? exact.toString() : "";
    }

    private ensureLookup() {
      if (!this._lookup) {
        this._lookup = Data.instance.lookup(this._morse);
      }

      return this._lookup;
    }

    private invalidateLookup() {
      this._lookup = null;
    }
  }
}
