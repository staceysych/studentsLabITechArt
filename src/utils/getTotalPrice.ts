import { IProducts } from "./interfaces";

export const getTotalPrice = (arr: IProducts[]) => arr.reduce((acc, cur) => acc + cur.price, 0);
