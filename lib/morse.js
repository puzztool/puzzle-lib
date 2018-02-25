class Data {
  constructor () {
    this.data = new Map();
    this.data.set(0x0009, 'A');
    this.data.set(0x0056, 'B');
    this.data.set(0x0066, 'C');
    this.data.set(0x0016, 'D');
    this.data.set(0x0001, 'E');
    this.data.set(0x0065, 'F');
    this.data.set(0x001A, 'G');
    this.data.set(0x0055, 'H');
    this.data.set(0x0005, 'I');
    this.data.set(0x00A9, 'J');
    this.data.set(0x0026, 'K');
    this.data.set(0x0059, 'L');
    this.data.set(0x000A, 'M');
    this.data.set(0x0006, 'N');
    this.data.set(0x002A, 'O');
    this.data.set(0x0069, 'P');
    this.data.set(0x009A, 'Q');
    this.data.set(0x0019, 'R');
    this.data.set(0x0015, 'S');
    this.data.set(0x0002, 'T');
    this.data.set(0x0025, 'U');
    this.data.set(0x0095, 'V');
    this.data.set(0x0029, 'W');
    this.data.set(0x0096, 'X');
    this.data.set(0x00A6, 'Y');
    this.data.set(0x005A, 'Z');
    this.data.set(0x02AA, '0');
    this.data.set(0x02A9, '1');
    this.data.set(0x02A5, '2');
    this.data.set(0x0295, '3');
    this.data.set(0x0255, '4');
    this.data.set(0x0155, '5');
    this.data.set(0x0156, '6');
    this.data.set(0x015A, '7');
    this.data.set(0x016A, '8');
    this.data.set(0x01AA, '9');
    this.data.set(0x0099, 'Ä');
    this.data.set(0x0269, 'Á');
    this.data.set(0x00AA, 'CH');
    this.data.set(0x0165, 'É');
    this.data.set(0x029A, 'Ñ');
    this.data.set(0x006A, 'Ö');
    this.data.set(0x00A5, 'Ü');
    this.data.set(0x0999, '.');
    this.data.set(0x0A5A, ',');
    this.data.set(0x05A5, '?');
    this.data.set(0x06A9, '\'');
    this.data.set(0x0A66, '!');
    this.data.set(0x0196, '/');
    this.data.set(0x01A6, '(');
    this.data.set(0x09A6, ')');
    this.data.set(0x0159, '&');
    this.data.set(0x056A, ':');
    this.data.set(0x0666, ';');
    this.data.set(0x0256, '=');
    this.data.set(0x0199, '+');
    this.data.set(0x0956, '-');
    this.data.set(0x09A5, '_');
    this.data.set(0x0659, '"');
    this.data.set(0x2595, '$');
    this.data.set(0x0669, '@');
  }

  static instance () {
    if (!Data._instance) {
      Data._instance = new Data();
    }

    return Data._instance;
  }

  static parse (morse) {
    let bits = 0;

    for (let i = morse.length - 1; i >= 0; i--) {
      const ch = morse[i];
      if (ch === '.') {
        bits |= 0b01;
      } else if (ch === '-') {
        bits |= 0b10;
      } else {
        throw new Error('Invalid morse character');
      }

      bits <<= 2;
    }

    bits >>>= 2;
    return bits;
  }

  static toMorseString (morseBits) {
    const morseChars = [];

    while (morseBits !== 0) {
      if ((morseBits & 0b11) === 0b01) {
        morseChars.push('.');
      } else if ((morseBits & 0b11) === 0b10) {
        morseChars.push('-');
      } else {
        throw new Error('Invalid morse bits');
      }

      morseBits >>>= 2;
    }

    return morseChars.join('');
  }

  lookup (input) {
    if (typeof input !== 'number') {
      input = Data.parse(input);
    }

    let exact = null;
    const partial = [];

    for (const [ key, value ] of this.data) {
      if (key === input) {
        exact = value;
      } else if ((key & input) === input) {
        partial.push(value);
      }
    }

    return { exact, partial };
  }
}

class Character {
  constructor (str) {
    this._morse = str ? Array.from(str) : [];
    this._invalidateLookup();
  }

  dot () {
    this._morse.push('.');
    this._invalidateLookup();
  }

  dash () {
    this._morse.push('-');
    this._invalidateLookup();
  }

  backspace () {
    this._morse.pop();
    this._invalidateLookup();
  }

  getPotentialMatches () {
    return this._ensureLookup().partial;
  }

  toMorseString () {
    return this._morse.join('');
  }

  toString () {
    return this._ensureLookup().exact || '';
  }

  _ensureLookup () {
    if (!this._lookup) {
      this._lookup = Data.instance().lookup(this._morse);
    }

    return this._lookup;
  }

  _invalidateLookup () {
    this._lookup = null;
  }
}

exports.Character = Character;
