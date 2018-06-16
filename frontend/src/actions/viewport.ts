import {Dispatch} from 'redux';
import {State} from '../reducers/types';
import {createAction} from './action-helpers';
import {ActionsUnion} from './types';

export const SET_VIEWPORT = 'SET_VIEWPORT';

export const ViewportActions = {
  setViewport: (layout:string, viewport: string) => createAction(SET_VIEWPORT, {layout, viewport}),
};

export type ViewportActions = ActionsUnion<typeof ViewportActions>;

export const setViewport = (layout:string, viewport: string) => async (dispatch: Dispatch<State>) => {
  dispatch(ViewportActions.setViewport(layout, viewport));
};
