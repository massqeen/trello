import { useAppState } from './AppStateContext';
import { AddNewItem } from './AddNewItem';
import { ColumnContainer, ColumnTitle } from './styles';
import { Card } from './Card';

interface ColumnProps {
  text: string;
  index: number;
}

export const Column = ({ text, index }: ColumnProps) => {
  const { state } = useAppState();

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card key={task.id} text={task.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={() => console.log(text)}
        dark
      />
    </ColumnContainer>
  );
};
