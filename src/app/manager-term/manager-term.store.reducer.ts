import { createReducer, on } from '@ngrx/store';
import * as RegulationActions from './manager-term.store.action';
import { InitTermInfoResponse, DeleteTermInfoResponse } from './manager-term.model';

// Define the shape of the state
export interface State {
  initTermInfoResponse: InitTermInfoResponse;
  deleteTermInfoResponse: DeleteTermInfoResponse;
  error: string | null;
  loading: boolean;
}

// Initial state
export const initialState: State = {
  initTermInfoResponse: {},
  deleteTermInfoResponse: {},
  error: null,
  loading: false,
};

// Reducer function
export const reducer = createReducer(
  initialState,
  on(RegulationActions.initTermInfo, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(RegulationActions.initTermInfoSuccess, (state, { payload }) => {
    return {
      ...state,
      initTermInfoResponse: payload,
      loading: false,
      error: null,
    };
  }),
  on(RegulationActions.initTermInfoFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(RegulationActions.initTermInfoSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(RegulationActions.deleteTermInfo, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(RegulationActions.deleteTermInfoSuccess, (state, { payload }) => {
    return {
      ...state,
      deleteTermInfoResponse: payload,
      loading: false,
      error: null,
    };
  }),
  on(RegulationActions.deleteTermInfoFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(
    RegulationActions.deleteTermInfoSystemFailure,
    (state, { error }) => {
      return {
        ...state,
        error,
        loading: false,
      };
    }
  )
);
