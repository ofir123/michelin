import {combineReducers, Reducer} from 'redux';
import {auth} from './auth';
import {notifications} from './notifications';
import {organization} from './organization';
import {State} from './types';

export const rootReducer: Reducer<State> = combineReducers<State>({
  auth,
  notifications,
  organization,
});
