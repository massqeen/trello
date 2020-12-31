import React, { createContext, useReducer } from 'react';
import { AppState } from '../AppState';
import { appData } from '../AppState';
import { Action } from '../actions/Action';
import { Reducer } from '../reducer/Reducer';

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

// Alternatively, we could manually add children?: React.ReactNode to the interface
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(Reducer, appData);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
