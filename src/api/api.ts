import { itemsType } from './../redux/types/types';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001/',
});

export const appAPI = {
  getTodoLists: () => {
    return instance.get(`lists?_expand=color`).then((response) => {
      return response.data;
    });
  },
  getTodoListsColors: () => {
    return instance.get(`colors`).then((response) => {
      return response.data;
    });
  },
  updateTodoLists: (id: string | number, name: string, colorId: string | number) => {
    return instance
      .post<itemsType>(`lists`, { id, name, colorId })
      .then((response) => {
        return response.data;
      });
  },

  removeTodoList: (id: string | number) => {
    return instance.delete(`lists/` + id).then((response) => response.data) as Promise<itemsType>;
  },
};
