import { InferActionsTypes } from '../store';
import { itemsTasksType } from '../types/types';
import { appAPI } from '../../api/api';

import { FormAction } from 'redux-form';
import { BaseThunkType } from '../store';

const ADD_NEW_TASK_TO_LIST = 'todo/tasks/ADD_NEW_TASK_TO_LIST';
const DELETE_TASK_FROM_LIST = 'todo/tasks/DELETE_TASK_FROM_LIST ';
const SET_LISTS_TASKS = 'todo/tasks/SET_LISTS_TASKS';
const SET_IS_LOADED = 'todo/tasks/SET_IS_LOADING';

let initialState = {
  tasks: [] as Array<itemsTasksType>,
  isLoading: false as boolean,
};

const tasksReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case SET_LISTS_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_NEW_TASK_TO_LIST:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        isLoading: true,
      };
    case DELETE_TASK_FROM_LIST:
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.id)],
        isLoading: true,
      };
    case SET_IS_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  addNewTaskToList: (obj: itemsTasksType) =>
    ({ type: ADD_NEW_TASK_TO_LIST, payload: obj } as const),
  deleteTaskFromList: (id: string | number) => ({ type: DELETE_TASK_FROM_LIST, id } as const),
  setListsTasks: (tasks: Array<itemsTasksType>) =>
    ({ type: SET_LISTS_TASKS, payload: tasks } as const),
  setIsLoaded: (payload: boolean) => ({ type: SET_IS_LOADED, payload } as const),
};

export const getListsTasks = (): ThunkType => async (dispatch) => {
  let data = await appAPI.getTodoListsTasks();
  dispatch(actions.setListsTasks(data));
};

export const removeTaskFromList =
  (id: string | number): ThunkType =>
  async (dispatch) => {
    await appAPI.removeTask(id);
    dispatch(actions.deleteTaskFromList(id));
  };

export const setNewTaskToList =
  (
    id: string | number,
    listId: string | number | null,
    text: string | number,
    completed: boolean,
  ): ThunkType =>
  async (dispatch) => {
    try {
      let data = await appAPI.setNewTodoListTask(id, listId, text, completed);
      dispatch(actions.addNewTaskToList(data));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(actions.setIsLoaded(false));
    }
  };

type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

type initialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

export default tasksReducer;
