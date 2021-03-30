import { AppStateType } from "../store";

export const sidebarListItems = (state: AppStateType) => {
    return state.sidebar.sidebarListItems;
  }

  export const  addListButtonItems = (state: AppStateType) => {
    return state.sidebar.addListButtonItems;
  }



  