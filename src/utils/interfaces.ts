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
  address?: string;
  phone?: string;
  email?: string;
}

export interface ILocation extends Location {
  from: {
    pathname: string;
  };
}

export interface IAppState {
  errors: IErrors;
}

export interface RootState {
  auth: {
    userName: string;
    isLoggedIn: boolean;
    hasError: boolean;
    userInfo: iUserInfo;
    isModalOpen: boolean;
    authInfo: string;
  };
}

export interface iUserInfo {
  login?: string;
  password?: string;
  address: string;
  phone: string;
  email: string;
  id?: number;
}
