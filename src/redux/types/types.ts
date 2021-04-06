export type itemsType = {
  id: string | number;
  active?: boolean;
  name: string;
  colorId: string | number;
  color?: string;
};

export type DBcolorsType = {
  id: string | number;
  hex: string;
  name: string;
};
