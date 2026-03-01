import {describe, it, expect} from 'vitest';
import {
  findWords,
  parseWordSearchGrid,
  WordSearchDirection,
  WordSearchSpaceTreatment,
} from '../src';
import {WordSearchResult} from '../src';

function assertResultsContainsWord(results: WordSearchResult[], word: string) {
  for (const result of results) {
    if (result.word === word) {
      return;
    }
  }
  expect.fail('Results do not contain expected word ' + word);
}

describe('WordSearchSolver', () => {
  describe('Linear Searches', () => {
    it('Cardinal directions', () => {
      const matrix = [
        ['p', 'x', 'x', 'x'],
        ['u', 'w', 'i', 'n'],
        ['z', 'x', 'x', 'x'],
        ['z', 'x', 'x', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['puzz', 'win', 'foo', 'bar', 'baz'],
      });
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');

      expect(results.length).toBe(2);
    });

    it('Diagonal directions', () => {
      const matrix = [
        ['p', 'x', 'x', 'x', 'b'],
        ['x', 'u', 'x', 'a', 'x'],
        ['x', 'x', 'z', 'x', 'x'],
        ['x', 'x', 'x', 'z', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['puzz', 'baz'],
      });

      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'baz');
      expect(results.length).toBe(2);
    });

    it('Jagged array outside box', () => {
      const matrix = [
        ['x', 'f', 'o', 'o'],
        ['b', 'x', 'x'],
        ['a', 'x', 'b', 'a', 'r'],
        ['z', 'x', 'x', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['foo', 'bar', 'baz', 'abc', 'def'],
      });

      assertResultsContainsWord(results, 'foo');
      assertResultsContainsWord(results, 'bar');
      assertResultsContainsWord(results, 'baz');
      expect(results.length).toBe(3);
    });

    it('Jagged diagonal array', () => {
      const matrix = [
        ['x', 'x', 'x', 'b'],
        ['x', 'x', 'a'],
        ['x', 'r', 'o', 'o', 'f'],
        ['x', 'x', 'x', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['foo', 'bar', 'baz'],
      });

      assertResultsContainsWord(results, 'foo');
      assertResultsContainsWord(results, 'bar');
      expect(results.length).toBe(2);
    });

    it('Validate path', () => {
      const matrix = [
        ['x', 'x', 'x', 'x'],
        ['x', 'f', 'o', 'o'],
        ['x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['foo', 'bar', 'baz'],
      });

      expect(results.length).toBe(1);
      expect(results[0].word).toBe('foo');

      expect(results[0].points.length).toBe(3);

      expect(results[0].points[0].x).toBe(1);
      expect(results[0].points[0].y).toBe(1);
      expect(results[0].points[1].x).toBe(2);
      expect(results[0].points[1].y).toBe(1);
      expect(results[0].points[2].x).toBe(3);
      expect(results[0].points[2].y).toBe(1);
    });

    it('Overlapping words', () => {
      const matrix = [
        ['x', 'x', 'x', 'x'],
        ['x', 'f', 'o', 'o', 'b', 'a', 'r', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['foo', 'foobar', 'bar'],
      });

      assertResultsContainsWord(results, 'foo');
      assertResultsContainsWord(results, 'bar');
      assertResultsContainsWord(results, 'foobar');
      expect(results.length).toBe(3);
    });

    it('Disabled directions', () => {
      const matrix = [
        ['p', 'x', 'x', 'x'],
        ['u', 'w', 'i', 'n'],
        ['z', 'x', 'a', 'x'],
        ['z', 'x', 'x', 'x'],
      ];
      const words = ['puzz', 'win', 'foo', 'bar', 'baz', 'wax'];
      const diagResults = findWords({
        grid: matrix,
        words,
        directions: WordSearchDirection.Diagonal,
      });

      expect(diagResults.length).toBe(1);
      assertResultsContainsWord(diagResults, 'wax');

      const cardinalResults = findWords({
        grid: matrix,
        words,
        directions: WordSearchDirection.Cardinal,
      });
      assertResultsContainsWord(cardinalResults, 'puzz');
      assertResultsContainsWord(cardinalResults, 'win');

      expect(cardinalResults.length).toBe(2);
    });

    it('Set words clears state', () => {
      const matrix = [
        ['p', 'x', 'x', 'x'],
        ['u', 'w', 'i', 'n'],
        ['z', 'x', 'x', 'x'],
        ['z', 'x', 'x', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['puzz', 'win', 'foo', 'bar', 'baz'],
      });
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');

      expect(results.length).toBe(2);
    });

    it('Remove all spaces', () => {
      const matrix = [
        ['p', 'x', 'x', ' ', 'x'],
        ['u', 'w', 'i', ' ', 'n'],
        ['z', 'x', 'x', ' ', 'x'],
        [' ', ' ', ' ', ' ', ' '],
        ['z', 'x', 'x', ' ', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['puzz', 'win', 'foo', 'bar', 'baz'],
        spaceTreatment: WordSearchSpaceTreatment.RemoveAll,
      });
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');

      expect(results.length).toBe(2);
    });

    it('Remove spaces in puzzle', () => {
      const matrix = [
        [' ', 'p', 'x', 'x', ' ', 'x'],
        [' ', 'u', 'w', 'i', ' ', 'n'],
        [' ', 'z', 'x', 'x', ' ', 'x'],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'z', 'x', 'x', ' ', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['puzz', 'win', 'foo', 'bar', 'baz'],
        spaceTreatment: WordSearchSpaceTreatment.RemoveWithinPuzzle,
      });
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');

      expect(results.length).toBe(2);
    });

    it('Parse spaces', () => {
      const input = 'px xx\nuw  in\nzx  xx\nzx  xx\n';
      const grid = parseWordSearchGrid(input);
      const results = findWords({
        grid,
        words: ['puzz', 'win', 'foo', 'bar', 'baz'],
        spaceTreatment: WordSearchSpaceTreatment.RemoveAll,
      });
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');

      expect(results.length).toBe(2);
    });
  });

  describe('Bent Search', () => {
    it('Basic bent directions', () => {
      const matrix = [
        ['p', 'x', 'x', 'x'],
        ['u', 'w', 'i', 'x'],
        ['z', 'z', 'n', 'x'],
        ['x', 'x', 'x', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['puzz', 'win', 'foo', 'bar', 'baz'],
        directions: WordSearchDirection.Cardinal,
        canBend: true,
      });
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');

      expect(results.length).toBe(2);
    });

    it('Cardinal bent directions', () => {
      const matrix = [
        ['p', 'x', 'x', 'x'],
        ['u', 'w', 'i', 'n'],
        ['z', 'x', 'x', 'x'],
        ['z', 'x', 'x', 'x'],
      ];
      const results = findWords({
        grid: matrix,
        words: ['puzz', 'win', 'foo', 'bar', 'baz'],
        directions: WordSearchDirection.Cardinal,
        canBend: true,
      });
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');

      expect(results.length).toBe(2);
    });

    it('Disabled directions', () => {
      const matrix = [
        ['p', 'x', 'n', 'x'],
        ['u', 'w', 'i', 'x'],
        ['z', 'z', 'a', 'x'],
        ['x', 'x', 'x', 'x'],
      ];
      const words = ['puzz', 'win', 'foo', 'bar', 'baz', 'wax'];
      const diagResults = findWords({
        grid: matrix,
        words,
        directions: WordSearchDirection.Diagonal,
        canBend: true,
      });

      expect(diagResults.length).toBe(3);
      assertResultsContainsWord(diagResults, 'wax');

      const cardinalResults = findWords({
        grid: matrix,
        words,
        directions: WordSearchDirection.Cardinal,
        canBend: true,
      });
      assertResultsContainsWord(cardinalResults, 'puzz');
      assertResultsContainsWord(cardinalResults, 'win');

      expect(cardinalResults.length).toBe(2);
    });
  });
});
