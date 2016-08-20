import { createAction, handleActions } from "redux-actions";

import { getUser } from "../lib/api";
import { createNetworkAction } from "../lib/utils";

export const userLoadActions = createNetworkAction("USER_LOAD");

export const userLoad = (username) => (dispatch, getState) => {
  dispatch(userLoadActions.start());
  getUser(getState().Auth.token, username)
    .then(user => dispatch(userLoadActions.complete(user)))
    .catch(err => dispatch(userLoadActions.error(err.message)));
};

export default handleActions({
  [userLoadActions.start]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [userLoadActions.error]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [userLoadActions.complete]: (state, action) => ({
    ...state,
    user: action.payload,
    loading: false,
    error: null,
  }),
}, {
  user: null,
  loading: false,
  error: null,
});
