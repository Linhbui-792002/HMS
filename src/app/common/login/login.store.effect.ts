import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap } from 'rxjs';
import { LoginStoreService } from './login.store.service';
import * as LoginActions from './login.store.action'

@Injectable()
export class LoginEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly storeService: LoginStoreService
  ) {}

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.login(payload).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return LoginActions.loginSuccess({
                payload: response,
              });
            } else {
              return LoginActions.loginFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((error) => {
            return of(
                LoginActions.loginFailure({ error: error })
            );
          })
        );
      })
    )
  );

  loginSuccess = createEffect(
    () => this.actions$.pipe(ofType(LoginActions.loginSuccess)),
    { dispatch: false }
  );

  loginFailure = createEffect(
    () => this.actions$.pipe(ofType(LoginActions.loginFailure)),
    { dispatch: false }
  );
  
  sendEmail = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.sendEmail),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.sendEmail(payload).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return LoginActions.sendEmailSuccess({
                payload: response,
              });
            } else {
              return LoginActions.sendEmailFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((error) => {
            return of(
                LoginActions.sendEmailFailure({ error: error })
            );
          })
        );
      })
    )
  );

  sendEmailSuccess = createEffect(
    () => this.actions$.pipe(ofType(LoginActions.sendEmailSuccess)),
    { dispatch: false }
  );

  sendEmailFailure = createEffect(
    () => this.actions$.pipe(ofType(LoginActions.sendEmailFailure)),
    { dispatch: false }
  );

  sendEmailSystemFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.sendEmailSystemFailure)
      ),
    { dispatch: false }
  );
}
