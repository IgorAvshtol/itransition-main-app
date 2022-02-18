import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { AppRootStateType } from '../store';
import { ActionType, ISignInData, ISignUpData, IUser } from './authTypes';
import { actionsAuth } from './authActions';

export const signup = (data: ISignUpData): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return (dispatch: Dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const db = getFirestore();
          const ref = doc(db, 'users', user!.uid);

          if (user) {
            const userData: IUser = {
              email: data.email,
              firstName: data.firstName,
              id: user.uid,
            };
            setDoc(ref, { userData });
            dispatch(actionsAuth.setUserAC(userData));
            dispatch(actionsAuth.setLoadingAC(false));
          }

        })
        .catch((error) => {
          dispatch(actionsAuth.setErrorAC(error.message));
        });
  };
};

export const getUserById = (id: string): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    const db = getFirestore();
    const docRef = doc(db, 'users', `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData: IUser = {
        email: docSnap.data().userData.email,
        firstName: docSnap.data().userData.firstName,
        id: docSnap.data().userData.id,
      };
      dispatch(actionsAuth.setUserAC(userData));
    } else {
      console.log('No such document!');
    }
  };
};

export const signIn = (data: ISignInData): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return (dispatch: Dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(actionsAuth.setAuthenticatedAC(true));
        })
        .catch((error) => {
          dispatch(actionsAuth.setErrorAC(error.message));
        });
  };
};

export const logOut = (): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(actionsAuth.setLogOutAC());
    } catch (error) {
      console.log(error);
    }
  };
};








