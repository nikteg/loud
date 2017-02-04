import { createAction } from "redux-actions";

export function createNetworkAction(prefix) {
  return {
    start: createAction(`${prefix}_START`),
    error: createAction(`${prefix}_ERROR`),
    complete: createAction(`${prefix}_COMPLETE`),
  };
}

export function formatTime(s) {
  const sec = parseInt(s, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - (hours * 3600)) / 60);
  let seconds = sec - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = `0${hours}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }
  if (seconds < 10) { seconds = `0${seconds}`; }

  // Omit hours atm.
  return `${minutes}:${seconds}`;
}

export function trackSlug(track) {
  const artist = track.artist.toLowerCase().replace(/([^a-z0-9_ ])+/g, "").replace(/\s+/g, "-");
  const name = track.name.toLowerCase().replace(/([^a-z0-9_ ])+/g, "").replace(/\s+/g, "-");

  return `${artist}-${name}`;
}
