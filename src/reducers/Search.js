import { createAction, handleActions } from "redux-actions";

import { search } from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const searchActions = createNetworkAction("SEARCH");

export const searchQuery = () => (dispatch, getState) => {
  dispatch(searchActions.start());
  search(getState().Auth.token)
    .then(tracks => dispatch(searchActions.complete(tracks)));
};

export default handleActions({
  [searchActions.complete]: (state, action) => ({
    ...state,
    tracks: action.payload,
  }),
}, {
  tracks: [],
});
