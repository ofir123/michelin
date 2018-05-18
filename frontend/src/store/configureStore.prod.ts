import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/rootReducer';
import {State} from '../reducers/types';

const configureStore = (initialState: State) => {
  return createStore<State>(rootReducer, initialState, compose(applyMiddleware(thunk)));
};

export {configureStore};
