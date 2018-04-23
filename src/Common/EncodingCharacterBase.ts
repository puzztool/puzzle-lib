import EncodingCategory from '../Common/EncodingCategory';
import EncodingEntry from '../Common/EncodingEntry';
import EncodingLookupResult from '../Common/EncodingLookupResult';
import EncodingDataBase from './EncodingDataBase';

abstract class EncodingCharacterBase<T extends number> {
  private _category: EncodingCategory;
  private _data: EncodingDataBase<T>;
  private _lookup: EncodingLookupResult<T> | null;

  constructor(data: EncodingDataBase<T>, category: EncodingCategory) {
    this._data = data;
    this._category = category;
    this.invalidateLookup();
  }

  get category() {
    return this._category;
  }

  set category(value: EncodingCategory) {
    if (this._category !== value) {
      this._category = value;
      this.invalidateLookup();
    }
  }

  public clear() {
    this.onClear();
    this.invalidateLookup();
  }

  public empty() {
    return this.onEmpty();
  }

  public getExactMatches(): Array<EncodingEntry<T>> {
    return this.ensureLookup().exact;
  }

  public getPotentialMatches(): Array<EncodingEntry<T>> {
    return this.ensureLookup().partial;
  }

  public toString() {
    return this.ensureLookup().exactString;
  }

  public valid() {
    return this.ensureLookup().exact.length > 0;
  }

  public valueOf() {
    return this.getEncoding();
  }

  protected invalidateLookup() {
    this._lookup = null;
  }

  protected abstract onClear(): void;
  protected abstract onEmpty(): boolean;
  protected abstract getEncoding(): T;

  private ensureLookup() {
    if (!this._lookup) {
      this._lookup = this._data.lookup(this.getEncoding(), this._category);
    }

    return this._lookup;
  }
}

export default EncodingCharacterBase;
