import BrailleEntry from './BrailleEntry';

class BrailleLookupResult {
  public readonly exact: BrailleEntry[] = [];
  public readonly partial: BrailleEntry[] = [];

  get exactString() {
    return this.exact.map((value) => value.toString()).join('/');
  }
}

export default BrailleLookupResult;
