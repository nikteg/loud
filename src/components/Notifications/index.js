import React from "react";
import { connect } from "react-redux";

import "./style.styl";

const Notifications = connect(state => ({
  message: state.Notification.messages[0] || null,
}))(props => (
  props.message && <div className="Notifications">
    {props.message}
  </div>
));

export default Notifications;
