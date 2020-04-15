/* global describe, it */

const assert = require('assert');
const {NatoData} = require('../');

describe('Nato', () => {
  it('Entries', () => {
    const chars = NatoData.instance.entries;
    assert.strictEqual(chars.length, 26);
    for (const ch of chars) {
      assert.strictEqual(ch.character.length, 1);
      assert.strictEqual(ch.character, ch.word.substring(0, 1));
    }
  });
  it('Lookup', () => {
    assert.strictEqual(NatoData.instance.lookup('B').word, 'Bravo');
    assert.strictEqual(NatoData.instance.lookup('b').word, 'Bravo');
    assert.strictEqual(NatoData.instance.lookup(''), null);
  });
});
