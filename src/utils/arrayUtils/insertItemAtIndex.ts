import { List } from '../../AppStateContext';

export function insertItemAtIndex(array: List[], item: List, index: number) {
  console.log(item);
  const result = [...array];
  result.splice(index, 0, item);
  return result;
}
