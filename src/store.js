import {createStore} from 'redux';
import allReducers from './reducers'
// const store = createStore(allReducers,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
 
const persistConfig = {
  key: 'root',
  storage,
};
 
const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);