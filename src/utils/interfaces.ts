import { Location } from "history";

export interface IErrors {
  login?: string;
  password?: string;
  confirmPassword?: string;
  prevPassword?: string;
  phone?: string;
  email?: string;
}

export interface IGameObject {
  id: number;
  poster: string;
  name: string;
  rating: number;
  price: number;
}

export interface IUserData {
  login?: string;
  password: string;
  confirmPassword?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface ILocation extends Location {
  from: {
    pathname: string;
  };
}

export interface IAppState {}

export interface RootState {
  auth: {
    isLoggedIn: boolean;
    hasError: boolean;
    userInfo: IUserInfo;
    isModalOpen: boolean;
    authInfo: string;
    errors: IErrors;
  };
  page: {
    products: IProducts[];
    cart: IProducts[];
    cardAction: string;
  };
}

export interface IUserInfo {
  login?: string;
  password?: string;
  address: string;
  phone: string;
  email: string;
  id?: number;
}

export interface IProducts {
  id?: number;
  name: string;
  rating: number;
  price: number;
  poster: string;
  date?: string;
  genre: string;
  age: string;
  devise: string;
  orderDate?: string;
}
