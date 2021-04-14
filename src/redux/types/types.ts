export type itemsType = {
  id: string | number;
  active?: boolean;
  name: string;
  colorId: string | number;
  color?: string;
  tasks?: Array<itemsTasksType>;
};

export type DBcolorsType = {
  id: string | number;
  hex: string;
  name: string;
};

export type SingleTaskType = {
  id: string | number;
  listId: number;
  text: number;
  completed: boolean;
};

type itemsTasksType = {
  id: string | number;
  listId: string | number;
  text: string;
  completed: boolean;
};

type itemsColorType = {
  id: number;
  hex: string;
  name: string;
};
