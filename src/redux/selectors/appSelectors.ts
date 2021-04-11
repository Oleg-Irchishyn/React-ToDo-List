import { AppStateType } from '../store';

export const getInitializeApp = (state: AppStateType) => {
  return state.app.initialized;
};
