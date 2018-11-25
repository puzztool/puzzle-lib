import {Trie} from 'prefix-trie-ts';
import {WordSearchPoint} from './WordSearchPoint';
import {WordSearchResult} from './WordSearchResult';

export class LineSolver {
  private _matrix: string[][];
  private _directions: number[][];
  private _trie: Trie;

  constructor(matrix: string[][]) {
    this._matrix = matrix;

    this._directions = [
      // Cardinal directions
      [0, 1], [-1, 0], [1, 0], [0, -1],
      // Diagonal
      [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];

    this._trie = new Trie([]);
  }

  findWords(words: string[]): WordSearchResult[] {
    for (const word of words) {
      this._trie.addWord(word);
    }
    return this.search();
  }

  private search(): WordSearchResult[] {
    let results: WordSearchResult[] = [];
    for (let i = 0; i < this._matrix.length; i++) {
      for (let j = 0; j < this._matrix[i].length; j++) {
        const point = new WordSearchPoint(i, j);
        const pointResults = this.startSearch(point);
        results = results.concat(pointResults);
      }
    }
    return results;
  }

  private startSearch(start: WordSearchPoint): WordSearchResult[] {
    let results: WordSearchResult[] = [];
    for (const translation of this._directions) {
      const directionalResults = this.checkDirection(start, translation);
      results = results.concat(directionalResults);
    }
    return results;
  }

  private checkDirection(start: WordSearchPoint, direction: number[]): WordSearchResult[] {
    const results: WordSearchResult[] = [];

    // Working set
    let currentPoint = start;
    let currentString = '';
    const pointHistory = [];
    while (this.isInBounds(currentPoint)) {
      currentString = currentString + this._matrix[currentPoint.i][currentPoint.j];

      // Get the candidates with the current prefix string
      const wordsWithPrefix = this._trie.getPrefix(currentString);

      // No point in going on, we've run out of possibilities
      if (wordsWithPrefix.length === 0) {
        break;
      }

      pointHistory.push(new WordSearchPoint(currentPoint.i, currentPoint.j));

      // Is a candidate an exact match for the current search string? Save it.
      if (wordsWithPrefix.indexOf(currentString) !== -1) {
        const foundWord = new WordSearchResult(currentString, pointHistory);
        results.push(foundWord);
      }

      const next = new WordSearchPoint(currentPoint.i + direction[0], currentPoint.j + direction[1]);
      currentPoint = next;
    }

    return results;
  }

  private isInBounds(point: WordSearchPoint): boolean {
    if (point.i < 0 || point.i >= this._matrix.length) {
      return false;
    }
    if (point.j < 0 || point.j >= this._matrix[point.i].length) {
      return false;
    }
    return true;
  }
}
