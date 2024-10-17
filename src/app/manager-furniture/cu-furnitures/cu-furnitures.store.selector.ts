import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './cu-furnitures.store.reducer';
import { storeKey } from './cu-furnitures.store.action';

// Select the state
export const selectFurnituresState =
  createFeatureSelector<State>(storeKey);

// Selector to get furnitures data
export const registFurnituresResponse = createSelector(
  selectFurnituresState,
  (state) => state?.registFurnituresResponse
);
export const updateFurnituresResponse = createSelector(
  selectFurnituresState,
  (state) => state?.updateFurnituresResponse
);

// Selector to get loading state
export const selectFurnituresLoading = createSelector(
  selectFurnituresState,
  (state) => state.loading
);

// Selector to get error
export const handleError = createSelector(
  selectFurnituresState,
  (state) => state.error
);

