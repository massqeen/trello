import { List } from '../../AppStateContext';
import { removeItemAtIndex } from './removeItemAtIndex';
import { insertItemAtIndex } from './insertItemAtIndex';

export const moveItem = (array: List[], from: number, to: number) => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};
