import { createAction, props, union } from '@ngrx/store';
import { VerifyOtpRequest } from './verify-otp.model';

export const storeKey = 'verify-otp';
export const initial = createAction(`[${storeKey}] verify-otp initial`);

export const clearAction = createAction(`[${storeKey}] verify-otp clearAction`);

// action verify-otp

export const verifyOtp = createAction(
  `[${storeKey}] verifyOtp initial`,
  props<{ payload: VerifyOtpRequest }>()
);

export const verifyOtpSuccess = createAction(
  `[${storeKey}] verifyOtp verifyOtpSuccess`,
  props<{ payload: any }>()
);

export const verifyOtpFailure = createAction(
  `[${storeKey}] verifyOtp verifyOtpFailure`,
  props<{ error: any }>()
);

const actions = union({
  initial,
  verifyOtp,
  verifyOtpSuccess,
  verifyOtpFailure,
});
export type VerifyOtpUnionActions = typeof actions;
