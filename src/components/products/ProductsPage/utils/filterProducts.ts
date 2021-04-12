import { IProducts } from "../../../../utils/interfaces";

export const filterProducts = (productsArr: Array<IProducts>, genreName: string, ageValue: string) =>
  productsArr.filter((product) => {
    const genreFiltered = genreName === "all" ? true : product.genre.includes(genreName);
    const ageFiltered = ageValue === "all" ? true : +product.age >= +ageValue;

    return genreFiltered && ageFiltered;
  });
