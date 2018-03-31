/* global describe, it */

const assert = require('assert');
const { SemaphoreDirection, SemaphoreCharacter, SemaphoreDegrees } = require('../');

describe('Semaphore', function () {
  describe('Semaphore Degrees', function () {
    it('To Degrees Happy cases', function () {
      const north = SemaphoreDegrees.ToDegrees(SemaphoreDirection.North);
      assert.strictEqual(north, 0);

      const se = SemaphoreDegrees.ToDegrees(SemaphoreDirection.SouthEast);
      assert.strictEqual(se, 135);
    });

    it('From Degrees Happy cases', function () {
      const north = SemaphoreDegrees.FromDegrees(0);
      assert.strictEqual(north, SemaphoreDirection.North);

      const sw = SemaphoreDegrees.FromDegrees(135);
      assert.strictEqual(sw, SemaphoreDirection.SouthEast);
    });

    it('Full rotation cases', function () {
      const north = SemaphoreDegrees.FromDegrees(1080);
      assert.strictEqual(north, SemaphoreDirection.North);

      const south = SemaphoreDegrees.FromDegrees(1260);
      assert.strictEqual(south, SemaphoreDirection.South);
    });
  });

  describe('Characters', function () {
    it('Char Matches', function () {
      const aChar = new SemaphoreCharacter(SemaphoreDirection.SouthWest, SemaphoreDirection.South);
      assert.strictEqual(aChar.toString(), 'A');

      const qChar = new SemaphoreCharacter(SemaphoreDirection.West, SemaphoreDirection.NorthEast);
      assert.strictEqual(qChar.toString(), 'Q');

      const zChar = new SemaphoreCharacter(SemaphoreDirection.SouthEast, SemaphoreDirection.East);
      assert.strictEqual(zChar.toString(), 'Z');
    });

    it('No Matches', function () {
      const noChar = new SemaphoreCharacter(SemaphoreDirection.South, SemaphoreDirection.South);
      assert.strictEqual(noChar.toString(), '');

      const emptyChar = new SemaphoreCharacter(SemaphoreDirection.South, SemaphoreDirection.South);
      assert.strictEqual(emptyChar.toString(), '');
    });
  });
});
