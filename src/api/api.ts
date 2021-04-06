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
};
