import NatoCharacter from './NatoCharacter';

// There's no concept of a 'partial match' for a NATO letter, so there's no
// reason to derive from EncodingDataBase.
class NatoData {
  public static readonly instance: NatoData = new NatoData();

  private readonly _entries: NatoCharacter[] = [
    new NatoCharacter('A', 'Alfa'),
    new NatoCharacter('B', 'Bravo'),
    new NatoCharacter('C', 'Charlie'),
    new NatoCharacter('D', 'Delta'),
    new NatoCharacter('E', 'Echo'),
    new NatoCharacter('F', 'Foxtrot'),
    new NatoCharacter('G', 'Golf'),
    new NatoCharacter('H', 'Hotel'),
    new NatoCharacter('I', 'India'),
    new NatoCharacter('J', 'Juliet'),
    new NatoCharacter('K', 'Kilo'),
    new NatoCharacter('L', 'Lima'),
    new NatoCharacter('M', 'Mike'),
    new NatoCharacter('N', 'November'),
    new NatoCharacter('O', 'Oscar'),
    new NatoCharacter('P', 'Papa'),
    new NatoCharacter('Q', 'Quebec'),
    new NatoCharacter('R', 'Romeo'),
    new NatoCharacter('S', 'Sierra'),
    new NatoCharacter('T', 'Tango'),
    new NatoCharacter('U', 'Uniform'),
    new NatoCharacter('V', 'Victor'),
    new NatoCharacter('W', 'Whiskey'),
    new NatoCharacter('X', 'X-ray'),
    new NatoCharacter('Y', 'Yankee'),
    new NatoCharacter('Z', 'Zulu'),
  ];

  public get entries(): NatoCharacter[] {
    return this._entries;
  }

  public lookup(letter: string): NatoCharacter | null {
    for (const ch of this._entries) {
      if (ch.character === letter) {
        return ch;
      }
    }
    return null;
  }
}

export default NatoData;
