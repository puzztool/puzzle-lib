class CaesarUtils {
  public static rotateLetter(ch: string, rot: number) {
    if (ch.length !== 1) {
      throw new Error("Expected a single character");
    }

    rot %= this.alphaLength;
    if (rot < 0) {
      rot += this.alphaLength;
    }

    const code = ch.charCodeAt(0);
    let base = 0;
    if (code >= this.lowerA && code <= this.lowerZ) {
      base = this.lowerA;
    } else if (code >= this.upperA && code <= this.upperZ) {
      base = this.upperA;
    } else {
      return ch;
    }

    return String.fromCharCode((((code - base) + rot) % this.alphaLength) + base);
  }

  private static upperA: number = "A".charCodeAt(0);
  private static upperZ: number = "Z".charCodeAt(0);
  private static lowerA: number = "a".charCodeAt(0);
  private static lowerZ: number = "z".charCodeAt(0);
  private static alphaLength: number = 26;
}

export default CaesarUtils;
