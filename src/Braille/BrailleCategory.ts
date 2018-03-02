enum BrailleCategory {
  None,

  Letter = 1 << 1,
  Number = 1 << 2,
  Formatting = 1 << 3,
  Punctuation = 1 << 4,

  All = 0xFF,
}

export default BrailleCategory;
