/* global describe, it */

const assert = require('assert');
const { CaesarString, VigenereString } = require('../');

describe('Cipher', function () {
  describe('CaesarString', function () {
    it('getRotation - Basic tests', function () {
      const str = new CaesarString('abc');

      assert.strictEqual(str.getRotation(0), 'abc');
      assert.strictEqual(str.getRotation(1), 'bcd');
      assert.strictEqual(str.getRotation(13), 'nop');
      assert.strictEqual(str.getRotation(25), 'zab');
    });

    it('getRotation - Advanced', function () {
      const str = new CaesarString('abc');

      assert.strictEqual(str.getRotation(26), 'abc');
      assert.strictEqual(str.getRotation(13 + 26), 'nop');
      assert.strictEqual(str.getRotation(-1), 'zab');
      assert.strictEqual(str.getRotation(-26), 'abc');
    });

    it('getRotation - Empty', function () {
      const str = new CaesarString();
      assert.strictEqual(str.getRotation(0), '');
      assert.strictEqual(str.getRotation(13), '');

      str.update('a');
      assert.strictEqual(str.getRotation(0), 'a');
      assert.strictEqual(str.getRotation(13), 'n');

      str.update('');
      assert.strictEqual(str.getRotation(0), '');
      assert.strictEqual(str.getRotation(13), '');
    });

    it('getRotations - Basic tests', function () {
      const str = new CaesarString('abc');
      const rotations = str.getRotations();

      assert.strictEqual(rotations[0], 'abc');
      assert.strictEqual(rotations[1], 'bcd');
      assert.strictEqual(rotations[13], 'nop');
      assert.strictEqual(rotations[25], 'zab');

      assert.strictEqual(rotations[-1], undefined);
      assert.strictEqual(rotations[26], undefined);
    });

    it('getRotations - Empty', function () {
      const str = new CaesarString();
      assert.strictEqual(str.getRotations().length, 26);

      str.update('a');
      assert.strictEqual(str.getRotations().length, 26);

      str.update('');
      assert.strictEqual(str.getRotations().length, 26);
    });

    it('update - Basic tests', function () {
      const str = new CaesarString('abc');
      assert.strictEqual(str.getRotation(13), 'nop');

      str.update('bcd');
      assert.strictEqual(str.getRotation(13), 'opq');
    });
  });

  describe('VigenereString', function () {
    it('encrypt - Basic tests', function () {
      const str = new VigenereString('ATTACKATDAWN', 'LEMON');
      assert.strictEqual(str.encrypt(), 'LXFOPVEFRNHR');

      str.update('ATTACKATDAWN', 'LEMONLEMON');
      assert.strictEqual(str.encrypt(), 'LXFOPVEFRNHR');

      str.update('ATTACK AT DAWN', 'LEMON');
      assert.strictEqual(str.encrypt(), 'LXFOPV EF RNHR');
    });

    it('decrypt - Basic tests', function () {
      const str = new VigenereString('LXFOPVEFRNHR', 'LEMON');
      assert.strictEqual(str.decrypt(), 'ATTACKATDAWN');

      str.update('LXFOPVEFRNHR', 'LEMONLEMON');
      assert.strictEqual(str.decrypt(), 'ATTACKATDAWN');

      str.update('LXFOPV EF RNHR', 'LEMON');
      assert.strictEqual(str.decrypt(), 'ATTACK AT DAWN');
    });

    it('encrypt/decrypt - Empty', function () {
      const str = new VigenereString();
      assert.strictEqual(str.encrypt(), '');
      assert.strictEqual(str.decrypt(), '');

      str.update('ATTACKATDAWN');
      assert.strictEqual(str.encrypt(), 'ATTACKATDAWN');
      assert.strictEqual(str.decrypt(), 'ATTACKATDAWN');

      str.update('ATTACK AT DAWN');
      assert.strictEqual(str.encrypt(), 'ATTACK AT DAWN');
      assert.strictEqual(str.decrypt(), 'ATTACK AT DAWN');

      str.update('', 'LEMON');
      assert.strictEqual(str.encrypt(), '');
      assert.strictEqual(str.decrypt(), '');

      str.update();
      assert.strictEqual(str.encrypt(), '');
      assert.strictEqual(str.decrypt(), '');
    });
  });
});
