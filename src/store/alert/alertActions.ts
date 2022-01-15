import { TypesKeys } from './alertTypes';

export const actions = {
  setSuccess: (success: boolean) => ({ type: TypesKeys.SET_SUCCESS, payload: success } as const),
  setError: (error: boolean) => ({ type: TypesKeys.SET_ERROR, payload: error } as const)
};