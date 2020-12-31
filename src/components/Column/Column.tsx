import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from '../../utils/hooks/useAppState';
import { AddNewItem } from '../AddNewItem';
import { ColumnContainer } from './ColumnContainer';
import { ColumnTitle } from './ColumnTitle';
import { Card } from '../Card/Card';
import { useItemDrag } from '../../utils/hooks/useItemDrag';
import { DragItems } from '../../utils/DragItems';
import { isHidden } from '../../utils/isHidden';

interface ColumnProps {
  isPreview?: boolean;
  text: string;
  id: string;
  index: number;
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();

  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover(item: DragItems) {
      if (item.type === 'COLUMN') {
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } });
        item.index = hoverIndex;
      } else {
        const dragIndex = item.index;
        const hoverIndex = 0;
        const sourceColumn = item.columnId;
        const targetColumn = id;
        if (sourceColumn === targetColumn) {
          return;
        }
        dispatch({
          type: 'MOVE_TASK',
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        });
        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    },
  });

  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ type: 'COLUMN', id, index, text });
  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, 'COLUMN', id)}
      isPreview={isPreview}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card
          key={task.id}
          id={task.id}
          columnId={id}
          index={i}
          text={task.text}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) =>
          dispatch({ type: 'ADD_TASK', payload: { text, listId: id } })
        }
        dark
      />
    </ColumnContainer>
  );
};
