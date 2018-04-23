import EncodingCategory from './EncodingCategory';

class EncodingEntry<T> {
  public readonly encoding: T;
  public readonly category: EncodingCategory;
  public readonly display: string;

  constructor(encoding: T, category: EncodingCategory, display: string) {
    this.encoding = encoding;
    this.category = category;
    this.display = display;
  }

  public toString() {
    return this.display;
  }
}

export default EncodingEntry;
