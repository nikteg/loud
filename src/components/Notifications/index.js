import React from "react";
import { connect } from "react-redux";

import { notificationDismiss } from "../../reducers/Notification";

import "./style.styl";

const Notifications = connect(state => ({
  message: state.Notification.messages[0],
}), { notificationDismiss })(props => (
  props.message !== undefined && <div className="Notifications">
    {props.message}
  </div>
));

export default Notifications;
