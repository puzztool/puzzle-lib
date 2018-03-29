import leftPad = require("left-pad");

class CharacterTableEntry {
  private static getValue(value: number, base: number, maxValue: number) {
    return leftPad(value.toString(base), Math.ceil(Math.log(maxValue) / Math.log(base)), "0");
  }

  public readonly character: string;
  public readonly binary: string;
  public readonly ternary: string;
  public readonly octal: string;
  public readonly decimal: string;
  public readonly hexadecimal: string;

  constructor(character: string, value: number, maxValue: number) {
    this.character = character;
    this.binary = CharacterTableEntry.getValue(value, 2, maxValue);
    this.ternary = CharacterTableEntry.getValue(value, 3, maxValue);
    this.octal = CharacterTableEntry.getValue(value, 8, maxValue);
    this.decimal = CharacterTableEntry.getValue(value, 10, maxValue);
    this.hexadecimal = CharacterTableEntry.getValue(value, 16, maxValue);
  }
}

export default CharacterTableEntry;
