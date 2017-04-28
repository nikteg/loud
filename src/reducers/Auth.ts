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
  [AUTH_LOGIN.started.type]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_LOGIN.done.type]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_LOGIN.failed.type]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [AUTH_REGISTER.started.type]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [AUTH_REGISTER.done.type]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_REGISTER.failed.type]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [AUTH_TOKEN.done.type]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [AUTH_LOGOUT.done.type]: (state, action) => ({
    ...state,
    id: 0,
    username: null,
    token: null,
    loading: false,
    error: null,
  }),
  [AUTH_UNAUTHENTICATED.type]: (state, action) => ({
    ...state,
    token: null,
    loading: false,
    error: null,
    popup: true,
  }),
  [AUTH_SHOW.type]: (state, action) => ({
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
