import trie = require('trie-prefix-tree');
import {Point} from './Point';
import {Result} from './Result';

export class WordSearchSolver {
  // The grid of letters which makes up the wordsearch puzzle
  private _matrix: string[][];
  // Transpositions to apply when finding words
  private _directions: number[][];
  // Potential words to find in the letter grid
  private _targets: ReturnType<typeof trie>;

  constructor(matrix: string[][]) {
    this._matrix = matrix;

    this._directions = [
      // Cardinal directions
      [0, 1], [-1, 0], [1, 0], [0, -1],
      // Diagonal
      [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];

    this._targets = trie([]);
  }

  findWords(words: string[]): Result[] {
    for (const word of words) {
      if (word !== '') {
        this._targets.addWord(word.trim());
      }
    }
    return this.search();
  }

  private search(): Result[] {
    let results: Result[] = [];
    const numRows = this._matrix.length;
    for (let yIdx = 0; yIdx < numRows; yIdx++) {
      const lineLength = this._matrix[yIdx].length;
      for (let xIdx = 0; xIdx < lineLength; xIdx++) {
        const p: Point = {x: xIdx, y: yIdx};
        const pointResults = this.startSearch(p);
        results = results.concat(pointResults);
      }
    }
    return results;
  }

  private startSearch(start: Point): Result[] {
    const results: Result[] = [];
    for (const translation of this._directions) {
      const directionalResults = this.checkDirection(start, translation);
      results.push(...directionalResults);
    }
    return results;
  }

  private checkDirection(start: Point, direction: number[]): Result[] {
    const results: Result[] = [];

    // Working set
    let currentPoint = start;
    let currentString = '';
    const pointHistory = [];
    while (this.isInBounds(currentPoint)) {
      currentString = currentString + this._matrix[currentPoint.y][currentPoint.x];

      // Get the candidates with the current prefix string
      const wordsWithPrefix = this._targets.getPrefix(currentString);

      // No point in going on, we've run out of possibilities
      if (wordsWithPrefix.length === 0) {
        break;
      }

      const p: Point = {x: currentPoint.x, y: currentPoint.y};
      pointHistory.push(p);

      // Is a candidate an exact match for the current search string? Save it.
      if (wordsWithPrefix.indexOf(currentString) !== -1) {
        const foundWord = new Result(currentString, pointHistory);
        results.push(foundWord);
      }
      const next: Point = {x: currentPoint.x + direction[0], y: currentPoint.y + direction[1]};
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
