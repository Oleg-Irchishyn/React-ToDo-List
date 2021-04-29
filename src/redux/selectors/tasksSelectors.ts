import { AppStateType } from '../store';

export const getIsLoading = (state: AppStateType) => {
  return state.tasks.isLoading;
};
