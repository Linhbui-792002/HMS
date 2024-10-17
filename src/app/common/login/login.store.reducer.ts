import { createReducer, on } from '@ngrx/store';
import { LoginFailureResponse, LoginResponse } from './login.model';
import * as LoginActions from './login.store.action';

// Define the shape of the state
export interface State {
  error: string | null;
  loading: boolean;
  loginResponse: any;
  loginFailureResponse: any;
  sendEmailReponse: any
}

// Initial state
export const initialState: State = {
  error: null,
  loading: false,
  loginResponse: null,
  sendEmailReponse: null,
  loginFailureResponse: null
};

// Reducer function
export const reducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => {
    return {
      ...state,
    };
  }),

  on(LoginActions.loginSuccess, (state, { payload }) => {
    return {
      ...state,
      loginResponse: payload,
    };
  }),
  on(LoginActions.loginFailure, (state, { error }) => {
    return {
      ...state,
      loginFailureResponse:error,
    };
  }),

  on(LoginActions.sendEmail, (state) => {
    return {
      ...state,
    };
  }),

  on(LoginActions.sendEmailSuccess, (state, { payload }) => {
    return {
      ...state,
      sendEmailReponse: payload,
    };
  }),
  on(LoginActions.sendEmailFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(LoginActions.sendEmailSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  on(LoginActions.clearAction, () => {
    return {
      ...initialState,
    };
  })
);
