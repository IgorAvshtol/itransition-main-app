export enum TypesKeys {
  SET_COLLECTION = 'SET_COLLECTION',
  CURRENT_BOOK_HAS_LIKED = 'CURRENT_BOOK_HAS_LIKED',
  GET_CURRENT_BOOK = 'GET_CURRENT_BOOK',
  CURRENT_BOOK_HAS_DISLIKED = 'CURRENT_BOOK_HAS_DISLIKED',
}

export interface ICollection {
  authors: string;
  description: string;
  imageURL: string;
  pages: string;
  section: string;
  id: string;
  likes: string[];
  senderEmail?: string;
  departureDate: any;
}

export interface ISetBook {
  author: string;
  description: string;
  file: any;
  pages: string;
  section: string;
}

export interface ICollectionState {
  collection: ICollection[];
  currentBook: ICollection;
  selections: string[];
}

export interface ILike {
  bookId: string;
  userId: string;
}

export interface ILikeData {
  likeData: ILike;
}

export interface ISetCollection {
  type: TypesKeys.SET_COLLECTION;
  payload: ICollection;
}

export interface ICurrentUserSetLiked {
  type: TypesKeys.CURRENT_BOOK_HAS_LIKED;
  payload: ILikeData;
}

export interface ICurrentUserSetDisliked {
  type: TypesKeys.CURRENT_BOOK_HAS_DISLIKED;
  payload: ILikeData;
}

export interface IGetCurrentBook {
  type: TypesKeys.GET_CURRENT_BOOK;
  payload: string;
}

export type ActionType = ISetCollection | ICurrentUserSetLiked | IGetCurrentBook | ICurrentUserSetDisliked


