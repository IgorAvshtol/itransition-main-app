import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './auth/authReducer';
import thunkMiddleware from 'redux-thunk';
import { collectionReducer } from './collections/collectionsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>