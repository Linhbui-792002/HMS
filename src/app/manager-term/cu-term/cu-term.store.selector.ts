import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './cu-term.store.reducer';
import { storeKey } from './cu-term.store.action';

// Select the state
export const selectRegulationState =
  createFeatureSelector<State>(storeKey);

export const registTermResponse = createSelector(
  selectRegulationState,
  (state) => state?.registTermInfoResponse
);

export const updateTermResponse = createSelector(
  selectRegulationState,
  (state) => state?.updateTermInfoResponse
);

// Selector to get loading state
export const selectRegulationLoading = createSelector(
  selectRegulationState,
  (state) => state.loading
);

// Selector to get error
export const handleError = createSelector(
  selectRegulationState,
  (state) => state.error
);

