import { itemsType, DBcolorsType, allTasksBtnType } from '../types/types';
import { appAPI } from './../../api/api';
import { BaseThunkType, InferActionsTypes } from '../store';
import { FormAction } from 'redux-form';
const SET_SELECTED_COLOR = 'todo/sidebar/SET_SELECTED_COLOR';
const SET_NEW_SIDEBAR_LIST = 'todo/sidebar/SET_NEW_SIDEBAR_LIST';
const SET_SIDEBAR_LISTS = 'todo/sidebar/SET_SIDEBAR_LISTS';
const DELETE_SIDEBAR_LIST = 'todo/sidebar/DELETE_SIDEBAR_LIST';
const SET_LISTS_COLORS = 'todo/sidebar/SET_LISTS_COLORS';
const SET_IS_LOADED = 'todo/sidebar/SET_IS_LOADING';
const SELECT_ACTIVE_SIDEBAR_LIST = 'todo/sidebar/SELECT_ACTIVE_SIDEBAR_LIST';
const CHANGE_ACTIVE_SIDEBAR_LIST_NAME = 'todo/sidebar/CHANGE_ACTIVE_SIDEBAR_LIST_NAME';
const CHANGE_ACTIVE_LIST_TASK_VALUE = 'todo/sidebar/CHANGE_ACTIVE_LIST_TASK_VALUE';
const DELETE_ACTIVE_LIST_TASK = 'todo/sidebar/DELETE_ACTIVE_LIST_TASK';

let initialState = {
  allTasksBtnList: [
    {
      icon: null,
      name: 'All Tasks',
    },
  ] as Array<allTasksBtnType>,
  sidebarListItems: [] as Array<itemsType>,
  addListButtonItems: [
    {
      icon: null,
      name: 'Add List',
    },
  ] as unknown as Array<itemsType>,
  colors: [] as Array<DBcolorsType>,
  selectedColor: 1 as string | number,
  isRemovable: true as boolean,
  isLoading: false as boolean,
  activeSidebarList: null as itemsType | null,
};

const sidebarReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case SET_SIDEBAR_LISTS:
      return {
        ...state,
        sidebarListItems: action.payload,
      };
    case SET_NEW_SIDEBAR_LIST:
      return {
        ...state,
        sidebarListItems: [...state.sidebarListItems, action.payload],
        isLoading: true,
      };
    case DELETE_SIDEBAR_LIST: {
      const newSidebarListItems = state.sidebarListItems.filter((item) => item.id !== action.id);

      return {
        ...state,
        sidebarListItems: newSidebarListItems,
        activeSidebarList: null,
      };
    }

    case SET_LISTS_COLORS:
      return {
        ...state,
        colors: action.payload,
      };

    case SET_SELECTED_COLOR:
      return {
        ...state,
        selectedColor: action.payload,
      };
    case SET_IS_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SELECT_ACTIVE_SIDEBAR_LIST:
      return {
        ...state,
        activeSidebarList: action.payload,
      };
    case CHANGE_ACTIVE_SIDEBAR_LIST_NAME: {
      const newSidebarListItems = state.sidebarListItems.map((item) => {
        if (item.id === action.id) {
          item.name = action.name;
        }
        return item;
      });
      return {
        ...state,
        sidebarListItems: newSidebarListItems,
      };
    }
    case CHANGE_ACTIVE_LIST_TASK_VALUE: {
      if (state.activeSidebarList && state.activeSidebarList.tasks) {
        const newTaskName = state.activeSidebarList.tasks.map((item) => {
          if (item.id === action.id) {
            item.text = action.text;
          }
          return item;
        });
        return {
          ...state,
          activeSidebarList: {
            ...state.activeSidebarList,
            tasks: newTaskName,
          },
        };
      }
    }
    case DELETE_ACTIVE_LIST_TASK: {
      if (state.activeSidebarList && state.activeSidebarList.tasks) {
        const newTaskList = state.activeSidebarList.tasks.filter((item) => item.id === action.id);
        return {
          ...state,
          activeSidebarList: {
            ...state.activeSidebarList,
            tasks: newTaskList,
          },
        };
      }
    }
    default:
      return state;
  }
};

export const actions = {
  setSidebarLists: (lists: Array<itemsType>) =>
    ({ type: SET_SIDEBAR_LISTS, payload: lists } as const),
  setNewSidebarList: (obj: itemsType) => ({ type: SET_NEW_SIDEBAR_LIST, payload: obj } as const),
  deleteSidebarList: (id: string | number) => ({ type: DELETE_SIDEBAR_LIST, id } as const),
  setListsColors: (colors: Array<DBcolorsType>) =>
    ({ type: SET_LISTS_COLORS, payload: colors } as const),
  setSelectedColor: (color: string | number) =>
    ({ type: SET_SELECTED_COLOR, payload: color } as const),
  setIsLoaded: (payload: boolean) => ({ type: SET_IS_LOADED, payload } as const),
  selectActiveSidebarList: (obj: itemsType | null) =>
    ({ type: SELECT_ACTIVE_SIDEBAR_LIST, payload: obj } as const),
  changeSidebarListName: (id: string | number, name: string) =>
    ({ type: CHANGE_ACTIVE_SIDEBAR_LIST_NAME, id, name } as const),
  deleteActiveListTask: (id: string | number) =>
    ({
      type: DELETE_ACTIVE_LIST_TASK,
      id,
    } as const),
  changeActiveListTaskValue: (id: string | number, text: string | number) =>
    ({ type: CHANGE_ACTIVE_LIST_TASK_VALUE, id, text } as const),
};

export const getSidebarLists = (): ThunkType => async (dispatch) => {
  let data = await appAPI.getTodoLists();
  dispatch(actions.setSidebarLists(data));
};

export const getSidebarListsColors = (): ThunkType => async (dispatch) => {
  let data = await appAPI.getTodoListsColors();
  dispatch(actions.setListsColors(data));
};

export const addNewSidebarList =
  (id: string | number, name: string, colorId: string | number): ThunkType =>
  async (dispatch) => {
    try {
      let data = await appAPI.updateTodoLists(id, name, colorId);
      dispatch(actions.setNewSidebarList(data));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    } finally {
      dispatch(actions.setIsLoaded(false));
    }
  };

export const removeSidebarList =
  (id: string | number): ThunkType =>
  async (dispatch) => {
    await appAPI.removeTodoList(id);
    dispatch(actions.deleteSidebarList(id));
  };

export const setNewSidebarListName =
  (id: string | number, newName: string): ThunkType =>
  async (dispatch) => {
    try {
      await appAPI.renameTodoList(id, newName);
      dispatch(actions.changeSidebarListName(id, newName));
    } catch (err) {
      throw new Error(`Promise has not been resolved properly`);
    }
  };

export type initialStateType = typeof initialState;

type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

type ActionsTypes = InferActionsTypes<typeof actions>;

export default sidebarReducer;
