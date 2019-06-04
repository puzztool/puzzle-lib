import { SemaphoreDirection } from './SemaphoreDirection';

export enum SemaphoreEncoding {
  None = 0,

  // Letters
  LetterA = SemaphoreDirection.SouthWest | SemaphoreDirection.South,
  LetterB = SemaphoreDirection.West | SemaphoreDirection.South,
  LetterC = SemaphoreDirection.NorthWest | SemaphoreDirection.South,
  LetterD = SemaphoreDirection.North | SemaphoreDirection.South,
  LetterE = SemaphoreDirection.NorthEast | SemaphoreDirection.South,
  LetterF = SemaphoreDirection.East | SemaphoreDirection.South,
  LetterG = SemaphoreDirection.SouthEast | SemaphoreDirection.South,
  LetterH = SemaphoreDirection.SouthWest | SemaphoreDirection.West,
  LetterI = SemaphoreDirection.SouthWest | SemaphoreDirection.NorthWest,
  LetterJ = SemaphoreDirection.North | SemaphoreDirection.East,
  LetterK = SemaphoreDirection.SouthWest | SemaphoreDirection.North,
  LetterL = SemaphoreDirection.SouthWest | SemaphoreDirection.NorthEast,
  LetterM = SemaphoreDirection.SouthWest | SemaphoreDirection.East,
  LetterN = SemaphoreDirection.SouthWest | SemaphoreDirection.SouthEast,
  LetterO = SemaphoreDirection.West | SemaphoreDirection.NorthWest,
  LetterP = SemaphoreDirection.West | SemaphoreDirection.North,
  LetterQ = SemaphoreDirection.West | SemaphoreDirection.NorthEast,
  LetterR = SemaphoreDirection.West | SemaphoreDirection.East,
  LetterS = SemaphoreDirection.West | SemaphoreDirection.SouthEast,
  LetterT = SemaphoreDirection.NorthWest | SemaphoreDirection.North,
  LetterU = SemaphoreDirection.NorthWest | SemaphoreDirection.NorthEast,
  LetterV = SemaphoreDirection.North | SemaphoreDirection.SouthEast,
  LetterW = SemaphoreDirection.East | SemaphoreDirection.NorthEast,
  LetterX = SemaphoreDirection.SouthEast | SemaphoreDirection.NorthEast,
  LetterY = SemaphoreDirection.NorthWest | SemaphoreDirection.East,
  LetterZ = SemaphoreDirection.SouthEast | SemaphoreDirection.East,

  // Numbers
  Number1 = SemaphoreDirection.SouthWest | SemaphoreDirection.South,
  Number2 = SemaphoreDirection.West | SemaphoreDirection.South,
  Number3 = SemaphoreDirection.NorthWest | SemaphoreDirection.South,
  Number4 = SemaphoreDirection.North | SemaphoreDirection.South,
  Number5 = SemaphoreDirection.NorthEast | SemaphoreDirection.South,
  Number6 = SemaphoreDirection.East | SemaphoreDirection.South,
  Number7 = SemaphoreDirection.SouthEast | SemaphoreDirection.South,
  Number8 = SemaphoreDirection.SouthWest | SemaphoreDirection.West,
  Number9 = SemaphoreDirection.SouthWest | SemaphoreDirection.NorthWest,
  Number0 = SemaphoreDirection.SouthWest | SemaphoreDirection.North,

  // Formatting
  FormattingNumber = SemaphoreDirection.North | SemaphoreDirection.NorthEast,
}
