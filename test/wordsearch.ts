import {describe, it, expect} from 'vitest';
import {
  WordSearchDirection,
  WordSearchSolver,
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
      const solver = new WordSearchSolver();
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
      solver.setGrid(matrix);
      const results = solver.findWords();
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
      const solver = new WordSearchSolver();
      solver.setWords(['puzz', 'baz']);
      solver.setGrid(matrix);
      const results = solver.findWords();

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
      const solver = new WordSearchSolver();
      solver.setWords(['foo', 'bar', 'baz', 'abc', 'def']);
      solver.setGrid(matrix);
      const results = solver.findWords();

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
      const solver = new WordSearchSolver();
      solver.setWords(['foo', 'bar', 'baz']);
      solver.setGrid(matrix);
      const results = solver.findWords();

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
      const solver = new WordSearchSolver();
      solver.setWords(['foo', 'bar', 'baz']);
      solver.setGrid(matrix);
      const results = solver.findWords();

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
      const solver = new WordSearchSolver();
      solver.setWords(['foo', 'foobar', 'bar']);
      solver.setGrid(matrix);
      const results = solver.findWords();

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
      const solver = new WordSearchSolver();
      solver.setDirections(WordSearchDirection.Diagonal);
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz', 'wax']);
      solver.setGrid(matrix);
      const diagResults = solver.findWords();

      expect(diagResults.length).toBe(1);
      assertResultsContainsWord(diagResults, 'wax');

      solver.setDirections(WordSearchDirection.Cardinal);
      const cardinalResults = solver.findWords();
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
      const solver = new WordSearchSolver();
      solver.setWords(['x']);
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
      solver.setGrid(matrix);
      const results = solver.findWords();
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
      const solver = new WordSearchSolver();
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
      solver.setGrid(matrix);
      solver.setSpaceTreatment(WordSearchSpaceTreatment.RemoveAll);
      const results = solver.findWords();
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
      const solver = new WordSearchSolver();
      solver.setSpaceTreatment(WordSearchSpaceTreatment.RemoveWithinPuzzle);
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
      solver.setGrid(matrix);
      const results = solver.findWords();
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');

      expect(results.length).toBe(2);
    });

    it('Parse spaces', () => {
      const solver = new WordSearchSolver();
      const matrix = 'px xx\nuw  in\nzx  xx\nzx  xx\n';
      solver.parseGrid(matrix);
      solver.setSpaceTreatment(WordSearchSpaceTreatment.RemoveAll);
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);

      const results = solver.findWords();
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
      const solver = new WordSearchSolver();
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
      solver.setGrid(matrix);
      solver.setDirections(WordSearchDirection.Cardinal);
      solver.setCanBend(true);
      const results = solver.findWords();
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
      const solver = new WordSearchSolver();
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
      solver.setGrid(matrix);
      solver.setDirections(WordSearchDirection.Cardinal);
      solver.setCanBend(true);
      const results = solver.findWords();
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
      const solver = new WordSearchSolver();
      solver.setCanBend(true);
      solver.setDirections(WordSearchDirection.Diagonal);
      solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz', 'wax']);
      solver.setGrid(matrix);
      const diagResults = solver.findWords();

      expect(diagResults.length).toBe(3);
      assertResultsContainsWord(diagResults, 'wax');

      solver.setDirections(WordSearchDirection.Cardinal);
      const cardinalResults = solver.findWords();
      assertResultsContainsWord(cardinalResults, 'puzz');
      assertResultsContainsWord(cardinalResults, 'win');

      expect(cardinalResults.length).toBe(2);
    });
  });
});
