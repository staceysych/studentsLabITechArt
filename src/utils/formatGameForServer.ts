import { getDate } from "./getDate";

export const formatGameForServer = (obj) => ({
  id: obj.id,
  name: obj.name,
  rating: +obj.rating,
  price: +obj.price,
  poster: obj.poster,
  date: getDate(),
  genre: obj.genre.toLocaleLowerCase(),
  age: obj.age,
  devise: obj.devise,
});
