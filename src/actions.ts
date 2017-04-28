import actionCreatorFactory from "typescript-fsa"

const authActionCreator = actionCreatorFactory("AUTH")
const playlistActionCreator = actionCreatorFactory("PLAYLIST")

export const AUTH_LOGIN = authActionCreator.async<
  { username: string, password: string },
  { id: number, username: string, token: string },
  any
>("LOGIN")
export const AUTH_REGISTER = authActionCreator.async<{ username: string, password: string }, any, any>("REGISTER")
export const AUTH_LOGOUT = authActionCreator.async("LOGOUT")
export const AUTH_TOKEN = authActionCreator.async<{ token: string }, any, any>("TOKEN")
export const AUTH_SHOW = authActionCreator<boolean>("SHOW")
export const AUTH_UNAUTHENTICATED = authActionCreator("UNAUTHENTICATED")

export const PLAYLIST_LOAD_ALL = playlistActionCreator.async("LOAD_ALL")

export function login(username, password) { return { type: AUTH_LOGIN.type, payload: { username, password } } }
export function register(username, password) { return AUTH_REGISTER.started({ username, password }) }
export function logout() { return AUTH_LOGOUT.started(null) }
export function token(token) { return AUTH_TOKEN.started(token) }
export function showLoginPopup() { return AUTH_SHOW(true) }
export function hideLoginPopup() { return AUTH_SHOW(false) }
export function unauthenticated() { return AUTH_UNAUTHENTICATED() }

export function loadAllPlaylists() { return PLAYLIST_LOAD_ALL.started(null) }
