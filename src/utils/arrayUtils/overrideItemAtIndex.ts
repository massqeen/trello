export const overrideItemAtIndex = <T>(
  array: T[],
  newItem: T,
  targetIndex: number
): T[] => {
  return array.map((item, index) => {
    if (index !== targetIndex) {
      return item;
    }
    return newItem;
  });
};
