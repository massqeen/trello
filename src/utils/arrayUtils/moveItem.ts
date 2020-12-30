import { removeItemAtIndex } from './removeItemAtIndex';
import { insertItemAtIndex } from './insertItemAtIndex';

export const moveItem = <T>(array: T[], from: number, to: number): T[] => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};
