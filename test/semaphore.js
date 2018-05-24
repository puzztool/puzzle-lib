/* global describe, it */
const assert = require('assert');
const { SemaphoreDirection, SemaphoreCharacter, SemaphoreDegrees, SemaphorePrediction } = require('../');

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

  describe('Prediction', function () {
    it('All Results', function () {
      const results = SemaphorePrediction.PossibleSemaphore(SemaphoreDirection.None);
      const expected = [
        {
          'category': 2,
          'display': 'A',
          'encoding': 96
        },
        {
          'category': 2,
          'display': 'B',
          'encoding': 160
        },
        {
          'category': 2,
          'display': 'C',
          'encoding': 288
        },
        {
          'category': 2,
          'display': 'D',
          'encoding': 34
        },
        {
          'category': 2,
          'display': 'E',
          'encoding': 36
        },
        {
          'category': 2,
          'display': 'F',
          'encoding': 40
        },
        {
          'category': 2,
          'display': 'G',
          'encoding': 48
        },
        {
          'category': 2,
          'display': 'H',
          'encoding': 192
        },
        {
          'category': 2,
          'display': 'I',
          'encoding': 320
        },
        {
          'category': 2,
          'display': 'J',
          'encoding': 10
        },
        {
          'category': 2,
          'display': 'K',
          'encoding': 66
        },
        {
          'category': 2,
          'display': 'L',
          'encoding': 68
        },
        {
          'category': 2,
          'display': 'M',
          'encoding': 72
        },
        {
          'category': 2,
          'display': 'N',
          'encoding': 80
        },
        {
          'category': 2,
          'display': 'O',
          'encoding': 384
        },
        {
          'category': 2,
          'display': 'P',
          'encoding': 130
        },
        {
          'category': 2,
          'display': 'Q',
          'encoding': 132
        },
        {
          'category': 2,
          'display': 'R',
          'encoding': 136
        },
        {
          'category': 2,
          'display': 'S',
          'encoding': 144
        },
        {
          'category': 2,
          'display': 'T',
          'encoding': 258
        },
        {
          'category': 2,
          'display': 'U',
          'encoding': 260
        },
        {
          'category': 2,
          'display': 'V',
          'encoding': 18
        },
        {
          'category': 2,
          'display': 'W',
          'encoding': 12
        },
        {
          'category': 2,
          'display': 'X',
          'encoding': 20
        },
        {
          'category': 2,
          'display': 'Y',
          'encoding': 264
        },
        {
          'category': 2,
          'display': 'Z',
          'encoding': 24
        },
        {
          'category': 4,
          'display': '1',
          'encoding': 96
        },
        {
          'category': 4,
          'display': '2',
          'encoding': 160
        },
        {
          'category': 4,
          'display': '3',
          'encoding': 288
        },
        {
          'category': 4,
          'display': '4',
          'encoding': 34
        },
        {
          'category': 4,
          'display': '5',
          'encoding': 36
        },
        {
          'category': 4,
          'display': '6',
          'encoding': 40
        },
        {
          'category': 4,
          'display': '7',
          'encoding': 48
        },
        {
          'category': 4,
          'display': '8',
          'encoding': 192
        },
        {
          'category': 4,
          'display': '9',
          'encoding': 320
        },
        {
          'category': 4,
          'display': '0',
          'encoding': 66
        },
        {
          'category': 8,
          'display': '#',
          'encoding': 6
        }
      ];
      assert.deepEqual(results, expected);
    });

    it('Some Results', function () {
      const results = SemaphorePrediction.PossibleSemaphore(SemaphoreDirection.West);
      const expected = [
        {
          'category': 2,
          'display': 'B',
          'encoding': 160
        },
        {
          'category': 2,
          'display': 'H',
          'encoding': 192
        },
        {
          'category': 2,
          'display': 'O',
          'encoding': 384
        },
        {
          'category': 2,
          'display': 'P',
          'encoding': 130
        },
        {
          'category': 2,
          'display': 'Q',
          'encoding': 132
        },
        {
          'category': 2,
          'display': 'R',
          'encoding': 136
        },
        {
          'category': 2,
          'display': 'S',
          'encoding': 144
        },
        {
          'category': 4,
          'display': '2',
          'encoding': 160
        },
        {
          'category': 4,
          'display': '8',
          'encoding': 192
        }
      ];
      assert.deepEqual(results, expected);
    });

    it('One Result', function () {
      const results = SemaphorePrediction.PossibleSemaphore(SemaphoreDirection.West | SemaphoreDirection.North);
      const expected = [
        {
          'category': 2,
          'display': 'P',
          'encoding': 130
        }
      ];
      assert.deepEqual(results, expected);
    });

    it('No Results', function () {
      const results = SemaphorePrediction.PossibleSemaphore(SemaphoreDirection.NorthWest | SemaphoreDirection.SouthEast);
      // assert.strictEqual(allResults, []);
      assert.deepEqual(results, []);
    });
  });
});
