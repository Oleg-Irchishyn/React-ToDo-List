import { AppStateType } from "../store";

export const sidebarListItems = (state: AppStateType) => {
    return state.sidebar.sidebarListItems;
  }

  export const  addListButtonItems = (state: AppStateType) => {
    return state.sidebar.addListButtonItems;
  }

  export const getDBcolors = (state: AppStateType)  => {
    return state.app.colors;
  }



  