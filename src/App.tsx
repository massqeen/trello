import React from 'react';
// import './App.css';
import { useAppState } from './AppStateContext';
import { Column } from './Column';
import { Card } from './Card';
import { AddNewItem } from './AddNewItem';
import { AppContainer } from './styles';

const App = () => {
  const { state } = useAppState();

  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column key={list.id} text={list.text} index={i} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => console.log(text)}
      />
    </AppContainer>
  );
};

export default App;
