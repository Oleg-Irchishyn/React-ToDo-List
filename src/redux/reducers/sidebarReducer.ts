import { ThunkDispatch } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from '../store';
import DB from '../../assets/db.json';
const SET_SELECTED_COLOR = 'todo/sidebar/SET_SELECTED_COLOR';
const SET_NEW_SIDEBAR_LIST = 'todo/sidebar/SET_NEW_SIDEBAR_LIST';

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
    case SET_SELECTED_COLOR:
      return {
        ...state,
        selectedColor: action.payload,
      };
    case SET_NEW_SIDEBAR_LIST:
      return {
        ...state,
        sidebarListItems: [...state.sidebarListItems, action.payload],
      };

    default:
      return state;
  }
};

export type itemsType = {
  id: string | number;
  active?: boolean;
  name: string;
  colorId: string | number;
  color?: string;
};

type allTasksBtnType = {
  icon?: JSX.Element | null;
  name: string;
  active?: boolean;
};

type DBcolorsType = {
  id: string | number;
  hex: string;
  name: string;
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setSelectedColor: (color: string | number) =>
    ({ type: SET_SELECTED_COLOR, payload: color } as const),
  setNewSidebarList: (obj: itemsType) => ({ type: SET_NEW_SIDEBAR_LIST, payload: obj } as const),
};

export type initialStateType = typeof initialState;

export default sidebarReducer;
