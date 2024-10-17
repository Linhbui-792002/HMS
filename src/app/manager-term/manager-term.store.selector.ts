import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './manager-term.store.reducer';
import { storeKey } from './manager-term.store.action';

// Select the state
export const selectTermState =
  createFeatureSelector<State>(storeKey);

// Selector to get buildings data
export const initTermResponse = createSelector(
  selectTermState,
  (state) => state?.initTermInfoResponse
);
export const deleteTermResponse = createSelector(
  selectTermState,
  (state) => state?.deleteTermInfoResponse
);

// Selector to get loading state
export const selectRegulationLoading = createSelector(
  selectTermState,
  (state) => state.loading
);

// Selector to get error
export const handleError = createSelector(
  selectTermState,
  (state) => state.error
);

