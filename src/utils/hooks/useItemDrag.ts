import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react';
import { useAppState } from './useAppState';
import { DragItems } from '../DragItems';

export const useItemDrag = (item: DragItems) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    item,
    begin: () => dispatch({ type: 'SET_DRAGGED_ITEM', payload: item }),
    end: () => dispatch({ type: 'SET_DRAGGED_ITEM', payload: undefined }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return { drag };
};
