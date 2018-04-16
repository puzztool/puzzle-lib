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

    it('constructor', function () {
      let char = new SemaphoreCharacter();
      assert.strictEqual(char.toString(), '');
      assert.strictEqual(char.directions.length, 0);

      char = new SemaphoreCharacter(SemaphoreDirection.West);
      assert.strictEqual(char.toString(), '');
      assert.strictEqual(char.directions.length, 1);
      assert.strictEqual(char.directions[0], SemaphoreDirection.West);

      char = new SemaphoreCharacter(SemaphoreDirection.West, SemaphoreDirection.East);
      assert.strictEqual(char.toString(), 'R');
      assert.strictEqual(char.directions.length, 2);
      assert.strictEqual(char.directions[0], SemaphoreDirection.West);
      assert.strictEqual(char.directions[1], SemaphoreDirection.East);
    });

    it('addDirection/removeDirection', function () {
      // Start with a partial match
      const char = new SemaphoreCharacter(SemaphoreDirection.South);
      assert.strictEqual(char.toString(), '');

      // Complete the match
      char.addDirection(SemaphoreDirection.SouthWest);
      assert.strictEqual(char.toString(), 'A');

      // Push off the oldest direction
      char.addDirection(SemaphoreDirection.NorthEast);
      assert.strictEqual(char.toString(), 'L');

      // Specifically remove the most recent one
      char.removeDirection(SemaphoreDirection.NorthEast);
      assert.strictEqual(char.toString(), '');

      // Add a different second direction
      char.addDirection(SemaphoreDirection.SouthEast);
      assert.strictEqual(char.toString(), 'N');

      // Try to remove a non-existing direction
      char.removeDirection(SemaphoreDirection.North);
      assert.strictEqual(char.toString(), 'N');
    });

    it('getDegrees', function () {
      const char = new SemaphoreCharacter(SemaphoreDirection.SouthWest, SemaphoreDirection.NorthEast);
      let [ first, second ] = char.getDegrees();
      assert.strictEqual(first, 45);
      assert.strictEqual(second, 225);

      char.clear();
      [ first, second ] = char.getDegrees();
      assert.strictEqual(first, undefined);
      assert.strictEqual(second, undefined);

      char.addDirection(SemaphoreDirection.NorthWest);
      [ first, second ] = char.getDegrees();
      assert.strictEqual(first, 315);
      assert.strictEqual(second, undefined);

      char.addDirection(SemaphoreDirection.NorthEast);
      [ first, second ] = char.getDegrees();
      assert.strictEqual(first, 45);
      assert.strictEqual(second, 315);
    });
  });
});
