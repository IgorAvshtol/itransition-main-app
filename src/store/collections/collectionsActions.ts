import { ICollection, TypesKeys, ILikeData } from './collectionsTypes';

export const actions = {
  setCollectionAC: (collection: ICollection) => ({ type: TypesKeys.SET_COLLECTION, payload: collection } as const),
  setLikedAC: ({likeData}:ILikeData) => ({ type: TypesKeys.CURRENT_BOOK_HAS_LIKED, payload: { likeData} } as const),
  setDislikedAC: ({likeData}:ILikeData) => ({ type: TypesKeys.CURRENT_BOOK_HAS_DISLIKED, payload: { likeData} } as const),
  getCurrentBookAC: (bookId: string) => ({ type: TypesKeys.GET_CURRENT_BOOK, payload: bookId } as const),
};