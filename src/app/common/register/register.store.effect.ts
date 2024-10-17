import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap } from 'rxjs';
import { RegistStoreService } from './register.store.service';
import * as RegistActions from './register.store.action'

@Injectable()
export class RegistEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly storeService: RegistStoreService
  ) {}

  // ----------- sign up ------------- \\
  signup = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistActions.signup),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.signup(payload).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return RegistActions.signupSuccess({
                payload: response,
              });
            } else {
              return RegistActions.sendEmailFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((error) => {
            return of(
                RegistActions.signupFailure({ error: error })
            );
          })
        );
      })
    )
  );

  signupSuccess = createEffect(
    () => this.actions$.pipe(ofType(RegistActions.signupSuccess)),
    { dispatch: false }
  );

  signupFailure = createEffect(
    () => this.actions$.pipe(ofType(RegistActions.signupFailure)),
    { dispatch: false }
  );


  // ----------- send Email ------------- \\
  sendEmail = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistActions.sendEmail),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.sendEmail(payload).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return RegistActions.sendEmailSuccess({
                payload: response,
              });
            } else {
              return RegistActions.sendEmailFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((error) => {
            return of(
                RegistActions.sendEmailFailure({ error: error })
            );
          })
        );
      })
    )
  );

  sendEmailSuccess = createEffect(
    () => this.actions$.pipe(ofType(RegistActions.sendEmailSuccess)),
    { dispatch: false }
  );

  sendEmailFailure = createEffect(
    () => this.actions$.pipe(ofType(RegistActions.sendEmailFailure)),
    { dispatch: false }
  );
}
