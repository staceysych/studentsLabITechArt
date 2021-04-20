import { getDate } from "./getDate";

export const formatGameForServer = (obj) => ({
  name: obj.name,
  rating: +obj.rating,
  price: +obj.price,
  poster: obj.poster,
  date: getDate(),
  genre: obj.genre.toLocaleLowerCase(),
  age: obj.age,
  devise: obj.devise,
});
