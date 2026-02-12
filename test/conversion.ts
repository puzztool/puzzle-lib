import {describe, it, expect} from 'vitest';
import {
  CharacterConversion,
  CharacterEncoding,
  CharacterAutoConvert,
  StringAutoConvert,
  SignificantFigures,
} from '../src';

describe('Conversions', () => {
  describe('StringAutoConvert', () => {
    it('determineStringEncoding', () => {
      const ordinal = StringAutoConvert.determineStringEncoding('12 13 65');
      expect(ordinal).toBe(CharacterEncoding.Ordinal);

      const ascii = StringAutoConvert.determineStringEncoding('65 83 43 j');
      expect(ascii).toBe(CharacterEncoding.Ascii);

      const variedSpacing = StringAutoConvert.determineStringEncoding(
        '00010      00001 10010',
      );
      expect(variedSpacing).toBe(CharacterEncoding.FiveBitBinary);

      const ternary =
        StringAutoConvert.determineStringEncoding('100 120 222 001');
      expect(ternary).toBe(CharacterEncoding.Ternary);

      const none = StringAutoConvert.determineStringEncoding('999 999 999');
      expect(none).toBe(CharacterEncoding.None);

      const empty = StringAutoConvert.determineStringEncoding('');
      expect(empty).toBe(CharacterEncoding.None);
    });

    it('convertString - consistent encoding', () => {
      const foo = StringAutoConvert.convertString('foo', true);
      expect(foo).toBe('foo');

      const variedSpacing = StringAutoConvert.convertString(
        '00010    00001 10010',
        true,
      );
      expect(variedSpacing).toBe('BAR');

      const variedEncoding = StringAutoConvert.convertString(
        '00010 00001 26',
        true,
      );
      expect(variedEncoding).toBe('BA');

      const planet = StringAutoConvert.convertString(
        '01010000 01001100 01000001 01001110 01000101 01010100',
        true,
      );
      expect(planet).toBe('PLANET');

      const fooTernary = StringAutoConvert.convertString('020 120 120', true);
      expect(fooTernary).toBe('FOO');
    });

    it('convertString - varied encoding', () => {
      const noEncoding = StringAutoConvert.convertString('999 999', false);
      expect(noEncoding).toBe('');

      const express = StringAutoConvert.convertString(
        '01000101 24 121 10010 5    SS',
        false,
      );
      expect(express).toBe('EXPRESS');
    });
  });

  describe('CharacterAutoConvert', () => {
    it('determineCharacterEncoding', () => {
      const latin = CharacterAutoConvert.determineCharacterEncoding('L');
      expect(latin).toBe(CharacterEncoding.Latin);

      const ordinal = CharacterAutoConvert.determineCharacterEncoding('12');
      expect(ordinal).toBe(CharacterEncoding.Ordinal);

      const fiveBit = CharacterAutoConvert.determineCharacterEncoding('01100');
      expect(fiveBit).toBe(CharacterEncoding.FiveBitBinary);

      const ternary = CharacterAutoConvert.determineCharacterEncoding('011');
      expect(ternary).toBe(CharacterEncoding.Ternary);

      const eightBit =
        CharacterAutoConvert.determineCharacterEncoding('01101100');
      expect(eightBit).toBe(CharacterEncoding.EightBitBinary);

      const eightBitLen7 =
        CharacterAutoConvert.determineCharacterEncoding('1000011');
      expect(eightBitLen7).toBe(CharacterEncoding.EightBitBinary);

      const ascii = CharacterAutoConvert.determineCharacterEncoding('76');
      expect(ascii).toBe(CharacterEncoding.Ascii);

      const none = CharacterAutoConvert.determineCharacterEncoding('999');
      expect(none).toBe(CharacterEncoding.None);
    });

    it('determineCharacterEncoding - Ambigious Cases', () => {
      // Overlap between ascii and binary and ternary
      const asciiE = CharacterAutoConvert.determineCharacterEncoding('101');
      expect(asciiE).toBe(CharacterEncoding.Ternary);

      // Overlap between ascii and binary
      const binaryE = CharacterAutoConvert.determineCharacterEncoding('00101');
      expect(binaryE).toBe(CharacterEncoding.FiveBitBinary);

      // Overlap between binary and ordinal
      const ordinalA = CharacterAutoConvert.determineCharacterEncoding('1');
      expect(ordinalA).toBe(CharacterEncoding.Ordinal);
    });

    it('convertCharacter', () => {
      const latin = CharacterAutoConvert.convertCharacter('A');
      expect(latin).toBe('A');

      const ordinalA = CharacterAutoConvert.convertCharacter('1');
      expect(ordinalA).toBe('A');

      const ordinalZ = CharacterAutoConvert.convertCharacter('26');
      expect(ordinalZ).toBe('Z');

      const fiveBitA = CharacterAutoConvert.convertCharacter('00001');
      expect(fiveBitA).toBe('A');

      const fiveBitZ = CharacterAutoConvert.convertCharacter('11010');
      expect(fiveBitZ).toBe('Z');

      const eightBitA = CharacterAutoConvert.convertCharacter('01100001');
      expect(eightBitA).toBe('a');

      const eightBitZ = CharacterAutoConvert.convertCharacter('01011010');
      expect(eightBitZ).toBe('Z');

      const ternaryA = CharacterAutoConvert.convertCharacter('001');
      expect(ternaryA).toBe('A');

      const ternaryZ = CharacterAutoConvert.convertCharacter('222');
      expect(ternaryZ).toBe('Z');

      const eightBitTruncatedC =
        CharacterAutoConvert.convertCharacter('1000011');
      expect(eightBitTruncatedC).toBe('C');

      const unknown = CharacterAutoConvert.convertCharacter('999');
      expect(unknown).toBe('');

      const asciiMiddle = CharacterAutoConvert.convertCharacter('136');
      expect(asciiMiddle).toBe('');
    });

    it('forceCharacterEncoding', () => {
      const fiveBitA = CharacterAutoConvert.convertCharacter(
        '1',
        CharacterEncoding.FiveBitBinary,
      );
      expect(fiveBitA).toBe('A');

      const fiveBitD = CharacterAutoConvert.convertCharacter(
        '100',
        CharacterEncoding.FiveBitBinary,
      );
      expect(fiveBitD).toBe('D');

      const ternaryD = CharacterAutoConvert.convertCharacter(
        '11',
        CharacterEncoding.Ternary,
      );
      expect(ternaryD).toBe('D');

      const eightBitD = CharacterAutoConvert.convertCharacter(
        '1000100',
        CharacterEncoding.EightBitBinary,
      );
      expect(eightBitD).toBe('D');
    });

    it('nonPrintable', () => {
      const asciiControl = CharacterAutoConvert.convertCharacter(
        '28',
        CharacterEncoding.Ascii,
      );
      expect(asciiControl).toBe('');

      const asciiDel = CharacterAutoConvert.convertCharacter(
        '127',
        CharacterEncoding.Ascii,
      );
      expect(asciiDel).toBe('');
    });
  });

  describe('CharacterConversion', () => {
    it('getAsciiTable - Basic tests', () => {
      const table = CharacterConversion.getAsciiTable();
      const entry0 = table[0];
      expect(entry0.character).toBe('0');
      expect(entry0.binary).toBe('0110000');
      expect(entry0.ternary).toBe('01210');
      expect(entry0.octal).toBe('060');
      expect(entry0.decimal).toBe('048');
      expect(entry0.hexadecimal).toBe('30');

      const entry9 = table[9];
      expect(entry9.character).toBe('9');
      expect(entry9.binary).toBe('0111001');
      expect(entry9.ternary).toBe('02010');
      expect(entry9.octal).toBe('071');
      expect(entry9.decimal).toBe('057');
      expect(entry9.hexadecimal).toBe('39');

      const entryA = table[10];
      expect(entryA.character).toBe('A');
      expect(entryA.binary).toBe('1000001');
      expect(entryA.ternary).toBe('02102');
      expect(entryA.octal).toBe('101');
      expect(entryA.decimal).toBe('065');
      expect(entryA.hexadecimal).toBe('41');

      const entryZ = table[35];
      expect(entryZ.character).toBe('Z');
      expect(entryZ.binary).toBe('1011010');
      expect(entryZ.ternary).toBe('10100');
      expect(entryZ.octal).toBe('132');
      expect(entryZ.decimal).toBe('090');
      expect(entryZ.hexadecimal).toBe('5a');

      const entrya = table[36];
      expect(entrya.character).toBe('a');
      expect(entrya.binary).toBe('1100001');
      expect(entrya.ternary).toBe('10121');
      expect(entrya.octal).toBe('141');
      expect(entrya.decimal).toBe('097');
      expect(entrya.hexadecimal).toBe('61');

      const entryz = table[61];
      expect(entryz.character).toBe('z');
      expect(entryz.binary).toBe('1111010');
      expect(entryz.ternary).toBe('11112');
      expect(entryz.octal).toBe('172');
      expect(entryz.decimal).toBe('122');
      expect(entryz.hexadecimal).toBe('7a');
    });

    it('getOrdinalTable - Basic tests', () => {
      const table = CharacterConversion.getOrdinalTable();
      const entryA = table[0];
      expect(entryA.character).toBe('A');
      expect(entryA.binary).toBe('00001');
      expect(entryA.ternary).toBe('001');
      expect(entryA.octal).toBe('01');
      expect(entryA.decimal).toBe('01');
      expect(entryA.hexadecimal).toBe('01');

      const entryZ = table[25];
      expect(entryZ.character).toBe('Z');
      expect(entryZ.binary).toBe('11010');
      expect(entryZ.ternary).toBe('222');
      expect(entryZ.octal).toBe('32');
      expect(entryZ.decimal).toBe('26');
      expect(entryZ.hexadecimal).toBe('1a');
    });

    it('toAscii - Basic tests', () => {
      expect(CharacterConversion.toAscii('0')).toBe(48);
      expect(CharacterConversion.toAscii('9')).toBe(57);
      expect(CharacterConversion.toAscii('A')).toBe(65);
      expect(CharacterConversion.toAscii('Z')).toBe(90);
      expect(CharacterConversion.toAscii('a')).toBe(97);
      expect(CharacterConversion.toAscii('z')).toBe(122);
    });

    it('toAscii - Invalid tests', () => {
      expect(CharacterConversion.toAscii(String.fromCharCode(128))).toBe(-1);
      expect(CharacterConversion.toAscii(String.fromCharCode(256))).toBe(-1);
    });

    it('toAscii - Error tests', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (CharacterConversion as any).toAscii()).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (CharacterConversion as any).toAscii(null)).toThrow(
        /A single character is required/,
      );
      expect(() => CharacterConversion.toAscii('')).toThrow(
        /A single character is required/,
      );
      expect(() => CharacterConversion.toAscii('ab')).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (CharacterConversion as any).toAscii(0)).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (CharacterConversion as any).toAscii(false)).toThrow(
        /A single character is required/,
      );
    });

    it('toOrdinal - Basic tests', () => {
      expect(CharacterConversion.toOrdinal('A')).toBe(1);
      expect(CharacterConversion.toOrdinal('Z')).toBe(26);
      expect(CharacterConversion.toOrdinal('a')).toBe(1);
      expect(CharacterConversion.toOrdinal('z')).toBe(26);
    });

    it('toOrdinal - Invalid tests', () => {
      expect(CharacterConversion.toOrdinal('0')).toBe(-1);
      expect(CharacterConversion.toOrdinal('9')).toBe(-1);
      expect(CharacterConversion.toOrdinal('@')).toBe(-1);
      expect(CharacterConversion.toOrdinal('[')).toBe(-1);
      expect(CharacterConversion.toOrdinal('`')).toBe(-1);
      expect(CharacterConversion.toOrdinal('{')).toBe(-1);
    });

    it('toOrdinal - Error tests', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (CharacterConversion as any).toOrdinal()).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (CharacterConversion as any).toOrdinal(null)).toThrow(
        /A single character is required/,
      );
      expect(() => CharacterConversion.toOrdinal('')).toThrow(
        /A single character is required/,
      );
      expect(() => CharacterConversion.toOrdinal('ab')).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (CharacterConversion as any).toOrdinal(0)).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (CharacterConversion as any).toOrdinal(false)).toThrow(
        /A single character is required/,
      );
    });
  });

  describe('SignificantFigures', () => {
    it('ceil - Positive numbers', () => {
      // Zero
      expect(SignificantFigures.ceil(0, 10)).toBe(0);

      // Integers
      expect(SignificantFigures.ceil(90000, 2)).toBe(90000);
      expect(SignificantFigures.ceil(98000, 2)).toBe(98000);
      expect(SignificantFigures.ceil(98001, 2)).toBe(99000);
      expect(SignificantFigures.ceil(98101, 3)).toBe(98200);
      expect(SignificantFigures.ceil(98001, 6)).toBe(98001);

      // Floating point
      expect(SignificantFigures.ceil(1.1, 2)).toBe(1.1);
      expect(SignificantFigures.ceil(1.11, 2)).toBe(1.2);
      expect(SignificantFigures.ceil(0.1, 1)).toBe(0.1);
      expect(SignificantFigures.ceil(0.11, 1)).toBe(0.2);
    });

    it('ceil - Negative numbers', () => {
      // Integers
      expect(SignificantFigures.ceil(-90000, 2)).toBe(-90000);
      expect(SignificantFigures.ceil(-98000, 2)).toBe(-98000);
      expect(SignificantFigures.ceil(-98999, 2)).toBe(-98000);
      expect(SignificantFigures.ceil(-98199, 3)).toBe(-98100);
      expect(SignificantFigures.ceil(-98001, 6)).toBe(-98001);

      // Floating point
      expect(SignificantFigures.ceil(-1.9, 2)).toBe(-1.9);
      expect(SignificantFigures.ceil(-1.99, 2)).toBe(-1.9);
      expect(SignificantFigures.ceil(-0.9, 1)).toBe(-0.9);
      expect(SignificantFigures.ceil(-0.99, 1)).toBe(-0.9);
    });

    it('floor - Positive numbers', () => {
      // Zero
      expect(SignificantFigures.floor(0, 10)).toBe(0);

      // Integers
      expect(SignificantFigures.floor(90000, 2)).toBe(90000);
      expect(SignificantFigures.floor(98000, 2)).toBe(98000);
      expect(SignificantFigures.floor(98999, 2)).toBe(98000);
      expect(SignificantFigures.floor(98199, 3)).toBe(98100);
      expect(SignificantFigures.floor(98999, 6)).toBe(98999);

      // Floating point
      expect(SignificantFigures.floor(1.9, 2)).toBe(1.9);
      expect(SignificantFigures.floor(1.99, 2)).toBe(1.9);
      expect(SignificantFigures.floor(0.9, 1)).toBe(0.9);
      expect(SignificantFigures.floor(0.99, 1)).toBe(0.9);
    });

    it('floor - Negative numbers', () => {
      // Integers
      expect(SignificantFigures.floor(-90000, 2)).toBe(-90000);
      expect(SignificantFigures.floor(-98000, 2)).toBe(-98000);
      expect(SignificantFigures.floor(-98001, 2)).toBe(-99000);
      expect(SignificantFigures.floor(-98101, 3)).toBe(-98200);
      expect(SignificantFigures.floor(-98001, 6)).toBe(-98001);

      // Floating point
      expect(SignificantFigures.floor(-1.1, 2)).toBe(-1.1);
      expect(SignificantFigures.floor(-1.11, 2)).toBe(-1.2);
      expect(SignificantFigures.floor(-0.1, 1)).toBe(-0.1);
      expect(SignificantFigures.floor(-0.11, 1)).toBe(-0.2);
    });

    it('round - Positive numbers', () => {
      // Zero
      expect(SignificantFigures.round(0, 10)).toBe(0);

      // Integers
      expect(SignificantFigures.round(90000, 2)).toBe(90000);
      expect(SignificantFigures.round(98000, 2)).toBe(98000);
      expect(SignificantFigures.round(98499, 2)).toBe(98000);
      expect(SignificantFigures.round(98500, 2)).toBe(99000);
      expect(SignificantFigures.round(98149, 3)).toBe(98100);
      expect(SignificantFigures.round(98150, 3)).toBe(98200);
      expect(SignificantFigures.round(98499, 6)).toBe(98499);

      // Floating point
      expect(SignificantFigures.round(1.5, 2)).toBe(1.5);
      expect(SignificantFigures.round(1.54, 2)).toBe(1.5);
      expect(SignificantFigures.round(1.55, 2)).toBe(1.6);
      expect(SignificantFigures.round(0.5, 1)).toBe(0.5);
      expect(SignificantFigures.round(0.549, 1)).toBe(0.5);
      expect(SignificantFigures.round(0.55, 1)).toBe(0.6);
    });

    it('round - Negative numbers', () => {
      // Integers
      expect(SignificantFigures.round(-90000, 2)).toBe(-90000);
      expect(SignificantFigures.round(-98000, 2)).toBe(-98000);
      expect(SignificantFigures.round(-98500, 2)).toBe(-98000);
      expect(SignificantFigures.round(-98501, 2)).toBe(-99000);
      expect(SignificantFigures.round(-98150, 3)).toBe(-98100);
      expect(SignificantFigures.round(-98151, 3)).toBe(-98200);
      expect(SignificantFigures.round(-98599, 6)).toBe(-98599);

      // Floating point
      expect(SignificantFigures.round(-1.5, 2)).toBe(-1.5);
      expect(SignificantFigures.round(-1.55, 2)).toBe(-1.5);
      expect(SignificantFigures.round(-1.551, 2)).toBe(-1.6);
      expect(SignificantFigures.round(-0.5, 1)).toBe(-0.5);
      expect(SignificantFigures.round(-0.55, 1)).toBe(-0.5);
      expect(SignificantFigures.round(-0.551, 1)).toBe(-0.6);
    });
  });
});
