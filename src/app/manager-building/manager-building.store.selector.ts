import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './manager-building.store.reducer';
import { storeKey } from './manager-building.store.action';

// Select the state
export const selectBuildingState =
  createFeatureSelector<State>(storeKey);

// Selector to get buildings data
export const initBuildingInfoResponse = createSelector(
  selectBuildingState,
  (state) => state?.initBuildingInfoResponse
);

// Selector to get loading state
export const selectBuildingsLoading = createSelector(
  selectBuildingState,
  (state) => state.loading
);

// Selector to get error
export const selectBuildingsError = createSelector(
  selectBuildingState,
  (state) => state.error
);

// select to get rooms info
export const getRoomInfoResponse = createSelector(
  selectBuildingState,
  (state) => state?.getRoomsInfoResponse
);
