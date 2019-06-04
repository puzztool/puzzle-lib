import { EncodingCategory } from './EncodingCategory';

export class EncodingEntry<T> {
  readonly encoding: T;
  readonly category: EncodingCategory;
  readonly display: string;

  constructor(encoding: T, category: EncodingCategory, display: string) {
    this.encoding = encoding;
    this.category = category;
    this.display = display;
  }

  toString() {
    return this.display;
  }
}
