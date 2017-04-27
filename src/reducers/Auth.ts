import { handleActions } from "redux-actions"

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_SHOW,
  AUTH_TOKEN,
  AUTH_UNAUTHENTICATED,
} from "../actions"

export default handleActions({
  [AUTH_LOGIN.start.toString()]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_LOGIN.complete.toString()]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_LOGIN.error.toString()]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [AUTH_REGISTER.start.toString()]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_REGISTER.complete.toString()]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_REGISTER.error.toString()]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [AUTH_TOKEN.complete.toString()]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_LOGOUT.complete.toString()]: (state, action) => ({
    ...state,
    id: 0,
    username: null,
    token: null,
    loading: false,
    error: null,
  }),
  [AUTH_UNAUTHENTICATED.toString()]: (state, action) => ({
    ...state,
    token: null,
    loading: false,
    error: null,
    popup: true,
  }),
  [AUTH_SHOW.toString()]: (state, action) => ({
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
})
