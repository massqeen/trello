import { DragItems } from '../DragItems';

export const isHidden = (
  isPreview: boolean | undefined,
  draggedItem: DragItems | undefined,
  itemType: string,
  id: string
): boolean => {
  return Boolean(
    !isPreview &&
      draggedItem &&
      draggedItem.type === itemType &&
      draggedItem.id === id
  );
};
