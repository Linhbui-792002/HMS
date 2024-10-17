import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './forgot-password.store.reducer';
import { storeKey } from './forgot-password.store.action';

// Select the state
export const selectBuildingState =
  createFeatureSelector<State>(storeKey);

 export const SendPasswordSuccessResponse = createSelector(
  selectBuildingState,
  (state) => state.sendPasswordSuccessResponse
);

export const SendPasswordFailureResponse = createSelector(
    selectBuildingState,
    (state) => state.sendPasswordFailureResponse
  );