import SemaphoreDirection from './SemaphoreDirection';
import SemaphoreEntry from './SemaphoreEntry';

class SemaphoreData {
  public static readonly instance: SemaphoreData = new SemaphoreData();

  private readonly _data: SemaphoreEntry[] = [];

  constructor() {
    // Letters
    this.addToList((SemaphoreDirection.SouthWest | SemaphoreDirection.South), 'A');
    this.addToList((SemaphoreDirection.West | SemaphoreDirection.South), 'B');
    this.addToList((SemaphoreDirection.NorthWest | SemaphoreDirection.South), 'C');
    this.addToList((SemaphoreDirection.North | SemaphoreDirection.South), 'D');
    this.addToList((SemaphoreDirection.NorthEast | SemaphoreDirection.South), 'E');
    this.addToList((SemaphoreDirection.East | SemaphoreDirection.South), 'F');
    this.addToList((SemaphoreDirection.SouthEast | SemaphoreDirection.South), 'G');
    this.addToList((SemaphoreDirection.SouthWest | SemaphoreDirection.West), 'H');
    this.addToList((SemaphoreDirection.SouthWest | SemaphoreDirection.NorthWest), 'I');
    this.addToList((SemaphoreDirection.North | SemaphoreDirection.East), 'J');
    this.addToList((SemaphoreDirection.SouthWest | SemaphoreDirection.North), 'K');
    this.addToList((SemaphoreDirection.SouthWest | SemaphoreDirection.NorthEast), 'L');
    this.addToList((SemaphoreDirection.SouthWest | SemaphoreDirection.East), 'M');
    this.addToList((SemaphoreDirection.SouthWest | SemaphoreDirection.SouthEast), 'N');
    this.addToList((SemaphoreDirection.West | SemaphoreDirection.NorthWest), 'O');
    this.addToList((SemaphoreDirection.West | SemaphoreDirection.North), 'P');
    this.addToList((SemaphoreDirection.West | SemaphoreDirection.NorthEast), 'Q');
    this.addToList((SemaphoreDirection.West | SemaphoreDirection.East), 'R');
    this.addToList((SemaphoreDirection.West | SemaphoreDirection.SouthEast), 'S');
    this.addToList((SemaphoreDirection.NorthWest | SemaphoreDirection.North), 'T');
    this.addToList((SemaphoreDirection.NorthWest | SemaphoreDirection.NorthEast), 'U');
    this.addToList((SemaphoreDirection.North | SemaphoreDirection.SouthEast), 'V');
    this.addToList((SemaphoreDirection.East | SemaphoreDirection.NorthEast), 'W');
    this.addToList((SemaphoreDirection.SouthEast | SemaphoreDirection.NorthEast), 'X');
    this.addToList((SemaphoreDirection.NorthWest | SemaphoreDirection.East), 'Y');
    this.addToList((SemaphoreDirection.SouthEast | SemaphoreDirection.East), 'Z');
  }

  public lookup(first: SemaphoreDirection, second: SemaphoreDirection): string {
    const combined = first | second;
    for (const entry of this._data) {
      if (entry.encoding === combined) {
        return entry.display;
      }
    }

    return '';
  }

  private addToList(encoding: number, display: string) {
    this._data.push(new SemaphoreEntry(encoding, display));
  }
}

export default SemaphoreData;
