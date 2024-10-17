import { createAction, props, union } from '@ngrx/store';

export const storeKey = 'manager-furnitures';

export const initial = createAction(`[${storeKey}] Manager-Furnitures initial`);
// Action to load buildings
export const initFurnitures = createAction(
  `[${storeKey}] Manager-Furnitures initial`,
  props<{ payload: any }>()
);
export const clearAction = createAction(
  `[${storeKey}] Manager-Furnitures clearAction`
);
// Action for success in loading buildings
export const initFurnituresSuccess = createAction(
  `[${storeKey}] Manager-Furnitures initFurnituresSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const initFurnituresFailure = createAction(
  `[${storeKey}] Manager-Furnitures initFurnituresFailure`,
  props<{ error: string }>()
);

export const initFurnituresSystemFailure = createAction(
  `[${storeKey}] Manager-Furnitures initFurnituresSystemFailure`,
  props<{ error: string }>()
);

export const deleteFurnitures = createAction(
  `[${storeKey}] Manager-Furnitures deleteFurnitures`,
  props<{ payload: any }>()
);

// Action for success in loading buildings
export const deleteFurnituresSuccess = createAction(
  `[${storeKey}] Manager-Furnitures deleteFurnituresSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const deleteFurnituresFailure = createAction(
  `[${storeKey}] Manager-Furnitures deleteFurnituresFailure`,
  props<{ error: string }>()
);

export const deleteFurnituresSystemFailure = createAction(
  `[${storeKey}] Manager-Furnitures deleteFurnituresSystemFailure`,
  props<{ error: string }>()
);
const actions = union({
  initial,
  initFurnitures,
  initFurnituresSuccess,
  initFurnituresFailure,
  initFurnituresSystemFailure,
  deleteFurnitures,
  deleteFurnituresSuccess,
  deleteFurnituresFailure,
  deleteFurnituresSystemFailure,
});
export type ManagerRegulationUnionActions = typeof actions;
