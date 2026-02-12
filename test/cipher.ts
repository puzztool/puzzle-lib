import {describe, it, expect} from 'vitest';
import {CaesarString, VigenereString, AutoKeyString} from '../src';

describe('Cipher', () => {
  describe('CaesarString', () => {
    it('getRotation - Basic tests', () => {
      const str = new CaesarString('abc');

      expect(str.getRotation(0)).toBe('abc');
      expect(str.getRotation(1)).toBe('bcd');
      expect(str.getRotation(13)).toBe('nop');
      expect(str.getRotation(25)).toBe('zab');
    });

    it('getRotation - Advanced', () => {
      const str = new CaesarString('abc');

      expect(str.getRotation(26)).toBe('abc');
      expect(str.getRotation(13 + 26)).toBe('nop');
      expect(str.getRotation(-1)).toBe('zab');
      expect(str.getRotation(-26)).toBe('abc');
    });

    it('getRotation - Empty', () => {
      const str = new CaesarString();
      expect(str.getRotation(0)).toBe('');
      expect(str.getRotation(13)).toBe('');

      str.text = 'a';
      expect(str.getRotation(0)).toBe('a');
      expect(str.getRotation(13)).toBe('n');

      str.text = '';
      expect(str.getRotation(0)).toBe('');
      expect(str.getRotation(13)).toBe('');
    });

    it('getRotations - Basic tests', () => {
      const str = new CaesarString('abc');
      const rotations = str.getRotations();

      expect(rotations[0]).toBe('abc');
      expect(rotations[1]).toBe('bcd');
      expect(rotations[13]).toBe('nop');
      expect(rotations[25]).toBe('zab');

      expect(rotations[-1]).toBe(undefined);
      expect(rotations[26]).toBe(undefined);
    });

    it('getRotations - Empty', () => {
      const str = new CaesarString();
      expect(str.getRotations().length).toBe(26);

      str.text = 'a';
      expect(str.getRotations().length).toBe(26);

      str.text = '';
      expect(str.getRotations().length).toBe(26);
    });

    it('update - Basic tests', () => {
      const str = new CaesarString('abc');
      expect(str.getRotation(13)).toBe('nop');

      str.text = 'bcd';
      expect(str.getRotation(13)).toBe('opq');
    });
  });

  describe('VigenereString', () => {
    it('encrypt - Basic tests', () => {
      const str = new VigenereString('ATTACKATDAWN', 'LEMON');
      expect(str.encrypt()).toBe('LXFOPVEFRNHR');

      str.key = 'LEMONLEMON';
      expect(str.encrypt()).toBe('LXFOPVEFRNHR');

      str.text = 'ATTACK AT DAWN';
      expect(str.encrypt()).toBe('LXFOPV EF RNHR');
    });

    it('decrypt - Basic tests', () => {
      const str = new VigenereString('LXFOPVEFRNHR', 'LEMON');
      expect(str.decrypt()).toBe('ATTACKATDAWN');

      str.key = 'LEMONLEMON';
      expect(str.decrypt()).toBe('ATTACKATDAWN');

      str.text = 'LXFOPV EF RNHR';
      expect(str.decrypt()).toBe('ATTACK AT DAWN');
    });

    it('encrypt/decrypt - Empty', () => {
      const str = new VigenereString();
      expect(str.encrypt()).toBe('');
      expect(str.decrypt()).toBe('');

      str.text = 'ATTACKATDAWN';
      expect(str.encrypt()).toBe('ATTACKATDAWN');
      expect(str.decrypt()).toBe('ATTACKATDAWN');

      str.text = 'ATTACK AT DAWN';
      expect(str.encrypt()).toBe('ATTACK AT DAWN');
      expect(str.decrypt()).toBe('ATTACK AT DAWN');

      str.text = '';
      str.key = 'LEMON';
      expect(str.encrypt()).toBe('');
      expect(str.decrypt()).toBe('');

      str.key = '';
      expect(str.encrypt()).toBe('');
      expect(str.decrypt()).toBe('');
    });
  });

  describe('AutoKeyString', () => {
    it('encrypt - Basic tests', () => {
      const str = new AutoKeyString('ATTACKATDAWN', 'QUEENLY');
      expect(str.encrypt()).toBe('QNXEPVYTWTWP');

      str.text = 'ATTACK AT DAWN';
      expect(str.encrypt()).toBe('QNXEPV YT WTWP');
    });

    it('decrypt - Basic tests', () => {
      const str = new AutoKeyString('QNXEPVYTWTWP', 'QUEENLY');
      expect(str.decrypt()).toBe('ATTACKATDAWN');

      str.text = 'QNXEPV YT WTWP';
      expect(str.decrypt()).toBe('ATTACK AT DAWN');
    });

    it('encrypt/decrypt - Empty', () => {
      const str = new AutoKeyString('', '');
      expect(str.encrypt()).toBe('');
      expect(str.decrypt()).toBe('');

      str.text = 'ATTACKATDAWN';
      expect(str.encrypt()).toBe('ATTACKATDAWN');
      expect(str.decrypt()).toBe('ATTACKATDAWN');

      str.text = 'ATTACK AT DAWN';
      expect(str.encrypt()).toBe('ATTACK AT DAWN');
      expect(str.decrypt()).toBe('ATTACK AT DAWN');

      str.text = '';
      str.key = 'QUEENLY';
      expect(str.encrypt()).toBe('');
      expect(str.decrypt()).toBe('');

      str.key = '';
      expect(str.encrypt()).toBe('');
      expect(str.decrypt()).toBe('');
    });
  });
});
