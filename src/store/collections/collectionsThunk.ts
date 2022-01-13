import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { collection, doc, getDocs, getFirestore, arrayUnion, updateDoc, arrayRemove } from 'firebase/firestore';

import { ActionType, ICollection } from './collectionsTypes';
import { AppRootStateType, store } from '../store';
import { actions } from './collectionsActions';


export const getUsersCollections = (): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    const db = getFirestore();
    const collections = await getDocs(collection(db, 'books'));
    collections.forEach((doc) => {
      const { authors, description, imageURL, pages, section, id, likes, hasLiked } = doc.data();
      const collection: ICollection = {
        authors: authors,
        descriptions: description,
        imageURL: imageURL,
        pages: pages,
        section: section,
        id: id,
        likes: likes,
        hasLiked: hasLiked
      };
      dispatch(actions.setCollectionAC(collection));
    });
  };
};

export const setLikeBook = (id: string): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const state = store.getState();
      const uid = state.auth.user?.id;
      const db = getFirestore();
      const ref = doc(db, 'books', `${id}`);
      await updateDoc(ref, {
        likes: arrayUnion(`${uid}`)
      });
      if (uid) {
        const likeData = {
          bookId: id,
          userId: uid
        }
        dispatch(actions.setLikedAC({likeData}))
      }
      // if (uid) {
      //   const currentLikes = state.collection.collection.filter(v => v.likes?.includes(uid));
      //   if (currentLikes) {
      //     await updateDoc(ref, {
      //       hasLiked: true
      //     });
      //   }
      // }
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const setDislikeBook = (id: string): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const state = store.getState();
      const uid = state.auth.user?.id;
      const db = getFirestore();
      const ref = doc(db, 'books', `${id}`);
      await updateDoc(ref, {
        likes: arrayRemove(`${uid}`)
      });
      if (uid) {
        const likeData = {
          bookId: id,
          userId: uid
        }
        dispatch(actions.setDislikedAC({likeData}))
      }
    } catch (err: any) {
      console.log(err);
    }
  };
};



