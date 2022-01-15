import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { collection, doc, getDocs, getFirestore, arrayUnion, updateDoc, arrayRemove, setDoc } from 'firebase/firestore';

import { ActionType, ICollection, ISetBook } from './collectionsTypes';
import { AppRootStateType, store } from '../store';
import { actions } from './collectionsActions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const getUsersCollections = (): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    const db = getFirestore();
    const collections = await getDocs(collection(db, 'books'));
    collections.forEach((doc) => {
      const { authors, description, imageURL, pages, section, id, likes, hasLiked } = doc.data();
      const collection: ICollection = {
        authors: authors,
        description: description,
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
        };
        dispatch(actions.setLikedAC({ likeData }));
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
            console.log(url);
            const bookData: ICollection = {
              authors: data.author,
              pages: data.pages,
              description: data.description,
              imageURL: url,
              section: data.section,
              id: refCollection.id,
              likes: [],
              hasLiked: false,
            };
            setDoc(refCollection, bookData);
            dispatch(actions.setCollectionAC(bookData));
          })
          .catch((error) => {
            console.log('no download url');
            // Handle any errors
          });


      // const db = getFirestore();
      // const refCollection = doc(collection(db, 'books'));

      // const bookData: ICollection = {
      //   authors: data.author,
      //   pages: data.pages,
      //   descriptions: data.description,
      //   imageURL: url,
      //   section: data.section,
      //   id: 'string',
      //   likes: [],
      //   hasLiked: false,
      //
      // };
      // await setDoc(refCollection, bookData);
      // dispatch(actions.setCollectionAC(bookData));

      // await res.user.sendEmailVerification();
      // dispatch(actions.needVerificationAC());
      // dispatch(actions.setUserAC(userData));
    } catch (err: any) {
      console.log(err);
      // onError();
      // dispatch(actions.setErrorAC(err.message));
    }
  };
};



