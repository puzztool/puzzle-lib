import {describe, it, expect} from 'vitest';
import {
  canTogglePigpenSegment,
  decodePigpenStream,
  encodePigpenStream,
  hasPigpenSegment,
  isCardinal,
  isIntercardinal,
  lookupPigpenEncoding,
  PigpenEncoding,
  PigpenSegment,
  togglePigpenSegment,
} from '../src/pigpen/index.js';

describe('Pigpen', () => {
  describe('PigpenEncoding', () => {
    it('grid letters use cardinal segments', () => {
      expect(PigpenEncoding.LetterA).toBe(
        PigpenSegment.East | PigpenSegment.South,
      );
      expect(PigpenEncoding.LetterE).toBe(
        PigpenSegment.North |
          PigpenSegment.East |
          PigpenSegment.South |
          PigpenSegment.West,
      );
      expect(PigpenEncoding.LetterI).toBe(
        PigpenSegment.North | PigpenSegment.West,
      );
    });

    it('dotted grid letters include Dot flag', () => {
      expect(PigpenEncoding.LetterJ).toBe(
        PigpenEncoding.LetterA | PigpenSegment.Dot,
      );
      expect(PigpenEncoding.LetterN).toBe(
        PigpenEncoding.LetterE | PigpenSegment.Dot,
      );
      expect(PigpenEncoding.LetterR).toBe(
        PigpenEncoding.LetterI | PigpenSegment.Dot,
      );
    });

    it('X letters use intercardinal segments', () => {
      expect(PigpenEncoding.LetterS).toBe(
        PigpenSegment.NorthWest | PigpenSegment.NorthEast,
      );
      expect(PigpenEncoding.LetterV).toBe(
        PigpenSegment.SouthWest | PigpenSegment.SouthEast,
      );
    });

    it('dotted X letters include Dot flag', () => {
      expect(PigpenEncoding.LetterW).toBe(
        PigpenEncoding.LetterS | PigpenSegment.Dot,
      );
      expect(PigpenEncoding.LetterZ).toBe(
        PigpenEncoding.LetterV | PigpenSegment.Dot,
      );
    });
  });

  describe('lookupPigpenEncoding', () => {
    it('exact match', () => {
      const result = lookupPigpenEncoding(PigpenEncoding.LetterA);
      expect(result.exactString).toBe('A');
    });

    it('partial match for incomplete encoding', () => {
      // Just the South segment matches A (E,S), B (W,E,S), C (W,S),
      // D (N,E,S), E (N,E,S,W), F (N,W,S), and dotted variants
      const southOnly = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.South,
      );
      const result = lookupPigpenEncoding(southOnly);
      expect(result.exact.length).toBe(0);
      expect(result.partial.length).toBeGreaterThan(0);
      const partialLetters = result.partial.map(e => e.display).sort();
      expect(partialLetters).toContain('A');
      expect(partialLetters).toContain('B');
      expect(partialLetters).toContain('J');
    });

    it('all letters are partial matches for empty encoding', () => {
      const result = lookupPigpenEncoding(PigpenEncoding.None);
      expect(result.exact.length).toBe(0);
      // All entries are partial matches of None
      expect(result.partial.length).toBe(26);
    });
  });

  describe('togglePigpenSegment', () => {
    it('toggles a segment on', () => {
      const result = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.East,
      );
      expect(result).toBe(PigpenSegment.East);
    });

    it('toggles a segment off', () => {
      const result = togglePigpenSegment(
        PigpenEncoding.LetterA,
        PigpenSegment.East,
      );
      expect(result).toBe(PigpenSegment.South);
    });

    it('toggles dot independently', () => {
      const result = togglePigpenSegment(
        PigpenEncoding.LetterA,
        PigpenSegment.Dot,
      );
      expect(result).toBe(PigpenEncoding.LetterJ);
    });

    it('returns unchanged when adding intercardinal to cardinal', () => {
      const encoding = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.North,
      );
      const result = togglePigpenSegment(encoding, PigpenSegment.NorthEast);
      expect(result).toBe(encoding);
    });

    it('returns unchanged when adding cardinal to intercardinal', () => {
      const encoding = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.NorthEast,
      );
      const result = togglePigpenSegment(encoding, PigpenSegment.North);
      expect(result).toBe(encoding);
    });

    it('allows toggling off an incompatible segment', () => {
      const result = togglePigpenSegment(
        PigpenEncoding.LetterA,
        PigpenSegment.East,
      );
      expect(result).not.toBe(PigpenEncoding.LetterA);
    });

    it('allows dot on cardinal encoding', () => {
      const encoding = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.North,
      );
      const result = togglePigpenSegment(encoding, PigpenSegment.Dot);
      expect(result).not.toBe(encoding);
    });

    it('allows dot on intercardinal encoding', () => {
      const encoding = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.NorthEast,
      );
      const result = togglePigpenSegment(encoding, PigpenSegment.Dot);
      expect(result).not.toBe(encoding);
    });

    it('returns unchanged for combined mask with mixed bits', () => {
      const mixed = (PigpenSegment.North |
        PigpenSegment.NorthEast) as PigpenSegment;
      const result = togglePigpenSegment(PigpenEncoding.None, mixed);
      expect(result).toBe(PigpenEncoding.None);
    });
  });

  describe('hasPigpenSegment', () => {
    it('detects set segment', () => {
      expect(hasPigpenSegment(PigpenEncoding.LetterA, PigpenSegment.East)).toBe(
        true,
      );
      expect(
        hasPigpenSegment(PigpenEncoding.LetterA, PigpenSegment.South),
      ).toBe(true);
    });

    it('detects unset segment', () => {
      expect(
        hasPigpenSegment(PigpenEncoding.LetterA, PigpenSegment.North),
      ).toBe(false);
      expect(hasPigpenSegment(PigpenEncoding.LetterA, PigpenSegment.Dot)).toBe(
        false,
      );
    });
  });

  describe('isCardinal / isIntercardinal', () => {
    it('grid letters are cardinal', () => {
      expect(isCardinal(PigpenEncoding.LetterA)).toBe(true);
      expect(isIntercardinal(PigpenEncoding.LetterA)).toBe(false);
    });

    it('X letters are intercardinal', () => {
      expect(isCardinal(PigpenEncoding.LetterS)).toBe(false);
      expect(isIntercardinal(PigpenEncoding.LetterS)).toBe(true);
    });

    it('dotted grid letters are cardinal', () => {
      expect(isCardinal(PigpenEncoding.LetterJ)).toBe(true);
      expect(isIntercardinal(PigpenEncoding.LetterJ)).toBe(false);
    });

    it('dotted X letters are intercardinal', () => {
      expect(isCardinal(PigpenEncoding.LetterW)).toBe(false);
      expect(isIntercardinal(PigpenEncoding.LetterW)).toBe(true);
    });

    it('None is neither', () => {
      expect(isCardinal(PigpenEncoding.None)).toBe(false);
      expect(isIntercardinal(PigpenEncoding.None)).toBe(false);
    });
  });

  describe('decodePigpenStream', () => {
    it('decodes a stream of encodings', () => {
      expect(
        decodePigpenStream([
          PigpenEncoding.LetterH,
          PigpenEncoding.LetterE,
          PigpenEncoding.LetterL,
          PigpenEncoding.LetterL,
          PigpenEncoding.LetterO,
        ]),
      ).toBe('HELLO');
    });

    it('treats None as space', () => {
      expect(
        decodePigpenStream([
          PigpenEncoding.LetterH,
          PigpenEncoding.LetterI,
          PigpenEncoding.None,
          PigpenEncoding.LetterY,
          PigpenEncoding.LetterO,
        ]),
      ).toBe('HI YO');
    });

    it('decodes X-shape letters', () => {
      expect(
        decodePigpenStream([
          PigpenEncoding.LetterS,
          PigpenEncoding.LetterT,
          PigpenEncoding.LetterU,
          PigpenEncoding.LetterV,
        ]),
      ).toBe('STUV');
    });

    it('decodes dotted letters', () => {
      expect(
        decodePigpenStream([
          PigpenEncoding.LetterW,
          PigpenEncoding.LetterX,
          PigpenEncoding.LetterY,
          PigpenEncoding.LetterZ,
        ]),
      ).toBe('WXYZ');
    });

    it('returns empty for empty stream', () => {
      expect(decodePigpenStream([])).toBe('');
    });
  });

  describe('encodePigpenStream', () => {
    it('basic encoding', () => {
      expect(encodePigpenStream('ABC')).toEqual([
        PigpenEncoding.LetterA,
        PigpenEncoding.LetterB,
        PigpenEncoding.LetterC,
      ]);
    });

    it('unknown character becomes None', () => {
      expect(encodePigpenStream('A1B')).toEqual([
        PigpenEncoding.LetterA,
        PigpenEncoding.None,
        PigpenEncoding.LetterB,
      ]);
    });

    it('round-trips with decodePigpenStream', () => {
      const original = [
        PigpenEncoding.LetterH,
        PigpenEncoding.LetterE,
        PigpenEncoding.LetterL,
        PigpenEncoding.LetterL,
        PigpenEncoding.LetterO,
      ];
      expect(encodePigpenStream(decodePigpenStream(original))).toEqual(
        original,
      );
    });
  });

  describe('canTogglePigpenSegment', () => {
    it('allows cardinal segment on empty encoding', () => {
      expect(
        canTogglePigpenSegment(PigpenEncoding.None, PigpenSegment.North),
      ).toBe(true);
    });

    it('allows intercardinal segment on empty encoding', () => {
      expect(
        canTogglePigpenSegment(PigpenEncoding.None, PigpenSegment.NorthEast),
      ).toBe(true);
    });

    it('allows adding cardinal to existing cardinal', () => {
      const encoding = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.North,
      );
      expect(canTogglePigpenSegment(encoding, PigpenSegment.East)).toBe(true);
    });

    it('blocks intercardinal when cardinal is set', () => {
      const encoding = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.North,
      );
      expect(canTogglePigpenSegment(encoding, PigpenSegment.NorthEast)).toBe(
        false,
      );
    });

    it('blocks cardinal when intercardinal is set', () => {
      const encoding = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.NorthEast,
      );
      expect(canTogglePigpenSegment(encoding, PigpenSegment.North)).toBe(false);
    });

    it('always allows toggling off', () => {
      expect(
        canTogglePigpenSegment(PigpenEncoding.LetterA, PigpenSegment.East),
      ).toBe(true);
    });

    it('always allows dot', () => {
      const cardinal = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.North,
      );
      const intercardinal = togglePigpenSegment(
        PigpenEncoding.None,
        PigpenSegment.NorthEast,
      );
      expect(canTogglePigpenSegment(cardinal, PigpenSegment.Dot)).toBe(true);
      expect(canTogglePigpenSegment(intercardinal, PigpenSegment.Dot)).toBe(
        true,
      );
    });

    it('rejects combined mask with both cardinal and intercardinal bits', () => {
      const mixed = (PigpenSegment.North |
        PigpenSegment.NorthEast) as PigpenSegment;
      expect(canTogglePigpenSegment(PigpenEncoding.None, mixed)).toBe(false);
    });
  });
});
