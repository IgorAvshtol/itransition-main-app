import {
  TypesKeys,
  ILikeData,
  IAddCollectionForm,
  ICommentData,
  IUpdateDataWithId
} from './collectionsTypes';

export const actions = {
  setCollectionAC: (collection: IAddCollectionForm) => ({
    type: TypesKeys.SET_COLLECTION,
    payload: collection
  } as const),
  setLikedAC: ({ likeData }: ILikeData) => ({ type: TypesKeys.CURRENT_BOOK_HAS_LIKED, payload: { likeData } } as const),
  setDislikedAC: ({ likeData }: ILikeData) => ({
    type: TypesKeys.CURRENT_BOOK_HAS_DISLIKED,
    payload: { likeData }
  } as const),
  getCurrentBookAC: (bookId: string) => ({ type: TypesKeys.GET_CURRENT_BOOK, payload: bookId } as const),
  setCommentAC: ({ comments }: ICommentData) => ({ type: TypesKeys.SET_COMMENT, payload: { comments } } as const),
  setCurrentSectionsAC: (select: string) => ({ type: TypesKeys.SET_CURRENT_SECTIONS, payload: select } as const),
  setCurrentUserPublicationsAC: (userId: string) => ({
    type: TypesKeys.GET_CURRENT_USER_PUBLICATIONS,
    payload: userId
  } as const),
  setUpdatePublicationAC: (updateData: IUpdateDataWithId) => ({
    type: TypesKeys.UPDATE_PUBLICATION,
    payload: updateData
  } as const),
};