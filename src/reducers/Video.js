import { createAction, handleActions } from "redux-actions";

export const videoInit = createAction("VIDEO_INIT", player => player);
export const videoState = createAction("VIDEO_STATE", state => state);
export const videoProgress = createAction("VIDEO_PROGRESS", progress => progress);
export const videoDuration = createAction("VIDEO_DURATION", duration => duration);
export const videoMuted = createAction("VIDEO_MUTED", muted => muted);
export const videoVolume = createAction("VIDEO_VOLUME", volume => volume);
export const videoLoaded = createAction("VIDEO_LOADED", id => id);
export const videoPopupToggle = createAction("VIDEO_POPUP");

function withPlayer(fn) {
  return (dispatch, getState) => {
    const { Video: { player } } = getState();

    return fn(player, dispatch, getState);
  };
}

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
    player.playVideo();
  }
});

export const videoLoad = (id, playPause = false) => withPlayer((player, dispatch, getState) => {
  // If the video is already playing
  if (playPause && getState().Video.id === id &&
    (getState().Video.state === "play" || getState().Video.state === "pause")) {
    return dispatch(videoPlayPause());
  }

  player.loadVideoById(id);
  // TODO: Temporary for my ears sake.
  dispatch(videoVolumeSet(20));
  dispatch(videoLoaded(id));
  player.setPlaybackQuality("hd720"); // Only way to force a higher quality than the video iframe allows
});

export const videoPlay = () => withPlayer(player => player.playVideo());
export const videoPause = () => withPlayer(player => player.pauseVideo());

export const videoProgressTick = () => withPlayer((player, dispatch, getState) => {
  if (getState().Video.state === "play") {
    dispatch(videoProgress(player.getCurrentTime()));
  }
});

export const videoStatePlay = () => withPlayer((player, dispatch, getState) => {
  // Hooking into the play state seems to be the easiest way to determine the video duration
  const duration = player.getDuration();

  if (getState().Video.duration !== duration) {
    dispatch(videoDuration(duration));
  }

  dispatch(videoState("play"));
});

export const videoStatePause = () => videoState("pause");
export const videoStateEnd = () => videoState("end");
export const videoStateError = () => videoState("error");

export const videoSeekTo = factor => withPlayer((player, dispatch, getState) => {
  const seconds = getState().Video.duration * factor;

  player.seekTo(seconds);
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
  [videoLoaded]: (state, action) => ({
    ...state,
    id: action.payload,
  }),
  [videoPopupToggle]: (state, action) => ({
    ...state,
    popup: !state.popup,
  }),
}, {
  id: null,
  state: null,
  progress: 0,
  duration: 0,
  muted: false,
  volume: 100,
  popup: false,
});
