import {ResistorColorEntry} from './ResistorColorEntry';

export class Resistor {
  // Name, Color, Multiplier, Value, Tolerance
  static readonly BLACK = new ResistorColorEntry('Black', '#000000', 1, 0);
  static readonly BROWN = new ResistorColorEntry('Brown', '#8B4513', 10, 1, 1);
  static readonly RED = new ResistorColorEntry('Red', '#FF0000', 100, 2, 2);
  static readonly ORANGE = new ResistorColorEntry('Orange', '#EE7420', 1000, 3);
  static readonly YELLOW = new ResistorColorEntry(
    'Yellow',
    '#FFFF00',
    10000,
    4
  );
  static readonly GREEN = new ResistorColorEntry(
    'Green',
    '#008000',
    100000,
    5,
    0.5
  );
  static readonly BLUE = new ResistorColorEntry(
    'Blue',
    '#0000FF',
    1000000,
    6,
    0.25
  );
  static readonly VIOLET = new ResistorColorEntry(
    'Violet',
    '#800080',
    10000000,
    7,
    0.1
  );
  static readonly GREY = new ResistorColorEntry(
    'Grey',
    '#808080',
    100000000,
    8
  );
  static readonly WHITE = new ResistorColorEntry(
    'White',
    '#FFFFFF',
    1000000000,
    9
  );
  static readonly GOLD = new ResistorColorEntry(
    'Gold',
    '#AB8D3F',
    0.1,
    undefined,
    5
  );
  static readonly SILVER = new ResistorColorEntry(
    'Silver',
    '#C0C0C0',
    0.01,
    undefined,
    10
  );

  static readonly colorTable: ResistorColorEntry[] = [
    Resistor.BLACK,
    Resistor.BROWN,
    Resistor.RED,
    Resistor.ORANGE,
    Resistor.YELLOW,
    Resistor.GREEN,
    Resistor.BLUE,
    Resistor.VIOLET,
    Resistor.GREY,
    Resistor.WHITE,
    Resistor.GOLD,
    Resistor.SILVER,
  ];

  static readonly INVALID_RESISTOR = -1;

  /**
   * getValue assumes there is no tolerance band, as tolerance is not part of
   * the value calculation
   */
  static getValue(colors: ResistorColorEntry[]) {
    if (colors.length < 3 || colors.length > 4) {
      throw new RangeError('Invalid resistor size');
    }

    // Should we throw an error if the first color is black?  In resistors, it's
    // technically not allowed, but in puzzle events who knows what they'll do.
    // The math works out fine (it's just a leading zero), so for now it's
    // allowed.

    // Iterate through all but the final band (the multipler) and extract the
    // values
    let value = 0;
    for (let i = 0; i < colors.length - 1; ++i) {
      const currentColor = colors[i];
      if (currentColor.value === undefined) {
        return Resistor.INVALID_RESISTOR;
      }

      value *= 10;
      value += currentColor.value;
    }

    return Resistor.applyMultiplier(
      value,
      colors[colors.length - 1].multiplier
    );
  }

  static getDisplayValue(value: number) {
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

  private static applyMultiplier(value: number, multipler: number) {
    if (multipler >= 1) {
      return value * multipler;
    } else if (multipler > 0) {
      // Avoid floating point multiplication issues
      return value / (1 / multipler);
    } else {
      throw new RangeError('Invalid multiplier');
    }
  }
}
