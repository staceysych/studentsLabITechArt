import { Location } from "history";

export interface IErrors {
  login?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IGameObject {
  id: number;
  poster: string;
  name: string;
  rating: number;
  price: number;
}

export interface IUserData {
  login: string;
  password: string;
  confirmPassword?: string;
}

export interface ILocation extends Location {
  from: {
    pathname: string;
  };
}
