import {EncodingCategory} from '../Common/EncodingCategory';
import {EncodingCharacterBase} from '../Common/EncodingCharacterBase';
import {BrailleData} from './BrailleData';
import {BrailleDot} from './BrailleDot';
import {BrailleEncoding} from './BrailleEncoding';

export class BrailleCharacter extends EncodingCharacterBase<BrailleEncoding> {
  private _encoding: BrailleEncoding;

  constructor(encoding: BrailleEncoding = BrailleEncoding.None, category: EncodingCategory = EncodingCategory.All) {
    super(BrailleData.instance, category);

    this._encoding = encoding;
  }

  get encoding() {
    return this._encoding;
  }

  set encoding(value: BrailleEncoding) {
    this._encoding = value;
    this.invalidateLookup();
  }

  get(mask: BrailleDot|BrailleEncoding) {
    return (this._encoding & mask) === mask;
  }

  toggle(mask: BrailleDot|BrailleEncoding) {
    this._encoding ^= mask;
    this.invalidateLookup();
  }

  protected onClear() {
    this._encoding = BrailleEncoding.None;
    this.invalidateLookup();
  }

  protected onEmpty() {
    return this._encoding === BrailleEncoding.None;
  }

  protected getEncoding() {
    return this._encoding;
  }
}
