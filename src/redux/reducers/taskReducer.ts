import { InferActionsTypes } from './../store';
import { itemsTasksType } from './../types/types';
import { appAPI } from './../../api/api';

import { FormAction } from 'redux-form';
import { BaseThunkType } from '../store';

const ADD_NEW_TASK_TO_LIST = 'todo/tasks/ADD_NEW_TASK_TO_LIST';

let initialState = {
  tasks: [] as Array<itemsTasksType>,
};

const tasksReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case ADD_NEW_TASK_TO_LIST:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

export const actions = {
  addNewTaskToList: (obj: itemsTasksType) =>
    ({ type: ADD_NEW_TASK_TO_LIST, payload: obj } as const),
};

type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

type initialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

export default tasksReducer;
