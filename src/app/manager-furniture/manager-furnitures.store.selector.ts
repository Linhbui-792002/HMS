import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './manager-furnitures.store.reducer';
import { storeKey } from './manager-furnitures.store.action';

// Select the state
export const selectFurnituresState =
  createFeatureSelector<State>(storeKey);

// Selector to get furnitures data
export const initFurnituresResponse = createSelector(
  selectFurnituresState,
  (state) => state?.initFurnituresResponse
);
export const deleteFurnituresResponse = createSelector(
  selectFurnituresState,
  (state) => state?.deleteFurnituresResponse
);

// Selector to get loading state
export const selectRegulationLoading = createSelector(
  selectFurnituresState,
  (state) => state.loading
);

// Selector to get error
export const handleError = createSelector(
  selectFurnituresState,
  (state) => state.error
);

