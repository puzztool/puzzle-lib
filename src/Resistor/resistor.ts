export interface ResistorColor {
  readonly name: string;
  readonly colorCode: string;
  readonly multiplier: number;
  readonly value?: number;
  readonly toleranceInPercent?: number;
}

export const RESISTOR_COLOR_TABLE: readonly ResistorColor[] = [
  {name: 'Black', colorCode: '#000000', multiplier: 1, value: 0},
  {
    name: 'Brown',
    colorCode: '#8B4513',
    multiplier: 10,
    value: 1,
    toleranceInPercent: 1,
  },
  {
    name: 'Red',
    colorCode: '#FF0000',
    multiplier: 100,
    value: 2,
    toleranceInPercent: 2,
  },
  {name: 'Orange', colorCode: '#EE7420', multiplier: 1000, value: 3},
  {name: 'Yellow', colorCode: '#FFFF00', multiplier: 10000, value: 4},
  {
    name: 'Green',
    colorCode: '#008000',
    multiplier: 100000,
    value: 5,
    toleranceInPercent: 0.5,
  },
  {
    name: 'Blue',
    colorCode: '#0000FF',
    multiplier: 1000000,
    value: 6,
    toleranceInPercent: 0.25,
  },
  {
    name: 'Violet',
    colorCode: '#800080',
    multiplier: 10000000,
    value: 7,
    toleranceInPercent: 0.1,
  },
  {name: 'Grey', colorCode: '#808080', multiplier: 100000000, value: 8},
  {name: 'White', colorCode: '#FFFFFF', multiplier: 1000000000, value: 9},
  {name: 'Gold', colorCode: '#AB8D3F', multiplier: 0.1, toleranceInPercent: 5},
  {
    name: 'Silver',
    colorCode: '#C0C0C0',
    multiplier: 0.01,
    toleranceInPercent: 10,
  },
] as const;

export const INVALID_RESISTOR = -1;

function applyMultiplier(value: number, multiplier: number): number {
  if (multiplier >= 1) {
    return value * multiplier;
  } else if (multiplier > 0) {
    // Avoid floating point multiplication issues
    return value / (1 / multiplier);
  } else {
    throw new RangeError('Invalid multiplier');
  }
}

/**
 * getValue assumes there is no tolerance band, as tolerance is not part of
 * the value calculation
 */
export function getResistorValue(colors: ResistorColor[]): number {
  if (colors.length < 3 || colors.length > 4) {
    throw new RangeError('Invalid resistor size');
  }

  let value = 0;
  for (let i = 0; i < colors.length - 1; ++i) {
    const currentColor = colors[i];
    if (currentColor.value === undefined) {
      return INVALID_RESISTOR;
    }

    value *= 10;
    value += currentColor.value;
  }

  return applyMultiplier(value, colors[colors.length - 1].multiplier);
}

export function getResistorDisplayValue(value: number): string {
  if (value >= 1000000000) {
    return `${value / 1000000000}G`;
  } else if (value >= 1000000) {
    return `${value / 1000000}M`;
  } else if (value >= 1000) {
    return `${value / 1000}k`;
  } else {
    return value.toString();
  }
}

export function hasResistorValue(color: ResistorColor): boolean {
  return color.value !== undefined;
}

export function hasResistorTolerance(color: ResistorColor): boolean {
  return color.toleranceInPercent !== undefined;
}
