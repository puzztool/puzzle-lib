class SemaphoreEntry {
  public readonly encoding: number;
  public readonly display: string;

  constructor(encoding: number, display: string) {
    this.encoding = encoding;
    this.display = display;
  }

  public toString() {
    return this.display;
  }
}

export default SemaphoreEntry;
