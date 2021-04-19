import { AppStateType } from '../store';

export const getsidebarListItems = (state: AppStateType) => {
  return state.sidebar.sidebarListItems.map((item) => {
    item.color = state.sidebar.colors.filter((color) => color.id === item.colorId)[0].hex;
    return item;
  });
};

export const getaddListButtonItems = (state: AppStateType) => {
  return state.sidebar.addListButtonItems;
};

export const getIsRemovable = (state: AppStateType) => {
  return state.sidebar.isRemovable;
};

export const getallTasksBtnList = (state: AppStateType) => {
  return state.sidebar.allTasksBtnList;
};

export const getDBcolors = (state: AppStateType) => {
  return state.sidebar.colors;
};

export const getselectedColor = (state: AppStateType) => {
  return state.sidebar.selectedColor;
};

export const getIsLoading = (state: AppStateType) => {
  return state.sidebar.isLoading;
};

export const getActiveSidebarList = (state: AppStateType) => {
  return state.sidebar.activeSidebarList;
};
