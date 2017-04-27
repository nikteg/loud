import { handleActions } from "redux-actions"

import * as Api from "../lib/api"
import { createNetworkAction } from "../lib/utils"

export const Actions = {
  loadActions: createNetworkAction("USER_LOAD"),
  load(username) {
    return (dispatch, getState) => {
      dispatch(Actions.loadActions.start())
      Api.getUser(getState().Auth.token, username)
        .then((user) => dispatch(Actions.loadActions.complete(user)))
        .catch((err) => dispatch(Actions.loadActions.error(err.message)))
    }
  },
}

export default handleActions({
  [Actions.loadActions.start.toString()]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [Actions.loadActions.error.toString()]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [Actions.loadActions.complete.toString()]: (state, action) => ({
    ...state,
    user: action.payload,
    loading: false,
    error: null,
  }),
}, {
  user: null,
  loading: false,
  error: null,
})
