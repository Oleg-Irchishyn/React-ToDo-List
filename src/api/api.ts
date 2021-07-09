import { itemsTasksType, itemsType, SingleTaskType } from './../redux/types/types';
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: `/`,
});

export const appAPI = {
  getTodoLists: () => {
    return instance.get(`lists?_expand=color&_embed=tasks`).then((response) => {
      return response.data;
    });
  },
  getTodoListsColors: () => {
    return instance.get(`colors`).then((response) => {
      return response.data;
    });
  },
  getTodoListsTasks: () => {
    return instance.get(`tasks`).then((response) => {
      return response.data;
    });
  },
  updateTodoLists: (id: string | number, name: string, colorId: string | number) => {
    return instance.post<itemsType>(`lists`, { id, name, colorId }).then((response) => {
      return response.data;
    });
  },
  setNewTodoListTask: (
    id: string | number,
    listId: string | number | null,
    text: string | number,
    completed: boolean,
  ) => {
    return instance
      .post<itemsTasksType>(`tasks`, { id, listId, text, completed })
      .then((response) => {
        return response.data;
      });
  },
  removeTodoList: (id: string | number) => {
    return instance.delete(`lists/` + id).then((response) => response.data) as Promise<itemsType>;
  },
  renameTodoList: (id: string | number, newName: string) => {
    return instance
      .patch<itemsType>(`lists/` + id, { name: newName })
      .then((response) => response.data);
  },
  removeTodoListTask: (id: string | number) => {
    return instance
      .delete(`tasks/` + id)
      .then((response) => response.data) as Promise<SingleTaskType>;
  },
  renameTodoListTask: (id: string | number, newVal: string | number) => {
    return instance
      .patch<itemsTasksType>(`tasks/` + id, { text: newVal })
      .then((response) => response.data);
  },
  toggleTodoListTaskCompletion: (
    id: string | number,
    listId: string | number | null,
    completed: boolean,
  ) => {
    return instance
      .patch<itemsTasksType>(`tasks/` + id, { listId, completed })
      .then((response) => response.data);
  },
};
