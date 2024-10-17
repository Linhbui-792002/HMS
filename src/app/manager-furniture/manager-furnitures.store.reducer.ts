import { createReducer, on } from '@ngrx/store';
import * as RegulationActions from './manager-furnitures.store.action';
import {
  DeleteFurnituresResponse,
  InitFurnituresResponse,
} from './manager-furnitures.model';

// Define the shape of the state
export interface State {
  initFurnituresResponse: InitFurnituresResponse;
  deleteFurnituresResponse: DeleteFurnituresResponse;
  error: string | null;
  loading: boolean;
}

// Initial state
export const initialState: State = {
  initFurnituresResponse: {},
  deleteFurnituresResponse: {},
  error: null,
  loading: false,
};

// Reducer function
export const reducer = createReducer(
  initialState,
  on(RegulationActions.initFurnitures, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(RegulationActions.initFurnituresSuccess, (state, { payload }) => {
    return {
      ...state,
      initFurnituresResponse: payload,
      loading: false,
      error: null,
    };
  }),
  on(RegulationActions.initFurnituresFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(RegulationActions.initFurnituresSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(RegulationActions.deleteFurnitures, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(RegulationActions.deleteFurnituresSuccess, (state, { payload }) => {
    return {
      ...state,
      deleteFurnituresResponse: payload,
      loading: false,
      error: null,
    };
  }),
  on(RegulationActions.deleteFurnituresFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(RegulationActions.deleteFurnituresSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(RegulationActions.clearAction, () => {
    return {
      ...initialState,
      deleteFurnituresResponse: {},
      initFurnituresResponse: {},
    };
  })
);
