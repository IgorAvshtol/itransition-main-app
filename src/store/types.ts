export enum TypesKeys {
  SET_USER = 'SET_USER',
  SET_AUTHENTICATED = 'SET_AUTHENTICATED',
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  SET_LOG_OUT = 'SET_LOG_OUT',
  SET_COLLECTION = 'SET_COLLECTION',
}

export interface IUser {
  firstName: string;
  email: string;
  id: string;
}

export interface IAuthState {
  user: IUser | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
}

export interface ISignUpData {
  firstName: string;
  email: string;
  password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ICollection {
  authors: string;
  descriptions: string;
  imageURL: string;
  pages: string;
  section: string;
  id: string;
}

export interface ICollectionState {
  collection: ICollection[];
}

export interface ISetUser {
  type: TypesKeys.SET_USER;
  payload: IUser;
}

export interface ISetAuthenticated {
  type: TypesKeys.SET_AUTHENTICATED;
  payload: boolean;
}

export interface ISetLoading {
  type: TypesKeys.SET_LOADING;
  payload: boolean;
}

export interface ISetError {
  type: TypesKeys.SET_ERROR;
  payload: string;
}

export interface ILogOut {
  type: TypesKeys.SET_LOG_OUT;
}

export interface ISetCollection {
  type: TypesKeys.SET_COLLECTION;
  payload: ICollection;
}


export type ActionType = ISetAuthenticated
    | ISetUser
    | ISetLoading
    | ISetError
    | ILogOut
    | ISetCollection

