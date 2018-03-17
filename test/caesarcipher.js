/* global describe, it */

const assert = require('assert');
const { CaesarString } = require('../');

describe('CaesarCipher', function () {
  describe('String', function () {
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
});
