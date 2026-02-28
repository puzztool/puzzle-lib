import {describe, it, expect} from 'vitest';
import {
  toAscii,
  toOrdinal,
  getAsciiTable,
  getOrdinalTable,
  CharacterEncoding,
  convertCharacter,
  convertString,
  determineCharacterEncoding,
  determineStringEncoding,
  sigFigCeil,
  sigFigFloor,
  sigFigRound,
} from '../src';

describe('Conversions', () => {
  describe('convertString / determineStringEncoding', () => {
    it('determineStringEncoding', () => {
      expect(determineStringEncoding('12 13 65')).toBe(
        CharacterEncoding.Ordinal,
      );
      expect(determineStringEncoding('65 83 43 j')).toBe(
        CharacterEncoding.Ascii,
      );
      expect(determineStringEncoding('00010      00001 10010')).toBe(
        CharacterEncoding.FiveBitBinary,
      );
      expect(determineStringEncoding('100 120 222 001')).toBe(
        CharacterEncoding.Ternary,
      );
      expect(determineStringEncoding('999 999 999')).toBe(
        CharacterEncoding.None,
      );
      expect(determineStringEncoding('')).toBe(CharacterEncoding.None);
    });

    it('convertString - consistent encoding', () => {
      expect(convertString('foo', true)).toBe('foo');
      expect(convertString('00010    00001 10010', true)).toBe('BAR');
      expect(convertString('00010 00001 26', true)).toBe('BA');
      expect(
        convertString(
          '01010000 01001100 01000001 01001110 01000101 01010100',
          true,
        ),
      ).toBe('PLANET');
      expect(convertString('020 120 120', true)).toBe('FOO');
    });

    it('convertString - varied encoding', () => {
      expect(convertString('999 999', false)).toBe('');
      expect(convertString('01000101 24 121 10010 5    SS', false)).toBe(
        'EXPRESS',
      );
    });
  });

  describe('convertCharacter / determineCharacterEncoding', () => {
    it('determineCharacterEncoding', () => {
      expect(determineCharacterEncoding('L')).toBe(CharacterEncoding.Latin);
      expect(determineCharacterEncoding('12')).toBe(CharacterEncoding.Ordinal);
      expect(determineCharacterEncoding('01100')).toBe(
        CharacterEncoding.FiveBitBinary,
      );
      expect(determineCharacterEncoding('011')).toBe(CharacterEncoding.Ternary);
      expect(determineCharacterEncoding('01101100')).toBe(
        CharacterEncoding.EightBitBinary,
      );
      expect(determineCharacterEncoding('1000011')).toBe(
        CharacterEncoding.EightBitBinary,
      );
      expect(determineCharacterEncoding('76')).toBe(CharacterEncoding.Ascii);
      expect(determineCharacterEncoding('999')).toBe(CharacterEncoding.None);
    });

    it('determineCharacterEncoding - Ambigious Cases', () => {
      expect(determineCharacterEncoding('101')).toBe(CharacterEncoding.Ternary);
      expect(determineCharacterEncoding('00101')).toBe(
        CharacterEncoding.FiveBitBinary,
      );
      expect(determineCharacterEncoding('1')).toBe(CharacterEncoding.Ordinal);
    });

    it('convertCharacter', () => {
      expect(convertCharacter('A')).toBe('A');
      expect(convertCharacter('1')).toBe('A');
      expect(convertCharacter('26')).toBe('Z');
      expect(convertCharacter('00001')).toBe('A');
      expect(convertCharacter('11010')).toBe('Z');
      expect(convertCharacter('01100001')).toBe('a');
      expect(convertCharacter('01011010')).toBe('Z');
      expect(convertCharacter('001')).toBe('A');
      expect(convertCharacter('222')).toBe('Z');
      expect(convertCharacter('1000011')).toBe('C');
      expect(convertCharacter('999')).toBe('');
      expect(convertCharacter('136')).toBe('');
    });

    it('forceCharacterEncoding', () => {
      expect(convertCharacter('1', CharacterEncoding.FiveBitBinary)).toBe('A');
      expect(convertCharacter('100', CharacterEncoding.FiveBitBinary)).toBe(
        'D',
      );
      expect(convertCharacter('11', CharacterEncoding.Ternary)).toBe('D');
      expect(
        convertCharacter('1000100', CharacterEncoding.EightBitBinary),
      ).toBe('D');
    });

    it('nonPrintable', () => {
      expect(convertCharacter('28', CharacterEncoding.Ascii)).toBe('');
      expect(convertCharacter('127', CharacterEncoding.Ascii)).toBe('');
    });
  });

  describe('toAscii / toOrdinal / tables', () => {
    it('getAsciiTable - Basic tests', () => {
      const table = getAsciiTable();
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
      const table = getOrdinalTable();
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
      expect(toAscii('0')).toBe(48);
      expect(toAscii('9')).toBe(57);
      expect(toAscii('A')).toBe(65);
      expect(toAscii('Z')).toBe(90);
      expect(toAscii('a')).toBe(97);
      expect(toAscii('z')).toBe(122);
    });

    it('toAscii - Invalid tests', () => {
      expect(toAscii(String.fromCharCode(128))).toBe(-1);
      expect(toAscii(String.fromCharCode(256))).toBe(-1);
    });

    it('toAscii - Error tests', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (toAscii as any)()).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (toAscii as any)(null)).toThrow(
        /A single character is required/,
      );
      expect(() => toAscii('')).toThrow(/A single character is required/);
      expect(() => toAscii('ab')).toThrow(/A single character is required/);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (toAscii as any)(0)).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (toAscii as any)(false)).toThrow(
        /A single character is required/,
      );
    });

    it('toOrdinal - Basic tests', () => {
      expect(toOrdinal('A')).toBe(1);
      expect(toOrdinal('Z')).toBe(26);
      expect(toOrdinal('a')).toBe(1);
      expect(toOrdinal('z')).toBe(26);
    });

    it('toOrdinal - Invalid tests', () => {
      expect(toOrdinal('0')).toBe(-1);
      expect(toOrdinal('9')).toBe(-1);
      expect(toOrdinal('@')).toBe(-1);
      expect(toOrdinal('[')).toBe(-1);
      expect(toOrdinal('`')).toBe(-1);
      expect(toOrdinal('{')).toBe(-1);
    });

    it('toOrdinal - Error tests', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (toOrdinal as any)()).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (toOrdinal as any)(null)).toThrow(
        /A single character is required/,
      );
      expect(() => toOrdinal('')).toThrow(/A single character is required/);
      expect(() => toOrdinal('ab')).toThrow(/A single character is required/);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (toOrdinal as any)(0)).toThrow(
        /A single character is required/,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => (toOrdinal as any)(false)).toThrow(
        /A single character is required/,
      );
    });
  });

  describe('sigFigCeil / sigFigFloor / sigFigRound', () => {
    it('ceil - Positive numbers', () => {
      expect(sigFigCeil(0, 10)).toBe(0);
      expect(sigFigCeil(90000, 2)).toBe(90000);
      expect(sigFigCeil(98000, 2)).toBe(98000);
      expect(sigFigCeil(98001, 2)).toBe(99000);
      expect(sigFigCeil(98101, 3)).toBe(98200);
      expect(sigFigCeil(98001, 6)).toBe(98001);
      expect(sigFigCeil(1.1, 2)).toBe(1.1);
      expect(sigFigCeil(1.11, 2)).toBe(1.2);
      expect(sigFigCeil(0.1, 1)).toBe(0.1);
      expect(sigFigCeil(0.11, 1)).toBe(0.2);
    });

    it('ceil - Negative numbers', () => {
      expect(sigFigCeil(-90000, 2)).toBe(-90000);
      expect(sigFigCeil(-98000, 2)).toBe(-98000);
      expect(sigFigCeil(-98999, 2)).toBe(-98000);
      expect(sigFigCeil(-98199, 3)).toBe(-98100);
      expect(sigFigCeil(-98001, 6)).toBe(-98001);
      expect(sigFigCeil(-1.9, 2)).toBe(-1.9);
      expect(sigFigCeil(-1.99, 2)).toBe(-1.9);
      expect(sigFigCeil(-0.9, 1)).toBe(-0.9);
      expect(sigFigCeil(-0.99, 1)).toBe(-0.9);
    });

    it('floor - Positive numbers', () => {
      expect(sigFigFloor(0, 10)).toBe(0);
      expect(sigFigFloor(90000, 2)).toBe(90000);
      expect(sigFigFloor(98000, 2)).toBe(98000);
      expect(sigFigFloor(98999, 2)).toBe(98000);
      expect(sigFigFloor(98199, 3)).toBe(98100);
      expect(sigFigFloor(98999, 6)).toBe(98999);
      expect(sigFigFloor(1.9, 2)).toBe(1.9);
      expect(sigFigFloor(1.99, 2)).toBe(1.9);
      expect(sigFigFloor(0.9, 1)).toBe(0.9);
      expect(sigFigFloor(0.99, 1)).toBe(0.9);
    });

    it('floor - Negative numbers', () => {
      expect(sigFigFloor(-90000, 2)).toBe(-90000);
      expect(sigFigFloor(-98000, 2)).toBe(-98000);
      expect(sigFigFloor(-98001, 2)).toBe(-99000);
      expect(sigFigFloor(-98101, 3)).toBe(-98200);
      expect(sigFigFloor(-98001, 6)).toBe(-98001);
      expect(sigFigFloor(-1.1, 2)).toBe(-1.1);
      expect(sigFigFloor(-1.11, 2)).toBe(-1.2);
      expect(sigFigFloor(-0.1, 1)).toBe(-0.1);
      expect(sigFigFloor(-0.11, 1)).toBe(-0.2);
    });

    it('round - Positive numbers', () => {
      expect(sigFigRound(0, 10)).toBe(0);
      expect(sigFigRound(90000, 2)).toBe(90000);
      expect(sigFigRound(98000, 2)).toBe(98000);
      expect(sigFigRound(98499, 2)).toBe(98000);
      expect(sigFigRound(98500, 2)).toBe(99000);
      expect(sigFigRound(98149, 3)).toBe(98100);
      expect(sigFigRound(98150, 3)).toBe(98200);
      expect(sigFigRound(98499, 6)).toBe(98499);
      expect(sigFigRound(1.5, 2)).toBe(1.5);
      expect(sigFigRound(1.54, 2)).toBe(1.5);
      expect(sigFigRound(1.55, 2)).toBe(1.6);
      expect(sigFigRound(0.5, 1)).toBe(0.5);
      expect(sigFigRound(0.549, 1)).toBe(0.5);
      expect(sigFigRound(0.55, 1)).toBe(0.6);
    });

    it('round - Negative numbers', () => {
      expect(sigFigRound(-90000, 2)).toBe(-90000);
      expect(sigFigRound(-98000, 2)).toBe(-98000);
      expect(sigFigRound(-98500, 2)).toBe(-98000);
      expect(sigFigRound(-98501, 2)).toBe(-99000);
      expect(sigFigRound(-98150, 3)).toBe(-98100);
      expect(sigFigRound(-98151, 3)).toBe(-98200);
      expect(sigFigRound(-98599, 6)).toBe(-98599);
      expect(sigFigRound(-1.5, 2)).toBe(-1.5);
      expect(sigFigRound(-1.55, 2)).toBe(-1.5);
      expect(sigFigRound(-1.551, 2)).toBe(-1.6);
      expect(sigFigRound(-0.5, 1)).toBe(-0.5);
      expect(sigFigRound(-0.55, 1)).toBe(-0.5);
      expect(sigFigRound(-0.551, 1)).toBe(-0.6);
    });
  });
});
