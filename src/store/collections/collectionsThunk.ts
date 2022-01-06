import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { collection, deleteDoc, doc, getDocs, getFirestore, arrayUnion, updateDoc } from 'firebase/firestore';

import { ActionType, ICollection } from '../types';
import { AppRootStateType, store } from '../store';
import { actions } from '../actions';


export const getUsersCollections = (): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    const db = getFirestore();
    const collections = await getDocs(collection(db, 'books'));
    collections.forEach((doc) => {
      const { authors, descriptions, imageURL, pages, section, id } = doc.data();
      const collection: ICollection = {
        authors: authors,
        descriptions: descriptions,
        imageURL: imageURL,
        pages: pages,
        section: section,
        id: id
      };
      dispatch(actions.setCollectionAC(collection));
    });
  };
};

export const setLikeBook = (id: string): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    const state = store.getState()
    const uid = state.auth.user?.id

    const db = getFirestore();
    const ref = doc(db, 'books/', `${id}`);

    await updateDoc(ref, {
      likes: arrayUnion(`${uid}`)
    });
  };
};



