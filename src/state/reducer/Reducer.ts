import { nanoid } from 'nanoid';
import { findItemIndexById } from '../../utils/arrayUtils/findItemIndexById';
import { overrideItemAtIndex } from '../../utils/arrayUtils/overrideItemAtIndex';
import { moveItem } from '../../utils/arrayUtils/moveItem';
import { removeItemAtIndex } from '../../utils/arrayUtils/removeItemAtIndex';
import { insertItemAtIndex } from '../../utils/arrayUtils/insertItemAtIndex';
import { AppState } from '../AppState';
import { Action } from '../actions/Action';

export const Reducer = (state: AppState, action: Action): AppState => {
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
