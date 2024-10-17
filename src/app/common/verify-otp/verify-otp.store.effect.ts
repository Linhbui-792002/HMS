import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap } from 'rxjs';
import { VerifyOtpStoreService } from './verify-otp.store.service';
import * as VerifyOtpActions from './verify-otp.store.action';

@Injectable()
export class VerifyOtpEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly storeService: VerifyOtpStoreService
  ) {}

  verifyOtp = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyOtpActions.verifyOtp),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.verifyOtp(payload).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return VerifyOtpActions.verifyOtpSuccess({
                payload: response,
              });
            } else {
              return VerifyOtpActions.verifyOtpFailure({
                error: response,
              });
            }
          }),
          catchError((error) => {
            return of(VerifyOtpActions.verifyOtpFailure({ error: error }));
          })
        );
      })
    )
  );

  VerifyOtpSuccess = createEffect(
    () => this.actions$.pipe(ofType(VerifyOtpActions.verifyOtpSuccess)),
    { dispatch: false }
  );

  VerifyOtpFailure = createEffect(
    () => this.actions$.pipe(ofType(VerifyOtpActions.verifyOtpFailure)),
    { dispatch: false }
  );
  
}
