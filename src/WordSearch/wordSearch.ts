import trie = require('trie-prefix-tree');

import {Point} from './Point';
import {Result} from './Result';
import {WordSearchDirection} from './WordSearchDirection';

export enum WordSearchSpaceTreatment {
  None = 0,
  RemoveWithinPuzzle = 1,
  RemoveAll = 2,
}

export interface WordSearchOptions {
  grid: string[][];
  words: string[];
  directions?: WordSearchDirection;
  canBend?: boolean;
  spaceTreatment?: WordSearchSpaceTreatment;
}

export function parseWordSearchGrid(input: string): string[][] {
  const lines = input.split(/\r?\n/).filter(line => line.length > 0);
  const grid: string[][] = [];
  for (const line of lines) {
    grid.push(line.split(''));
  }
  return grid;
}

export function findWords(options: WordSearchOptions): Result[] {
  const {
    words,
    directions: directionOption = WordSearchDirection.CardinalAndDiagonal,
    canBend = false,
    spaceTreatment = WordSearchSpaceTreatment.None,
  } = options;
  let matrix = options.grid;

  // Build trie from words
  const targets = trie([]);
  for (const full of words) {
    if (full === null || typeof full === 'undefined') {
      throw new Error('Invalid input in findWords()');
    }
    const word = full.trim();
    if (word !== '') {
      targets.addWord(word);
    } else {
      throw new Error('Cannot find an empty string in the wordsearch');
    }
  }

  // Resolve directions
  const directionVectors = resolveDirections(directionOption);

  // Handle space treatment
  matrix = applySpaceTreatment(matrix, spaceTreatment);

  // Search
  const results: Result[] = [];
  const numRows = matrix.length;
  for (let yIdx = 0; yIdx < numRows; yIdx++) {
    const lineLength = matrix[yIdx].length;
    for (let xIdx = 0; xIdx < lineLength; xIdx++) {
      const p: Point = {x: xIdx, y: yIdx};
      const pointResults = search(
        p,
        matrix,
        targets,
        directionVectors,
        canBend,
      );
      results.push(...pointResults);
    }
  }
  return results;
}

function resolveDirections(direction: WordSearchDirection): number[][] {
  let directions: number[][] = [];
  if (
    direction === WordSearchDirection.Cardinal ||
    direction === WordSearchDirection.CardinalAndDiagonal
  ) {
    directions = directions.concat([
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
    directions = directions.concat([
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ]);
  }
  return directions;
}

function applySpaceTreatment(
  matrix: string[][],
  treatment: WordSearchSpaceTreatment,
): string[][] {
  if (matrix.length === 0 || treatment === WordSearchSpaceTreatment.None) {
    return matrix;
  }

  const nextMatrix: string[][] = [];
  for (let yIdx = 0; yIdx < matrix.length; yIdx++) {
    const line: string[] = [];
    let inPuzzle = false;
    for (let xIdx = 0; xIdx < matrix[yIdx].length; xIdx++) {
      const letter = matrix[yIdx][xIdx];
      if (letter !== ' ') {
        inPuzzle = true;
      }
      if (treatment === WordSearchSpaceTreatment.RemoveAll && letter !== ' ') {
        line.push(matrix[yIdx][xIdx]);
      } else if (letter !== ' ' && inPuzzle) {
        line.push(matrix[yIdx][xIdx]);
      }
    }
    if (line.length > 0) {
      nextMatrix.push(line);
    }
  }
  return nextMatrix;
}

function search(
  start: Point,
  matrix: string[][],
  targets: ReturnType<typeof trie>,
  directions: number[][],
  canBend: boolean,
): Result[] {
  const results: Result[] = [];
  if (canBend) {
    const history: Point[] = [];
    const dfsResults = dfsCheck(
      start,
      new Set(),
      history,
      matrix,
      targets,
      directions,
    );
    results.push(...dfsResults);
  } else {
    for (const translation of directions) {
      const directionalResults = lineCheck(start, translation, matrix, targets);
      results.push(...directionalResults);
    }
  }
  return results;
}

function dfsCheck(
  start: Point,
  visited: Set<Point>,
  history: Point[],
  matrix: string[][],
  targets: ReturnType<typeof trie>,
  directions: number[][],
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
    currentString = currentString + matrix[pt.y][pt.x];
  }

  const wordsWithPrefix = targets.getPrefix(currentString);
  if (wordsWithPrefix.length === 0) {
    visited.delete(start);
    history.pop();
    return results;
  }

  if (wordsWithPrefix.indexOf(currentString) !== -1) {
    const foundWord = new Result(currentString, history);
    results.push(foundWord);
  }

  for (const translation of directions) {
    const next: Point = {
      x: start.x + translation[0],
      y: start.y + translation[1],
    };

    if (isInBounds(next, matrix)) {
      results.push(
        ...dfsCheck(next, visited, history, matrix, targets, directions),
      );
    }
  }

  visited.delete(start);
  history.pop();

  return results;
}

function lineCheck(
  start: Point,
  direction: number[],
  matrix: string[][],
  targets: ReturnType<typeof trie>,
): Result[] {
  const results: Result[] = [];

  let currentPoint = start;
  let currentString = '';
  const pointHistory: Point[] = [];
  while (isInBounds(currentPoint, matrix)) {
    currentString = currentString + matrix[currentPoint.y][currentPoint.x];

    const wordsWithPrefix = targets.getPrefix(currentString);

    if (wordsWithPrefix.length === 0) {
      break;
    }

    const p: Point = {x: currentPoint.x, y: currentPoint.y};
    pointHistory.push(p);

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

function isInBounds(point: Point, matrix: string[][]): boolean {
  if (point.y < 0 || point.y >= matrix.length) {
    return false;
  }
  if (point.x < 0 || point.x >= matrix[point.y].length) {
    return false;
  }
  return true;
}
