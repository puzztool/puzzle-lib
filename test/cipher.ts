import {describe, it, expect} from 'vitest';
import {
  caesarRotate,
  caesarRotations,
  vigenereEncrypt,
  vigenereDecrypt,
  autokeyEncrypt,
  autokeyDecrypt,
  rotateLetter,
  isAlpha,
} from '../src';

describe('Cipher', () => {
  describe('isAlpha', () => {
    it('returns true for letters', () => {
      expect(isAlpha('a')).toBe(true);
      expect(isAlpha('z')).toBe(true);
      expect(isAlpha('A')).toBe(true);
      expect(isAlpha('Z')).toBe(true);
      expect(isAlpha('m')).toBe(true);
    });

    it('returns false for non-letters', () => {
      expect(isAlpha('0')).toBe(false);
      expect(isAlpha(' ')).toBe(false);
      expect(isAlpha('!')).toBe(false);
      expect(isAlpha('@')).toBe(false);
    });
  });

  describe('rotateLetter', () => {
    it('rotates lowercase', () => {
      expect(rotateLetter('a', 1)).toBe('b');
      expect(rotateLetter('z', 1)).toBe('a');
      expect(rotateLetter('a', 13)).toBe('n');
    });

    it('rotates uppercase', () => {
      expect(rotateLetter('A', 1)).toBe('B');
      expect(rotateLetter('Z', 1)).toBe('A');
      expect(rotateLetter('A', 13)).toBe('N');
    });

    it('preserves non-alpha characters', () => {
      expect(rotateLetter(' ', 5)).toBe(' ');
      expect(rotateLetter('!', 13)).toBe('!');
      expect(rotateLetter('0', 1)).toBe('0');
    });

    it('handles negative rotation', () => {
      expect(rotateLetter('b', -1)).toBe('a');
      expect(rotateLetter('a', -1)).toBe('z');
    });
  });

  describe('caesarRotate', () => {
    it('Basic tests', () => {
      expect(caesarRotate('abc', 0)).toBe('abc');
      expect(caesarRotate('abc', 1)).toBe('bcd');
      expect(caesarRotate('abc', 13)).toBe('nop');
      expect(caesarRotate('abc', 25)).toBe('zab');
    });

    it('Advanced', () => {
      expect(caesarRotate('abc', 26)).toBe('abc');
      expect(caesarRotate('abc', 13 + 26)).toBe('nop');
      expect(caesarRotate('abc', -1)).toBe('zab');
      expect(caesarRotate('abc', -26)).toBe('abc');
    });

    it('Empty', () => {
      expect(caesarRotate('', 0)).toBe('');
      expect(caesarRotate('', 13)).toBe('');
      expect(caesarRotate('a', 0)).toBe('a');
      expect(caesarRotate('a', 13)).toBe('n');
    });

    it('Different text', () => {
      expect(caesarRotate('abc', 13)).toBe('nop');
      expect(caesarRotate('bcd', 13)).toBe('opq');
    });
  });

  describe('caesarRotations', () => {
    it('Basic tests', () => {
      const rotations = caesarRotations('abc');

      expect(rotations[0]).toBe('abc');
      expect(rotations[1]).toBe('bcd');
      expect(rotations[13]).toBe('nop');
      expect(rotations[25]).toBe('zab');

      expect(rotations[-1]).toBe(undefined);
      expect(rotations[26]).toBe(undefined);
    });

    it('Empty', () => {
      expect(caesarRotations('').length).toBe(26);
      expect(caesarRotations('a').length).toBe(26);
    });
  });

  describe('vigenereEncrypt / vigenereDecrypt', () => {
    it('encrypt - Basic tests', () => {
      expect(vigenereEncrypt('ATTACKATDAWN', 'LEMON')).toBe('LXFOPVEFRNHR');
      expect(vigenereEncrypt('ATTACKATDAWN', 'LEMONLEMON')).toBe(
        'LXFOPVEFRNHR',
      );
      expect(vigenereEncrypt('ATTACK AT DAWN', 'LEMON')).toBe('LXFOPV EF RNHR');
    });

    it('decrypt - Basic tests', () => {
      expect(vigenereDecrypt('LXFOPVEFRNHR', 'LEMON')).toBe('ATTACKATDAWN');
      expect(vigenereDecrypt('LXFOPVEFRNHR', 'LEMONLEMON')).toBe(
        'ATTACKATDAWN',
      );
      expect(vigenereDecrypt('LXFOPV EF RNHR', 'LEMON')).toBe('ATTACK AT DAWN');
    });

    it('encrypt/decrypt - Empty', () => {
      expect(vigenereEncrypt('', '')).toBe('');
      expect(vigenereDecrypt('', '')).toBe('');

      expect(vigenereEncrypt('ATTACKATDAWN', '')).toBe('ATTACKATDAWN');
      expect(vigenereDecrypt('ATTACKATDAWN', '')).toBe('ATTACKATDAWN');

      expect(vigenereEncrypt('ATTACK AT DAWN', '')).toBe('ATTACK AT DAWN');
      expect(vigenereDecrypt('ATTACK AT DAWN', '')).toBe('ATTACK AT DAWN');

      expect(vigenereEncrypt('', 'LEMON')).toBe('');
      expect(vigenereDecrypt('', 'LEMON')).toBe('');
    });
  });

  describe('autokeyEncrypt / autokeyDecrypt', () => {
    it('encrypt - Basic tests', () => {
      expect(autokeyEncrypt('ATTACKATDAWN', 'QUEENLY')).toBe('QNXEPVYTWTWP');
      expect(autokeyEncrypt('ATTACK AT DAWN', 'QUEENLY')).toBe(
        'QNXEPV YT WTWP',
      );
    });

    it('decrypt - Basic tests', () => {
      expect(autokeyDecrypt('QNXEPVYTWTWP', 'QUEENLY')).toBe('ATTACKATDAWN');
      expect(autokeyDecrypt('QNXEPV YT WTWP', 'QUEENLY')).toBe(
        'ATTACK AT DAWN',
      );
    });

    it('encrypt/decrypt - Empty', () => {
      expect(autokeyEncrypt('', '')).toBe('');
      expect(autokeyDecrypt('', '')).toBe('');

      expect(autokeyEncrypt('ATTACKATDAWN', '')).toBe('ATTACKATDAWN');
      expect(autokeyDecrypt('ATTACKATDAWN', '')).toBe('ATTACKATDAWN');

      expect(autokeyEncrypt('ATTACK AT DAWN', '')).toBe('ATTACK AT DAWN');
      expect(autokeyDecrypt('ATTACK AT DAWN', '')).toBe('ATTACK AT DAWN');

      expect(autokeyEncrypt('', 'QUEENLY')).toBe('');
      expect(autokeyDecrypt('', 'QUEENLY')).toBe('');
    });
  });
});
