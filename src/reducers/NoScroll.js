import { handleActions, createAction } from "redux-actions";

export const noScrollSetCallback = createAction("NOSCROLL", (callback) => callback);
export const noScrollDispatch = () => (dispatch, getState) => {
  getState().NoScroll.callback();
  dispatch(noScrollSetCallback());
};

export default handleActions({
  [noScrollSetCallback]: (state, action) => {
    if (action.payload) {
      return {
        enabled: true,
        callback: action.payload,
      }
    }

    return {
      enabled: false,
      callback: function() {},
    }
  }
}, {
  enabled: false,
  callback: function() {},
});
