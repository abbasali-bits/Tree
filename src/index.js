import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import {createStore} from 'redux';
import allReducers from './reducers'
import {Provider,useSelector} from 'react-redux'
import {store,persistor} from './store'
import {PersistGate} from 'redux-persist/integration/react'

// const store = createStore(allReducers,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.dispatch({
// 	type: 'SIGN_IN',
// 	payload: {
// 		emailId: 'gmail'
// 	}
// });
// store.dispatch({
// 	type: 'SIGN_OUT',
// 	payload: {
// 		emailId: 'bitsmail'
// 	}
// });
console.log(store.getState().isLogged.isLoggedIn);
ReactDOM.render(
  <Provider store = {store}>
  	<PersistGate loading = {<h1>loading..</h1>} persistor = {persistor}>
    	<App store = {store}/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
