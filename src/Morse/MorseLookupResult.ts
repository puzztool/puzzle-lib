import { MorseEntry } from "./MorseEntry";

export class MorseLookupResult {
  public exact: MorseEntry;
  public readonly partial: MorseEntry[] = [];
}
