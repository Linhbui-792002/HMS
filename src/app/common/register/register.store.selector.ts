import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './register.store.reducer';
import { storeKey } from './register.store.action';

// Select the state
export const selectBuildingState =
  createFeatureSelector<State>(storeKey);

 // ----------- sign up ------------- \\
export const SignupSuccessResponse = createSelector(
  selectBuildingState,
  (state) => state.signupResponse
);

export const SignupFailureResponse = createSelector(
    selectBuildingState,
    (state) => state.signupFailureResponse
  );