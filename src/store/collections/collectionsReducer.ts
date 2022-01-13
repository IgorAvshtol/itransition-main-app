import { ActionType, ICollectionState, ICollection, TypesKeys } from './collectionsTypes';

const initialState: ICollectionState = {
  collection: [] as ICollection[],
  currentBook: {
    authors: '',
    descriptions: '',
    imageURL: '',
    pages: '',
    section: '',
    id: '',
    likes: [] as string[],
    hasLiked: false
  }
};

export const collectionReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TypesKeys.SET_COLLECTION:
      return {
        ...state,
        collection: [...state.collection, action.payload]
      };
    case TypesKeys.CURRENT_BOOK_HAS_LIKED:
      return {
        ...state,
        collection: state.collection.map(n => n.id === action.payload.likeData.bookId ? {
          ...n,
          // hasLiked: true,
          likes: Array.from(new Set([...n.likes, action.payload.likeData.userId]))
        } : n)
      };
    case TypesKeys.GET_CURRENT_BOOK:
      return {
        ...state,
        currentBook: { ...state.collection.find(book => book.id === action.payload) }
      };
    case TypesKeys.CURRENT_BOOK_HAS_DISLIKED:
      return {
        ...state,
        collection: state.collection.map(n => n.id === action.payload.likeData.bookId ? {
          ...n,
          // hasLiked: true,
          likes: [...n.likes.filter(like => like !== action.payload.likeData.userId)]
        } : n)
      };
    default:
      return state;

  }
};