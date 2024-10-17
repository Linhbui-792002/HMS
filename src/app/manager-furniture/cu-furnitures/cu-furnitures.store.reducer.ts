import { createReducer, on } from '@ngrx/store';
import * as CuRegulationActions from './cu-furnitures.store.action';
import {
  RegistFurnituresResponse,
  UpdateFurnituresResponse,
} from './cu-furnitures.model';

// Define the shape of the state
export interface State {
  registFurnituresResponse: RegistFurnituresResponse;
  updateFurnituresResponse: UpdateFurnituresResponse;
  error: string | null;
  loading: boolean;
}

// Initial state
export const initialState: State = {
  registFurnituresResponse: {},
  updateFurnituresResponse: {},
  error: null,
  loading: false,
};

// Reducer function
export const reducer = createReducer(
  initialState,
  on(CuRegulationActions.registFurnitures, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(CuRegulationActions.registFurnituresSuccess, (state, { payload }) => {
    return {
      ...state,
      registFurnituresResponse: payload,
      loading: false,
      error: null,
    };
  }),
  on(CuRegulationActions.registFurnituresFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(CuRegulationActions.registFurnituresSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(CuRegulationActions.updateFurniture, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(CuRegulationActions.updateFurnitureSuccess, (state, { payload }) => {
    return {
      ...state,
      updateFurnituresResponse: payload,
      loading: false,
      error: null,
    };
  }),
  on(CuRegulationActions.updateFurnitureFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(CuRegulationActions.updateFurnitureSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(CuRegulationActions.clearAction, () => {
    return {
      ...initialState,
      registFurnituresResponse: {},
      updateFurnituresResponse: {},
    };
  })
);
