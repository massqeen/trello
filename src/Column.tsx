import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from './AppStateContext';
import { AddNewItem } from './AddNewItem';
import { ColumnContainer, ColumnTitle } from './styles';
import { Card } from './Card';
import { useItemDrag } from './utils/hooks/useItemDrag';
import { DragItems } from './DragItems';
import { isHidden } from './utils/isHidden';

interface ColumnProps {
  isPreview?: boolean;
  text: string;
  id: string;
  index: number;
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItems) {
      if (item.type === 'COLUMN') {
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } });
        item.index = hoverIndex;
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
