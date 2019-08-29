/* global describe, it */

const assert = require('assert');
const {
  EncodingCategory,
  EncodingEntry,
  SemaphoreDirection,
  SemaphoreCharacter,
  SemaphoreDegrees
} = require('../');

// eslint:disable:

describe('Semaphore', function () {
  describe('Degrees', function () {
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
      const aChar = new SemaphoreCharacter(SemaphoreDirection.SouthWest | SemaphoreDirection.South);
      assert.strictEqual(aChar.toString(), 'A/1');

      const qChar = new SemaphoreCharacter(SemaphoreDirection.West | SemaphoreDirection.NorthEast);
      assert.strictEqual(qChar.toString(), 'Q');

      const zChar = new SemaphoreCharacter(SemaphoreDirection.SouthEast | SemaphoreDirection.East);
      assert.strictEqual(zChar.toString(), 'Z');
    });

    it('No Matches', function () {
      const noChar = new SemaphoreCharacter(SemaphoreDirection.South | SemaphoreDirection.South);
      assert.strictEqual(noChar.toString(), '');

      const emptyChar = new SemaphoreCharacter(SemaphoreDirection.South | SemaphoreDirection.South);
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

      char = new SemaphoreCharacter(SemaphoreDirection.West | SemaphoreDirection.East);
      assert.strictEqual(char.toString(), 'R');
      assert.strictEqual(char.directions.length, 2);
      assert.strictEqual(char.directions[0], SemaphoreDirection.East);
      assert.strictEqual(char.directions[1], SemaphoreDirection.West);
    });

    it('addDirection/removeDirection', function () {
      // Start with a partial match
      const char = new SemaphoreCharacter(SemaphoreDirection.South);
      assert.strictEqual(char.toString(), '');

      // Complete the match
      char.addDirection(SemaphoreDirection.SouthWest);
      assert.strictEqual(char.toString(), 'A/1');

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
      const char = new SemaphoreCharacter(SemaphoreDirection.SouthWest | SemaphoreDirection.NorthEast);
      let [first, second] = char.getDegrees();
      assert.strictEqual(first, 45);
      assert.strictEqual(second, 225);

      char.clear();
      [first, second] = char.getDegrees();
      assert.strictEqual(first, undefined);
      assert.strictEqual(second, undefined);

      char.addDirection(SemaphoreDirection.NorthWest);
      [first, second] = char.getDegrees();
      assert.strictEqual(first, 315);
      assert.strictEqual(second, undefined);

      char.addDirection(SemaphoreDirection.NorthEast);
      [first, second] = char.getDegrees();
      assert.strictEqual(first, 45);
      assert.strictEqual(second, 315);
    });

    it('All Results', function () {
      const ch = new SemaphoreCharacter();
      const results = ch.getPotentialMatches();
      const expected = [
        new EncodingEntry(96, EncodingCategory.Letter, 'A'),
        new EncodingEntry(160, EncodingCategory.Letter, 'B'),
        new EncodingEntry(288, EncodingCategory.Letter, 'C'),
        new EncodingEntry(34, EncodingCategory.Letter, 'D'),
        new EncodingEntry(36, EncodingCategory.Letter, 'E'),
        new EncodingEntry(40, EncodingCategory.Letter, 'F'),
        new EncodingEntry(48, EncodingCategory.Letter, 'G'),
        new EncodingEntry(192, EncodingCategory.Letter, 'H'),
        new EncodingEntry(320, EncodingCategory.Letter, 'I'),
        new EncodingEntry(10, EncodingCategory.Letter, 'J'),
        new EncodingEntry(66, EncodingCategory.Letter, 'K'),
        new EncodingEntry(68, EncodingCategory.Letter, 'L'),
        new EncodingEntry(72, EncodingCategory.Letter, 'M'),
        new EncodingEntry(80, EncodingCategory.Letter, 'N'),
        new EncodingEntry(384, EncodingCategory.Letter, 'O'),
        new EncodingEntry(130, EncodingCategory.Letter, 'P'),
        new EncodingEntry(132, EncodingCategory.Letter, 'Q'),
        new EncodingEntry(136, EncodingCategory.Letter, 'R'),
        new EncodingEntry(144, EncodingCategory.Letter, 'S'),
        new EncodingEntry(258, EncodingCategory.Letter, 'T'),
        new EncodingEntry(260, EncodingCategory.Letter, 'U'),
        new EncodingEntry(18, EncodingCategory.Letter, 'V'),
        new EncodingEntry(12, EncodingCategory.Letter, 'W'),
        new EncodingEntry(20, EncodingCategory.Letter, 'X'),
        new EncodingEntry(264, EncodingCategory.Letter, 'Y'),
        new EncodingEntry(24, EncodingCategory.Letter, 'Z'),
        new EncodingEntry(96, EncodingCategory.Number, '1'),
        new EncodingEntry(160, EncodingCategory.Number, '2'),
        new EncodingEntry(288, EncodingCategory.Number, '3'),
        new EncodingEntry(34, EncodingCategory.Number, '4'),
        new EncodingEntry(36, EncodingCategory.Number, '5'),
        new EncodingEntry(40, EncodingCategory.Number, '6'),
        new EncodingEntry(48, EncodingCategory.Number, '7'),
        new EncodingEntry(192, EncodingCategory.Number, '8'),
        new EncodingEntry(320, EncodingCategory.Number, '9'),
        new EncodingEntry(66, EncodingCategory.Number, '0'),
        new EncodingEntry(6, EncodingCategory.Formatting, '#')
      ];
      assert.deepStrictEqual(results, expected);
    });

    it('Some Results', function () {
      const ch = new SemaphoreCharacter(SemaphoreDirection.West);
      const results = ch.getPotentialMatches();
      const expected = [
        new EncodingEntry(160, EncodingCategory.Letter, 'B'),
        new EncodingEntry(192, EncodingCategory.Letter, 'H'),
        new EncodingEntry(384, EncodingCategory.Letter, 'O'),
        new EncodingEntry(130, EncodingCategory.Letter, 'P'),
        new EncodingEntry(132, EncodingCategory.Letter, 'Q'),
        new EncodingEntry(136, EncodingCategory.Letter, 'R'),
        new EncodingEntry(144, EncodingCategory.Letter, 'S'),
        new EncodingEntry(160, EncodingCategory.Number, '2'),
        new EncodingEntry(192, EncodingCategory.Number, '8')
      ];
      assert.deepStrictEqual(results, expected);
    });

    it('One Result', function () {
      const ch = new SemaphoreCharacter(SemaphoreDirection.West | SemaphoreDirection.North);
      const exact = ch.getExactMatches();
      const exactExpected = [
        new EncodingEntry(130, EncodingCategory.Letter, 'P')
      ];
      assert.deepStrictEqual(exact, exactExpected);

      const potential = ch.getPotentialMatches();
      assert.deepStrictEqual(potential, []);
    });

    it('No Results', function () {
      const ch = new SemaphoreCharacter(SemaphoreDirection.NorthWest | SemaphoreDirection.SouthEast);
      const exact = ch.getExactMatches();
      assert.deepStrictEqual(exact, []);

      const potential = ch.getPotentialMatches();
      assert.deepStrictEqual(potential, []);
    });

    it('Potential Match', function () {
      const ch = new SemaphoreCharacter(SemaphoreDirection.West);

      // Can't ask for a direction that's already set.
      assert.strictEqual(ch.getPotentialMatch(SemaphoreDirection.West), null);

      // Ask for a valid direction.
      assert.deepStrictEqual(
        ch.getPotentialMatch(SemaphoreDirection.NorthWest),
        new EncodingEntry(384, EncodingCategory.Letter, 'O'));

      // Add another direction and verify that a match isn't returned.
      ch.addDirection(SemaphoreDirection.NorthWest);
      assert.strictEqual(ch.getPotentialMatch(SemaphoreDirection.South), null);

      // Remove the original direction and verify the same potential match is returned.
      ch.removeDirection(SemaphoreDirection.West);
      assert.deepStrictEqual(
        ch.getPotentialMatch(SemaphoreDirection.West),
        new EncodingEntry(384, EncodingCategory.Letter, 'O'));

      // Test an invalid combination which has no match.
      assert.strictEqual(ch.getPotentialMatch(SemaphoreDirection.SouthEast), null);
    });
  });
});
