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
import { ManagerFurnituresStoreService } from './manager-furnitures.store.service';
import * as FurnituresActions from './manager-furnitures.store.action';

@Injectable()
export class ManagerFurnituresEffects {
  constructor(
    private actions$: Actions,
    private storeService: ManagerFurnituresStoreService
  ) {}

  initFurnitures = createEffect(() =>
    this.actions$.pipe(
      ofType(FurnituresActions.initFurnitures),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.initFurnitures(payload).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return FurnituresActions.initFurnituresSuccess({
                payload: response,
              });
            } else {
              return FurnituresActions.initFurnituresFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((data) => {
            return of(
              FurnituresActions.initFurnituresSystemFailure({
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
  initFurnituresSuccess = createEffect(
    () => this.actions$.pipe(ofType(FurnituresActions.initFurnituresSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  initFurnituresFailure = createEffect(
    () => this.actions$.pipe(ofType(FurnituresActions.initFurnituresFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  initFurnituresSystemFailure = createEffect(
    () =>
      this.actions$.pipe(ofType(FurnituresActions.initFurnituresSystemFailure)),
    { dispatch: false }
  );
  deleteFurnitures = createEffect(() =>
    this.actions$.pipe(
      ofType(FurnituresActions.deleteFurnitures),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.deleteFurnitures(payload).pipe(
          map((response) => {
            if (response) {
              return FurnituresActions.deleteFurnituresSuccess({
                payload: response,
              });
            } else {
              return FurnituresActions.deleteFurnituresFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((data) => {
            return of(
              FurnituresActions.deleteFurnituresFailure({
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
  deleteFurnituresSuccess = createEffect(
    () => this.actions$.pipe(ofType(FurnituresActions.deleteFurnituresSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  deleteFurnituresFailure = createEffect(
    () => this.actions$.pipe(ofType(FurnituresActions.deleteFurnituresFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  deleteFurnituresSystemFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FurnituresActions.deleteFurnituresSystemFailure)
      ),
    { dispatch: false }
  );
}
