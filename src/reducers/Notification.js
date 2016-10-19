import { createAction, handleActions } from "redux-actions";

export const notificationNew = createAction("NOTIFICATION_NEW", message => message);
export const notificationDismiss = createAction("NOTIFICATION_DISMISS");

export const notificationShow = (message) => (dispatch, getState) => {
  dispatch(notificationNew(message));

  setTimeout(() => dispatch(notificationDismiss()), 5000); // Dismiss error after 5 seconds
};

export default handleActions({
  [notificationNew]: (state, action) => ({
    messages: [...state.messages, action.payload],
  }),
  [notificationDismiss]: (state, action) => ({
    messages: state.messages.slice(1),
  }),
}, {
  messages: [],
});
