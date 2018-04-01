class MorseEntry {
  public readonly encoding: number;
  public readonly display: string;

  constructor(encoding: number, display: string) {
    this.encoding = encoding;
    this.display = display;
  }

  public toMorseString() {
    let encoding = this.encoding;
    let morseChars = '';

    while (encoding !== 0) {
      if ((encoding & 0b11) === 0b01) {
        morseChars += '.';
      } else if ((this.encoding & 0b11) === 0b10) {
        morseChars += '-';
      } else {
        throw new Error('Invalid morse bits');
      }

      encoding >>>= 2;
    }

    return morseChars;
  }

  public toString() {
    return this.display;
  }
}

export default MorseEntry;
