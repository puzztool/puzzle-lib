import trie from 'trie-prefix-tree';

import {WordSearchPoint} from './point.js';
import {WordSearchResult} from './result.js';
import {WordSearchDirection} from './direction.js';

export interface WordSearchOptions {
  grid: string[][];
  words: string[];
  directions?: WordSearchDirection;
  canBend?: boolean;
}

// Remove columns that are entirely spaces across all rows.
function collapseSpaceColumns(matrix: string[][]): string[][] {
  if (matrix.length === 0) {
    return matrix;
  }

  const maxCols = Math.max(...matrix.map(row => row.length));
  const keepColumn: boolean[] = [];
  for (let col = 0; col < maxCols; col++) {
    keepColumn.push(matrix.some(row => col < row.length && row[col] !== ' '));
  }

  return matrix.map(row => row.filter((_, col) => keepColumn[col]));
}

export function parseWordSearchGrid(input: string): string[][] {
  const lines = input.split(/\r?\n/).filter(line => line.trimEnd().length > 0);
  const grid: string[][] = [];
  for (const line of lines) {
    grid.push(line.split(''));
  }
  return collapseSpaceColumns(grid);
}

export function findWords(options: WordSearchOptions): WordSearchResult[] {
  const {
    words,
    directions: directionOption = WordSearchDirection.CardinalAndDiagonal,
    canBend = false,
  } = options;
  const matrix = options.grid;

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

  // Search
  const results: WordSearchResult[] = [];
  const numRows = matrix.length;
  for (let yIdx = 0; yIdx < numRows; yIdx++) {
    const lineLength = matrix[yIdx].length;
    for (let xIdx = 0; xIdx < lineLength; xIdx++) {
      const p: WordSearchPoint = {x: xIdx, y: yIdx};
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

function search(
  start: WordSearchPoint,
  matrix: string[][],
  targets: ReturnType<typeof trie>,
  directions: number[][],
  canBend: boolean,
): WordSearchResult[] {
  const results: WordSearchResult[] = [];
  if (canBend) {
    const history: WordSearchPoint[] = [];
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
  start: WordSearchPoint,
  visited: Set<WordSearchPoint>,
  history: WordSearchPoint[],
  matrix: string[][],
  targets: ReturnType<typeof trie>,
  directions: number[][],
): WordSearchResult[] {
  const results: WordSearchResult[] = [];

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
    const foundWord = new WordSearchResult(currentString, history);
    results.push(foundWord);
  }

  for (const translation of directions) {
    const next: WordSearchPoint = {
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
  start: WordSearchPoint,
  direction: number[],
  matrix: string[][],
  targets: ReturnType<typeof trie>,
): WordSearchResult[] {
  const results: WordSearchResult[] = [];

  let currentPoint = start;
  let currentString = '';
  const pointHistory: WordSearchPoint[] = [];
  while (isInBounds(currentPoint, matrix)) {
    currentString = currentString + matrix[currentPoint.y][currentPoint.x];

    const wordsWithPrefix = targets.getPrefix(currentString);

    if (wordsWithPrefix.length === 0) {
      break;
    }

    const p: WordSearchPoint = {x: currentPoint.x, y: currentPoint.y};
    pointHistory.push(p);

    if (wordsWithPrefix.indexOf(currentString) !== -1) {
      const foundWord = new WordSearchResult(currentString, pointHistory);
      results.push(foundWord);
    }
    const next: WordSearchPoint = {
      x: currentPoint.x + direction[0],
      y: currentPoint.y + direction[1],
    };
    currentPoint = next;
  }

  return results;
}

function isInBounds(point: WordSearchPoint, matrix: string[][]): boolean {
  if (point.y < 0 || point.y >= matrix.length) {
    return false;
  }
  if (point.x < 0 || point.x >= matrix[point.y].length) {
    return false;
  }
  return true;
}
