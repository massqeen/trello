import React, { createContext, useContext, useReducer } from 'react';
import { nanoid } from 'nanoid';
import { findItemIndexById } from './utils/arrayUtils/findItemIndexById';
import { overrideItemAtIndex } from './utils/arrayUtils/overrideItemAtIndex';
import { moveItem } from './utils/arrayUtils/moveItem';
import { insertItemAtIndex } from './utils/arrayUtils/insertItemAtIndex';
import { removeItemAtIndex } from './utils/arrayUtils/removeItemAtIndex';
import { DragItems } from './DragItems';

interface Task {
  id: string;
  text: string;
}
export interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[];
  draggedItem: DragItems | undefined;
}

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
  draggedItem: undefined,
};

type Action =
  | {
      type: 'ADD_LIST';
      payload: string;
    }
  | {
      type: 'ADD_TASK';
      payload: { text: string; listId: string };
    }
  | {
      type: 'MOVE_LIST';
      payload: {
        dragIndex: number;
        hoverIndex: number;
      };
    }
  | {
      type: 'MOVE_TASK';
      payload: {
        dragIndex: number;
        hoverIndex: number;
        sourceColumn: string;
        targetColumn: string;
      };
    }
  | {
      type: 'SET_DRAGGED_ITEM';
      payload: DragItems | undefined;
    };

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] },
        ],
      };
    }

    case 'ADD_TASK': {
      const targetListIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      );
      const targetList = state.lists[targetListIndex];
      const updatedTargetList = {
        ...targetList,
        tasks: [
          ...targetList.tasks,
          { id: nanoid(), text: action.payload.text },
        ],
      };
      return {
        ...state,
        lists: overrideItemAtIndex(
          state.lists,
          updatedTargetList,
          targetListIndex
        ),
      };
    }

    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload;
      const lists = moveItem(state.lists, dragIndex, hoverIndex);
      return { ...state, lists };
    }

    case 'MOVE_TASK': {
      const {
        dragIndex,
        hoverIndex,
        sourceColumn,
        targetColumn,
      } = action.payload;

      const sourceListIndex = findItemIndexById(state.lists, sourceColumn);
      const targetListIndex = findItemIndexById(state.lists, targetColumn);
      const sourceList = state.lists[sourceListIndex];
      const task = sourceList.tasks[dragIndex];

      // remove task from source list and get new state
      const updatedSourceList = {
        ...sourceList,
        tasks: removeItemAtIndex(sourceList.tasks, dragIndex),
      };
      const stateWithUpdatedSourceList = {
        ...state,
        lists: overrideItemAtIndex(
          state.lists,
          updatedSourceList,
          sourceListIndex
        ),
      };

      // get updated target list by appending the new task to the tasks array
      const targetList = stateWithUpdatedSourceList.lists[targetListIndex];
      const updatedTargetList = {
        ...targetList,
        tasks: insertItemAtIndex(targetList.tasks, task, hoverIndex),
      };
      const updatedLists = overrideItemAtIndex(
        stateWithUpdatedSourceList.lists,
        updatedTargetList,
        targetListIndex
      );

      return { ...stateWithUpdatedSourceList, lists: updatedLists };
    }

    case 'SET_DRAGGED_ITEM': {
      return { ...state, draggedItem: action.payload };
    }

    default:
      return state;
  }
};

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

// Alternatively, we could manually add children?: React.ReactNode to the interface
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
