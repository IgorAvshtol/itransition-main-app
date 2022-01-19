import { TypesKeys, ILikeData, IAddCollectionForm, ICommentData } from './collectionsTypes';

export const actions = {
  setCollectionAC: (collection: IAddCollectionForm) => ({ type: TypesKeys.SET_COLLECTION, payload: collection } as const),
  setLikedAC: ({ likeData }: ILikeData) => ({ type: TypesKeys.CURRENT_BOOK_HAS_LIKED, payload: { likeData } } as const),
  setDislikedAC: ({ likeData }: ILikeData) => ({ type: TypesKeys.CURRENT_BOOK_HAS_DISLIKED, payload: { likeData } } as const),
  getCurrentBookAC: (bookId: string) => ({ type: TypesKeys.GET_CURRENT_BOOK, payload: bookId } as const),
  setComment: ({ comments }: ICommentData) => ({ type: TypesKeys.SET_COMMENT, payload: { comments } } as const),
};