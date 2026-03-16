import {describe, it, expect} from 'vitest';
import {
  RESISTOR_COLOR_TABLE,
  INVALID_RESISTOR,
  ResistorColors,
  getResistorValue,
  getResistorDisplayValue,
  hasResistorValue,
  hasResistorTolerance,
} from '../src/resistor/index.js';

const {
  Black: BLACK,
  Brown: BROWN,
  Red: RED,
  Orange: ORANGE,
  Yellow: YELLOW,
  Green: GREEN,
  Blue: BLUE,
  Violet: VIOLET,
  Grey: GREY,
  White: WHITE,
  Gold: GOLD,
  Silver: SILVER,
} = ResistorColors;

describe('Resistor', () => {
  it('Valid 3 Color Resistors', () => {
    expect(getResistorValue([BROWN, BLACK, ORANGE])).toBe(10000);
    expect(getResistorValue([GREEN, BLUE, RED])).toBe(5600);
    expect(getResistorValue([RED, ORANGE, BROWN])).toBe(230);
    expect(getResistorValue([RED, ORANGE, BLUE])).toBe(23000000);
    expect(getResistorValue([RED, ORANGE, VIOLET])).toBe(230000000);
    expect(getResistorValue([RED, ORANGE, GREY])).toBe(2300000000);
    expect(getResistorValue([RED, ORANGE, WHITE])).toBe(23000000000);
  });

  it('Valid 4 Color Resistors', () => {
    expect(getResistorValue([BROWN, YELLOW, VIOLET, BLACK])).toBe(147);
    expect(getResistorValue([GREY, WHITE, VIOLET, GREEN])).toBe(89700000);
  });

  it('Leading Black', () => {
    expect(getResistorValue([BLACK, BLACK, BLACK])).toBe(0);
    expect(getResistorValue([BLACK, BROWN, BLACK])).toBe(1);
  });

  it('Invalid Resistors', () => {
    expect(getResistorValue([GOLD, RED, RED])).toBe(INVALID_RESISTOR);
    expect(getResistorValue([ORANGE, RED, SILVER, YELLOW])).toBe(
      INVALID_RESISTOR,
    );
  });

  it('Tolerance', () => {
    expect(hasResistorTolerance(GOLD)).toBe(true);
    expect(hasResistorTolerance(BLACK)).toBe(false);
  });

  it('Value', () => {
    expect(hasResistorValue(GOLD)).toBe(false);
    expect(hasResistorValue(BLACK)).toBe(true);
  });

  it('Too Short', () => {
    expect(() => getResistorValue([])).toThrow(/Invalid resistor size/);
    expect(() => getResistorValue([RED, RED])).toThrow(/Invalid resistor size/);
  });

  it('Too Long', () => {
    expect(() => getResistorValue([RED, ORANGE, YELLOW, GREEN, BLUE])).toThrow(
      /Invalid resistor size/,
    );
  });

  it('Tolerance display', () => {
    expect(GOLD.toleranceInPercent).toBe(5);
  });

  it('Rounding', () => {
    expect(getResistorValue([YELLOW, GREEN, WHITE, GOLD])).toBe(45.9);
  });

  it('Display Values', () => {
    expect(getResistorDisplayValue(0)).toBe('0');
    expect(getResistorDisplayValue(0.3)).toBe('0.3');
    expect(getResistorDisplayValue(1)).toBe('1');
    expect(getResistorDisplayValue(999)).toBe('999');
    expect(getResistorDisplayValue(1000)).toBe('1k');
    expect(getResistorDisplayValue(1200)).toBe('1.2k');
    expect(getResistorDisplayValue(30000000)).toBe('30M');
    expect(getResistorDisplayValue(45900000000)).toBe('45.9G');
  });

  it('ResistorColors matches RESISTOR_COLOR_TABLE entries', () => {
    expect(ResistorColors.Black).toBe(RESISTOR_COLOR_TABLE[0]);
    expect(ResistorColors.Brown).toBe(RESISTOR_COLOR_TABLE[1]);
    expect(ResistorColors.Red).toBe(RESISTOR_COLOR_TABLE[2]);
    expect(ResistorColors.Orange).toBe(RESISTOR_COLOR_TABLE[3]);
    expect(ResistorColors.Yellow).toBe(RESISTOR_COLOR_TABLE[4]);
    expect(ResistorColors.Green).toBe(RESISTOR_COLOR_TABLE[5]);
    expect(ResistorColors.Blue).toBe(RESISTOR_COLOR_TABLE[6]);
    expect(ResistorColors.Violet).toBe(RESISTOR_COLOR_TABLE[7]);
    expect(ResistorColors.Grey).toBe(RESISTOR_COLOR_TABLE[8]);
    expect(ResistorColors.White).toBe(RESISTOR_COLOR_TABLE[9]);
    expect(ResistorColors.Gold).toBe(RESISTOR_COLOR_TABLE[10]);
    expect(ResistorColors.Silver).toBe(RESISTOR_COLOR_TABLE[11]);
  });
});
