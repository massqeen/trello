export const insertItemAtIndex = <T>(
  array: T[],
  item: T,
  index: number
): T[] => [...array.slice(0, index), item, ...array.slice(index)];
