import {describe, it, expect} from 'vitest';
import {
  EncodingCategory,
  EncodingEntry,
  SemaphoreCharacter,
  SemaphoreDegrees,
  SemaphoreDirection,
  SemaphoreEncoding,
  SemaphoreStream,
} from '../src';

describe('Semaphore', () => {
  describe('Characters', () => {
    it('Char Matches', () => {
      const aChar = new SemaphoreCharacter(
        SemaphoreDirection.SouthWest | SemaphoreDirection.South,
      );
      expect(aChar.toString()).toBe('A/1');

      const iChar = new SemaphoreCharacter(SemaphoreEncoding.Number9);
      expect(iChar.toString()).toBe('I/9');

      const qChar = new SemaphoreCharacter(
        SemaphoreDirection.West | SemaphoreDirection.NorthEast,
      );
      expect(qChar.toString()).toBe('Q');

      const zChar = new SemaphoreCharacter(
        SemaphoreDirection.SouthEast | SemaphoreDirection.East,
      );
      expect(zChar.toString()).toBe('Z');
    });

    it('No Matches', () => {
      const noChar = new SemaphoreCharacter(
        SemaphoreDirection.South | SemaphoreDirection.South,
      );
      expect(noChar.toString()).toBe('');
    });

    it('constructor', () => {
      let char = new SemaphoreCharacter();
      expect(char.toString()).toBe('');
      expect(char.directions.length).toBe(0);

      char = new SemaphoreCharacter(
        SemaphoreDirection.West as number as SemaphoreEncoding,
      );
      expect(char.toString()).toBe('');
      expect(char.directions.length).toBe(1);
      expect(char.directions[0]).toBe(SemaphoreDirection.West);

      char = new SemaphoreCharacter(
        SemaphoreDirection.West | SemaphoreDirection.East,
      );
      expect(char.toString()).toBe('R');
      expect(char.directions.length).toBe(2);
      expect(char.directions[0]).toBe(SemaphoreDirection.East);
      expect(char.directions[1]).toBe(SemaphoreDirection.West);
    });

    it('addDirection/removeDirection', () => {
      // Start with a partial match
      const char = new SemaphoreCharacter(
        SemaphoreDirection.South as number as SemaphoreEncoding,
      );
      expect(char.toString()).toBe('');

      // Complete the match
      char.addDirection(SemaphoreDirection.SouthWest);
      expect(char.toString()).toBe('A/1');

      // Push off the oldest direction
      char.addDirection(SemaphoreDirection.NorthEast);
      expect(char.toString()).toBe('L');

      // Specifically remove the most recent one
      char.removeDirection(SemaphoreDirection.NorthEast);
      expect(char.toString()).toBe('');

      // Add a different second direction
      char.addDirection(SemaphoreDirection.SouthEast);
      expect(char.toString()).toBe('N');

      // Try to remove a non-existing direction
      char.removeDirection(SemaphoreDirection.North);
      expect(char.toString()).toBe('N');
    });

    it('getDegrees', () => {
      const char = new SemaphoreCharacter(
        SemaphoreDirection.SouthWest | SemaphoreDirection.NorthEast,
      );
      let [first, second] = char.getDegrees();
      expect(first).toBe(45);
      expect(second).toBe(225);

      char.clear();
      [first, second] = char.getDegrees();
      expect(first).toBe(undefined);
      expect(second).toBe(undefined);

      char.addDirection(SemaphoreDirection.NorthWest);
      [first, second] = char.getDegrees();
      expect(first).toBe(315);
      expect(second).toBe(undefined);

      char.addDirection(SemaphoreDirection.NorthEast);
      [first, second] = char.getDegrees();
      expect(first).toBe(45);
      expect(second).toBe(315);
    });

    it('All Results', () => {
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
        new EncodingEntry(6, EncodingCategory.Formatting, '#'),
      ];
      expect(results).toEqual(expected);
    });

    it('Some Results', () => {
      const ch = new SemaphoreCharacter(
        SemaphoreDirection.West as number as SemaphoreEncoding,
      );
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
        new EncodingEntry(192, EncodingCategory.Number, '8'),
      ];
      expect(results).toEqual(expected);
    });

    it('One Result', () => {
      const ch = new SemaphoreCharacter(
        SemaphoreDirection.West | SemaphoreDirection.North,
      );
      const exact = ch.getExactMatches();
      const exactExpected = [
        new EncodingEntry(130, EncodingCategory.Letter, 'P'),
      ];
      expect(exact).toEqual(exactExpected);

      const potential = ch.getPotentialMatches();
      expect(potential).toEqual([]);
    });

    it('No Results', () => {
      const ch = new SemaphoreCharacter(
        SemaphoreDirection.NorthWest | SemaphoreDirection.SouthEast,
      );
      const exact = ch.getExactMatches();
      expect(exact).toEqual([]);

      const potential = ch.getPotentialMatches();
      expect(potential).toEqual([]);
    });

    it('Potential Match', () => {
      const ch = new SemaphoreCharacter(
        SemaphoreDirection.West as number as SemaphoreEncoding,
      );

      // Can't ask for a direction that's already set.
      expect(ch.getPotentialMatch(SemaphoreDirection.West)).toBe(null);

      // Ask for a valid direction.
      expect(ch.getPotentialMatch(SemaphoreDirection.NorthWest)).toEqual(
        new EncodingEntry(384, EncodingCategory.Letter, 'O'),
      );

      // Add another direction and verify that a match isn't returned.
      ch.addDirection(SemaphoreDirection.NorthWest);
      expect(ch.getPotentialMatch(SemaphoreDirection.South)).toBe(null);

      // Remove the original direction and verify the same potential match is returned.
      ch.removeDirection(SemaphoreDirection.West);
      expect(ch.getPotentialMatch(SemaphoreDirection.West)).toEqual(
        new EncodingEntry(384, EncodingCategory.Letter, 'O'),
      );

      // Test an invalid combination which has no match.
      expect(ch.getPotentialMatch(SemaphoreDirection.SouthEast)).toBe(null);
    });
  });

  describe('Degrees', () => {
    it('To Degrees Happy cases', () => {
      const north = SemaphoreDegrees.ToDegrees(SemaphoreDirection.North);
      expect(north).toBe(0);

      const se = SemaphoreDegrees.ToDegrees(SemaphoreDirection.SouthEast);
      expect(se).toBe(135);
    });

    it('From Degrees Happy cases', () => {
      const north = SemaphoreDegrees.FromDegrees(0);
      expect(north).toBe(SemaphoreDirection.North);

      const sw = SemaphoreDegrees.FromDegrees(135);
      expect(sw).toBe(SemaphoreDirection.SouthEast);
    });

    it('Full rotation cases', () => {
      const north = SemaphoreDegrees.FromDegrees(1080);
      expect(north).toBe(SemaphoreDirection.North);

      const south = SemaphoreDegrees.FromDegrees(1260);
      expect(south).toBe(SemaphoreDirection.South);
    });
  });

  describe('Encoding', () => {
    it('Letters match numbers', () => {
      expect(SemaphoreEncoding.LetterA).toBe(SemaphoreEncoding.Number1);
      expect(SemaphoreEncoding.LetterB).toBe(SemaphoreEncoding.Number2);
      expect(SemaphoreEncoding.LetterC).toBe(SemaphoreEncoding.Number3);
      expect(SemaphoreEncoding.LetterD).toBe(SemaphoreEncoding.Number4);
      expect(SemaphoreEncoding.LetterE).toBe(SemaphoreEncoding.Number5);
      expect(SemaphoreEncoding.LetterF).toBe(SemaphoreEncoding.Number6);
      expect(SemaphoreEncoding.LetterG).toBe(SemaphoreEncoding.Number7);
      expect(SemaphoreEncoding.LetterH).toBe(SemaphoreEncoding.Number8);
      expect(SemaphoreEncoding.LetterI).toBe(SemaphoreEncoding.Number9);
      expect(SemaphoreEncoding.LetterK).toBe(SemaphoreEncoding.Number0);
    });
  });

  describe('Stream', () => {
    it('constructor - with parameter', () => {
      const stream = new SemaphoreStream();
      stream.append(new SemaphoreCharacter(SemaphoreEncoding.LetterA));
      stream.space();
      stream.append(new SemaphoreCharacter(SemaphoreEncoding.LetterB));
      expect(stream.toString()).toBe('A B');

      const stream2 = new SemaphoreStream(stream.chars);
      expect(stream2.toString()).toBe('A B');
      stream2.append(new SemaphoreCharacter(SemaphoreEncoding.LetterC));

      expect(stream.toString()).toBe('A B');
      expect(stream2.toString()).toBe('A BC');
    });
  });
});
