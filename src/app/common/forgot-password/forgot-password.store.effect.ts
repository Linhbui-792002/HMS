import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap } from 'rxjs';
import { ForgotPasswordStoreService } from './forgot-password.store.service';
import * as ForgotPasswordActions from './forgot-password.store.action'

@Injectable()
export class ForgotPasswordEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly storeService: ForgotPasswordStoreService
  ) {}

  sendPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(ForgotPasswordActions.sendPassword),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.sendPassword(payload).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return ForgotPasswordActions.sendPasswordSuccess({
                payload: response,
              });
            } else {
              return ForgotPasswordActions.sendPasswordFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((error) => {
            return of(
                ForgotPasswordActions.sendPasswordFailure({ error: error })
            );
          })
        );
      })
    )
  );

  sendPasswordSuccess = createEffect(
    () => this.actions$.pipe(ofType(ForgotPasswordActions.sendPasswordSuccess)),
    { dispatch: false }
  );

  sendPasswordFailure = createEffect(
    () => this.actions$.pipe(ofType(ForgotPasswordActions.sendPasswordFailure)),
    { dispatch: false }
  );
  
}
