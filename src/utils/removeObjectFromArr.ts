import { IProducts } from "./interfaces";

export const removeObjectFromArr = (arr: IProducts[], id: number) => {
  const removeIndex = arr.map((item) => item.id).indexOf(id);

  arr.splice(removeIndex, 1);

  return arr;
};
