import MorseEntry from "./MorseEntry";

class MorseLookupResult {
  public exact: MorseEntry;
  public readonly partial: MorseEntry[] = [];
}

export default MorseLookupResult;
