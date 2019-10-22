import trie = require('trie-prefix-tree');

import { Point } from './Point';
import { Result } from './Result';
import { WordSearchDirection } from './WordSearchDirection';

export class WordSearchSolver {
  // The grid of letters which makes up the wordsearch puzzle
  private _matrix: string[][];
  // Transpositions to apply when finding words
  private _directions: number[][];
  // Potential words to find in the letter grid
  private _targets: ReturnType<typeof trie>;
  // Should we search for words not following a line
  private _canBend: boolean;

  constructor() {
    // Use empty grid and list by default
    this._matrix = [[]];
    this._targets = trie([]);
    // Use both sets of directions by default
    this._directions = [
      // Cardinal directions
      [0, 1],
      [-1, 0],
      [1, 0],
      [0, -1],
      // Diagonal
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ];
    this._canBend = false;
  }

  setWords(words: string[]) {
    this._targets = trie([]);
    for (const full of words) {
      if (full === null || typeof full === 'undefined') {
        throw new Error('Invalid input in WordSearchSolver.findWords()');
      }
      const word = full.trim();
      if (word !== '') {
        this._targets.addWord(word);
      } else {
        throw new Error('Cannot find an empty string in the wordsearch');
      }
    }
  }

  setGrid(matrix: string[][]) {
    this._matrix = matrix;
  }

  setDirections(direction: WordSearchDirection) {
    this._directions = [];
    if (
      direction === WordSearchDirection.Cardinal ||
      direction === WordSearchDirection.CardinalAndDiagonal
    ) {
      this._directions = this._directions.concat([
        [0, 1],
        [-1, 0],
        [1, 0],
        [0, -1],
      ]);
    }
    if (
      direction === WordSearchDirection.Diagonal ||
      direction === WordSearchDirection.CardinalAndDiagonal
    ) {
      this._directions = this._directions.concat([
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ]);
    }
  }

  setCanBend(canBend: boolean) {
    this._canBend = canBend;
  }

  findWords(): Result[] {
    const results: Result[] = [];
    const numRows = this._matrix.length;
    for (let yIdx = 0; yIdx < numRows; yIdx++) {
      const lineLength = this._matrix[yIdx].length;
      for (let xIdx = 0; xIdx < lineLength; xIdx++) {
        const p: Point = { x: xIdx, y: yIdx };
        const pointResults = this.search(p);
        results.push(...pointResults);
      }
    }
    return results;
  }

  private search(start: Point): Result[] {
    const results: Result[] = [];
    if (this._canBend) {
      const history: Point[] = [];
      const dfsResults = this.dfsCheck(start, new Set(), history);
      results.push(...dfsResults);
    } else {
      for (const translation of this._directions) {
        const directionalResults = this.lineCheck(start, translation);
        results.push(...directionalResults);
      }
    }
    return results;
  }

  private dfsCheck(
    start: Point,
    visited: Set<Point>,
    history: Point[]
  ): Result[] {
    const results: Result[] = [];
    if (visited.has(start)) {
      return results;
    }
    visited.add(start);
    history.push(start);

    let currentString = '';

    for (let i = 0; i < history.length; i++) {
      const pt = history[i];
      currentString = currentString + this._matrix[pt.y][pt.x];
    }
    const wordsWithPrefix = this._targets.getPrefix(currentString);

    if (wordsWithPrefix.length === 0) {
      visited.delete(start);
      history.pop();
      return results;
    }
    const idx = wordsWithPrefix.indexOf(currentString);
    if (wordsWithPrefix.indexOf(currentString) !== -1) {
      const foundWord = new Result(currentString, history);
      results.push(foundWord);
    }
    for (const translation of this._directions) {
      const next: Point = {
        x: start.x + translation[0],
        y: start.y + translation[1],
      };
      if (this.isInBounds(next)) {
        results.push(...this.dfsCheck(next, visited, history));
      }
    }
    visited.delete(start);
    history.pop();

    return results;
  }

  private lineCheck(start: Point, direction: number[]): Result[] {
    const results: Result[] = [];

    // Working set
    let currentPoint = start;
    let currentString = '';
    const pointHistory = [];
    while (this.isInBounds(currentPoint)) {
      currentString =
        currentString + this._matrix[currentPoint.y][currentPoint.x];

      // Get the candidates with the current prefix string
      const wordsWithPrefix = this._targets.getPrefix(currentString);

      // No point in going on, we've run out of possibilities
      if (wordsWithPrefix.length === 0) {
        break;
      }

      const p: Point = { x: currentPoint.x, y: currentPoint.y };
      pointHistory.push(p);

      // Is a candidate an exact match for the current search string? Save it.
      if (wordsWithPrefix.indexOf(currentString) !== -1) {
        const foundWord = new Result(currentString, pointHistory);
        results.push(foundWord);
      }
      const next: Point = {
        x: currentPoint.x + direction[0],
        y: currentPoint.y + direction[1],
      };
      currentPoint = next;
    }

    return results;
  }

  private isInBounds(point: Point): boolean {
    if (point.y < 0 || point.y >= this._matrix.length) {
      return false;
    }
    if (point.x < 0 || point.x >= this._matrix[point.y].length) {
      return false;
    }
    return true;
  }
}
