import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initState from './initState';
import gameReducer from './reducers/gameReducer'


const store = createStore(gameReducer, initState, composeWithDevTools());

export default store;
