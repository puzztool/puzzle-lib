import CaesarUtils from './CaesarUtils';

class CaesarString {
  private _str: string;

  constructor(str: string = '') {
    this._str = str;
  }

  public getRotation(rot: number) {
    const rotStr = [];

    for (const ch of this._str) {
      rotStr.push(CaesarUtils.rotateLetter(ch, rot));
    }

    return rotStr.join('');
  }

  public getRotations() {
    const rotations = [];
    rotations.push(this._str);

    for (let i = 1; i < 26; i++) {
      rotations.push(this.getRotation(i));
    }

    return rotations;
  }

  public update(str: string) {
    this._str = str;
  }
}

export default CaesarString;
