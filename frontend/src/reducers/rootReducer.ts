import {routerReducer} from 'react-router-redux';
import {combineReducers, Reducer} from 'redux';
import {auth} from './auth';
import {notifications} from './notifications';
import {organization} from './organization';
import {State} from './types';
import {viewport} from './viewport';

export const rootReducer: Reducer<State> = combineReducers<State>({
  auth,
  notifications,
  organization,
  router: routerReducer,
  viewport,
});

export const getLocation = (state: State) => state.router.location;
