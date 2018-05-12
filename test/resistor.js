/* global describe, it */

const assert = require('assert');
const { Resistor } = require('../');

describe('Resistor', function () {
  it('Valid 3 Color Resistors', function () {
    assert.strictEqual(Resistor.getValue([Resistor.BROWN, Resistor.BLACK, Resistor.ORANGE]), 10000);
    assert.strictEqual(Resistor.getValue([Resistor.GREEN, Resistor.BLUE, Resistor.RED]), 5600);
    assert.strictEqual(Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.BROWN]), 230);
    assert.strictEqual(Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.BLUE]), 23000000);
    assert.strictEqual(Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.VIOLET]), 230000000);
    assert.strictEqual(Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.GREY]), 2300000000);
    assert.strictEqual(Resistor.getValue([Resistor.RED, Resistor.ORANGE, Resistor.WHITE]), 23000000000);
  });

  it('Valid 4 Color Resistors', function () {
    assert.strictEqual(Resistor.getValue([Resistor.BROWN, Resistor.YELLOW, Resistor.VIOLET, Resistor.BLACK]), 147);
    assert.strictEqual(Resistor.getValue([Resistor.GREY, Resistor.WHITE, Resistor.VIOLET, Resistor.GREEN]), 89700000);
  });

  it('Leading Black', function () {
    assert.strictEqual(Resistor.getValue([Resistor.BLACK, Resistor.BLACK, Resistor.BLACK]), 0);
    assert.strictEqual(Resistor.getValue([Resistor.BLACK, Resistor.BROWN, Resistor.BLACK]), 1);
  });

  it('Invalid Resistors', function () {
    assert.throws(() => Resistor.getValue([Resistor.GOLD, Resistor.RED, Resistor.RED]), /Invalid value color/);
    assert.throws(() => Resistor.getValue([Resistor.ORANGE, Resistor.RED, Resistor.SILVER, Resistor.YELLOW]), /Invalid value color/);
  });

  it('Too Short', function () {
    assert.throws(() => Resistor.getValue([]), /Invalid resistor size/);
    assert.throws(() => Resistor.getValue([Resistor.RED, Resistor.RED]), /Invalid resistor size/);
  });

  it('Too Long', function () {
    assert.throws(() => Resistor.getValue(
      [Resistor.RED, Resistor.ORANGE, Resistor.YELLOW, Resistor.GREEN, Resistor.BLUE]), /Invalid resistor size/);
  });

  it('Tolerance', function () {
    assert.strictEqual(Resistor.GOLD.getDisplayTolerance(), '&plusmn; 5%');
  });
});
