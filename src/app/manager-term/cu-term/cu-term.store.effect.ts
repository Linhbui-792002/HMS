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
import { CuTermStoreService } from './cu-term.store.service';
import * as CuTermAction from './cu-term.store.action';

@Injectable()
export class CuTermEffects {
  constructor(
    private actions$: Actions,
    private storeService: CuTermStoreService
  ) {}

  registTerm = createEffect(() =>
    this.actions$.pipe(
      ofType(CuTermAction.registTerm),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.registTerm(payload).pipe(
          map((response) => {
            if (response) {
              return CuTermAction.registTermSuccess({
                payload: response.metadata,
              });
            } else {
              return CuTermAction.registTermFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((data) => {
            return of(
              CuTermAction.registTermSystemFailure({
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
  initRegulationInfoSuccess = createEffect(
    () => this.actions$.pipe(ofType(CuTermAction.registTermSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  initRegulationInfoFailure = createEffect(
    () => this.actions$.pipe(ofType(CuTermAction.registTermFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  initRegulationInfoSystemFailure = createEffect(
    () => this.actions$.pipe(ofType(CuTermAction.registTermSystemFailure)),
    { dispatch: false }
  );

  updateTerm = createEffect(() =>
    this.actions$.pipe(
      ofType(CuTermAction.updateTerm),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.updateTerm(payload).pipe(
          map((response) => {
            if (response) {
              return CuTermAction.updateTermSuccess({
                payload: response,
              });
            } else {
              return CuTermAction.updateTermFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((data) => {
            return of(
              CuTermAction.updateTermSystemFailure({
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
  updateTermSuccess = createEffect(
    () => this.actions$.pipe(ofType(CuTermAction.updateTermSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  updateTermFailure = createEffect(
    () => this.actions$.pipe(ofType(CuTermAction.updateTermFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  updateTermSystemFailure = createEffect(
    () => this.actions$.pipe(ofType(CuTermAction.updateTermFailure)),
    { dispatch: false }
  );
}
