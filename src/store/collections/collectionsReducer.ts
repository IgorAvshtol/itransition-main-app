import { ActionType, ICollectionState, TypesKeys } from '../types';

const initialState: ICollectionState = {
  collection: []
};

export const collectionReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TypesKeys.SET_COLLECTION:
      return {
        ...state,
        collection: [...state.collection, action.payload]
      };
    default:
      return state;

  }
};