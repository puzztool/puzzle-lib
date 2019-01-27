import trie = require('trie-prefix-tree');
import {Point} from './Point';
import {WordSearchResult} from './WordSearchResult';

export class WordSearchSolver {
  // The grid of letters which makes up the wordsearch puzzle
  private _matrix: string[][];
  // Transpositions to apply when finding words
  private _directions: number[][];
  // Potential words to find in the letter grid
  private _targets: any;  // tslint:disable-line

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

  findWords(words: string[]): WordSearchResult[] {
    for (const word of words) {
      if (word !== '') {
        this._targets.addWord(word.trim());
      }
    }
    return this.search();
  }

  private search(): WordSearchResult[] {
    let results: WordSearchResult[] = [];
    for (let y = 0; y < this._matrix.length; y++) {
      for (let x = 0; x < this._matrix[y].length; x++) {
        const point = new Point(x, y);
        const pointResults = this.startSearch(point);
        results = results.concat(pointResults);
      }
    }
    return results;
  }

  private startSearch(start: Point): WordSearchResult[] {
    let results: WordSearchResult[] = [];
    for (const translation of this._directions) {
      const directionalResults = this.checkDirection(start, translation);
      results = results.concat(directionalResults);
    }
    return results;
  }

  private checkDirection(start: Point, direction: number[]): WordSearchResult[] {
    const results: WordSearchResult[] = [];

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

      pointHistory.push(new Point(currentPoint.x, currentPoint.y));

      // Is a candidate an exact match for the current search string? Save it.
      if (wordsWithPrefix.indexOf(currentString) !== -1) {
        const foundWord = new WordSearchResult(currentString, pointHistory);
        results.push(foundWord);
      }

      const next = new Point(currentPoint.x + direction[0], currentPoint.y + direction[1]);
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
