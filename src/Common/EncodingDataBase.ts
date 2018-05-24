import EncodingCategory from './EncodingCategory';
import EncodingEntry from './EncodingEntry';
import EncodingLookupResult from './EncodingLookupResult';

abstract class EncodingDataBase<T extends number> {
  private readonly _entries: Array<EncodingEntry<T>> = [];

  public lookup(encoding: T, category: EncodingCategory = EncodingCategory.All) {
    const result = new EncodingLookupResult<T>();

    for (const entry of this._entries) {
      if ((entry.category & category) !== 0) {
        if (entry.encoding === encoding) {
          result.exact.push(entry);
        } else if ((entry.encoding & encoding) === encoding) {
          result.partial.push(entry);
        }
      }
    }

    return result;
  }

  public get entries() {
    return this._entries;
  }

  protected addToList(encoding: T, category: EncodingCategory, display: string) {
    this._entries.push(new EncodingEntry<T>(encoding, category, display));
  }
}

export default EncodingDataBase;
