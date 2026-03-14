/**
 * Rounds a number to the specified significant figures using the given function.
 */
function roundInternal(
  func: (num: number) => number,
  num: number,
  sigFigs: number,
): number {
  if (num === 0) {
    return num;
  }

  if (sigFigs <= 0) {
    throw new RangeError('sigFigs value must be positive');
  }

  const factor = getFactor(num, sigFigs);

  if (factor > 0) {
    return func(num / factor) * factor;
  } else if (factor < 0) {
    const absFactor = Math.abs(factor);
    return func(num * absFactor) / absFactor;
  } else {
    return num;
  }
}

function getFactor(num: number, sigFigs: number): number {
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

/**
 * Rounds up to the specified number of significant figures.
 */
export function sigFigCeil(num: number, sigFigs: number): number {
  return roundInternal(Math.ceil, num, sigFigs);
}

/**
 * Rounds down to the specified number of significant figures.
 */
export function sigFigFloor(num: number, sigFigs: number): number {
  return roundInternal(Math.floor, num, sigFigs);
}

/**
 * Rounds to the nearest value with the specified number of significant figures.
 */
export function sigFigRound(num: number, sigFigs: number): number {
  return roundInternal(Math.round, num, sigFigs);
}
