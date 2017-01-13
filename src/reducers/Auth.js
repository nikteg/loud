import decode from "jwt-decode";
import { createAction, handleActions } from "redux-actions";

import * as Api from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const Actions = {
  loginActions: createNetworkAction("AUTH_LOGIN"),
  logoutActions: createNetworkAction("AUTH_LOGOUT"),
  updatePasswordActions: createNetworkAction("AUTH_UPDATE_PASSWORD"),
  token: createAction("AUTH_TOKEN", token => token),
  unauthenticated: createAction("AUTH_UNAUTHENTICATED"),
  popup: createAction("AUTH_POPUP", show => show),
  register(loginUsername, password) {
    return (dispatch, getState) => {
      dispatch(Actions.loginActions.start());
      Api.register(loginUsername, password)
        .then(json => {
          const token = json.token;
          const { id, username } = decode(json.token);

          localStorage.setItem("token", token);

          dispatch(Actions.loginActions.complete({ id, username, token }));
        })
        .catch(err => dispatch(Actions.loginActions.error(err.message)));
    };
  },
  login(loginUsername, password) {
    return (dispatch, getState) => {
      dispatch(Actions.loginActions.start());
      Api.login(loginUsername, password)
        .then(json => {
          const token = json.token;
          const { id, username } = decode(json.token);

          localStorage.setItem("token", token);

          dispatch(Actions.loginActions.complete({ id, username, token }));
        })
        .catch(err => dispatch(Actions.loginActions.error(err.message)));
    };
  },
  logout() {
    return (dispatch, getState) => {
      dispatch(Actions.logoutActions.start());
      Api.logout(getState().Auth.token)
        .then(() => {
          localStorage.removeItem("token");
          dispatch(Actions.logoutActions.complete());
        });
    };
  },
  updatePassword(oldPassword, newPassword) {
    return (dispatch, getState) => {
      dispatch(Actions.updatePasswordActions.start());
      Api.updatePassword(getState().Auth.token, oldPassword, newPassword)
        .then(() => dispatch(Actions.updatePasswordActions.complete()))
        .catch(err => dispatch(Actions.updatePasswordActions.error(err.message)));
    };
  },
};

export default handleActions({
  [Actions.loginActions.start]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [Actions.loginActions.complete]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [Actions.token]: (state, action) => ({
    ...state,
    ...action.payload,
    popup: false,
  }),
  [Actions.loginActions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [Actions.logoutActions.complete]: (state, action) => ({
    ...state,
    id: 0,
    username: null,
    token: null,
    loading: false,
    error: null,
  }),
  [Actions.unauthenticated]: (state, action) => ({
    ...state,
    token: null,
    loading: false,
    error: null,
    popup: true,
  }),
  [Actions.popup]: (state, action) => ({
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
