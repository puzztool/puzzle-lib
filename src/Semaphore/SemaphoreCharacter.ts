import SemaphoreData from "./SemaphoreData";
import SemaphoreDirection from "./SemaphoreDirection";

class SemaphoreCharacter {
  private _semaphore: string;

  public constructor(first: SemaphoreDirection, second: SemaphoreDirection) {
    this.setDirections(first, second);
  }

  public clear() {
    this._semaphore = "";
  }

  public setDirections(first: SemaphoreDirection, second: SemaphoreDirection) {
    this.clear();
    const lookup = SemaphoreData.instance.lookup(first, second);
    this._semaphore = (lookup === null) ? "" : lookup;
  }

  public toString() {
    return this._semaphore;
  }
}

export default SemaphoreCharacter;
