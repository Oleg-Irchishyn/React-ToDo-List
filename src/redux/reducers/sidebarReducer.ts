import { itemsType, DBcolorsType } from '../types/types';
import { appAPI } from './../../api/api';
import { BaseThunkType, InferActionsTypes } from '../store';
import DB from '../../assets/db.json';
import { FormAction } from 'redux-form';
const SET_SELECTED_COLOR = 'todo/sidebar/SET_SELECTED_COLOR';
const SET_NEW_SIDEBAR_LIST = 'todo/sidebar/SET_NEW_SIDEBAR_LIST';
const SET_SIDEBAR_LISTS = 'todo/sidebar/SET_SIDEBAR_LISTS';
const SET_LISTS_COLORS = 'todo/sidebar/SET_LISTS_COLORS';

let initialState = {
  allTasksBtnList: [
    {
      icon: null,
      name: 'All Tasks',
      active: false,
    },
  ] as Array<allTasksBtnType>,
  sidebarListItems: DB.lists as Array<itemsType>,
  addListButtonItems: ([
    {
      icon: null,
      name: 'Add List',
    },
  ] as unknown) as Array<itemsType>,
  colors: DB.colors as Array<DBcolorsType>,
  selectedColor: DB.colors[0].id as string | number,
  isRemovable: true as boolean,
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
      };
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
    default:
      return state;
  }
};

export const actions = {
  setSelectedColor: (color: string | number) =>
    ({ type: SET_SELECTED_COLOR, payload: color } as const),
  setNewSidebarList: (obj: itemsType) => ({ type: SET_NEW_SIDEBAR_LIST, payload: obj } as const),
  setSidebarLists: (lists: any) => ({ type: SET_SIDEBAR_LISTS, payload: lists } as const),
  setListsColors: (colors: any) => ({ type: SET_LISTS_COLORS, payload: colors } as const),
};

export const getSidebarLists = (): ThunkType => async (dispatch) => {
  let data = await appAPI.getTodoLists;
  dispatch(actions.setSidebarLists(data));
};

export const getSidebarListsColors = (): ThunkType => async (dispatch) => {
  let data = await appAPI.getTodoListsColors;
  dispatch(actions.setListsColors(data));
};

export type initialStateType = typeof initialState;

type allTasksBtnType = {
  icon?: JSX.Element | null;
  name: string;
  active?: boolean;
};

type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

type ActionsTypes = InferActionsTypes<typeof actions>;

export default sidebarReducer;
