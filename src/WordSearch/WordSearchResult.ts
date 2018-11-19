import {WordSearchPoint} from './WordSearchPoint';

export class WordSearchResult {
  word: string;
  points: WordSearchPoint[];
  constructor(word: string, wordPoints: WordSearchPoint[]) {
    this.word = word;
    this.points = [];
    wordPoints.forEach((element) => {
      this.points.push(element);
    });
  }
}
