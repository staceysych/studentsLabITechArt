import { convertDateToSec } from "../../../../utils";
import { IProducts } from "../../../../utils/interfaces";

export const sortProducts = (productsArr: Array<IProducts>, sortCriteria: string, sortType: string) => {
  const sortedArr = productsArr.sort((a, b) => {
    const isDescending = sortType === "desc" ? -1 : 1;
    switch (sortCriteria) {
      case "price":
        return (a.price - b.price) * isDescending;
      case "rating":
        return (a.rating - b.rating) * isDescending;
      case "date":
        return (convertDateToSec(a.date) - convertDateToSec(b.date)) * isDescending;
      default:
        return 0;
    }
  });

  return sortedArr;
};
