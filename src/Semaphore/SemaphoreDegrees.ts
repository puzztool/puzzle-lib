import { SemaphoreDirection } from './SemaphoreDirection';

export class SemaphoreDegrees {
  static FromDegrees(degrees: number) {
    if (degrees >= 360) {
      degrees = degrees % 360;
    }

    if (degrees % 45 !== 0 || degrees < 0) {
      throw new Error('Invalid degrees');
    }
    const position = degrees / 45;
    return SemaphoreDirection.North << position;
  }

  static ToDegrees(direction: SemaphoreDirection) {
    let position = SemaphoreDirection.North;
    let counter = 0;
    while (counter < 9 && position !== direction) {
      position = position << 1;
      counter++;
    }

    return counter * 45;
  }
}
