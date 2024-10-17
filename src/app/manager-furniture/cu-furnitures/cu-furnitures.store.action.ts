import { createAction, props, union } from '@ngrx/store';

export const storeKey = 'cu-furnitures';

export const initial = createAction(`[${storeKey}] Cu-Furnitures initial`);
// Action to load buildings
export const registFurnitures = createAction(
  `[${storeKey}] Cu-Furnitures initial`,
  props<{ payload: any }>()
);
export const clearAction = createAction(
  `[${storeKey}] Cu-Furnitures clearAction`
);
// Action for success in loading buildings
export const registFurnituresSuccess = createAction(
  `[${storeKey}] Cu-Furnitures registFurnituresSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const registFurnituresFailure = createAction(
  `[${storeKey}] Cu-Furnitures registFurnituresFailure`,
  props<{ error: string }>()
);

export const registFurnituresSystemFailure = createAction(
  `[${storeKey}] Cu-Furnitures registFurnituresSystemFailure`,
  props<{ error: string }>()
);

export const updateFurniture = createAction(
  `[${storeKey}] Cu-Furnitures updateFurniture`,
  props<{ payload: any }>()
);

// Action for success in loading buildings
export const updateFurnitureSuccess = createAction(
  `[${storeKey}] Cu-Furnitures updateFurnitureSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const updateFurnitureFailure = createAction(
  `[${storeKey}] Cu-Furnitures updateFurnitureFailure`,
  props<{ error: string }>()
);

export const updateFurnitureSystemFailure = createAction(
  `[${storeKey}] Cu-Furnitures updateFurnitureSystemFailure`,
  props<{ error: string }>()
);
const actions = union({
  clearAction,
  initial,
  registFurnitures,
  registFurnituresSuccess,
  registFurnituresFailure,
  registFurnituresSystemFailure,
  updateFurniture,
  updateFurnitureSuccess,
  updateFurnitureFailure,
  updateFurnitureSystemFailure,
});
export type RegistFurnituresUnionActions = typeof actions;
