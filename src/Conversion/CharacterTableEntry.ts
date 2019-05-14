import leftPad = require('left-pad');

export class CharacterTableEntry {
  private static getValue(value: number, base: number, maxValue: number) {
    return leftPad(
      value.toString(base),
      Math.ceil(Math.log(maxValue) / Math.log(base)),
      '0'
    );
  }

  readonly character: string;
  readonly binary: string;
  readonly ternary: string;
  readonly octal: string;
  readonly decimal: string;
  readonly hexadecimal: string;

  constructor(character: string, value: number, maxValue: number) {
    this.character = character;
    this.binary = CharacterTableEntry.getValue(value, 2, maxValue);
    this.ternary = CharacterTableEntry.getValue(value, 3, maxValue);
    this.octal = CharacterTableEntry.getValue(value, 8, maxValue);
    this.decimal = CharacterTableEntry.getValue(value, 10, maxValue);
    this.hexadecimal = CharacterTableEntry.getValue(value, 16, maxValue);
  }
}
