import { createReducer, on } from '@ngrx/store';
import { ForgotPasswordRequest } from './forgot-password.model';
import * as ForgotPasswordActions from './forgot-password.store.action';

// Define the shape of the state
export interface State {
  error: string | null;
  loading: boolean;
  sendPasswordSuccessResponse: any
  sendPasswordFailureResponse: any
}

// Initial state
export const initialState: State = {
  error: null,
  loading: false,
  sendPasswordSuccessResponse: null,
  sendPasswordFailureResponse: null
};

// Reducer function
export const reducer = createReducer(
  initialState,
  on(ForgotPasswordActions.sendPassword, (state) => {
    return {
      ...state,
    };
  }),

  on(ForgotPasswordActions.sendPasswordSuccess, (state, { payload }) => {
    return {
      ...state,
      sendPasswordSuccessResponse: payload
    };
  }),
  on(ForgotPasswordActions.sendPasswordFailure, (state, { error }) => {
    return {
      ...state,
      sendPasswordFailureResponse:error,
    };
  }),
  on(ForgotPasswordActions.clearAction, () => {
    return {
      ...initialState,
    };
  })
);
