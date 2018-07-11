/* global describe, it */

const assert = require('assert');
const {
  CharacterConversion,
  CharacterEncoding,
  CharacterAutoConvert,
  StringAutoConvert,
  SignificantFigures
} = require('../');

describe('Conversions', function () {
  describe('StringAutoConvert', function () {
    it('determineStringEncoding', function () {
      const ordinal = StringAutoConvert.determineStringEncoding('12 13 65');
      assert.strictEqual(ordinal, CharacterEncoding.Ordinal);

      const ascii = StringAutoConvert.determineStringEncoding('65 83 43 j');
      assert.strictEqual(ascii, CharacterEncoding.Ascii);

      const variedSpacing = StringAutoConvert.determineStringEncoding('00010      00001 10010');
      assert.strictEqual(variedSpacing, CharacterEncoding.FiveBitBinary);

      const none = StringAutoConvert.determineStringEncoding('999 999 999');
      assert.strictEqual(none, CharacterEncoding.None);

      const empty = StringAutoConvert.determineStringEncoding('');
      assert.strictEqual(empty, CharacterEncoding.None);
    });

    it('convertString - consistent encoding', function () {
      const foo = StringAutoConvert.convertString('foo', true);
      assert.strictEqual(foo, 'foo');

      const variedSpacing = StringAutoConvert.convertString('00010    00001 10010', true);
      assert.strictEqual(variedSpacing, 'BAR');

      const variedEncoding = StringAutoConvert.convertString('00010 00001 26', true);
      assert.strictEqual(variedEncoding, 'BA');

      const planet = StringAutoConvert.convertString('01010000 01001100 01000001 01001110 01000101 01010100', true);
      assert.strictEqual('PLANET', planet);
    });

    it('convertString - varied encoding', function () {
      const noEncoding = StringAutoConvert.convertString('999 999');
      assert.strictEqual('', noEncoding);

      const express = StringAutoConvert.convertString('01000101 24 16 10010 5    SS', false);
      assert.strictEqual('EXPRESS', express);
    });
  });

  describe('CharacterAutoConvert', function () {
    it('determineCharacterEncoding', function () {
      const latin = CharacterAutoConvert.determineCharacterEncoding('L');
      assert.strictEqual(latin, CharacterEncoding.Latin);

      const ordinal = CharacterAutoConvert.determineCharacterEncoding('12');
      assert.strictEqual(ordinal, CharacterEncoding.Ordinal);

      const fiveBit = CharacterAutoConvert.determineCharacterEncoding('01100');
      assert.strictEqual(fiveBit, CharacterEncoding.FiveBitBinary);

      const eightBit = CharacterAutoConvert.determineCharacterEncoding('01101100');
      assert.strictEqual(eightBit, CharacterEncoding.EightBitBinary);

      const ascii = CharacterAutoConvert.determineCharacterEncoding('76');
      assert.strictEqual(ascii, CharacterEncoding.Ascii);

      const none = CharacterAutoConvert.determineCharacterEncoding('999');
      assert.strictEqual(none, CharacterEncoding.None);
    });

    it('determineCharacterEncoding - Ambigious Cases', function () {
      // Overlap between ascii and binary
      const asciiE = CharacterAutoConvert.determineCharacterEncoding('101');
      assert.strictEqual(asciiE, CharacterEncoding.Ascii);

      // Overlap between ascii and binary
      const binaryE = CharacterAutoConvert.determineCharacterEncoding('00101');
      assert.strictEqual(binaryE, CharacterEncoding.FiveBitBinary);

      // Overlap between binary and ordinal
      const ordinalA = CharacterAutoConvert.determineCharacterEncoding('1');
      assert.strictEqual(ordinalA, CharacterEncoding.Ordinal);
    });

    it('convertCharacter', function () {
      const latin = CharacterAutoConvert.convertCharacter('A');
      assert.strictEqual(latin, 'A');

      const ordinalA = CharacterAutoConvert.convertCharacter('1');
      assert.strictEqual(ordinalA, 'A');

      const ordinalZ = CharacterAutoConvert.convertCharacter('26');
      assert.strictEqual(ordinalZ, 'Z');

      const fiveBitA = CharacterAutoConvert.convertCharacter('00001');
      assert.strictEqual(fiveBitA, 'A');

      const fiveBitZ = CharacterAutoConvert.convertCharacter('11010');
      assert.strictEqual(fiveBitZ, 'Z');

      const eightBitA = CharacterAutoConvert.convertCharacter('01100001');
      assert.strictEqual(eightBitA, 'a');

      const eightBitZ = CharacterAutoConvert.convertCharacter('01011010');
      assert.strictEqual(eightBitZ, 'Z');

      const unknown = CharacterAutoConvert.convertCharacter('999');
      assert.strictEqual(unknown, '');

      const asciiMiddle = CharacterAutoConvert.convertCharacter('136');
      assert.strictEqual(asciiMiddle, '');
    });

    it('forceCharacterEncoding', function () {
      const fiveBitA = CharacterAutoConvert.convertCharacter('1', CharacterEncoding.FiveBitBinary);
      assert.strictEqual(fiveBitA, 'A');

      const fiveBitD = CharacterAutoConvert.convertCharacter('100', CharacterEncoding.FiveBitBinary);
      assert.strictEqual(fiveBitD, 'D');

      const eightBitD = CharacterAutoConvert.convertCharacter('1000100', CharacterEncoding.EightBitBinary);
      assert.strictEqual(eightBitD, 'D');
    });
  });

  describe('CharacterConversion', function () {
    it('getAsciiTable - Basic tests', function () {
      const table = CharacterConversion.getAsciiTable();
      const entry0 = table[0];
      assert.strictEqual(entry0.character, '0');
      assert.strictEqual(entry0.binary, '0110000');
      assert.strictEqual(entry0.ternary, '01210');
      assert.strictEqual(entry0.octal, '060');
      assert.strictEqual(entry0.decimal, '048');
      assert.strictEqual(entry0.hexadecimal, '30');

      const entry9 = table[9];
      assert.strictEqual(entry9.character, '9');
      assert.strictEqual(entry9.binary, '0111001');
      assert.strictEqual(entry9.ternary, '02010');
      assert.strictEqual(entry9.octal, '071');
      assert.strictEqual(entry9.decimal, '057');
      assert.strictEqual(entry9.hexadecimal, '39');

      const entryA = table[10];
      assert.strictEqual(entryA.character, 'A');
      assert.strictEqual(entryA.binary, '1000001');
      assert.strictEqual(entryA.ternary, '02102');
      assert.strictEqual(entryA.octal, '101');
      assert.strictEqual(entryA.decimal, '065');
      assert.strictEqual(entryA.hexadecimal, '41');

      const entryZ = table[35];
      assert.strictEqual(entryZ.character, 'Z');
      assert.strictEqual(entryZ.binary, '1011010');
      assert.strictEqual(entryZ.ternary, '10100');
      assert.strictEqual(entryZ.octal, '132');
      assert.strictEqual(entryZ.decimal, '090');
      assert.strictEqual(entryZ.hexadecimal, '5a');

      const entrya = table[36];
      assert.strictEqual(entrya.character, 'a');
      assert.strictEqual(entrya.binary, '1100001');
      assert.strictEqual(entrya.ternary, '10121');
      assert.strictEqual(entrya.octal, '141');
      assert.strictEqual(entrya.decimal, '097');
      assert.strictEqual(entrya.hexadecimal, '61');

      const entryz = table[61];
      assert.strictEqual(entryz.character, 'z');
      assert.strictEqual(entryz.binary, '1111010');
      assert.strictEqual(entryz.ternary, '11112');
      assert.strictEqual(entryz.octal, '172');
      assert.strictEqual(entryz.decimal, '122');
      assert.strictEqual(entryz.hexadecimal, '7a');
    });

    it('getOrdinalTable - Basic tests', function () {
      const table = CharacterConversion.getOrdinalTable();
      const entryA = table[0];
      assert.strictEqual(entryA.character, 'A');
      assert.strictEqual(entryA.binary, '00001');
      assert.strictEqual(entryA.ternary, '001');
      assert.strictEqual(entryA.octal, '01');
      assert.strictEqual(entryA.decimal, '01');
      assert.strictEqual(entryA.hexadecimal, '01');

      const entryZ = table[25];
      assert.strictEqual(entryZ.character, 'Z');
      assert.strictEqual(entryZ.binary, '11010');
      assert.strictEqual(entryZ.ternary, '222');
      assert.strictEqual(entryZ.octal, '32');
      assert.strictEqual(entryZ.decimal, '26');
      assert.strictEqual(entryZ.hexadecimal, '1a');
    });

    it('toAscii - Basic tests', function () {
      assert.strictEqual(CharacterConversion.toAscii('0'), 48);
      assert.strictEqual(CharacterConversion.toAscii('9'), 57);
      assert.strictEqual(CharacterConversion.toAscii('A'), 65);
      assert.strictEqual(CharacterConversion.toAscii('Z'), 90);
      assert.strictEqual(CharacterConversion.toAscii('a'), 97);
      assert.strictEqual(CharacterConversion.toAscii('z'), 122);
    });

    it('toAscii - Invalid tests', function () {
      assert.strictEqual(CharacterConversion.toAscii(String.fromCharCode(128)), -1);
      assert.strictEqual(CharacterConversion.toAscii(String.fromCharCode(256)), -1);
    });

    it('toAscii - Error tests', function () {
      assert.throws(() => CharacterConversion.toAscii(), /A single character is required/);
      assert.throws(() => CharacterConversion.toAscii(null), /A single character is required/);
      assert.throws(() => CharacterConversion.toAscii(''), /A single character is required/);
      assert.throws(() => CharacterConversion.toAscii('ab'), /A single character is required/);
      assert.throws(() => CharacterConversion.toAscii(0), /A single character is required/);
      assert.throws(() => CharacterConversion.toAscii(false), /A single character is required/);
    });

    it('toOrdinal - Basic tests', function () {
      assert.strictEqual(CharacterConversion.toOrdinal('A'), 1);
      assert.strictEqual(CharacterConversion.toOrdinal('Z'), 26);
      assert.strictEqual(CharacterConversion.toOrdinal('a'), 1);
      assert.strictEqual(CharacterConversion.toOrdinal('z'), 26);
    });

    it('toOrdinal - Invalid tests', function () {
      assert.strictEqual(CharacterConversion.toOrdinal('0'), -1);
      assert.strictEqual(CharacterConversion.toOrdinal('9'), -1);
      assert.strictEqual(CharacterConversion.toOrdinal('@'), -1);
      assert.strictEqual(CharacterConversion.toOrdinal('['), -1);
      assert.strictEqual(CharacterConversion.toOrdinal('`'), -1);
      assert.strictEqual(CharacterConversion.toOrdinal('{'), -1);
    });

    it('toOrdinal - Error tests', function () {
      assert.throws(() => CharacterConversion.toOrdinal(), /A single character is required/);
      assert.throws(() => CharacterConversion.toOrdinal(null), /A single character is required/);
      assert.throws(() => CharacterConversion.toOrdinal(''), /A single character is required/);
      assert.throws(() => CharacterConversion.toOrdinal('ab'), /A single character is required/);
      assert.throws(() => CharacterConversion.toOrdinal(0), /A single character is required/);
      assert.throws(() => CharacterConversion.toOrdinal(false), /A single character is required/);
    });
  });

  describe('SignificantFigures', function () {
    it('ceil - Positive numbers', function () {
      // Zero
      assert.strictEqual(SignificantFigures.ceil(0, 10), 0);

      // Integers
      assert.strictEqual(SignificantFigures.ceil(90000, 2), 90000);
      assert.strictEqual(SignificantFigures.ceil(98000, 2), 98000);
      assert.strictEqual(SignificantFigures.ceil(98001, 2), 99000);
      assert.strictEqual(SignificantFigures.ceil(98101, 3), 98200);
      assert.strictEqual(SignificantFigures.ceil(98001, 6), 98001);

      // Floating point
      assert.strictEqual(SignificantFigures.ceil(1.1, 2), 1.1);
      assert.strictEqual(SignificantFigures.ceil(1.11, 2), 1.2);
      assert.strictEqual(SignificantFigures.ceil(0.1, 1), 0.1);
      assert.strictEqual(SignificantFigures.ceil(0.11, 1), 0.2);
    });

    it('ceil - Negative numbers', function () {
      // Integers
      assert.strictEqual(SignificantFigures.ceil(-90000, 2), -90000);
      assert.strictEqual(SignificantFigures.ceil(-98000, 2), -98000);
      assert.strictEqual(SignificantFigures.ceil(-98999, 2), -98000);
      assert.strictEqual(SignificantFigures.ceil(-98199, 3), -98100);
      assert.strictEqual(SignificantFigures.ceil(-98001, 6), -98001);

      // Floating point
      assert.strictEqual(SignificantFigures.ceil(-1.9, 2), -1.9);
      assert.strictEqual(SignificantFigures.ceil(-1.99, 2), -1.9);
      assert.strictEqual(SignificantFigures.ceil(-0.9, 1), -0.9);
      assert.strictEqual(SignificantFigures.ceil(-0.99, 1), -0.9);
    });

    it('floor - Positive numbers', function () {
      // Zero
      assert.strictEqual(SignificantFigures.floor(0, 10), 0);

      // Integers
      assert.strictEqual(SignificantFigures.floor(90000, 2), 90000);
      assert.strictEqual(SignificantFigures.floor(98000, 2), 98000);
      assert.strictEqual(SignificantFigures.floor(98999, 2), 98000);
      assert.strictEqual(SignificantFigures.floor(98199, 3), 98100);
      assert.strictEqual(SignificantFigures.floor(98999, 6), 98999);

      // Floating point
      assert.strictEqual(SignificantFigures.floor(1.9, 2), 1.9);
      assert.strictEqual(SignificantFigures.floor(1.99, 2), 1.9);
      assert.strictEqual(SignificantFigures.floor(0.9, 1), 0.9);
      assert.strictEqual(SignificantFigures.floor(0.99, 1), 0.9);
    });

    it('floor - Negative numbers', function () {
      // Integers
      assert.strictEqual(SignificantFigures.floor(-90000, 2), -90000);
      assert.strictEqual(SignificantFigures.floor(-98000, 2), -98000);
      assert.strictEqual(SignificantFigures.floor(-98001, 2), -99000);
      assert.strictEqual(SignificantFigures.floor(-98101, 3), -98200);
      assert.strictEqual(SignificantFigures.floor(-98001, 6), -98001);

      // Floating point
      assert.strictEqual(SignificantFigures.floor(-1.1, 2), -1.1);
      assert.strictEqual(SignificantFigures.floor(-1.11, 2), -1.2);
      assert.strictEqual(SignificantFigures.floor(-0.1, 1), -0.1);
      assert.strictEqual(SignificantFigures.floor(-0.11, 1), -0.2);
    });

    it('round - Positive numbers', function () {
      // Zero
      assert.strictEqual(SignificantFigures.round(0, 10), 0);

      // Integers
      assert.strictEqual(SignificantFigures.round(90000, 2), 90000);
      assert.strictEqual(SignificantFigures.round(98000, 2), 98000);
      assert.strictEqual(SignificantFigures.round(98499, 2), 98000);
      assert.strictEqual(SignificantFigures.round(98500, 2), 99000);
      assert.strictEqual(SignificantFigures.round(98149, 3), 98100);
      assert.strictEqual(SignificantFigures.round(98150, 3), 98200);
      assert.strictEqual(SignificantFigures.round(98499, 6), 98499);

      // Floating point
      assert.strictEqual(SignificantFigures.round(1.5, 2), 1.5);
      assert.strictEqual(SignificantFigures.round(1.54, 2), 1.5);
      assert.strictEqual(SignificantFigures.round(1.55, 2), 1.6);
      assert.strictEqual(SignificantFigures.round(0.5, 1), 0.5);
      assert.strictEqual(SignificantFigures.round(0.549, 1), 0.5);
      assert.strictEqual(SignificantFigures.round(0.55, 1), 0.6);
    });

    it('round - Negative numbers', function () {
      // Integers
      assert.strictEqual(SignificantFigures.round(-90000, 2), -90000);
      assert.strictEqual(SignificantFigures.round(-98000, 2), -98000);
      assert.strictEqual(SignificantFigures.round(-98500, 2), -98000);
      assert.strictEqual(SignificantFigures.round(-98501, 2), -99000);
      assert.strictEqual(SignificantFigures.round(-98150, 3), -98100);
      assert.strictEqual(SignificantFigures.round(-98151, 3), -98200);
      assert.strictEqual(SignificantFigures.round(-98599, 6), -98599);

      // Floating point
      assert.strictEqual(SignificantFigures.round(-1.5, 2), -1.5);
      assert.strictEqual(SignificantFigures.round(-1.55, 2), -1.5);
      assert.strictEqual(SignificantFigures.round(-1.551, 2), -1.6);
      assert.strictEqual(SignificantFigures.round(-0.5, 1), -0.5);
      assert.strictEqual(SignificantFigures.round(-0.55, 1), -0.5);
      assert.strictEqual(SignificantFigures.round(-0.551, 1), -0.6);
    });
  });
});
