import {Point} from './Point';

export class WordSearchResult {
  word: string;
  points: Point[];
  constructor(word: string, wordPoints: Point[]) {
    this.word = word;
    this.points = wordPoints;
  }
}
