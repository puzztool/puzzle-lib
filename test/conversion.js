/* global describe, it */

const assert = require('assert');
const { CharacterConversion, Encoding, AutoConvert } = require('../');

describe('Conversions', function () {
  describe('AutoConvert', function () {
    it('determineCharacterEncoding', function () {
      const latin = AutoConvert.determineCharacterEncoding('L');
      assert.strictEqual(latin, Encoding.Latin);

      const ordinal = AutoConvert.determineCharacterEncoding('12');
      assert.strictEqual(ordinal, Encoding.Ordinal);

      const fiveBit = AutoConvert.determineCharacterEncoding('01100');
      assert.strictEqual(fiveBit, Encoding.FiveBitBinary);

      const eightBit = AutoConvert.determineCharacterEncoding('01101100');
      assert.strictEqual(eightBit, Encoding.EightBitBinary);

      const ascii = AutoConvert.determineCharacterEncoding('76');
      assert.strictEqual(ascii, Encoding.Ascii);

      const none = AutoConvert.determineCharacterEncoding('999');
      assert.strictEqual(none, Encoding.None);
    });

    it('convertCharacter', function () {
      const latin = AutoConvert.convertCharacter('A');
      assert.strictEqual(latin, 'A');

      const ordinalA = AutoConvert.convertCharacter('1');
      assert.strictEqual(ordinalA, 'A');

      const ordinalZ = AutoConvert.convertCharacter('26');
      assert.strictEqual(ordinalZ, 'Z');

      const fiveBitA = AutoConvert.convertCharacter('00001');
      assert.strictEqual(fiveBitA, 'A');

      const fiveBitZ = AutoConvert.convertCharacter('11010');
      assert.strictEqual(fiveBitZ, 'Z');

      const eightBitA = AutoConvert.convertCharacter('01100001');
      assert.strictEqual(eightBitA, 'a');

      const eightBitZ = AutoConvert.convertCharacter('01011010');
      assert.strictEqual(eightBitZ, 'Z');

      const unknown = AutoConvert.convertCharacter('999');
      assert.strictEqual(unknown, '?');
    });

    it('forceCharacterEncoding', function () {
      const fiveBitA = AutoConvert.convertCharacter('1', Encoding.FiveBitBinary);
      assert.strictEqual(fiveBitA, 'A');

      const fiveBitD = AutoConvert.convertCharacter('100', Encoding.FiveBitBinary);
      assert.strictEqual(fiveBitD, 'D');

      const eightBitD = AutoConvert.convertCharacter('1000100', Encoding.EightBitBinary);
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
});
