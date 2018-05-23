import CharacterAutoConvert from './CharacterAutoConvert';
import CharacterEncoding from './CharacterEncoding';

class StringAutoConvert {
  public static convertString(input: string, homogeneous: boolean) {
    const split = this.splitString(input);

    if (homogeneous) {
      const encoding = this.determineStringEncoding(input);
      return split.reduce((result, letter) => result + CharacterAutoConvert.convertCharacter(letter, encoding), '');
    } else {
      return split.reduce((result, letter) => result + CharacterAutoConvert.convertCharacter(letter), '');
    }
  }

  public static determineStringEncoding(input: string): CharacterEncoding {
    const encodingCount: { [index: number]: number } = {};
    const parsed = this.splitString(input);
    const encodingKeys: number[] = [];

    for (const letter of parsed) {
      const charEncoding = CharacterAutoConvert.determineCharacterEncoding(letter);
      if (!encodingCount[charEncoding]) {
        encodingCount[charEncoding] = 1;
        encodingKeys.push(charEncoding);
      } else {
        encodingCount[charEncoding] = encodingCount[charEncoding] + 1;
      }
    }

    let maxCount = 0;
    let maxEncoding: number;
    maxEncoding = CharacterEncoding.None;

    for (const encoding of encodingKeys) {
      if (encodingCount[encoding] > maxCount) {
        maxCount = encodingCount[encoding];
        maxEncoding = encoding;
      }
    }
    return maxEncoding;
  }

  public static splitString(input: string): string[] {
    return input.split(' ').filter((item) => item !== '');
  }
}

export default StringAutoConvert;
