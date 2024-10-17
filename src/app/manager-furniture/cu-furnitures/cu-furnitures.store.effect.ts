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
import { CuFurnituresStoreService } from './cu-furnitures.store.service';
import * as CuFurnituresActions from './cu-furnitures.store.action';

@Injectable()
export class CuFurnituresEffects {
  constructor(
    private actions$: Actions,
    private storeService: CuFurnituresStoreService
  ) {}

  registFurnitures = createEffect(() =>
    this.actions$.pipe(
      ofType(CuFurnituresActions.registFurnitures),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.registFurnitures(payload).pipe(
          map((response) => {
            if (response) {
              return CuFurnituresActions.registFurnituresSuccess({
                payload: response.metadata,
              });
            } else {
              return CuFurnituresActions.registFurnituresFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((data) => {
            return of(
              CuFurnituresActions.registFurnituresSystemFailure({
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
  registFurnituresSuccess = createEffect(
    () =>
      this.actions$.pipe(ofType(CuFurnituresActions.registFurnituresSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  registFurnituresFailure = createEffect(
    () =>
      this.actions$.pipe(ofType(CuFurnituresActions.registFurnituresFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  registFurnituresSystemFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CuFurnituresActions.registFurnituresSystemFailure)
      ),
    { dispatch: false }
  );
  updateFurniture = createEffect(() =>
    this.actions$.pipe(
      ofType(CuFurnituresActions.updateFurniture),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.updateFurniture(payload).pipe(
          map((response) => {
            if (response) {
              return CuFurnituresActions.updateFurnitureSuccess({
                payload: response,
              });
            } else {
              return CuFurnituresActions.updateFurnitureFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((data) => {
            return of(
              CuFurnituresActions.updateFurnitureFailure({
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
  updateFurnitureSuccess = createEffect(
    () =>
      this.actions$.pipe(ofType(CuFurnituresActions.updateFurnitureSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  updateFurnitureFailure = createEffect(
    () =>
      this.actions$.pipe(ofType(CuFurnituresActions.updateFurnitureFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  updateFurnitureSystemFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CuFurnituresActions.updateFurnitureSystemFailure)
      ),
    { dispatch: false }
  );
}
