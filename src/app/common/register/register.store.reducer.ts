import { createReducer, on } from '@ngrx/store';
import * as RegistActions from './register.store.action';

// Define the shape of the state
export interface State {
  error: string | null;
  loading: boolean;
  sendEmailReponse: any;
  signupResponse: any;
  signupFailureResponse: any;
}

// Initial state
export const initialState: State = {
  error: null,
  loading: false,
  sendEmailReponse: null,
  signupResponse: null,
  signupFailureResponse: null
};

// Reducer function
export const reducer = createReducer(
  initialState,

  // ----------- sign up ------------- \\
  on(RegistActions.signup, (state, { payload }) => {
    return {
      ...state,
    };
  }),
  on(RegistActions.signupSuccess, (state, { payload }) => {
    return {
      ...state,
      signupResponse: payload,
    };
  }),
  on(RegistActions.signupFailure, (state, { error }) => {
    return {
      ...state,
      signupFailureResponse:error,
    };
  }),

  // ----------- send Email ------------- \\
  on(RegistActions.sendEmail, (state, { payload }) => {
    return {
      ...state,
    };
  }),
  on(RegistActions.sendEmailSuccess, (state, { payload }) => {
    return {
      ...state,
      sendEmailReponse: payload,
    };
  }),
  on(RegistActions.sendEmailFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  on(RegistActions.clearAction, () => {
    return {
      ...initialState,
    };
  })
);
