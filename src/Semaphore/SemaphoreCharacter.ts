import SemaphoreData from './SemaphoreData';
import SemaphoreDegrees from './SemaphoreDegrees';
import SemaphoreDirection from './SemaphoreDirection';

class SemaphoreCharacter {
  private _directions: SemaphoreDirection[] = [];
  private _semaphore: string = '';

  public constructor(
      first: SemaphoreDirection = SemaphoreDirection.None,
      second: SemaphoreDirection = SemaphoreDirection.None) {
    if (first > SemaphoreDirection.None) {
      this.addDirection(first);
    }

    if (second > SemaphoreDirection.None) {
      this.addDirection(second);
    }
  }

  public get directions() {
    return this._directions;
  }

  public set directions(value: SemaphoreDirection[]) {
    this._directions = value.slice(0, 2);
    this.update();
  }

  public addDirection(direction: SemaphoreDirection) {
    this._directions.push(direction);

    if (this._directions.length > 2) {
      this._directions.splice(0, this._directions.length - 2);
    }

    this.update();
  }

  public removeDirection(direction: SemaphoreDirection) {
    const index = this._directions.indexOf(direction);
    if (index >= 0) {
      this._directions.splice(index, 1);
    }

    this.update();
  }

  public hasDirection(direction: SemaphoreDirection) {
    return this._directions.indexOf(direction) >= 0;
  }

  public getDegrees() {
    return this._directions
      .map((value) => SemaphoreDegrees.ToDegrees(value))
      .sort((a, b) => a - b);
  }

  public clear() {
    this._directions.length = 0;
    this._semaphore = '';
  }

  public toString() {
    return this._semaphore;
  }

  private update() {
    const combined = this._directions.reduce(
      (previousValue, currentValue) => previousValue |= currentValue,
      SemaphoreDirection.None);

    this._semaphore = SemaphoreData.instance.lookup(combined);
  }
}

export default SemaphoreCharacter;
