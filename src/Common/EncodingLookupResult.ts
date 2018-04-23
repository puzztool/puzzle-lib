import EncodingEntry from './EncodingEntry';

class EncodingLookupResult<T> {
  public readonly exact: Array<EncodingEntry<T>> = [];
  public readonly partial: Array<EncodingEntry<T>> = [];

  get exactString() {
    return this.exact.map((value) => value.toString()).join('/');
  }
}

export default EncodingLookupResult;
