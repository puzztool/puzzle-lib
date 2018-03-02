enum BrailleDot {
  None,
  UpperLeft = 1 << 1,
  MiddleLeft = 1 << 2,
  LowerLeft = 1 << 3,
  UpperRight = 1 << 4,
  MiddleRight = 1 << 5,
  LowerRight = 1 << 6,
}

export default BrailleDot;
