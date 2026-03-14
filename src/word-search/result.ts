import {Point} from './point.js';

export class WordSearchResult {
  word: string;
  points: Point[];
  constructor(word: string, wordPoints: Point[]) {
    this.word = word;
    this.points = Array.from(wordPoints);
  }
}
