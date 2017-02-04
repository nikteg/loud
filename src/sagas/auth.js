import { call, put, select, takeEvery } from "redux-saga/effects";
import decode from "jwt-decode";

import * as Api from "../lib/api";
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_TOKEN,
  AUTH_UNAUTHENTICATED,
  loadAllPlaylists,
} from "../actions";

export function decodeToken(token) {
  const { id, username } = decode(token);
  localStorage.setItem("token", token);

  return { id, username, token };
}

export function* authLoginSaga({ payload: { username, password } }) {
  try {
    const { token } = yield call(Api.login, username, password);
    yield put(AUTH_LOGIN.complete(decodeToken(token)));
  } catch (err) {
    yield put(AUTH_LOGIN.error(err));
  }
}

export function* authRegisterSaga({ payload: { username, password } }) {
  try {
    const { token } = yield call(Api.register, username, password);
    yield put(AUTH_REGISTER.complete(decodeToken(token)));
  } catch (err) {
    yield put(AUTH_REGISTER.error(err));
  }
}

export function* authLogoutSaga() {
  const { Auth: { token } } = yield select();

  try {
    yield call(Api.logout, token);
    yield put(AUTH_LOGOUT.complete());
  } catch (err) {
    yield put(AUTH_LOGOUT.error(err));
  }
}

export function* authTokenSaga({ payload: token }) {
  try {
    yield put(AUTH_TOKEN.complete(decodeToken(token)));
    yield put(loadAllPlaylists());
  } catch (err) {
    yield put(AUTH_TOKEN.error(err));
  }
}

export function removeToken() {
  localStorage.removeItem("token");
}

export default function* authSaga() {
  yield takeEvery(AUTH_LOGIN.start, authLoginSaga);
  yield takeEvery(AUTH_REGISTER.start, authRegisterSaga);
  yield takeEvery(AUTH_LOGOUT.start, authLogoutSaga);
  yield takeEvery(AUTH_TOKEN.start, authTokenSaga);
  yield takeEvery([AUTH_TOKEN.error, AUTH_UNAUTHENTICATED], removeToken);
}
