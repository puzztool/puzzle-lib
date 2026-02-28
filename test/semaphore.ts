import {describe, it, expect} from 'vitest';
import {
  addSemaphoreDirection,
  decodeSemaphoreStream,
  degreesToSemaphoreDirection,
  directionsToEncoding,
  hasSemaphoreDirection,
  lookupSemaphoreEncoding,
  removeSemaphoreDirection,
  semaphoreDirectionToDegrees,
  SemaphoreDirection,
  SemaphoreEncoding,
} from '../src';

describe('Semaphore', () => {
  describe('lookupSemaphoreEncoding', () => {
    it('Char Matches', () => {
      const aResult = lookupSemaphoreEncoding(
        (SemaphoreDirection.SouthWest |
          SemaphoreDirection.South) as SemaphoreEncoding,
      );
      expect(aResult.exactString).toBe('A/1');

      const iResult = lookupSemaphoreEncoding(SemaphoreEncoding.Number9);
      expect(iResult.exactString).toBe('I/9');

      const qResult = lookupSemaphoreEncoding(
        (SemaphoreDirection.West |
          SemaphoreDirection.NorthEast) as SemaphoreEncoding,
      );
      expect(qResult.exactString).toBe('Q');

      const zResult = lookupSemaphoreEncoding(
        (SemaphoreDirection.SouthEast |
          SemaphoreDirection.East) as SemaphoreEncoding,
      );
      expect(zResult.exactString).toBe('Z');
    });

    it('No Matches', () => {
      const result = lookupSemaphoreEncoding(
        SemaphoreDirection.South as number as SemaphoreEncoding,
      );
      expect(result.exactString).toBe('');
    });
  });

  describe('Direction helpers', () => {
    it('addSemaphoreDirection', () => {
      let enc = SemaphoreEncoding.None;
      enc = addSemaphoreDirection(
        enc,
        SemaphoreDirection.South as SemaphoreDirection,
      );
      expect(hasSemaphoreDirection(enc, SemaphoreDirection.South)).toBe(true);

      enc = addSemaphoreDirection(enc, SemaphoreDirection.SouthWest);
      expect(lookupSemaphoreEncoding(enc).exactString).toBe('A/1');
    });

    it('removeSemaphoreDirection', () => {
      let enc = (SemaphoreDirection.SouthWest |
        SemaphoreDirection.SouthEast) as SemaphoreEncoding;
      expect(lookupSemaphoreEncoding(enc).exactString).toBe('N');

      enc = removeSemaphoreDirection(enc, SemaphoreDirection.SouthEast);
      expect(hasSemaphoreDirection(enc, SemaphoreDirection.SouthEast)).toBe(
        false,
      );
      expect(hasSemaphoreDirection(enc, SemaphoreDirection.SouthWest)).toBe(
        true,
      );
    });

    it('hasSemaphoreDirection', () => {
      const enc = (SemaphoreDirection.West |
        SemaphoreDirection.East) as SemaphoreEncoding;
      expect(hasSemaphoreDirection(enc, SemaphoreDirection.West)).toBe(true);
      expect(hasSemaphoreDirection(enc, SemaphoreDirection.East)).toBe(true);
      expect(hasSemaphoreDirection(enc, SemaphoreDirection.North)).toBe(false);
    });

    it('directionsToEncoding', () => {
      const enc = directionsToEncoding([
        SemaphoreDirection.West,
        SemaphoreDirection.East,
      ]);
      expect(lookupSemaphoreEncoding(enc).exactString).toBe('R');
    });
  });

  describe('Degrees', () => {
    it('semaphoreDirectionToDegrees', () => {
      expect(semaphoreDirectionToDegrees(SemaphoreDirection.North)).toBe(0);
      expect(semaphoreDirectionToDegrees(SemaphoreDirection.SouthEast)).toBe(
        135,
      );
      expect(
        semaphoreDirectionToDegrees(SemaphoreDirection.None),
      ).toBeUndefined();
      expect(
        semaphoreDirectionToDegrees(
          SemaphoreDirection.North | SemaphoreDirection.South,
        ),
      ).toBeUndefined();
    });

    it('degreesToSemaphoreDirection', () => {
      expect(degreesToSemaphoreDirection(0)).toBe(SemaphoreDirection.North);
      expect(degreesToSemaphoreDirection(135)).toBe(
        SemaphoreDirection.SouthEast,
      );
    });

    it('Full rotation cases', () => {
      expect(degreesToSemaphoreDirection(1080)).toBe(SemaphoreDirection.North);
      expect(degreesToSemaphoreDirection(1260)).toBe(SemaphoreDirection.South);
    });
  });

  describe('Encoding', () => {
    it('Letters match numbers', () => {
      expect(SemaphoreEncoding.LetterA).toBe(SemaphoreEncoding.Number1);
      expect(SemaphoreEncoding.LetterB).toBe(SemaphoreEncoding.Number2);
      expect(SemaphoreEncoding.LetterC).toBe(SemaphoreEncoding.Number3);
      expect(SemaphoreEncoding.LetterD).toBe(SemaphoreEncoding.Number4);
      expect(SemaphoreEncoding.LetterE).toBe(SemaphoreEncoding.Number5);
      expect(SemaphoreEncoding.LetterF).toBe(SemaphoreEncoding.Number6);
      expect(SemaphoreEncoding.LetterG).toBe(SemaphoreEncoding.Number7);
      expect(SemaphoreEncoding.LetterH).toBe(SemaphoreEncoding.Number8);
      expect(SemaphoreEncoding.LetterI).toBe(SemaphoreEncoding.Number9);
      expect(SemaphoreEncoding.LetterK).toBe(SemaphoreEncoding.Number0);
    });
  });

  describe('Stream', () => {
    it('decodeSemaphoreStream', () => {
      const result = decodeSemaphoreStream([
        SemaphoreEncoding.LetterA,
        SemaphoreEncoding.None,
        SemaphoreEncoding.LetterB,
      ]);
      expect(result).toBe('A B');
    });

    it('decodeSemaphoreStream with number mode', () => {
      const result = decodeSemaphoreStream([
        SemaphoreEncoding.FormattingNumber,
        SemaphoreEncoding.LetterA,
        SemaphoreEncoding.None,
        SemaphoreEncoding.LetterB,
      ]);
      expect(result).toBe('#1 B');
    });
  });
});
