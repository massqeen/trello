import React, { createContext, useEffect, useReducer } from 'react';
import { save } from '../../utils/api/api';
import { Action } from '../actions/Action';
import { appData, AppState } from '../AppState';
import { Reducer } from '../reducer/Reducer';
import { withLoadedData } from './withLoadedData';

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

// Alternatively, we could manually add children?: React.ReactNode to the interface

// export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
//   const [state, dispatch] = useReducer(Reducer, appData);
//   useEffect(() => {
//     save(state);
//   }, [state]);

//   return (
//     <AppStateContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppStateContext.Provider>
//   );
// };
export const AppStateProvider = withLoadedData(
  ({
    children,
    initialState,
  }: React.PropsWithChildren<{ initialState: AppState }>) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    useEffect(() => {
      save(state);
    }, [state]);
    return (
      <AppStateContext.Provider value={{ state, dispatch }}>
        {children}
      </AppStateContext.Provider>
    );
  }
);
