import {EncodingEntry} from './EncodingEntry';

export class EncodingLookupResult<T> {
  readonly exact: Array<EncodingEntry<T>> = [];
  readonly partial: Array<EncodingEntry<T>> = [];

  get exactString() {
    return this.exact.map(value => value.toString()).join('/');
  }
}
