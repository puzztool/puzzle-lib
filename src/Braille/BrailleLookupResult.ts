import { BrailleEntry } from "./BrailleEntry";

export class BrailleLookupResult {
  public readonly exact: BrailleEntry[] = [];
  public readonly partial: BrailleEntry[] = [];

  get exactString() {
    return this.exact.map((value) => value.toString()).join("/");
  }
}
