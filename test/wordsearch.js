/* global describe, it */

const assert = require('assert');
const { LineSolver } = require('../');

describe('LineSolver', function () {
  it('Cardnial directions', function () {
    const matrix = [
      [ 'p', 'x', 'x', 'x' ],
      [ 'u', 'w', 'i', 'n' ],
      [ 'z', 'x', 'x', 'x' ],
      [ 'z', 'x', 'x', 'x' ]
    ];
    const solver = new LineSolver(matrix);
    const results = solver.findWords(['puzz', 'win', 'foo', 'bar', 'baz']);

    assert.strictEqual(results.length, 2);
  });

  it('Diagonal directions', function () {
    const matrix = [
      [ 'p', 'x', 'x', 'x', 'b' ],
      [ 'x', 'u', 'x', 'a', 'x' ],
      [ 'x', 'x', 'z', 'x', 'x' ],
      [ 'x', 'x', 'x', 'z', 'x' ]
    ];
    const solver = new LineSolver(matrix);
    const results = solver.findWords(['puzz', 'baz']);

    assert.strictEqual(results.length, 2);
  });

  it('Jagged array', function () {
    const matrix = [
      [ 'x', 'f', 'o', 'o' ],
      [ 'b', 'x', 'x', ],
      [ 'a', 'x', 'b', 'a', 'r' ],
      [ 'z', 'x', 'x', 'x' ]
    ];
    const solver = new LineSolver(matrix);
    const results = solver.findWords(['foo', 'bar', 'baz', 'abc', 'def']);

    assert.strictEqual(results.length, 3);
  });

  it('Validate path', function () {
    const matrix = [
      [ 'x', 'x', 'x', 'x' ],
      [ 'x', 'f', 'o', 'o' ],
      [ 'x', 'x', 'x', 'x' ],
      [ 'x', 'x', 'x', 'x' ],
    ];
    const solver = new LineSolver(matrix);
    const results = solver.findWords(['foo', 'bar', 'baz']);

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].word, 'foo');

    assert.strictEqual(results[0].points[0].j, 1);
    assert.strictEqual(results[0].points[0].i, 1);
    assert.strictEqual(results[0].points[1].j, 2);
    assert.strictEqual(results[0].points[1].i, 1);
    assert.strictEqual(results[0].points[2].j, 3);
    assert.strictEqual(results[0].points[2].i, 1);
  });
});
