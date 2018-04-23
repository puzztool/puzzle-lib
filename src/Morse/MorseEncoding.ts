// The encoding for morse is much less straightforward than the others. The dots
// and dashes each use two bits of the integer starting with the least-
// significant bit.
//
// Example:
//
// 'F' -> ..-.
//
// Which encodes as:
//
// 01 01 10 01
//  .  .  -  .
//
// Since it's packed starting with the LSB, the resulting number is reversed:
//
// 01100101 -> 0x65
//

function packMorse(...args: MorseEncoding[]) {
  let value = MorseEncoding.None;
  let shift = 0;

  for (let arg of args) {
    arg <<= shift;
    value |= arg;
    shift += 2;
  }

  return value;
}

enum MorseEncoding {
  None = 0,

  // Primitives
  Dot = 0x1,
  Dash = 0x2,

  // Letters
  LetterA = packMorse(Dot, Dash),
  LetterB = packMorse(Dash, Dot, Dot, Dot),
  LetterC = packMorse(Dash, Dot, Dash, Dot),
  LetterD = packMorse(Dash, Dot, Dot),
  LetterE = packMorse(Dot),
  LetterF = packMorse(Dot, Dot, Dash, Dot),
  LetterG = packMorse(Dash, Dash, Dot),
  LetterH = packMorse(Dot, Dot, Dot, Dot),
  LetterI = packMorse(Dot, Dot),
  LetterJ = packMorse(Dot, Dash, Dash, Dash),
  LetterK = packMorse(Dash, Dot, Dash),
  LetterL = packMorse(Dot, Dash, Dot, Dot),
  LetterM = packMorse(Dash, Dash),
  LetterN = packMorse(Dash, Dot),
  LetterO = packMorse(Dash, Dash, Dash),
  LetterP = packMorse(Dot, Dash, Dash, Dot),
  LetterQ = packMorse(Dash, Dash, Dot, Dash),
  LetterR = packMorse(Dot, Dash, Dot),
  LetterS = packMorse(Dot, Dot, Dot),
  LetterT = packMorse(Dash),
  LetterU = packMorse(Dot, Dot, Dash),
  LetterV = packMorse(Dot, Dot, Dot, Dash),
  LetterW = packMorse(Dot, Dash, Dash),
  LetterX = packMorse(Dash, Dot, Dot, Dash),
  LetterY = packMorse(Dash, Dot, Dash, Dash),
  LetterZ = packMorse(Dash, Dash, Dot, Dot),

  // Numbers
  Number0 = packMorse(Dash, Dash, Dash, Dash, Dash),
  Number1 = packMorse(Dot, Dash, Dash, Dash, Dash),
  Number2 = packMorse(Dot, Dot, Dash, Dash, Dash),
  Number3 = packMorse(Dot, Dot, Dot, Dash, Dash),
  Number4 = packMorse(Dot, Dot, Dot, Dot, Dash),
  Number5 = packMorse(Dot, Dot, Dot, Dot, Dot),
  Number6 = packMorse(Dash, Dot, Dot, Dot, Dot),
  Number7 = packMorse(Dash, Dash, Dot, Dot, Dot),
  Number8 = packMorse(Dash, Dash, Dash, Dot, Dot),
  Number9 = packMorse(Dash, Dash, Dash, Dash, Dot),

  // Punctuation
  PunctuationPeriod = packMorse(Dot, Dash, Dot, Dash, Dot, Dash),
  PunctuationComma = packMorse(Dash, Dash, Dot, Dot, Dash, Dash),
  PunctuationQuestionMark = packMorse(Dot, Dot, Dash, Dash, Dot, Dot),
  PunctuationApostrophe = packMorse(Dot, Dash, Dash, Dash, Dash, Dot),
  PunctuationExclamationPoint = packMorse(Dash, Dot, Dash, Dot, Dash, Dash),
  PunctuationForwardSlash = packMorse(Dash, Dot, Dot, Dash, Dot),
  PunctuationOpenParenthesis = packMorse(Dash, Dot, Dash, Dash, Dot),
  PunctuationCloseParenthesis = packMorse(Dash, Dot, Dash, Dash, Dot, Dash),
  PunctuationAmpersand = packMorse(Dot, Dash, Dot, Dot, Dot),
  PunctuationColon = packMorse(Dash, Dash, Dash, Dot, Dot, Dot),
  PunctuationSemicolon = packMorse(Dash, Dot, Dash, Dot, Dash, Dot),
  PunctuationDoubleDash = packMorse(Dash, Dot, Dot, Dot, Dash),
  PunctuationPlusSign = packMorse(Dot, Dash, Dot, Dash, Dot),
  PunctuationHyphen = packMorse(Dash, Dot, Dot, Dot, Dot, Dash),
  PunctuationUnderscore = packMorse(Dot, Dot, Dash, Dash, Dot, Dash),
  PunctuationQuotationMark = packMorse(Dot, Dash, Dot, Dot, Dash, Dot),
  PunctuationDollarSign = packMorse(Dot, Dot, Dot, Dash, Dot, Dot, Dash),
  PunctuationAtSign = packMorse(Dot, Dash, Dash, Dot, Dash, Dot),
}

export default MorseEncoding;
