import InlineSvg from './InlineSvg';

class CharacterImage {
  public readonly character: string;
  public readonly image: InlineSvg;

  constructor(character: string, image: InlineSvg) {
    this.character = character;
    this.image = image;
  }
}

export default CharacterImage;
