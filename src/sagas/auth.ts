import decode from "jwt-decode"
import { SagaIterator } from "redux-saga"
import { call, put, select, takeEvery } from "redux-saga/effects"
import { bindAsyncAction } from "typescript-fsa-redux-saga"

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_TOKEN,
  AUTH_UNAUTHENTICATED,
  loadAllPlaylists,
} from "../actions"
import * as Api from "../lib/api"

export function decodeToken(token): { id: number, username: string, token: string } {
  const { id, username } = decode(token)
  localStorage.setItem("token", token)

  return { id, username, token }
}

const authLoginWorker = bindAsyncAction(AUTH_LOGIN)(
  function*(asd): SagaIterator {
    console.log("asd", asd)
    const { token } = yield call(Api.login, asd, asd)

    return decodeToken(token)
  })

export function* authLoginSaga({ payload: { username, password } }) {
  try {
    const { token } = yield call(Api.login, username, password)
    yield put(AUTH_LOGIN.done({ params: { username, password }, result: decodeToken(token) }))
  } catch (err) {
    yield put(AUTH_LOGIN.failed(err))
  }
}

export function* authRegisterSaga({ payload: { username, password } }) {
  try {
    const { token } = yield call(Api.register, username, password)
    yield put(AUTH_REGISTER.done({ params: { username, password }, result: decodeToken(token) }))
  } catch (err) {
    yield put(AUTH_REGISTER.failed(err))
  }
}

export function* authLogoutSaga() {
  console.log("logout yes")
  const { Auth: { token } } = yield select()

  try {
    yield call(Api.logout, token)
    yield put(AUTH_LOGOUT.done(undefined))
  } catch (err) {
    yield put(AUTH_LOGOUT.failed(err))
  }
}

export function* authTokenSaga({ payload: token }) {
  try {
    yield put(AUTH_TOKEN.done({ params: token, result: decodeToken(token) }))
    yield put(loadAllPlaylists())
  } catch (err) {
    yield put(AUTH_TOKEN.failed(err))
  }
}

export function removeToken() {
  localStorage.removeItem("token")
}

export default function* authSaga() {
  yield takeEvery(AUTH_LOGIN.type, authLoginWorker)
  yield takeEvery(AUTH_REGISTER.started.type, authRegisterSaga)
  yield takeEvery(AUTH_LOGOUT.started.type, authLogoutSaga)
  yield takeEvery(AUTH_TOKEN.started.type, authTokenSaga)
  yield takeEvery([AUTH_TOKEN.failed.type, AUTH_UNAUTHENTICATED.type], removeToken)
}
