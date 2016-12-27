import { createAction, handleActions } from "redux-actions";

import { Actions as AuthActions } from "./Auth";
import { Actions as SearchActions } from "./Search";

// Helper function
function withPlayer(fn) {
  return (dispatch, getState) => {
    const { Video: { player } } = getState();

    return fn(player, dispatch, getState);
  };
}

let seekTimeout;

export const Actions = {
  init: createAction("VIDEO_INIT", player => player),
  state: createAction("VIDEO_STATE", state => state),
  progress: createAction("VIDEO_PROGRESS", progress => progress),
  duration: createAction("VIDEO_DURATION", duration => duration),
  muted: createAction("VIDEO_MUTED", muted => muted),
  volume: createAction("VIDEO_VOLUME", volume => volume),
  popup: createAction("VIDEO_POPUP", show => show),
  error: createAction("VIDEO_ERROR", code => code),
  seeking: createAction("VIDEO_SEEKING", seeking => seeking),
  tracksIndex: createAction("VIDEO_TRACKS_INDEX", index => index),
  playlist: createAction("VIDEO_PLAYLIST", (playlist, index) => ({ playlist, index })),
  seekingStart() {
    return Actions.seeking(true);
  },
  popupToggle() {
    return (dispatch, getState) => dispatch(Actions.popup(!getState().Video.popup));
  },
  volumeSet(percent) {
    return withPlayer((player, dispatch, getState) => {
      const muted = getState().Video.player.isMuted();
      const percentFixed = Math.min(100, Math.max(0, percent));

      player.setVolume(percentFixed);
      dispatch(Actions.volume(percentFixed));

      if (muted) {
        player.unMute();
        dispatch(Actions.muted(false));
      }
    });
  },
  playPause() {
    return withPlayer((player, dispatch, getState) => {
      if (getState().Video.state === "play") {
        player.pauseVideo();
      }

      if (getState().Video.state === "pause" || getState().Video.state === "end") {
        player.playVideo();
      }
    });
  },
  playPlaylist(playlist, index = 0) {
    return withPlayer((player, dispatch, getState) => {
      if (getState().Video.playlistId === playlist.id &&
        getState().Video.tracksIndex === index) {
        return dispatch(Actions.playPause());
      }

      player.loadVideoById(playlist.tracks[index].key);
      dispatch(Actions.playlist(playlist, index));
    });
  },
  listNext() {
    return withPlayer((player, dispatch, getState) => {
      const index = getState().Video.tracksIndex;
      const tracks = getState().Video.tracks;

      if (index < tracks.length - 1) {
        player.loadVideoById(tracks[(index + 1)].key);
        dispatch(Actions.tracksIndex(index + 1));
        dispatch(Actions.progress(0));
      }
    });
  },
  listPrev() {
    return withPlayer((player, dispatch, getState) => {
      const index = getState().Video.tracksIndex;
      const tracks = getState().Video.tracks;

      if (index === 0) {
        dispatch(Actions.seekTo(0));

        return;
      }

      if (index > 0) {
        player.loadVideoById(tracks[(index - 1)].key);
        dispatch(Actions.tracksIndex(index - 1));
      }
    });
  },
  play() {
    return withPlayer(player => player.playVideo());
  },
  pause() {
    return withPlayer(player => player.pauseVideo());
  },
  progressTick() {
    return withPlayer((player, dispatch, getState) => {
      if (!getState().Video.seeking && getState().Video.state === "play") {
        dispatch(Actions.progress(player.getCurrentTime()));
      }
    });
  },
  statePlay() {
    return withPlayer((player, dispatch, getState) => {
      dispatch(Actions.state("play"));

      // Hooking into the play state seems to be the easiest way to determine the video duration
      const duration = player.getDuration();

      if (getState().Video.duration !== duration) {
        dispatch(Actions.duration(duration));
      }
    });
  },
  statePause() {
    return Actions.state("pause");
  },
  stateEnd() {
    return withPlayer((player, dispatch, getState) => {
      dispatch(Actions.state("end"));

      // Go to next video
      if (getState().Video.tracksIndex < getState().Video.tracks.length - 1) {
        dispatch(Actions.listNext());
      }
    });
  },
  stateError(code) {
    return withPlayer((player, dispatch, getState) => {
      dispatch(Actions.error(code));

      // Go to next video
      if (getState().Video.tracksIndex < getState().Video.tracks.length - 1) {
        dispatch(Actions.listNext());
      }
    });
  },
  seekTo(seconds) {
    return withPlayer((player, dispatch, getState) => {
      player.seekTo(seconds);
      dispatch(Actions.progress(seconds));
      dispatch(Actions.seeking(false));
    });
  },
  seekRelative(seconds) {
    return withPlayer((player, dispatch, getState) => {
      const progress = Math.min(getState().Video.duration, Math.max(0, getState().Video.progress + seconds));

      player.seekTo(progress);
      dispatch(Actions.progress(progress));
      dispatch(Actions.seeking(true));
      clearTimeout(seekTimeout);
      seekTimeout = setTimeout(() => dispatch(Actions.seeking(false)), 200);
    });
  },
  muteToggle() {
    return withPlayer((player, dispatch, getState) => {
      const muted = getState().Video.player.isMuted();

      if (muted) {
        player.unMute();
      } else {
        player.mute();
      }

      dispatch(Actions.muted(!muted));
    });
  },
};

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
  [AuthActions.logoutActions.complete]: (state, action) => initialState, // Reset to inital state on logout
  [Actions.init]: (state, action) => ({
    ...state,
    player: action.payload,
    state: "init",
  }),
  [Actions.tracksIndex]: (state, action) => ({
    ...state,
    tracksIndex: action.payload,
  }),
  [Actions.playlist]: (state, action) => ({
    ...state,
    tracksIndex: action.payload.index,
    tracks: action.payload.playlist.tracks,
    playlistId: action.payload.playlist.id,
  }),
  [SearchActions.searchActions.complete]: (state, action) => ({
    ...state,
    playlistId: null,
  }),
  [Actions.duration]: (state, action) => ({
    ...state,
    duration: action.payload,
  }),
  [Actions.state]: (state, action) => ({
    ...state,
    state: action.payload,
  }),
  [Actions.progress]: (state, action) => ({
    ...state,
    progress: action.payload,
  }),
  [Actions.muted]: (state, action) => ({
    ...state,
    muted: action.payload,
  }),
  [Actions.volume]: (state, action) => ({
    ...state,
    volume: action.payload,
  }),
  [Actions.popup]: (state, action) => ({
    ...state,
    popup: action.payload,
  }),
  [Actions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    state: "error",
  }),
  [Actions.seeking]: (state, action) => ({
    ...state,
    seeking: action.payload,
  }),
}, initialState);
