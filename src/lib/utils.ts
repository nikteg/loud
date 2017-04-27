import { createAction } from "redux-actions"

export interface NetworkAction {
  start: ReduxActions.ActionFunctionAny<any>,
  error: ReduxActions.ActionFunctionAny<any>,
  complete: ReduxActions.ActionFunctionAny<any>,
}

export function createNetworkAction(prefix: string): NetworkAction {
  return {
    start: createAction(`${prefix}_START`),
    error: createAction(`${prefix}_ERROR`),
    complete: createAction(`${prefix}_COMPLETE`),
  }
}

export function simpleNumberPad(num: number) {
  return (num < 10) ? `0${num}` : `${num}`
}

export function formatTime(time: string) {
  const s = parseInt(time, 10)
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor((s - (hours * 3600)) / 60)
  const seconds = s - (hours * 3600) - (minutes * 60)

  // Omit hours atm.
  return `${simpleNumberPad(minutes)}:${simpleNumberPad(seconds)}`
}

export function trackSlug(track) {
  const artist = track.artist.toLowerCase().replace(/([^a-z0-9_ ])+/g, "").replace(/\s+/g, "-")
  const name = track.name.toLowerCase().replace(/([^a-z0-9_ ])+/g, "").replace(/\s+/g, "-")

  return `${artist}-${name}`
}
