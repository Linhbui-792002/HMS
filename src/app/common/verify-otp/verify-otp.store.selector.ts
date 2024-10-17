import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './verify-otp.store.reducer';
import { storeKey } from './verify-otp.store.action';

// Select the state
export const selectBuildingState =
  createFeatureSelector<State>(storeKey);

// Selector to verifyOtp
export const verifyOtpResponse = createSelector(
  selectBuildingState,
  (state) => state?.verifyOtpResponse
);

// verifyOtpFailureReponse
export const verifyOtpFailureReponse = createSelector(
  selectBuildingState,
  (state) => state?.verifyOtpFailureResponse
);