import { createReducer, on } from '@ngrx/store';
import * as TermAction from './cu-term.store.action';
import {
  RegistTermInfoResponse,
  UpdateTermInfoResponse,
} from './cu-term.model';

// Define the shape of the state
export interface State {
  error: string | null;
  loading: boolean;
  registTermInfoResponse: RegistTermInfoResponse;
  updateTermInfoResponse: UpdateTermInfoResponse;
}

// Initial state
export const initialState: State = {
  error: null,
  loading: false,
  registTermInfoResponse: {},
  updateTermInfoResponse: {},
};

// Reducer function
export const reducer = createReducer(
  initialState,

  on(TermAction.initial, (state) => {
    return {
      ...state,
    };
  }),
  on(TermAction.registTerm, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(TermAction.registTermSuccess, (state, { payload }) => {
    return {
      ...state,
      registTermInfoResponse: payload,
      loading: false,
      error: null,
    };
  }),
  on(TermAction.registTermFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(TermAction.registTermSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(TermAction.updateTerm, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(TermAction.updateTermSuccess, (state, { payload }) => {
    return {
      ...state,
      updateTermInfoResponse: payload,
      loading: false,
      error: null,
    };
  }),
  on(TermAction.updateTermFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),
  on(TermAction.updateTermSystemFailure, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
    };
  }),

  on(TermAction.clearAction, () => {
    return {
      ...initialState,
      registTermInfoResponse: {},
      updateTermInfoResponse: {},
    };
  })
);
