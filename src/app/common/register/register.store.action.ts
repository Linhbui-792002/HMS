import { createAction, props, union } from '@ngrx/store';
import { SignupRequest, SendEmailRequest } from './register.model';

export const storeKey = 'register';

export const initial = createAction(`[${storeKey}] register initial`);

export const clearAction = createAction(`[${storeKey}] register clearAction`);

// ----------- sign up ------------- \\

export const signup = createAction(
  `[${storeKey}] signup initial`,
  props<{ payload: SignupRequest }>()
);

export const signupSuccess = createAction(
  `[${storeKey}] signup sendEmailSuccess`,
  props<{ payload: any }>()
);

export const signupFailure = createAction(
  `[${storeKey}] signup sendEmail`,
  props<{ error: string }>()
);

// ----------- send Email ------------- \\
export const sendEmail = createAction(
  `[${storeKey}] sendEmail initial`,
  props<{ payload: SendEmailRequest }>()
);

export const sendEmailSuccess = createAction(
  `[${storeKey}] sendEmail sendEmailSuccess`,
  props<{ payload: any }>()
);

export const sendEmailFailure = createAction(
  `[${storeKey}] sendEmail sendEmail`,
  props<{ error: string }>()
);

export const sendEmailSystemFailure = createAction(
  `[${storeKey}] sendEmail sendEmailSystemFailure`,
  props<{ error: string }>()
);
const actions = union({
  initial,
  sendEmail,
  sendEmailSuccess,
  sendEmailFailure,
  sendEmailSystemFailure,
});
export type RegisterUnionActions = typeof actions;
