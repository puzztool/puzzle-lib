import {WordSearchPoint} from './point.js';

export class WordSearchResult {
  word: string;
  points: WordSearchPoint[];
  constructor(word: string, wordPoints: WordSearchPoint[]) {
    this.word = word;
    this.points = Array.from(wordPoints);
  }
}
