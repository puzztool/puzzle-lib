/* global describe, it */

const assert = require('assert');
const {
  WordSearchSolver,
  WordSearchDirection
} = require('../');

function assertResultsContainsWord (results, word) {
  for (const result of results) {
    if (result.word === word) {
      return;
    }
  }
  assert.fail('Results do not contain expected word ' + word);
}

describe('WordSearchSolver', function () {
  it('Cardinal directions', function () {
    const matrix = [
      ['p', 'x', 'x', 'x'],
      ['u', 'w', 'i', 'n'],
      ['z', 'x', 'x', 'x'],
      ['z', 'x', 'x', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
    solver.setGrid(matrix);
    const results = solver.findWords();
    assertResultsContainsWord(results, 'puzz');
    assertResultsContainsWord(results, 'win');

    assert.strictEqual(results.length, 2);
  });

  it('Diagonal directions', function () {
    const matrix = [
      ['p', 'x', 'x', 'x', 'b'],
      ['x', 'u', 'x', 'a', 'x'],
      ['x', 'x', 'z', 'x', 'x'],
      ['x', 'x', 'x', 'z', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setWords(['puzz', 'baz']);
    solver.setGrid(matrix);
    const results = solver.findWords(matrix);

    assertResultsContainsWord(results, 'puzz');
    assertResultsContainsWord(results, 'baz');
    assert.strictEqual(results.length, 2);
  });

  it('Jagged array outside box', function () {
    const matrix = [
      ['x', 'f', 'o', 'o'],
      ['b', 'x', 'x'],
      ['a', 'x', 'b', 'a', 'r'],
      ['z', 'x', 'x', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setWords(['foo', 'bar', 'baz', 'abc', 'def']);
    solver.setGrid(matrix);
    const results = solver.findWords(matrix);

    assertResultsContainsWord(results, 'foo');
    assertResultsContainsWord(results, 'bar');
    assertResultsContainsWord(results, 'baz');
    assert.strictEqual(results.length, 3);
  });

  it('Jagged diagonal array', function () {
    const matrix = [
      ['x', 'x', 'x', 'b'],
      ['x', 'x', 'a'],
      ['x', 'r', 'o', 'o', 'f'],
      ['x', 'x', 'x', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setWords(['foo', 'bar', 'baz']);
    solver.setGrid(matrix);
    const results = solver.findWords();

    assertResultsContainsWord(results, 'foo');
    assertResultsContainsWord(results, 'bar');
    assert.strictEqual(results.length, 2);
  });

  it('Validate path', function () {
    const matrix = [
      ['x', 'x', 'x', 'x'],
      ['x', 'f', 'o', 'o'],
      ['x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setWords(['foo', 'bar', 'baz']);
    solver.setGrid(matrix);
    const results = solver.findWords();

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].word, 'foo');

    assert.strictEqual(results[0].points.length, 3);

    assert.strictEqual(results[0].points[0].x, 1);
    assert.strictEqual(results[0].points[0].y, 1);
    assert.strictEqual(results[0].points[1].x, 2);
    assert.strictEqual(results[0].points[1].y, 1);
    assert.strictEqual(results[0].points[2].x, 3);
    assert.strictEqual(results[0].points[2].y, 1);
  });

  it('Overlapping words', function () {
    const matrix = [
      ['x', 'x', 'x', 'x'],
      ['x', 'f', 'o', 'o', 'b', 'a', 'r', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setWords(['foo', 'foobar', 'bar']);
    solver.setGrid(matrix);
    const results = solver.findWords();

    assertResultsContainsWord(results, 'foo');
    assertResultsContainsWord(results, 'bar');
    assertResultsContainsWord(results, 'foobar');
    assert.strictEqual(results.length, 3);
  });

  it('Disabled directions', function () {
    const matrix = [
      ['p', 'x', 'x', 'x'],
      ['u', 'w', 'i', 'n'],
      ['z', 'x', 'a', 'x'],
      ['z', 'x', 'x', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setDirections(WordSearchDirection.Diagonal);
    solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz', 'wax']);
    solver.setGrid(matrix);
    const diagResults = solver.findWords();

    assert.strictEqual(diagResults.length, 1);
    assertResultsContainsWord(diagResults, 'wax');

    solver.setDirections(WordSearchDirection.Cardinal);
    const cardinalResults = solver.findWords(matrix);
    assertResultsContainsWord(cardinalResults, 'puzz');
    assertResultsContainsWord(cardinalResults, 'win');

    assert.strictEqual(cardinalResults.length, 2);
  });

  it('Set words clears state', function () {
    const matrix = [
      ['p', 'x', 'x', 'x'],
      ['u', 'w', 'i', 'n'],
      ['z', 'x', 'x', 'x'],
      ['z', 'x', 'x', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setWords(['x']);
    solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
    solver.setGrid(matrix);
    const results = solver.findWords();
    assertResultsContainsWord(results, 'puzz');
    assertResultsContainsWord(results, 'win');

    assert.strictEqual(results.length, 2);
  });

  it('Bent directions', function () {
    const matrix = [
      ['p', 'x', 'x', 'x'],
      ['u', 'w', 'i', 'x'],
      ['z', 'z', 'n', 'x'],
      ['x', 'x', 'x', 'x']
    ];
    const solver = new WordSearchSolver();
    solver.setWords(['puzz', 'win', 'foo', 'bar', 'baz']);
    solver.setGrid(matrix);
    solver.setDirections(WordSearchDirection.Cardinal);
    solver.setCanBend(true);
    const results = solver.findWords();
    assertResultsContainsWord(results, 'puzz');
    assertResultsContainsWord(results, 'win');

    assert.strictEqual(results.length, 2);
  });
});
