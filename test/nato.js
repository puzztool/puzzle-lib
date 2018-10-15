/* global describe, it */

const assert = require('assert');
const { NatoData } = require('../');

describe('Nato', function () {
  it('Entries', function () {
    const chars = NatoData.instance.entries;
    assert.strictEqual(chars.length, 26);
    for (let ch of chars) {
      assert.strictEqual(ch.character.length, 1);
      assert.strictEqual(ch.character, ch.word.substring(0, 1));
    }
  });
  it('Lookup', function () {
    assert.strictEqual(NatoData.instance.lookup('B').word, 'Bravo');
    assert.strictEqual(NatoData.instance.lookup(''), null);
  });
});
