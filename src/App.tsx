import React from 'react';
import { useAppState } from './utils/hooks/useAppState';
import { Column } from './components/Column/Column';
import { AddNewItem } from './components/AddNewItem';
import { CustomDragLayer } from './components/CustomDragLayer/CustomDragLayer';
import { AppContainer } from './components/AppContainer';

const App = () => {
  const { state, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, i) => (
        <Column key={list.id} text={list.text} index={i} id={list.id} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch({ type: 'ADD_LIST', payload: text })}
      />
    </AppContainer>
  );
};

export default App;
