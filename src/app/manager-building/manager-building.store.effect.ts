import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, catchError, tap, EMPTY, map, finalize, switchMap } from 'rxjs';
import { ManagerBuildingStoreService } from './manager-building.store.service';
import * as BuildingActions from './manager-building.store.action';

@Injectable()
export class ManagerBuildingEffects {
  constructor(
    private actions$: Actions,
    private storeService: ManagerBuildingStoreService
  ) {}

  initBuildingInfo = createEffect(() =>
    this.actions$.pipe(  
      ofType(BuildingActions.initBuildingInfo),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.storeService.initBuildingInfo(payload).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return BuildingActions.initBuildingInfoSuccess({
                payload: response,
              });
            } else {
              return BuildingActions.initBuildingInfoFailure({
                error: 'ERROR!',
              });
            }
          }),
          catchError((error) => {
            return of(
              BuildingActions.initBuildingInfoSystemFailure({ error: error })
            );
          })
        );
      })
    )
  );

  /**
   * 初期表示成功
   */
  initBuildingInfoSuccess = createEffect(
    () => this.actions$.pipe(ofType(BuildingActions.initBuildingInfoSuccess)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  initBuildingInfoFailure = createEffect(
    () => this.actions$.pipe(ofType(BuildingActions.initBuildingInfoFailure)),
    { dispatch: false }
  );

  /**
   * 初期表示失敗(APIでのエラー等)
   */
  initBuildingInfoSystemFailure = createEffect(
    () =>
      this.actions$.pipe(ofType(BuildingActions.initBuildingInfoSystemFailure)),
    { dispatch: false }
  );

 // === getRoom Api
 getRoomsInfo = createEffect(() =>
  this.actions$.pipe(  
    ofType(BuildingActions.initBuildingInfo),
    map((action) => action.payload),
    switchMap((payload) => {
      return this.storeService.getRoomsInfo(payload).pipe(
        map((response) => {
          if (response.body.resultCd === 0) {
            return BuildingActions.getRoomsInfoSuccess({
              payload: response.body,
            });
          } else {
            return BuildingActions.getRoomsInfoFailure({
              error: 'ERROR!',
            });
          }
        }),
        catchError((error) => {
          return of(
            BuildingActions.getRoomsInfoSystemFailure({ error: error })
          );
        })
      );
    })
  )
);

/**
 * 初期表示成功
 */
getRoomsInfoSuccess = createEffect(
  () => this.actions$.pipe(ofType(BuildingActions.getRoomsInfoSuccess)),
  { dispatch: false }
);

/**
 * 初期表示失敗(APIでのエラー等)
 */
getRoomsInfoFailure = createEffect(
  () => this.actions$.pipe(ofType(BuildingActions.getRoomsInfoFailure)),
  { dispatch: false }
);

/**
 * 初期表示失敗(APIでのエラー等)
 */
getRoomsInfoSystemFailure = createEffect(
  () =>
    this.actions$.pipe(ofType(BuildingActions.getRoomsInfoSystemFailure)),
  { dispatch: false }
);
}
