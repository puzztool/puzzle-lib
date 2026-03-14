import {Point} from './Point.js';

export class Result {
  word: string;
  points: Point[];
  constructor(word: string, wordPoints: Point[]) {
    this.word = word;
    this.points = Array.from(wordPoints);
  }
}
