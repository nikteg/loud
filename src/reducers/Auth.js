import decode from "jwt-decode";
import { createAction, handleActions } from "redux-actions";

import { login, register, logout } from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const authLoginActions = createNetworkAction("AUTH_LOGIN");
export const authLogoutActions = createNetworkAction("AUTH_LOGOUT");
export const authToken = createAction("AUTH_TOKEN", token => token);
export const authUnauthenticated = createAction("AUTH_UNAUTHENTICATED");

export const authRegister = (loginUsername, password) => (dispatch, getState) => {
  dispatch(authLoginActions.start());
  register(loginUsername, password)
    .then(json => {
      const token = json.token;
      const { id, username } = decode(json.token);

      localStorage.setItem("token", token);

      dispatch(authLoginActions.complete({ id, username, token }));
    })
    .catch(err => dispatch(authLoginActions.error(err.message)));
};

export const authLogin = (loginUsername, password) => (dispatch, getState) => {
  dispatch(authLoginActions.start());
  login(loginUsername, password)
    .then(json => {
      const token = json.token;
      const { id, username } = decode(json.token);

      localStorage.setItem("token", token);

      dispatch(authLoginActions.complete({ id, username, token }));
    })
    .catch(err => dispatch(authLoginActions.error(err.message)));
};

export const authLogout = () => (dispatch, getState) => {
  dispatch(authLogoutActions.start());
  logout(getState().Auth.token)
    .then(() => {
      localStorage.removeItem("token");
      dispatch(authLogoutActions.complete());
    });
};

export default handleActions({
  [authLoginActions.start]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [authLoginActions.complete]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [authToken]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [authLoginActions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [authLogoutActions.complete]: (state, action) => ({
    ...state,
    id: 0,
    username: null,
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
});
