import { handleActions } from "redux-actions";

import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_TOKEN,
  AUTH_SHOW,
  AUTH_UNAUTHENTICATED,
} from "../actions";

export default handleActions({
  [AUTH_LOGIN.start]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_LOGIN.complete]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_LOGIN.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [AUTH_REGISTER.start]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_REGISTER.complete]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_REGISTER.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [AUTH_TOKEN.complete]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_LOGOUT.complete]: (state, action) => ({
    ...state,
    id: 0,
    username: null,
    token: null,
    loading: false,
    error: null,
  }),
  [AUTH_UNAUTHENTICATED]: (state, action) => ({
    ...state,
    token: null,
    loading: false,
    error: null,
    popup: true,
  }),
  [AUTH_SHOW]: (state, action) => ({
    ...state,
    popup: action.payload,
    token: null,
    loading: false,
    error: null,
  }),
}, {
  id: 0,
  username: null,
  loading: false,
  token: null,
  error: null,
  popup: false,
});
