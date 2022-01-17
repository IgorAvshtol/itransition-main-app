import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { collection, doc, getDocs, getFirestore, arrayUnion, updateDoc, arrayRemove, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { ActionType, ICollection, ISetBook } from './collectionsTypes';
import { AppRootStateType, store } from '../store';
import { actions } from './collectionsActions';
import { actionsAlert } from '../alert/alertActions';


export const getUsersCollections = (): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    const db = getFirestore();
    const collections = await getDocs(collection(db, 'books'));
    collections.forEach((doc) => {
      const { authors, description, imageURL, pages, section, id, likes, senderEmail, departureDate } = doc.data();
      const collection: ICollection = {
        authors: authors,
        description: description,
        imageURL: imageURL,
        pages: pages,
        section: section,
        id: id,
        likes: likes,
        senderEmail: senderEmail,
        departureDate: departureDate,
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
        };
        dispatch(actions.setLikedAC({ likeData }));
      }
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
        };
        dispatch(actions.setDislikedAC({ likeData }));
      }
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const setCollection = (data: ISetBook): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const db = getFirestore();
      const refCollection = doc(collection(db, 'books'));
      console.log(refCollection.id);
      //Upload file
      const storage = getStorage();
      const storageRef = ref(storage);
      const fileName = data.file.name;
      const file = data.file;
      const imagesRef = ref(storageRef, 'books/');
      const spaceRef = ref(imagesRef, `${fileName}`);
      await uploadBytes(spaceRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      await getDownloadURL(spaceRef)
          .then((url) => {
            // `url` is the download URL for 'book'
            const state = store.getState();
            const userEmail = state.auth.user?.email
            const yearAndMonth =new Date().toLocaleDateString();
            const hoursAndMinutes =new Date().toLocaleTimeString().split(':').slice(0,2).join(':');
            const bookData: ICollection = {
              authors: data.author,
              pages: data.pages,
              description: data.description,
              imageURL: url,
              section: data.section,
              id: refCollection.id,
              likes: [],
              senderEmail: userEmail,
              departureDate: `${yearAndMonth} ${hoursAndMinutes}`,
            };
            setDoc(refCollection, bookData);
            dispatch(actions.setCollectionAC(bookData));
            dispatch(actionsAlert.setSuccess(true));
          })
          .catch((error) => {
            dispatch(actionsAlert.setError(true));
            console.log('no download url');
          });
    } catch (err: any) {
      console.log(err);
      dispatch(actionsAlert.setError(true));
    }
  };
};



