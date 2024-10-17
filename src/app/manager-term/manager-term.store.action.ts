import { createAction, props, union } from '@ngrx/store';

export const storeKey = 'manager-term';

export const initial = createAction(`[${storeKey}] Manager-Term initial`);
// Action to load buildings
export const initTermInfo = createAction(
  `[${storeKey}] Manager-Term initial`,
  props<{ payload: any }>()
);

// Action for success in loading buildings
export const initTermInfoSuccess = createAction(
  `[${storeKey}] Manager-Term initTermInfoSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const initTermInfoFailure = createAction(
  `[${storeKey}] Manager-Term initTermInfoFailure`,
  props<{ error: string }>()
);

export const initTermInfoSystemFailure = createAction(
  `[${storeKey}] Manager-Term initTermInfoSystemFailure`,
  props<{ error: string }>()
);

export const deleteTermInfo = createAction(
  `[${storeKey}] Manager-Term deleteTermInfo`,
  props<{ payload: any }>()
);

// Action for success in loading buildings
export const deleteTermInfoSuccess = createAction(
  `[${storeKey}] Manager-Term deleteTermInfoSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const deleteTermInfoFailure = createAction(
  `[${storeKey}] Manager-Term deleteTermInfoFailure`,
  props<{ error: string }>()
);

export const deleteTermInfoSystemFailure = createAction(
  `[${storeKey}] Manager-Term deleteTermInfoSystemFailure`,
  props<{ error: string }>()
);
const actions = union({
  initial,
  initTermInfo,
  initTermInfoSuccess,
  initTermInfoFailure,
  initTermInfoSystemFailure,
  deleteTermInfo,
  deleteTermInfoSuccess,
  deleteTermInfoFailure,
  deleteTermInfoSystemFailure,
});
export type ManagerTermUnionActions = typeof actions;
