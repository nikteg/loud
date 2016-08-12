import decode from "jwt-decode";
import { createAction, handleActions } from "redux-actions";
// import { ROUTER_DID_CHANGE } from "redux-router/lib/constants";

function createNetworkAction(prefix) {
  return {
    start: createAction(`${prefix}_START`),
    error: createAction(`${prefix}_ERROR`, error => error),
    complete: createAction(`${prefix}_COMPLETE`, res => res),
  };
}

export const authRegisterActions = createNetworkAction("AUTH_REGISTER");
export const authLoginActions = createNetworkAction("AUTH_LOGIN");
export const authLogoutActions = createNetworkAction("AUTH_LOGOUT");
export const authToken = createAction("AUTH_TOKEN", token => token);

function post(route, params, networkAction) {
  return (dispatch, getState) => {
    dispatch(networkAction.start());

    fetch(route, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getState().Auth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          return dispatch(networkAction.error(json.error));
        }

        dispatch(networkAction.complete(json.token));
      });
  };
}

export const authRegister = (username, password) => post(
  `${API_URL}/auth/register`,
  { username, password },
  authRegisterActions);

export const authLogin = (username, password) => post(
  `${API_URL}/auth/login`,
  { username, password },
  authLoginActions);

export const authLogout = (token) => post(
  `${API_URL}/auth/logout`,
  { token },
  authLogoutActions);

export default handleActions({
  [authRegisterActions.start]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [authRegisterActions.complete]: (state, action) => {
    const token = action.payload;
    const { id, username } = decode(token);

    localStorage.setItem("token", token);

    return {
      ...state,
      id,
      username,
      token,
      loading: false,
      error: null,
    };
  },
  [authRegisterActions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [authLoginActions.start]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [authLoginActions.complete]: (state, action) => {
    const token = action.payload;
    const { id, username } = decode(token);

    localStorage.setItem("token", token);

    return {
      ...state,
      id,
      username,
      token,
    };
  },
  [authLoginActions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [authLogoutActions.complete]: (state, action) => {
    localStorage.removeItem("token");

    return {
      ...state,
      id: 0,
      username: null,
      token: null,
      loading: false,
      error: null,
    };
  },
  [authToken]: (state, action) => {
    const token = action.payload;
    const { id, username } = decode(token);

    return {
      ...state,
      id,
      username,
      token,
    };
  },
}, {
  id: 0,
  username: null,
  loading: false,
  token: null,
  error: null,
});
