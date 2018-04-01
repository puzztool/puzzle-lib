import BrailleCategory from './BrailleCategory';
import BrailleEncoding from './BrailleEncoding';

class BrailleEntry {
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

export default BrailleEntry;
