import { createReducer, on } from '@ngrx/store';
import * as BuildingActions from './manager-building.store.action';
import { InitBuildingInfo, RoomInfo } from './manager-building.model';

// Define the shape of the state
export interface State {
  initBuildingInfoResponse: InitBuildingInfo;
  getRoomsInfoResponse:RoomInfo[];
  error: string | null;
  loading: boolean;
}

// Initial state
export const initialState: State = {
  initBuildingInfoResponse: {},
  error: null,
  loading: false,
  getRoomsInfoResponse: []
};

// Reducer function
export const reducer = createReducer(
  initialState,
  on(BuildingActions.initBuildingInfo, (state) => {
    return {
      ...state,
    loading: true,
    }
  }),

  on(BuildingActions.initBuildingInfoSuccess, (state, { payload }) => {
    return {
      ...state,
    initBuildingInfoResponse: payload,
    loading: false,
    error: null,
    };
  }),
  on(BuildingActions.initBuildingInfoFailure, (state, { error }) => {
    return {
      ...state,
    error,
    loading: false,
    }
  })
,
  on(BuildingActions.initBuildingInfoSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    }
  }),
  // Api GET ROOM INFO
  on(BuildingActions.getRoomsInfo, (state) => {
    return {
      ...state,
    loading: true,
    }
  }),

  on(BuildingActions.getRoomsInfoSuccess, (state, { payload }) => {
    return {
      ...state,
    getRoomsInfoResponse: payload,
    loading: false,
    error: null,
    };
  }),
  on(BuildingActions.getRoomsInfoFailure, (state, { error }) => {
    return {
      ...state,
    error,
    loading: false,
    }
  })
,
  on(BuildingActions.getRoomsInfoSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    }
  })
);
