import {
  ActionType,
  ICollection,
  ICollectionState,
  IComment,
  ICurrentUserPublications,
  TypesKeys
} from './collectionsTypes';

const initialState: ICollectionState = {
  collection: [{
    authors: '',
    description: '',
    imageURL: '',
    pages: '',
    section: '',
    id: '',
    likes: [] as string[],
    senderEmail: '',
    departureDate: '',
    comments: [] as IComment[]
  }
  ] as ICollection[],
  currentBook: {
    authors: '',
    description: '',
    imageURL: '',
    pages: '',
    section: '',
    id: '',
    likes: [] as string[],
    senderEmail: '',
    departureDate: '',
    comments: ['xaax'] as IComment[]
  },
  sections: [
    'История',
    'Биография',
    'Фантастика',
    'Комедия',
    'Научное',
    'Эксклюзив',
    'Детские',
    'Классика'
  ],
  currentSections: [
    'Все'
  ],
  currentUserPublications: [] as ICollection[],
};

export const collectionReducer = (state = initialState, action: ActionType): ICollectionState => {
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
          likes: Array.from(new Set([...n.likes, action.payload.likeData.userId]))
        } : n)
      };
    case TypesKeys.CURRENT_BOOK_HAS_DISLIKED:
      return {
        ...state,
        collection: state.collection.map(n => n.id === action.payload.likeData.bookId ? {
          ...n,
          likes: [...n.likes.filter(like => like !== action.payload.likeData.userId)]
        } : n)
      };
    case TypesKeys.GET_CURRENT_BOOK:
      const aaa = state.collection.find(book => book.id === action.payload);
      return {
        ...state,
        currentBook: aaa ? { ...aaa } : { ...state.currentBook }
      };
    case TypesKeys.SET_COMMENT:
      return {
        ...state,
        collection: state.collection.map(book => book.id === action.payload.comments.bookId
            ? {
              ...book,
              comments:
                  book.comments
                      ?
                      [
                        ...book.comments, action.payload.comments
                      ]
                      : book.comments
            }
            : book),
        currentBook: { ...state.currentBook, comments: [...state.currentBook.comments, action.payload.comments] }
      };
    case TypesKeys.SET_CURRENT_SECTIONS:
      return {
        ...state,
        currentSections: [...state.currentSections, action.payload]
      };
    case TypesKeys.GET_CURRENT_USER_PUBLICATIONS:
      return {
        ...state,
        currentUserPublications: state.collection.filter(collection => collection.senderId === action.payload)
      };
    case TypesKeys.UPDATE_PUBLICATION:
      return {
        ...state,
        collection: state.collection.map(book => book.id === action.payload.publicationId
            ? {
              ...book,
              author: action.payload.author,
              description: action.payload.description,
              pages: action.payload.pages,
              section: action.payload.section,
            }
            : book)
      };
    default:
      return state;

  }
};