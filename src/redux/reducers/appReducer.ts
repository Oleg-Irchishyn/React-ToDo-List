import { ThunkDispatch } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './../store';
import DB from '../../assets/db.json'
const INITIALIZED_SUCCESS = 'SK/APP/INITIALIZED_SUCCESS';


let initialState = {
  initialized: false as boolean,
  colors: DB.colors as Array<DBcolorsType>
}

const appReducer = (state = initialState, action: ActionsTypes):initialStateType=> {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }

    default:
      return state;
  }
}

export const actions = {
  initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const)
}

export const initializeApp = () => (dispatch: ThunkDispatchType) => {
  dispatch(actions.initializedSuccess());
}

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkDispatchType = ThunkDispatch<AppStateType, {}, ActionsTypes>

type DBcolorsType = {
id: string | number,
hex: string,
name: string
}

export default appReducer;