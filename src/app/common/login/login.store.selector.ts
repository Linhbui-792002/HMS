import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './login.store.reducer';
import { storeKey } from './login.store.action';

// Select the state
export const selectBuildingState =
  createFeatureSelector<State>(storeKey);

// Selector to get buildings data
export const LoginSuccessResponse = createSelector(
  selectBuildingState,
  (state) => state?.loginResponse
);

export const LoginFailResponse = createSelector(
  selectBuildingState,
  (state) => state?.loginFailureResponse
);