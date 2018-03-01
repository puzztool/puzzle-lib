import { BrailleData } from "./BrailleData";
import { BrailleEntry } from "./BrailleEntry";
import { BrailleCategory, BrailleDot, BrailleEncoding } from "./BrailleEnums";
import { BrailleLookupResult } from "./BrailleLookupResult";

export class BrailleCharacter {
  private _encoding: BrailleEncoding;
  private _category: BrailleCategory;
  private _lookup: BrailleLookupResult | null;

  constructor(encoding: BrailleEncoding = BrailleEncoding.None, category: BrailleCategory = BrailleCategory.All) {
    this._encoding = encoding;
    this._category = category;
    this.invalidateLookup();
  }

  get category() {
    return this._category;
  }

  set category(value: BrailleCategory) {
    if (this._category !== value) {
      this._category = value;
      this.invalidateLookup();
    }
  }

  public clear() {
    this._encoding = BrailleEncoding.None;
    this.invalidateLookup();
  }

  public empty() {
    return this._encoding === BrailleEncoding.None;
  }

  public get(mask: BrailleDot | BrailleEncoding) {
    return (this._encoding & mask) === mask;
  }

  public toggle(mask: BrailleDot | BrailleEncoding) {
    this._encoding ^= mask;
    this.invalidateLookup();
  }

  public getExactMatches(): BrailleEntry[] {
    return this.ensureLookup().exact;
  }

  public getPotentialMatches(): BrailleEntry[] {
    return this.ensureLookup().partial;
  }

  public toString() {
    return this.ensureLookup().exactString;
  }

  public valid() {
    return this.ensureLookup().exact.length > 0;
  }

  public valueOf() {
    return this._encoding;
  }

  private ensureLookup() {
    if (!this._lookup) {
      this._lookup = BrailleData.instance.lookup(this._encoding, this._category);
    }

    return this._lookup;
  }

  private invalidateLookup() {
    this._lookup = null;
  }
}
