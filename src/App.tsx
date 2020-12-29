import React from 'react';
// import './App.css';
import { useAppState } from './AppStateContext';
import { Column } from './Column';
// import { Card } from './Card';
import { AddNewItem } from './AddNewItem';
import { AppContainer } from './styles';

const App = () => {
  const { state, dispatch } = useAppState();

  return (
    <AppContainer>
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
