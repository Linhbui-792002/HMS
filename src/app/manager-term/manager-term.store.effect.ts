import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  Observable,
  of,
  catchError,
  tap,
  EMPTY,
  map,
  finalize,
  switchMap,
} from 'rxjs';
import { ManagerTermStoreService } from './manager-term.store.service';
import * as ManagerTermAction from './manager-term.store.action';

@Injectable()
export class ManagerTermEffects {
  constructor(
    private actions$: Actions,
    private storeService: ManagerTermStoreService
  ) {}

  initTermInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(ManagerTermAction.initTermInfo),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.initTermInfo(payload).pipe(
          map((response) => {
            if (response.metadata) {
              return ManagerTermAction.initTermInfoSuccess({
                payload: response.metadata,
              });
            } else {
              return ManagerTermAction.initTermInfoFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((data) => {
            return of(
              ManagerTermAction.initTermInfoSystemFailure({
                error: data.error.message,
              })
            );
          })
        );
      })
    )
  );

  /**
   * 初期表示成功
   */
  initTermInfoSuccess = createEffect(
    () => this.actions$.pipe(ofType(ManagerTermAction.initTermInfoSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  initTermInfoFailure = createEffect(
    () => this.actions$.pipe(ofType(ManagerTermAction.initTermInfoFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  initTermInfoSystemFailure = createEffect(
    () =>
      this.actions$.pipe(ofType(ManagerTermAction.initTermInfoSystemFailure)),
    { dispatch: false }
  );
  deleteTermInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(ManagerTermAction.deleteTermInfo),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.deleteTermInfo(payload).pipe(
          map((response) => {
            if (response) {
              return ManagerTermAction.deleteTermInfoSuccess({
                payload: response,
              });
            } else {
              return ManagerTermAction.deleteTermInfoFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((data) => {
            return of(
              ManagerTermAction.deleteTermInfoFailure({
                error: data.error.message,
              })
            );
          })
        );
      })
    )
  );

  /**
   * 初期表示成功
   */
  deleteTermInfoSuccess = createEffect(
    () => this.actions$.pipe(ofType(ManagerTermAction.deleteTermInfoSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  deleteTermInfoFailure = createEffect(
    () => this.actions$.pipe(ofType(ManagerTermAction.deleteTermInfoFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  deleteTermInfoSystemFailure = createEffect(
    () =>
      this.actions$.pipe(ofType(ManagerTermAction.deleteTermInfoSystemFailure)),
    { dispatch: false }
  );
}
