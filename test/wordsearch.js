/* global describe, it */

const assert = require('assert');
const { LineSolver } = require('../');

describe('LineSolver', function () {
  it('Cardnial directions', function () {
    const matrix = [
      [ 'p', 'i', 'o', 't' ],
      [ 'u', 'w', 'i', 'n' ],
      [ 'z', 'b', 'w', 'q' ],
      [ 'z', 'x', 'a', 'm' ]
    ];
    const solver = new LineSolver(matrix);
    const results = solver.findWords(['puzz', 'win', 'foo', 'bar', 'baz']);

    assert.strictEqual(results.length, 2);
  });
});
