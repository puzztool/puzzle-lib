import {PigpenSegment} from './segment.js';

export enum PigpenEncoding {
  None = 0,

  // Grid without dot (A-I)
  LetterA = PigpenSegment.East | PigpenSegment.South,
  LetterB = PigpenSegment.West | PigpenSegment.East | PigpenSegment.South,
  LetterC = PigpenSegment.West | PigpenSegment.South,
  LetterD = PigpenSegment.North | PigpenSegment.East | PigpenSegment.South,
  LetterE = PigpenSegment.North |
    PigpenSegment.East |
    PigpenSegment.South |
    PigpenSegment.West,
  LetterF = PigpenSegment.North | PigpenSegment.West | PigpenSegment.South,
  LetterG = PigpenSegment.North | PigpenSegment.East,
  LetterH = PigpenSegment.North | PigpenSegment.West | PigpenSegment.East,
  LetterI = PigpenSegment.North | PigpenSegment.West,

  // Grid with dot (J-R)
  LetterJ = PigpenSegment.East | PigpenSegment.South | PigpenSegment.Dot,
  LetterK = PigpenSegment.West |
    PigpenSegment.East |
    PigpenSegment.South |
    PigpenSegment.Dot,
  LetterL = PigpenSegment.West | PigpenSegment.South | PigpenSegment.Dot,
  LetterM = PigpenSegment.North |
    PigpenSegment.East |
    PigpenSegment.South |
    PigpenSegment.Dot,
  LetterN = PigpenSegment.North |
    PigpenSegment.East |
    PigpenSegment.South |
    PigpenSegment.West |
    PigpenSegment.Dot,
  LetterO = PigpenSegment.North |
    PigpenSegment.West |
    PigpenSegment.South |
    PigpenSegment.Dot,
  LetterP = PigpenSegment.North | PigpenSegment.East | PigpenSegment.Dot,
  LetterQ = PigpenSegment.North |
    PigpenSegment.West |
    PigpenSegment.East |
    PigpenSegment.Dot,
  LetterR = PigpenSegment.North | PigpenSegment.West | PigpenSegment.Dot,

  // X without dot (S-V)
  LetterS = PigpenSegment.NorthWest | PigpenSegment.NorthEast,
  LetterT = PigpenSegment.NorthWest | PigpenSegment.SouthWest,
  LetterU = PigpenSegment.NorthEast | PigpenSegment.SouthEast,
  LetterV = PigpenSegment.SouthWest | PigpenSegment.SouthEast,

  // X with dot (W-Z)
  LetterW = PigpenSegment.NorthWest |
    PigpenSegment.NorthEast |
    PigpenSegment.Dot,
  LetterX = PigpenSegment.NorthWest |
    PigpenSegment.SouthWest |
    PigpenSegment.Dot,
  LetterY = PigpenSegment.NorthEast |
    PigpenSegment.SouthEast |
    PigpenSegment.Dot,
  LetterZ = PigpenSegment.SouthWest |
    PigpenSegment.SouthEast |
    PigpenSegment.Dot,
}
