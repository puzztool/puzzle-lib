class SignificantFigures {
  public static ceil(num: number, sigFigs: number) {
    return this.roundInternal(Math.ceil, num, sigFigs);
  }

  public static floor(num: number, sigFigs: number) {
    return this.roundInternal(Math.floor, num, sigFigs);
  }

  public static round(num: number, sigFigs: number) {
    return this.roundInternal(Math.round, num, sigFigs);
  }

  private static roundInternal(
      func: (num: number) => number,
      num: number,
      sigFigs: number) {
    if (num === 0) {
      return num;
    }

    if (sigFigs <= 0) {
      throw new RangeError('sigFigs value must be positive');
    }

    const factor = this.getFactor(num, sigFigs);

    if (factor > 0) {
      return func(num / factor) * factor;
    } else if (factor < 0) {
      const absFactor = Math.abs(factor);
      return func(num * absFactor) / absFactor;
    } else {
      return num;
    }
  }

  private static getFactor(num: number, sigFigs: number) {
    const absNum = Math.abs(num);
    let digits = 0;

    if (absNum < 1) {
      digits = -sigFigs;
    } else {
      digits = Math.ceil(Math.log(absNum) / Math.log(10)) - sigFigs;
    }

    if (digits < 0) {
      return -Math.pow(10, Math.abs(digits));
    } else {
      return Math.pow(10, digits);
    }
  }
}

export default SignificantFigures;
