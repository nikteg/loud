import { createAction, handleActions } from "redux-actions";

export const videoInit = createAction("VIDEO_INIT", player => player);
export const videoState = createAction("VIDEO_STATE", state => state);
export const videoProgress = createAction("VIDEO_PROGRESS", progress => progress);

function withPlayer(fn) {
  return (dispatch, getState) => {
    const { Video: { player } } = getState();

    return fn(player, dispatch, getState);
  };
}

export const videoLoad = id => withPlayer(player => player.loadVideoById(id));
export const videoPlay = () => withPlayer(player => player.playVideo());
export const videoPause = () => withPlayer(player => player.pauseVideo());

export const videoPlayPause = () => withPlayer((player, dispatch, getState) => {
  const state = getState();

  if (state.Video.state === "play") {
    player.pauseVideo();
  }

  if (state.Video.state === "pause") {
    player.playVideo();
  }
});

export const videoProgressTick = () => withPlayer((player, dispatch, getState) => {
  if (getState().Video.state === "play") {
    dispatch(videoProgress(player.getCurrentTime()));
  }
});

export default handleActions({
  [videoInit]: (state, action) => ({
    player: action.payload,
    state: "init",
    progress: 0,
  }),
  [videoState]: (state, action) => ({
    ...state,
    state: action.payload,
  }),
  [videoProgress]: (state, action) => ({
    ...state,
    progress: action.payload,
  }),
}, {
  id: null,
  state: null,
  progress: 0,
});
