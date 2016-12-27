import { createAction, handleActions } from "redux-actions";

export const Actions = {
  new: createAction("NOTIFICATION_NEW", message => message),
  dismiss: createAction("NOTIFICATION_DISMISS"),
  show(message) {
    return (dispatch, getState) => {
      dispatch(Actions.new(message));

      setTimeout(() => dispatch(Actions.dismiss()), 5000); // Dismiss error after 5 seconds
    };
  }
};

export default handleActions({
  [Actions.new]: (state, action) => ({
    messages: [...state.messages, action.payload],
  }),
  [Actions.dismiss]: (state, action) => ({
    messages: state.messages.slice(1),
  }),
}, {
  messages: [],
});
