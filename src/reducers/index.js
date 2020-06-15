import loggedReducer from './isLogged';
import nodesReducer from './saveNodes';
import currentNodeReducer from './currentNode';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
	isLogged: loggedReducer,
	nodes: nodesReducer,
	currentNode : currentNodeReducer
});

export default allReducers;