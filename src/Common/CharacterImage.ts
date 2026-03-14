import {InlineSvg} from './InlineSvg.js';

export class CharacterImage {
  readonly character: string;
  readonly image: InlineSvg;

  constructor(character: string, image: InlineSvg) {
    this.character = character;
    this.image = image;
  }
}
