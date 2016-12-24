import { createAction, handleActions } from "redux-actions";

import { authLogoutActions } from "./Auth";
import { searchActions } from "./Search";

// Helper function
function withPlayer(fn) {
  return (dispatch, getState) => {
    const { Video: { player } } = getState();

    return fn(player, dispatch, getState);
  };
}

export const videoInit = createAction("VIDEO_INIT", player => player);
export const videoState = createAction("VIDEO_STATE", state => state);
export const videoProgress = createAction("VIDEO_PROGRESS", progress => progress);
export const videoDuration = createAction("VIDEO_DURATION", duration => duration);
export const videoMuted = createAction("VIDEO_MUTED", muted => muted);
export const videoVolume = createAction("VIDEO_VOLUME", volume => volume);
export const videoPopup = createAction("VIDEO_POPUP", show => show);
export const videoError = createAction("VIDEO_ERROR", code => code);
export const videoSeeking = createAction("VIDEO_SEEKING", seeking => seeking);
export const videoTracksIndex = createAction("VIDEO_TRACKS_INDEX", index => index);
export const videoPlaylist = createAction("VIDEO_PLAYLIST", (playlist, index) => ({ playlist, index }));

export function videoSeekingStart() {
  return videoSeeking(true);
}

export function videoPopupToggle() {
  return (dispatch, getState) => dispatch(videoPopup(!getState().Video.popup));
}

export function videoVolumeSet(percent) {
  return withPlayer((player, dispatch, getState) => {
    const muted = getState().Video.player.isMuted();
    const percentFixed = Math.min(100, Math.max(0, percent));

    player.setVolume(percentFixed);
    dispatch(videoVolume(percentFixed));

    if (muted) {
      player.unMute();
      dispatch(videoMuted(false));
    }
  });
}

export function videoPlayPause() {
  return withPlayer((player, dispatch, getState) => {
    if (getState().Video.state === "play") {
      player.pauseVideo();
    }

    if (getState().Video.state === "pause" || getState().Video.state === "end") {
      player.playVideo();
    }
  });
}

export function videoLoadPlaylist(playlist, index = 0) {
  return withPlayer((player, dispatch, getState) => {
    if (getState().Video.playlistId === playlist.id &&
      getState().Video.tracksIndex === index) {
      return dispatch(videoPlayPause());
    }

    player.loadVideoById(playlist.tracks[index].key);
    dispatch(videoPlaylist(playlist, index));
  });
}

export function videoListNext() {
  return withPlayer((player, dispatch, getState) => {
    const index = getState().Video.tracksIndex;
    const tracks = getState().Video.tracks;

    if (index < tracks.length - 1) {
      player.loadVideoById(tracks[(index + 1)].key);
      dispatch(videoTracksIndex(index + 1));
      dispatch(videoProgress(0));
    }
  });
}

export function videoListPrev() {
  return withPlayer((player, dispatch, getState) => {
    const index = getState().Video.tracksIndex;
    const tracks = getState().Video.tracks;

    if (index === 0) {
      dispatch(videoSeekTo(0));

      return;
    }

    if (index > 0) {
      player.loadVideoById(tracks[(index - 1)].key);
      dispatch(videoTracksIndex(index - 1));
    }
  });
}

export function videoPlay() {
  return withPlayer(player => player.playVideo());
}

export function videoPause() {
  return withPlayer(player => player.pauseVideo());
}

export function videoProgressTick() {
  return withPlayer((player, dispatch, getState) => {
    if (!getState().Video.seeking && getState().Video.state === "play") {
      dispatch(videoProgress(player.getCurrentTime()));
    }
  });
}

export function videoStatePlay() {
  return withPlayer((player, dispatch, getState) => {
    dispatch(videoState("play"));

    // Hooking into the play state seems to be the easiest way to determine the video duration
    const duration = player.getDuration();

    if (getState().Video.duration !== duration) {
      dispatch(videoDuration(duration));
    }
  });
}

export function videoStatePause() {
  return videoState("pause");
}

export function videoStateEnd() {
  return withPlayer((player, dispatch, getState) => {
    dispatch(videoState("end"));

    // Go to next video
    if (getState().Video.tracksIndex < getState().Video.tracks.length - 1) {
      dispatch(videoListNext());
    }
  });
}

export function videoStateError(code) {
  return withPlayer((player, dispatch, getState) => {
    dispatch(videoError(code));

    // Go to next video
    if (getState().Video.tracksIndex < getState().Video.tracks.length - 1) {
      dispatch(videoListNext());
    }
  });
}

export function videoSeekTo(seconds) {
  return withPlayer((player, dispatch, getState) => {
    player.seekTo(seconds);
    dispatch(videoProgress(seconds));
    dispatch(videoSeeking(false));
  });
}

let videoSeekTimeout;

export function videoSeekRelative(seconds) {
  return withPlayer((player, dispatch, getState) => {
    const progress = Math.min(getState().Video.duration, Math.max(0, getState().Video.progress + seconds));

    player.seekTo(progress);
    dispatch(videoProgress(progress));
    dispatch(videoSeeking(true));
    clearTimeout(videoSeekTimeout);
    videoSeekTimeout = setTimeout(() => dispatch(videoSeeking(false)), 200);
  });
}

export function videoMuteToggle() {
  return withPlayer((player, dispatch, getState) => {
    const muted = getState().Video.player.isMuted();

    if (muted) {
      player.unMute();
    } else {
      player.mute();
    }

    dispatch(videoMuted(!muted));
  });
}

const initialState = {
  tracks: [],
  tracksIndex: 0,
  playlistId: null,
  state: null,
  progress: 0,
  duration: 1,
  muted: false,
  volume: 100,
  popup: false,
  error: null,
  seeking: false,
};

export default handleActions({
  [authLogoutActions.complete]: (state, action) => initialState, // Reset to inital state on logout
  [videoInit]: (state, action) => ({
    ...state,
    player: action.payload,
    state: "init",
  }),
  [videoTracksIndex]: (state, action) => ({
    ...state,
    tracksIndex: action.payload,
  }),
  [videoPlaylist]: (state, action) => ({
    ...state,
    tracksIndex: action.payload.index,
    tracks: action.payload.playlist.tracks,
    playlistId: action.payload.playlist.id,
  }),
  [searchActions.complete]: (state, action) => ({
    ...state,
    playlistId: null,
  }),
  [videoDuration]: (state, action) => ({
    ...state,
    duration: action.payload,
  }),
  [videoState]: (state, action) => ({
    ...state,
    state: action.payload,
  }),
  [videoProgress]: (state, action) => ({
    ...state,
    progress: action.payload,
  }),
  [videoMuted]: (state, action) => ({
    ...state,
    muted: action.payload,
  }),
  [videoVolume]: (state, action) => ({
    ...state,
    volume: action.payload,
  }),
  [videoPopup]: (state, action) => ({
    ...state,
    popup: action.payload,
  }),
  [videoError]: (state, action) => ({
    ...state,
    error: action.payload,
    state: "error",
  }),
  [videoSeeking]: (state, action) => ({
    ...state,
    seeking: action.payload,
  }),
}, initialState);
