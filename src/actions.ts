import { createNetworkAction } from "lib/utils"
import { createAction } from "redux-actions"

export const AUTH_LOGIN = createNetworkAction("AUTH_LOGIN")
export const AUTH_REGISTER = createNetworkAction("AUTH_REGISTER")
export const AUTH_LOGOUT = createNetworkAction("AUTH_LOGOUT")
export const AUTH_TOKEN = createNetworkAction("AUTH_TOKEN")
export const AUTH_SHOW = createAction("AUTH_SHOW")
export const AUTH_UNAUTHENTICATED = createAction("AUTH_UNAUTHENTICATED")

export const PLAYLIST_LOAD_ALL = createNetworkAction("PLAYLIST_LOAD_ALL")

export function login(username, password) { return AUTH_LOGIN.start({ username, password }) }
export function register(username, password) { return AUTH_REGISTER.start({ username, password }) }
export function logout() { return AUTH_LOGOUT.start() }
export function token(token) { return AUTH_TOKEN.start(token) }
export function showLoginPopup() { return AUTH_SHOW(true) }
export function hideLoginPopup() { return AUTH_SHOW(false) }
export function unauthenticated() { return AUTH_UNAUTHENTICATED() }

export function loadAllPlaylists() { return PLAYLIST_LOAD_ALL.start() }
