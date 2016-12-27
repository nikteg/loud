import { handleActions } from "redux-actions";

import * as Api from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const Actions = {
  browse: createNetworkAction("BROWSE"),
  load() {
    return (dispatch, getState) => {
      if (getState().Browse.tracks.length > 0) {
        return;
      }

    dispatch(Actions.browse.start());
    Api.getTracks(getState().Auth.token)
      .then(tracks => dispatch(Actions.browse.complete(tracks)))
      .catch(err => dispatch(Actions.browse.error(err.message)));
    };
  },
};

export default handleActions({
  [Actions.browse.start]: (state, action) => ({
    ...state,
    error: null,
    loading: true,
  }),
  [Actions.browse.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [Actions.browse.complete]: (state, action) => ({
    ...state,
    tracks: action.payload,
    error: null,
    loading: false,
  }),
}, {
  loading: false,
  error: null,
  tracks: [],
});
