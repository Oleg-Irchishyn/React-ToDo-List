import { createSelector } from "reselect";
import { AppStateType } from "../store";

const initializeApp = (state: AppStateType) => {
  return state.app.initialized;
}

/*Selectors, created by reselect library*/

export const initializeAppSelector = createSelector(
  initializeApp, (initializations) => {
    return initializations = true;
  }
)
