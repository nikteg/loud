import { createAction, handleActions } from "redux-actions";

import { search } from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const searchActions = createNetworkAction("SEARCH");

export const searchQuery = (query) => (dispatch, getState) => {
  dispatch(searchActions.start(query));
  search(getState().Auth.token, query)
    .then(tracks => dispatch(searchActions.complete(tracks)))
    .catch(err => dispatch(searchActions.error(err.message)));
};

export default handleActions({
  [searchActions.start]: (state, action) => ({
    ...state,
    query: action.payload,
    loading: true,
  }),
  [searchActions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [searchActions.complete]: (state, action) => ({
    ...state,
    tracks: action.payload,
    error: null,
    loading: false,
  }),
}, {
  query: "",
  loading: false,
  error: null,
  tracks: [],
});
