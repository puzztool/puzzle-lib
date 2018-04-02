import CaesarUtils from './CaesarUtils';

class CaesarString {
  private _text: string;

  constructor(text: string = '') {
    this._text = text;
  }

  get text() {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  public getRotation(rot: number) {
    const rotStr = [];

    for (const ch of this._text) {
      rotStr.push(CaesarUtils.rotateLetter(ch, rot));
    }

    return rotStr.join('');
  }

  public getRotations() {
    const rotations = [];
    rotations.push(this._text);

    for (let i = 1; i < 26; i++) {
      rotations.push(this.getRotation(i));
    }

    return rotations;
  }
}

export default CaesarString;
