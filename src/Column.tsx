import { useAppState } from './AppStateContext';
import { AddNewItem } from './AddNewItem';
import { ColumnContainer, ColumnTitle } from './styles';
import { Card } from './Card';

interface ColumnProps {
  text: string;
  id: string;
  index: number;
}

export const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState();

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card key={task.id} text={task.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) =>
          dispatch({ type: 'ADD_TASK', payload: { text, taskId: id } })
        }
        dark
      />
    </ColumnContainer>
  );
};
