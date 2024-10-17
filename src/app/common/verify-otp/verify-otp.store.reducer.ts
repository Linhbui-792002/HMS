import { createReducer, on } from '@ngrx/store';
import * as VerifyOtpActions from './verify-otp.store.action';

// Define the shape of the state
export interface State {
  resultCd: number,
  message: string,
  error: string | null;
  verifyOtpResponse: any;
  verifyOtpFailureResponse: any;
}

// Initial state
export const initialState: State = {
  error: null,
  resultCd: 0,
  message: "",
  verifyOtpResponse: null,
  verifyOtpFailureResponse: null
};

// Reducer function
export const reducer = createReducer(
  initialState,
  on(VerifyOtpActions.verifyOtp, (state) => {
    return {
      ...state,
    };
  }),

  on(VerifyOtpActions.verifyOtpSuccess, (state, { payload }) => {
    return {
      ...state,
      verifyOtpResponse: payload,
    };
  }),
  on(VerifyOtpActions.verifyOtpFailure, (state, { error }) => {
    return {
      ...state,
      verifyOtpFailureResponse: error
    };
  }),
  on(VerifyOtpActions.clearAction, () => {
    return {
      ...initialState,
    };
  })
);
