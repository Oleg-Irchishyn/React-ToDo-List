import { ThunkDispatch } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from '../store';
const INITIALIZED_SUCCESS = 'SK/APP/INITIALIZED_SUCCESS';

let initialState = {
  sidebarListItems: [
    {
      icon: null,
      name: 'All Tasks',
      active: true,
    },
    {
      color: '#42B883',
      name: 'Purchases',
    },
    {
      color: '#64C4ED',
      name: 'Front-end',
    },
    {
      color: '#FFBBCC',
      name: 'TV films and series',
    },
    {
      color: '#B6E6BD',
      name: 'Books',
    },
    {
      color: '#C9D1D3',
      name: 'Private',
    },
  ] as Array<itemsType>,

  addListButtonItems: [
    {
      icon: null,
      name: 'Add List',
    },
]   as unknown  as Array<itemsType>
};

const sidebarReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case '':
      return {
        ...state,
      };

    default:
      return state;
  }
};

type itemsType = {
  icon?: JSX.Element;
  name: string;
  active?: boolean;
  color: string;
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {};

export type initialStateType = typeof initialState;

export default sidebarReducer;
