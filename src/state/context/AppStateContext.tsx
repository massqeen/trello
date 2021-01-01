import React, { createContext, useReducer, useEffect } from 'react';
import { Action } from '../actions/Action';
import { appData, AppState } from '../AppState';
import { Reducer } from '../reducer/Reducer';
import { save } from '../../utils/api/api';

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
  useEffect(() => {
    save(state);
  }, [state]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
