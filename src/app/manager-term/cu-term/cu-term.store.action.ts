import { createAction, props, union } from '@ngrx/store';
import {
  RegistTermInfoPayload,
  RegistTermInfoResponse,
  UpdateTermInfoResponse,
} from './cu-term.model';

export const storeKey = 'Create-term';

export const initial = createAction(`[${storeKey}] Regist-Building initial`);

export const clearAction = createAction(
  `[${storeKey}] Create-term clearAction`
);

export const registTerm = createAction(
  `[${storeKey}] Create-term initial`,
  props<{ payload: RegistTermInfoPayload }>()
);

export const registTermSuccess = createAction(
  `[${storeKey}] Create-term registTermSuccess`,
  props<{ payload: RegistTermInfoResponse }>()
);

export const registTermFailure = createAction(
  `[${storeKey}] Create-term registTermFailure`,
  props<{ error: string }>()
);

export const registTermSystemFailure = createAction(
  `[${storeKey}] Create-term registTermSystemFailure`,
  props<{ error: string }>()
);
export const updateTerm = createAction(
  `[${storeKey}] Create-term updateTerm`,
  props<{ payload: RegistTermInfoPayload }>()
);

export const updateTermSuccess = createAction(
  `[${storeKey}] Create-term updateTermSuccess`,
  props<{ payload: UpdateTermInfoResponse }>()
);

export const updateTermFailure = createAction(
  `[${storeKey}] Create-term updateTermFailure`,
  props<{ error: string }>()
);

export const updateTermSystemFailure = createAction(
  `[${storeKey}] Create-term updateTermSystemFailure`,
  props<{ error: string }>()
);
const actions = union({
  initial,
  registTerm,
  registTermSuccess,
  registTermFailure,
  registTermSystemFailure,
  updateTerm,
  updateTermSuccess,
  updateTermFailure,
  updateTermSystemFailure,
});
export type CuTermUnionActions = typeof actions;
