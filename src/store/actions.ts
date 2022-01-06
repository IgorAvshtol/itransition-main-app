import { ICollection, IUser, TypesKeys } from './types';

export const actions = {
  setUserAC: (user: IUser) => ({ type: TypesKeys.SET_USER, payload: user } as const),
  setLoadingAC: (loading: boolean) => ({ type: TypesKeys.SET_LOADING, payload: loading } as const),
  setErrorAC: (error: string) => ({ type: TypesKeys.SET_ERROR, payload: error } as const),
  setAuthenticatedAC: (auth: boolean) => ({ type: TypesKeys.SET_ERROR, payload: auth } as const),
  setLogOutAC: () => ({ type: TypesKeys.SET_LOG_OUT } as const),
  setCollectionAC: (collection: ICollection) => ({ type: TypesKeys.SET_COLLECTION, payload: collection } as const),
};