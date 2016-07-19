import { createAction, handleActions } from "redux-actions";

export const videoInit = createAction("VIDEO_INIT", player => player);
export const videoState = createAction("VIDEO_STATE", state => state);

export const videoLoad = id => (dispatch, getState) => {
  const { Video: { player } } = getState();

  player.loadVideoById(id);
};

export const videoPlay = () => (dispatch, getState) => {
  const { Video: { player } } = getState();

  player.playVideo();
};

export const videoPause = () => (dispatch, getState) => {
  const { Video: { player } } = getState();

  player.pauseVideo();
};

export const videoPlayPause = () => (dispatch, getState) => {
  const { Video: { player, state } } = getState();

  if (state === "play") {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};

export default handleActions({
  [videoInit]: (state, action) => ({
    player: action.payload,
    state: "init",
  }),
  [videoState]: (state, action) => ({
    ...state,
    state: action.payload,
  }),
}, {
  id: null,
  state: null,
});
