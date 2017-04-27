import { handleActions } from "redux-actions";

import * as Api from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const Actions = {
  trackActions: createNetworkAction("TRACK"),
  load(query) {
    return (dispatch, getState) => {
      dispatch(Actions.trackActions.start(query));
      Api.getTrack(getState().Auth.token, query)
        .then((track) => dispatch(Actions.trackActions.complete(track)))
        .catch((err) => dispatch(Actions.trackActions.error(err.message)));
    };
  },
};

export default handleActions({
  [Actions.trackActions.start.toString()]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [Actions.trackActions.error.toString()]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [Actions.trackActions.complete.toString()]: (state, action) => ({
    ...state,
    track: action.payload,
    error: null,
    loading: false,
  }),
}, {
  track: null,
  loading: false,
  error: null,
});
