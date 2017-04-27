import { handleActions } from "redux-actions"

import * as Api from "../lib/api"
import { createNetworkAction } from "../lib/utils"

export const Actions = {
  searchActions: createNetworkAction("SEARCH"),
  search(query) {
    return (dispatch, getState) => {
      dispatch(Actions.searchActions.start(query))
      Api.search(getState().Auth.token, query)
        .then((tracks) => dispatch(Actions.searchActions.complete(tracks)))
        .catch((err) => dispatch(Actions.searchActions.error(err.message)))
    }
  },
}

export default handleActions({
  [Actions.searchActions.start.toString()]: (state, action) => ({
    ...state,
    query: action.payload,
    loading: true,
  }),
  [Actions.searchActions.error.toString()]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [Actions.searchActions.complete.toString()]: (state, action) => ({
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
})
