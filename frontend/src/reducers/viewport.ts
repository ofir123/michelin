import * as FromActions from '../actions/viewport';
import {State, ViewportState} from './types';

export const initialState: ViewportState = {
  viewport: '/',
};

export const viewport = (state = initialState, action: FromActions.ViewportActions) => {
  switch (action.type) {
    case FromActions.SET_VIEWPORT:
      return action.payload;
    default:
      return state;
  }
};

export const getViewport = (state: State) => state.viewport;
