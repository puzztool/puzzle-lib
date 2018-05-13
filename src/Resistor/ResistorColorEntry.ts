class ResistorColorEntry {
  public readonly name: string;
  public readonly colorCode: string;
  public readonly multiplier: number;
  public readonly value?: number;
  public readonly toleranceInPercent?: number;

  constructor(name: string, colorCode: string, multiplier: number, value?: number, toleranceInPercent?: number) {
    this.name = name;
    this.value = value;
    this.colorCode = colorCode;
    this.multiplier = multiplier;
    this.toleranceInPercent = toleranceInPercent;
  }

  public hasValue() {
    return (this.value !== undefined);
  }

  public getDisplayValue() {
    if (this.value === undefined) {
      return '';
    }
    return this.value.toString();
  }

  public hasTolerance() {
    return (this.toleranceInPercent !== undefined);
  }

  public getDisplayTolerance() {
    if (this.toleranceInPercent === undefined) {
      return '';
    }
    return `${this.toleranceInPercent}%`;
  }
}

export default ResistorColorEntry;
