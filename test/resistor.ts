import {describe, it, expect} from 'vitest';
import {Resistor} from '../src';

describe('Resistor', () => {
  it('Valid 3 Color Resistors', () => {
    expect(
      Resistor.getValue([Resistor.BROWN, Resistor.BLACK, Resistor.ORANGE]),
    ).toBe(10000);
    expect(
      Resistor.getValue([Resistor.GREEN, Resistor.BLUE, Resistor.RED]),
    ).toBe(5600);
    expect(
      Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.BROWN]),
    ).toBe(230);
    expect(
      Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.BLUE]),
    ).toBe(23000000);
    expect(
      Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.VIOLET]),
    ).toBe(230000000);
    expect(
      Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.GREY]),
    ).toBe(2300000000);
    expect(
      Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.WHITE]),
    ).toBe(23000000000);
  });

  it('Valid 4 Color Resistors', () => {
    expect(
      Resistor.getValue([
        Resistor.BROWN,
        Resistor.YELLOW,
        Resistor.VIOLET,
        Resistor.BLACK,
      ]),
    ).toBe(147);
    expect(
      Resistor.getValue([
        Resistor.GREY,
        Resistor.WHITE,
        Resistor.VIOLET,
        Resistor.GREEN,
      ]),
    ).toBe(89700000);
  });

  it('Leading Black', () => {
    expect(
      Resistor.getValue([Resistor.BLACK, Resistor.BLACK, Resistor.BLACK]),
    ).toBe(0);
    expect(
      Resistor.getValue([Resistor.BLACK, Resistor.BROWN, Resistor.BLACK]),
    ).toBe(1);
  });

  it('Invalid Resistors', () => {
    expect(Resistor.getValue([Resistor.GOLD, Resistor.RED, Resistor.RED])).toBe(
      Resistor.INVALID_RESISTOR,
    );
    expect(
      Resistor.getValue([
        Resistor.ORANGE,
        Resistor.RED,
        Resistor.SILVER,
        Resistor.YELLOW,
      ]),
    ).toBe(Resistor.INVALID_RESISTOR);
  });

  it('Tolerance', () => {
    expect(Resistor.GOLD.hasTolerance()).toBe(true);
    expect(Resistor.BLACK.hasTolerance()).toBe(false);
  });

  it('Value', () => {
    expect(Resistor.GOLD.hasValue()).toBe(false);
    expect(Resistor.BLACK.hasValue()).toBe(true);
  });

  it('Too Short', () => {
    expect(() => Resistor.getValue([])).toThrow(/Invalid resistor size/);
    expect(() => Resistor.getValue([Resistor.RED, Resistor.RED])).toThrow(
      /Invalid resistor size/,
    );
  });

  it('Too Long', () => {
    expect(() =>
      Resistor.getValue([
        Resistor.RED,
        Resistor.ORANGE,
        Resistor.YELLOW,
        Resistor.GREEN,
        Resistor.BLUE,
      ]),
    ).toThrow(/Invalid resistor size/);
  });

  it('Tolerance display', () => {
    expect(Resistor.GOLD.getDisplayTolerance()).toBe('5%');
  });

  it('Rounding', () => {
    expect(
      Resistor.getValue([
        Resistor.YELLOW,
        Resistor.GREEN,
        Resistor.WHITE,
        Resistor.GOLD,
      ]),
    ).toBe(45.9);
  });

  it('Display Values', () => {
    expect(Resistor.getDisplayValue(0)).toBe('0');
    expect(Resistor.getDisplayValue(0.3)).toBe('0.3');
    expect(Resistor.getDisplayValue(1)).toBe('1');
    expect(Resistor.getDisplayValue(999)).toBe('999');
    expect(Resistor.getDisplayValue(1000)).toBe('1k');
    expect(Resistor.getDisplayValue(1200)).toBe('1.2k');
    expect(Resistor.getDisplayValue(30000000)).toBe('30M');
    expect(Resistor.getDisplayValue(45900000000)).toBe('45.9G');
  });
});
