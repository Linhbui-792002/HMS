import { createAction, props, union } from '@ngrx/store';

export const storeKey = 'manager-building';

export const initial = createAction(`[${storeKey}] Manager-Building initial`)
// Action to load buildings
export const initBuildingInfo = createAction(
  `[${storeKey}] Manager-Building initial`,
  props<{ payload: any }>()
);

// Action for success in loading buildings
export const initBuildingInfoSuccess = createAction(
  `[${storeKey}] Manager-Building initBuildingInfoSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const initBuildingInfoFailure = createAction(
  `[${storeKey}] Manager-Building initBuildingInfoFailure`,
  props<{ error: string }>()
);

export const initBuildingInfoSystemFailure = createAction(
  `[${storeKey}] Manager-Building initBuildingInfoSystemFailure`,
  props<{ error: string }>()
);

// Action to getRoomsInfo
export const getRoomsInfo = createAction(
  `[${storeKey}] Manager-Building getRoomsInfo`,
  props<{ payload: any }>()
);

// Action for getRoomsInfoSuccess
export const getRoomsInfoSuccess = createAction(
  `[${storeKey}] Manager-Building getRoomsInfoSuccess`,
  props<{ payload: any }>()
);

// Action for getRoomsInfoFailure
export const getRoomsInfoFailure = createAction(
  `[${storeKey}] Manager-Building getRoomsInfoFailure`,
  props<{ error: string }>()
);

// Action for getRoomsInfoFailure
export const getRoomsInfoSystemFailure = createAction(
  `[${storeKey}] Manager-Building getRoomsInfoSystemFailure`,
  props<{ error: string }>()
);

const actions = union({
  initial,
  initBuildingInfo,
  initBuildingInfoSuccess,
  initBuildingInfoFailure,
  initBuildingInfoSystemFailure,
  getRoomsInfo,
  getRoomsInfoSuccess,
  getRoomsInfoFailure,
  getRoomsInfoSystemFailure
});
export type ManagerBuildingUnionActions = typeof actions;