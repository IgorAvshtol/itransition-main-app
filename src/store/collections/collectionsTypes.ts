export enum TypesKeys {
  SET_COLLECTION = 'SET_COLLECTION',
  CURRENT_BOOK_HAS_LIKED = 'CURRENT_BOOK_HAS_LIKED',
  SET_CURRENT_BOOK = 'SET_CURRENT_BOOK',
  CURRENT_BOOK_HAS_DISLIKED = 'CURRENT_BOOK_HAS_DISLIKED',
  SET_COMMENT = 'SET_COMMENT',
  SET_CURRENT_SECTIONS = 'SET_CURRENT_SECTIONS',
  SET_CURRENT_USER_PUBLICATIONS = 'SET_CURRENT_USER_PUBLICATIONS',
  UPDATE_PUBLICATION = 'UPDATE_PUBLICATION'
}

export interface ICollection {
  authors: string;
  title: string;
  description: string;
  imageURL: string;
  pages: string;
  section: string;
  id: string;
  likes: string[];
  senderEmail?: string;
  senderId?: string;
  departureDate: any;
  comments?: IComment[];
}

export interface IAddCollectionForm {
  authors: string;
  description: string;
  imageURL: string;
  pages: string;
  section: string;
  id: string;
  likes: string[];
  senderEmail?: string;
  departureDate: any;
  senderId?: string;
}

export interface ISetBook {
  author: string;
  title: string;
  description: string;
  file: any;
  pages: string;
  section: string;
}

export interface ICollectionState {
  collection: ICollection[];
  currentBook: ICollection;
  sections: string[];
  currentSections: string[];
  currentUserPublications: ICollection[];
}

export interface ICurrentUserPublications {
  authors: string;
  title: string;
  description: string;
  imageURL: string;
  pages: string;
  section: string;
  id: string;
}

export interface ILike {
  bookId: string;
  userId: string;
}

export interface ILikeData {
  likeData: ILike;
}

export interface IComment {
  bookId: string;
  author?: string;
  text: string;
  date: string;
}

export interface ICommentData {
  comments: IComment;
}

export interface IUpdateDataWithId {
  publicationId: string;
  author: string;
  description: string;
  pages: string;
  section: string;
}

export interface IUpdateData {
  author: string;
  title: string;
  description: string;
  pages: string;
  section: string;
}

export interface IEditMode {
  publicationId: string;
  editMode: boolean
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
  type: TypesKeys.SET_CURRENT_BOOK;
  payload: string;
}

export interface ISetComment {
  type: TypesKeys.SET_COMMENT,
  payload: ICommentData;
}

export interface ISetCurrentSections {
  type: TypesKeys.SET_CURRENT_SECTIONS,
  payload: string;
}

export interface ISetCurrentUserPublications {
  type: TypesKeys.SET_CURRENT_USER_PUBLICATIONS,
  payload: string;
}


export interface IUpdatePublication {
  type: TypesKeys.UPDATE_PUBLICATION,
  payload: IUpdateDataWithId;
}

export type ActionType = ISetCollection
    | ICurrentUserSetLiked
    | IGetCurrentBook
    | ICurrentUserSetDisliked
    | ISetComment
    | ISetCurrentSections
    | ISetCurrentUserPublications
    | IUpdatePublication

