import MorseData from "./MorseData";
import MorseEntry from "./MorseEntry";
import MorseLookupResult from "./MorseLookupResult";

class MorseCharacter {
  private _morse: string;
  private _lookup: MorseLookupResult | null;

  constructor(str: string = "") {
    this._morse = str;
    this.invalidateLookup();
  }

  public backspace() {
    if (this._morse.length > 0) {
      this._morse = this._morse.substring(0, this._morse.length - 1);
      this.invalidateLookup();
    }
  }

  public clear() {
    this._morse = "";
    this.invalidateLookup();
  }

  public dot() {
    this._morse += ".";
    this.invalidateLookup();
  }

  public dash() {
    this._morse += "-";
    this.invalidateLookup();
  }

  public empty() {
    return this._morse.length === 0;
  }

  public getExactMatch(): MorseEntry {
    return this.ensureLookup().exact;
  }

  public getPotentialMatches(): MorseEntry[] {
    return this.ensureLookup().partial;
  }

  public toMorseString() {
    return this._morse;
  }

  public toString() {
    const exact = this.ensureLookup().exact;
    return exact ? exact.toString() : "";
  }

  public valid() {
    return !!this.ensureLookup().exact;
  }

  private ensureLookup() {
    if (!this._lookup) {
      this._lookup = MorseData.instance.lookup(this._morse);
    }

    return this._lookup;
  }

  private invalidateLookup() {
    this._lookup = null;
  }
}

export default MorseCharacter;
