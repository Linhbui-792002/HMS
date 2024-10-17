import { createAction, props, union } from '@ngrx/store';
import { ForgotPasswordRequest } from './forgot-password.model';

export const storeKey = 'forgot-password';

export const initial = createAction(`[${storeKey}] forgot-password initial`);

export const clearAction = createAction(
  `[${storeKey}] forgot-password clearAction`
);

// Action to load buildings
export const sendPassword = createAction(
  `[${storeKey}] forgot-password initial`,
  props<{ payload: ForgotPasswordRequest }>()
);

// Action for success in loading buildings
export const sendPasswordSuccess = createAction(
  `[${storeKey}] forgot-password sendPasswordSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const sendPasswordFailure = createAction(
  `[${storeKey}] forgot-password sendPasswordFailure`,
  props<{ error: string }>()
);

const actions = union({
  initial,
  sendPassword,
  sendPasswordSuccess,
  sendPasswordFailure
});
export type ForgotPasswordUnionActions = typeof actions;
