enum CharacterEncoding {
  None,
  Latin, // A = A, B = B
  Ordinal, // A = 1, B = 2
  FiveBitBinary, // 00001 = A, 00010 = B
  EightBitBinary, // 01100001 = A, 01100010 = B
  Ascii, // 65 = A, 66 = B
}

export default CharacterEncoding;
