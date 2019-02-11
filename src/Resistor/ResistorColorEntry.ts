export class ResistorColorEntry {
  readonly name: string;
  readonly colorCode: string;
  readonly multiplier: number;
  readonly value?: number;
  readonly toleranceInPercent?: number;

  constructor(name: string, colorCode: string, multiplier: number, value?: number, toleranceInPercent?: number) {
    this.name = name;
    this.value = value;
    this.colorCode = colorCode;
    this.multiplier = multiplier;
    this.toleranceInPercent = toleranceInPercent;
  }

  hasValue() {
    return (this.value !== undefined);
  }

  getDisplayValue() {
    if (this.value === undefined) {
      return '';
    }
    return this.value.toString();
  }

  hasTolerance() {
    return (this.toleranceInPercent !== undefined);
  }

  getDisplayTolerance() {
    if (this.toleranceInPercent === undefined) {
      return '';
    }
    return `${this.toleranceInPercent}%`;
  }
}
