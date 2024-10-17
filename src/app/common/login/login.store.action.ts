import { createAction, props, union } from '@ngrx/store';
import { LoginRequest, LoginResponse, SendEmailRequest } from './login.model';

export const storeKey = 'login';

export const initial = createAction(`[${storeKey}] login initial`);

export const clearAction = createAction(
  `[${storeKey}] login clearAction`
);

// Action to load buildings
export const login = createAction(
  `[${storeKey}] login initial`,
  props<{ payload: LoginRequest }>()
);

// Action for success in loading buildings
export const loginSuccess = createAction(
  `[${storeKey}] login loginSuccess`,
  props<{ payload: LoginResponse }>()
);

// Action for failure in loading buildings
export const loginFailure = createAction(
  `[${storeKey}] login loginFailure`,
  props<{ error: string }>()
);

export const loginSystemFailure = createAction(
  `[${storeKey}] login loginSystemFailure`,
  props<{ error: string }>()
);

// Action to load buildings
export const sendEmail = createAction(
  `[${storeKey}] login initial`,
  props<{ payload: SendEmailRequest }>()
);

// Action for success in loading buildings
export const sendEmailSuccess = createAction(
  `[${storeKey}] login sendEmailSuccess`,
  props<{ payload: any }>()
);

// Action for failure in loading buildings
export const sendEmailFailure = createAction(
  `[${storeKey}] login sendEmail`,
  props<{ error: string }>()
);

export const sendEmailSystemFailure = createAction(
  `[${storeKey}] login sendEmailSystemFailure`,
  props<{ error: string }>()
);
const actions = union({
  initial,
  login,
  loginSuccess,
  loginSystemFailure,
  loginFailure,
  sendEmail,
  sendEmailSuccess,
  sendEmailFailure,
  sendEmailSystemFailure
});
export type LoginUnionActions = typeof actions;
