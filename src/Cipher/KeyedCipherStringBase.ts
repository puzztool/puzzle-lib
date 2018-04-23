abstract class KeyedCipherStringBase {
  protected _text: string;
  protected _key: string;

  constructor(text: string = '', key: string = '') {
    this._text = text;
    this._key = key;
  }

  get text() {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get key() {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  public encrypt() {
    return this.convert(false);
  }

  public decrypt() {
    return this.convert(true);
  }

  protected abstract convert(decrypt: boolean): string;
}

export default KeyedCipherStringBase;
