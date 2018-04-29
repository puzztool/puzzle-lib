import EncodingCategory from '../Common/EncodingCategory';
import EncodingCharacterBase from '../Common/EncodingCharacterBase';
import SemaphoreData from './SemaphoreData';
import SemaphoreDegrees from './SemaphoreDegrees';
import SemaphoreDirection from './SemaphoreDirection';
import SemaphoreEncoding from './SemaphoreEncoding';

class SemaphoreCharacter extends EncodingCharacterBase<SemaphoreEncoding> {
  private static parseEncoding(encoding: SemaphoreDirection | SemaphoreEncoding) {
    const directions: SemaphoreDirection[] = [];

    for (let i = 1; i <= 8; i++) {
      const direction = (1 << i) as SemaphoreDirection;
      if ((encoding & direction) === direction) {
        directions.push(direction);
      }
    }

    return directions;
  }

  private _directions: SemaphoreDirection[] = [];

  public constructor(
      encoding: SemaphoreEncoding = SemaphoreEncoding.None,
      category: EncodingCategory = EncodingCategory.All) {
    super(SemaphoreData.instance, category);

    this.addDirection(encoding);
  }

  public get directions() {
    return this._directions;
  }

  public set directions(value: SemaphoreDirection[]) {
    this._directions = value.slice(0, 2);
    this.invalidateLookup();
  }

  public addDirection(direction: SemaphoreDirection | SemaphoreEncoding) {
    for (const dir of SemaphoreCharacter.parseEncoding(direction)) {
      this._directions.push(dir);
    }

    if (this._directions.length > 2) {
      this._directions.splice(0, this._directions.length - 2);
    }

    this.invalidateLookup();
  }

  public removeDirection(direction: SemaphoreDirection | SemaphoreEncoding) {
    for (const dir of SemaphoreCharacter.parseEncoding(direction)) {
      const index = this._directions.indexOf(dir);
      if (index >= 0) {
        this._directions.splice(index, 1);
      }
    }

    this.invalidateLookup();
  }

  public hasDirection(direction: SemaphoreDirection) {
    return this._directions.indexOf(direction) >= 0;
  }

  public getDegrees() {
    return this._directions
      .map((value) => SemaphoreDegrees.ToDegrees(value))
      .sort((a, b) => a - b);
  }

  protected onClear() {
    this._directions.length = 0;
  }

  protected onEmpty() {
    return this._directions.length === 0;
  }

  protected getEncoding() {
    return this._directions.reduce(
      (previousValue, currentValue) => previousValue |= currentValue,
      SemaphoreDirection.None);
  }
}

export default SemaphoreCharacter;
