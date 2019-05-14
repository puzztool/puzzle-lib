import { EncodingCategory } from '../Common/EncodingCategory';
import { EncodingCharacterBase } from '../Common/EncodingCharacterBase';
import { EncodingEntry } from '../Common/EncodingEntry';

import { SemaphoreData } from './SemaphoreData';
import { SemaphoreDegrees } from './SemaphoreDegrees';
import { SemaphoreDirection } from './SemaphoreDirection';
import { SemaphoreEncoding } from './SemaphoreEncoding';

export class SemaphoreCharacter extends EncodingCharacterBase<
  SemaphoreEncoding
> {
  private static parseEncoding(
    encoding: SemaphoreDirection | SemaphoreEncoding
  ) {
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

  constructor(
    encoding: SemaphoreEncoding = SemaphoreEncoding.None,
    category: EncodingCategory = EncodingCategory.All
  ) {
    super(SemaphoreData.instance, category);

    this.addDirection(encoding);
  }

  get directions() {
    return this._directions;
  }

  set directions(value: SemaphoreDirection[]) {
    this._directions = value.slice(0, 2);
    this.invalidateLookup();
  }

  addDirection(direction: SemaphoreDirection | SemaphoreEncoding) {
    for (const dir of SemaphoreCharacter.parseEncoding(direction)) {
      this._directions.push(dir);
    }

    if (this._directions.length > 2) {
      this._directions.splice(0, this._directions.length - 2);
    }

    this.invalidateLookup();
  }

  removeDirection(direction: SemaphoreDirection | SemaphoreEncoding) {
    for (const dir of SemaphoreCharacter.parseEncoding(direction)) {
      const index = this._directions.indexOf(dir);
      if (index >= 0) {
        this._directions.splice(index, 1);
      }
    }

    this.invalidateLookup();
  }

  hasDirection(direction: SemaphoreDirection) {
    return this._directions.indexOf(direction) >= 0;
  }

  getDegrees() {
    return this._directions
      .map(value => SemaphoreDegrees.ToDegrees(value))
      .sort((a, b) => a - b);
  }

  getPotentialMatch(
    other: SemaphoreDirection
  ): EncodingEntry<SemaphoreEncoding> | null {
    if (this.directions.length !== 1 || this.directions[0] === other) {
      return null;
    }

    const potentialMatch = this.getPotentialMatches().filter(
      value => (value.encoding & other) === other
    )[0];

    return potentialMatch || null;
  }

  protected onClear() {
    this._directions.length = 0;
  }

  protected onEmpty() {
    return this._directions.length === 0;
  }

  protected getEncoding() {
    return this._directions.reduce(
      (previousValue, currentValue) => (previousValue |= currentValue),
      SemaphoreEncoding.None
    );
  }
}
