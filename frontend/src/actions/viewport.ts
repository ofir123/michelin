import {Dispatch} from 'redux';
import {State} from '../reducers/types';
import {createAction} from './action-helpers';
import {ActionsUnion} from './types';

export const SET_VIEWPORT = 'SET_VIEWPORT';

export const ViewportActions = {
  setViewport: (viewport: string) => createAction(SET_VIEWPORT, viewport),
};

export type ViewportActions = ActionsUnion<typeof ViewportActions>;

export const setViewport = (viewport: string) => async (dispatch: Dispatch<State>) => {
  dispatch(ViewportActions.setViewport(viewport));
};
