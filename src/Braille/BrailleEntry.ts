import { BrailleCategory, BrailleEncoding } from "./BrailleEnums";

export class BrailleEntry {
  public readonly encoding: BrailleEncoding;
  public readonly category: BrailleCategory;
  public readonly display: string;

  constructor(encoding: BrailleEncoding, category: BrailleCategory, display: string) {
    this.encoding = encoding;
    this.category = category;
    this.display = display;
  }

  public toString() {
    return this.display;
  }
}
