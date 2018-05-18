import {History} from 'history';
import {Dispatch} from 'redux';
import * as api from '../api';
import * as routes from '../constants/routes';
import {State} from '../reducers/types';
import {createAction, GetState} from './action-helpers';
import {ActionsUnion} from './types';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LoginActions = {
  loginRequest: () => createAction(LOGIN_REQUEST),
  loginSuccess: (token: string) => createAction(LOGIN_SUCCESS, token),
  loginFailure: (errorMessage: string) => createAction(LOGIN_FAILURE, errorMessage),
};

export type LoginActions = ActionsUnion<typeof LoginActions>;

const shouldLogin = (state: State) => {
  const auth = state.auth;
  return !auth.isFetching;
};

export const loginIfNeeded = (email: string, password: string, remember: boolean, history: History) => async (
  dispatch: Dispatch<State>,
  getState: GetState,
) => {
  const state = getState();
  if (shouldLogin(state)) {
    dispatch(LoginActions.loginRequest());

    try {
      const response = await api.login(email, password, remember);
      // Handle local storage here and not in the reducer, to keep reducer clean of side-effects.
      localStorage.setItem('token', response.token);
      dispatch(LoginActions.loginSuccess(response.token));
      history.push(routes.DEFAULT);
    } catch (error) {
      dispatch(LoginActions.loginFailure(error.message));
    }
  }
};

export const LOGOUT = 'LOGOUT';

export const LogoutAction = {
  logout: () => createAction(LOGOUT),
};

export type LogoutAction = ActionsUnion<typeof LogoutAction>;

export const logoutAndRedirect = (history: History) => (dispatch: Dispatch<State>) => {
  localStorage.removeItem('token');
  dispatch(LogoutAction.logout());
  history.push(routes.LOGIN);
};

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const RegisterActions = {
  registerRequest: () => createAction(REGISTER_REQUEST),
  registerSuccess: (token: string) => createAction(REGISTER_SUCCESS, token),
  registerFailure: (errorMessage: string) => createAction(REGISTER_FAILURE, errorMessage),
};

export type RegisterActions = ActionsUnion<typeof RegisterActions>;

const shouldRegister = (state: State) => {
  const auth = state.auth;
  return !auth.isFetching;
};

export const registerIfNeeded = (
  name: string,
  email: string,
  organizationId: number,
  password: string,
  history: History,
) => async (dispatch: Dispatch<State>, getState: GetState) => {
  const state = getState();
  if (shouldRegister(state)) {
    dispatch(RegisterActions.registerRequest());

    try {
      const response = await api.register(name, email, organizationId, password);
      // Handle local storage here and not in the reducer, to keep reducer clean of side-effects.
      localStorage.setItem('token', response.token);
      dispatch(RegisterActions.registerSuccess(response.token));
      history.push(routes.REGISTER_RESULT);
    } catch (error) {
      dispatch(RegisterActions.registerFailure(error.message));
    }
  }
};
