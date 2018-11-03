export enum SemaphoreDirection {
  None = 0,
  North = 1 << 1,
  NorthEast = 1 << 2,
  East = 1 << 3,
  SouthEast = 1 << 4,
  South = 1 << 5,
  SouthWest = 1 << 6,
  West = 1 << 7,
  NorthWest = 1 << 8,
}
