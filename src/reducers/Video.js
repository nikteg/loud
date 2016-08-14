import { createAction, handleActions } from "redux-actions";
import crosstab from "crosstab";

import { playlistSelect, playlistSelectCustom } from "./Playlist";
import { authLogoutActions } from "./Auth";

export const videoInit = createAction("VIDEO_INIT", player => player);
export const videoState = createAction("VIDEO_STATE", state => state);
export const videoProgress = createAction("VIDEO_PROGRESS", progress => progress);
export const videoDuration = createAction("VIDEO_DURATION", duration => duration);
export const videoMuted = createAction("VIDEO_MUTED", muted => muted);
export const videoVolume = createAction("VIDEO_VOLUME", volume => volume);
export const videoListLoaded = createAction("VIDEO_LIST_LOADED", ids => ids);
export const videoListIndex = createAction("VIDEO_LIST_INDEX", index => index);
export const videoPopup = createAction("VIDEO_POPUP", show => show);
export const videoError = createAction("VIDEO_ERROR", code => code);
export const videoSeeking = createAction("VIDEO_SEEKING", seeking => seeking);

export const videoSeekingStart = () => videoSeeking(true);

function withPlayer(fn) {
  return (dispatch, getState) => {
    const { Video: { player } } = getState();

    return fn(player, dispatch, getState);
  };
}

export const videoPopupToggle = () => (dispatch, getState) => dispatch(videoPopup(!getState().Video.popup));

export const videoVolumeSet = percent => withPlayer((player, dispatch, getState) => {
  const muted = getState().Video.player.isMuted();
  const percentFixed = Math.min(100, Math.max(0, percent));

  player.setVolume(percentFixed);
  dispatch(videoVolume(percentFixed));

  if (muted) {
    player.unMute();
    dispatch(videoMuted(false));
  }
});

export const videoPlayPause = () => withPlayer((player, dispatch, getState) => {
  const state = getState();

  if (state.Video.state === "play") {
    player.pauseVideo();
  }

  if (state.Video.state === "pause" || state.Video.state === "end") {
    crosstab.broadcast("PAUSE");
    console.log("Sent pause event");
    player.playVideo();
  }
});

export const videoLoad = (id) => withPlayer((player, dispatch, getState) => {
  player.loadVideoById(id);
  dispatch(videoVolumeSet(20)); // TODO: Temporary for my ears sake.
  // player.setPlaybackQuality("hd720"); // Only way to force a higher quality than the video iframe allows
});

export const videoListLoad = (playlistId, index = 0) => withPlayer((player, dispatch, getState) => {
  crosstab.broadcast("PAUSE");
  console.log("Sent pause event");

  if (getState().Playlist.playlistId === playlistId) {
    if (getState().Video.playlistIndex === index) {
      return dispatch(videoPlayPause());
    }

    return player.playVideoAt(index);
  }

  const playlist = getState().Playlist.playlists.find(list => list.id === playlistId);
  const ids = playlist.tracks.map(track => track.key);

  player.loadPlaylist(ids, index);
  dispatch(playlistSelect(playlistId));
  dispatch(videoListIndex(index));

  dispatch(videoVolumeSet(20)); // TODO: Temporary for my ears sake.
  // player.setPlaybackQuality("hd720"); // Only way to force a higher quality than the video iframe allows
});

export const videoQueueLoad = (tracks, index = 0) => withPlayer((player, dispatch, getState) => {
  crosstab.broadcast("PAUSE");
  console.log("Sent pause event");

  if (getState().Playlist.playlistId === -1) {
    if (getState().Video.playlistIndex === index) {
      return dispatch(videoPlayPause());
    } else if (getState().Video.playlistIndex !== -1) {
      console.log("playvideo at")
      return player.playVideoAt(index);
    }
  }

  const ids = tracks.map(track => track.key);

  player.loadPlaylist(ids, index);
  dispatch(playlistSelectCustom(tracks));
  dispatch(videoListIndex(index));

  dispatch(videoVolumeSet(20)); // TODO: Temporary for my ears sake.
  // player.setPlaybackQuality("hd720"); // Only way to force a higher quality than the video iframe allows
});

export const videoListNext = () => withPlayer(player => player.nextVideo());
export const videoListPrev = () => withPlayer(player => player.previousVideo());

export const videoPlay = () => withPlayer(player => player.playVideo());
export const videoPause = () => withPlayer(player => player.pauseVideo());

export const videoProgressTick = () => withPlayer((player, dispatch, getState) => {
  if (!getState().Video.seeking && getState().Video.state === "play") {
    dispatch(videoProgress(player.getCurrentTime()));
  }
});

export const videoStatePlay = () => withPlayer((player, dispatch, getState) => {
  // Hooking into the play state seems to be the easiest way to determine the video duration
  const duration = player.getDuration();
  const playlistIndex = player.getPlaylistIndex();

  if (getState().Video.duration !== duration) {
    dispatch(videoDuration(duration));
  }

  if (getState().Video.playlistIndex !== playlistIndex) {
    dispatch(videoListIndex(playlistIndex));
  }

  dispatch(videoState("play"));
});

export const videoStatePause = () => videoState("pause");
export const videoStateEnd = () => videoState("end");
export const videoStateError = code => (dispatch, getState) => {
  dispatch(videoError(code));

  // Go to next video
  if (getState().Video.playlistIndex < getState().Playlist.playlist.length - 1) {
    dispatch(videoListNext());
  }
};

export const videoSeekTo = seconds => withPlayer((player, dispatch, getState) => {
  player.seekTo(seconds);
  dispatch(videoProgress(seconds));
  dispatch(videoSeeking(false));
});

export const videoSeekRelative = seconds => withPlayer((player, dispatch, getState) => {
  const progress = Math.min(getState().Video.duration, Math.max(0, getState().Video.progress + seconds));

  player.seekTo(progress);
  dispatch(videoProgress(progress));
});

export const videoMuteToggle = () => withPlayer((player, dispatch, getState) => {
  const muted = getState().Video.player.isMuted();

  if (muted) {
    player.unMute();
  } else {
    player.mute();
  }

  dispatch(videoMuted(!muted));
});

const initialState = {
  playlistIndex: -1,
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
  [videoInit]: (state, action) => ({
    ...state,
    player: action.payload,
    state: "init",
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
  [videoListIndex]: (state, action) => ({
    ...state,
    playlistIndex: action.payload,
  }),
  [videoPopup]: (state, action) => ({
    ...state,
    popup: action.payload,
  }),
  [videoError]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [videoSeeking]: (state, action) => ({
    ...state,
    seeking: action.payload,
  }),
  [videoLoad]: (state, action) => ({
    ...state,
    playlistIndex: -1,
  }),
  [authLogoutActions.complete]: (state, action) => initialState,
}, initialState);
