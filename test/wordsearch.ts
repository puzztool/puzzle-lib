import {describe, it, expect} from 'vitest';
import {findWords, parseWordSearchGrid, WordSearchDirection} from '../src';
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

    it('parseWordSearchGrid collapses uniform space columns', () => {
      // Simulates pasting "A B C D" style grid
      const input = 'p x x x\nu w i n\nz x x x\nz x x x\n';
      const grid = parseWordSearchGrid(input);
      const results = findWords({
        grid,
        words: ['puzz', 'win'],
      });
      assertResultsContainsWord(results, 'puzz');
      assertResultsContainsWord(results, 'win');
      expect(results.length).toBe(2);
    });

    it('parseWordSearchGrid preserves irregular spaces', () => {
      // Space in column 2 is NOT uniform (has letters in other rows)
      const input = 'ABCDE\nAB DE\nABCDE\n';
      const grid = parseWordSearchGrid(input);
      // Column 2 kept because rows 0 and 2 have 'C'
      expect(grid[0]).toEqual(['A', 'B', 'C', 'D', 'E']);
      expect(grid[1]).toEqual(['A', 'B', ' ', 'D', 'E']);
      expect(grid[2]).toEqual(['A', 'B', 'C', 'D', 'E']);
    });

    it('parseWordSearchGrid handles pasted grid with cutout', () => {
      // Pasted with spaces between letters, plus a cutout
      const input = 'A B C\nA   C\nA B C\n';
      const grid = parseWordSearchGrid(input);
      // Columns 1, 3 are all spaces → removed
      // Column 2 has B, space, B → kept
      expect(grid[0]).toEqual(['A', 'B', 'C']);
      expect(grid[1]).toEqual(['A', ' ', 'C']);
      expect(grid[2]).toEqual(['A', 'B', 'C']);
    });

    it('parseWordSearchGrid filters blank and all-spaces lines', () => {
      const input = 'ABCD\n\n   \nEFGH\n';
      const grid = parseWordSearchGrid(input);
      expect(grid.length).toBe(2);
      expect(grid[0]).toEqual(['A', 'B', 'C', 'D']);
      expect(grid[1]).toEqual(['E', 'F', 'G', 'H']);
    });

    it('Diamond-shaped grid with findWords', () => {
      // Diamond shape using spaces:
      //   f
      //  oo
      // oox
      //  xx
      //   x
      const input = '  f\n oo\noox\n xx\n  x\n';
      const grid = parseWordSearchGrid(input);
      expect(grid.length).toBe(5);
      expect(grid[0]).toEqual([' ', ' ', 'f']);
      expect(grid[1]).toEqual([' ', 'o', 'o']);
      expect(grid[2]).toEqual(['o', 'o', 'x']);
      const results = findWords({grid, words: ['foo']});
      assertResultsContainsWord(results, 'foo');
      expect(results.length).toBe(1);
    });

    it('Grid with interior cutout preserves shape for search', () => {
      // 5x5 grid with a hole in the middle
      const input = 'abcde\nfghij\nkl mn\nopqrs\ntuvwx\n';
      const grid = parseWordSearchGrid(input);
      // No columns are entirely spaces, so grid is unchanged
      expect(grid.length).toBe(5);
      expect(grid[2]).toEqual(['k', 'l', ' ', 'm', 'n']);
      // Vertical word 'afkot' crosses through column 0 (no spaces)
      const results = findWords({grid, words: ['afkot']});
      assertResultsContainsWord(results, 'afkot');
      // Word 'glq' would need to cross the space — should not match
      const crossHole = findWords({grid, words: ['glq']});
      expect(crossHole.length).toBe(0);
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
