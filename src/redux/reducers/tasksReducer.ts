import { InferActionsTypes } from '../store';
import { itemsTasksType } from '../types/types';
import { appAPI } from '../../api/api';
import { FormAction } from 'redux-form';
import { BaseThunkType } from '../store';
import { getSidebarLists } from './sidebarReducer';
import { startCase } from 'lodash';

const ADD_NEW_TASK_TO_LIST = 'todo/tasks/ADD_NEW_TASK_TO_LIST';
const SET_LISTS_TASKS = 'todo/tasks/SET_LISTS_TASKS';
const SET_IS_LOADED = 'todo/tasks/SET_IS_LOADING';
const DELETE_TASK = 'todo/tasks/DELETE_TASK';
const CHANGE_TASK_VALUE = 'todo/tasks/CHANGE_TASK_NAME';
const CHANGE_TASK_COMPLETION = 'todo/tasks/CHANGE_TASK_COMPLETION';

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
      const NewTaskLIst = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: NewTaskLIst,
        isLoading: true,
      };
    case SET_IS_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case DELETE_TASK: {
      const newTasksList = state.tasks.filter((item) => item.id !== action.id);
      return {
        ...state,
        tasks: newTasksList,
      };
    }
    case CHANGE_TASK_VALUE: {
      const newTaskValue = state.tasks.map((item) => {
        if (item.id === action.id) {
          item.text = action.text;
        }
        return item;
      });

      return {
        ...state,
        tasks: newTaskValue,
      };
    }
    case CHANGE_TASK_COMPLETION: {
      const newTaskValue = state.tasks.map((item) => {
        if (item.id === action.id) {
          item.completed = action.completed;
        }
        return item;
      });

      return {
        ...state,
        tasks: newTaskValue,
      };
    }

    default:
      return state;
  }
};

export const actions = {
  addNewTaskToList: (obj: itemsTasksType) =>
    ({ type: ADD_NEW_TASK_TO_LIST, payload: obj } as const),
  setListsTasks: (tasks: Array<itemsTasksType>) =>
    ({ type: SET_LISTS_TASKS, payload: tasks } as const),
  setIsLoaded: (payload: boolean) => ({ type: SET_IS_LOADED, payload } as const),
  deleteTask: (id: string | number) =>
    ({
      type: DELETE_TASK,
      id,
    } as const),
  changeTaskValue: (id: string | number, text: string | number) =>
    ({ type: CHANGE_TASK_VALUE, id, text } as const),
  changeTaskCompletion: (id: string | number, completed: boolean) =>
    ({ type: CHANGE_TASK_COMPLETION, id, completed } as const),
};

export const getListsTasks = (): ThunkType => async (dispatch) => {
  let data = await appAPI.getTodoListsTasks();
  dispatch(actions.setListsTasks(data));
};

export const deleteTodoListTask =
  (id: string | number): ThunkType =>
  async (dispatch) => {
    await appAPI.removeTodoListTask(id);
    dispatch(actions.deleteTask(id));
    dispatch(getSidebarLists());
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
      dispatch(getSidebarLists());
      dispatch(getListsTasks());
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(actions.setIsLoaded(false));
    }
  };

export const setNewTaskValue =
  (id: string | number, newVal: string | number): ThunkType =>
  async (dispatch) => {
    try {
      await appAPI.renameTodoListTask(id, newVal);
      dispatch(actions.changeTaskValue(id, newVal));
      dispatch(getSidebarLists());
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    }
  };

export const toggleTaskCompletion =
  (id: string | number, listId: string | number | null, completed: boolean): ThunkType =>
  async (dispatch) => {
    try {
      await appAPI.toggleTodoListTaskCompletion(id, listId, completed);
      dispatch(actions.changeTaskCompletion(id, completed));
      dispatch(getSidebarLists());
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    }
  };

type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

type initialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

export default tasksReducer;
