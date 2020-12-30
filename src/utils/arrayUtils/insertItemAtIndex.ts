import { List } from '../../AppStateContext';

export const insertItemAtIndex = (array: List[], item: List, index: number) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];
