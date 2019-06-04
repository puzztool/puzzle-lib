export class Helpers {
  static assert(condition: boolean) {
    if (!condition) {
      throw new Error();
    }
  }

  static assertMsg(condition: boolean, message: string) {
    if (!condition) {
      throw new Error(message);
    }
  }
}
