import React from "react";
import { connect } from "react-redux";

import { videoError } from "../../reducers/Video";

import "./index.styl";

const NextButton = connect(state => ({
  error: state.Video.error,
}), { videoError })(props => (
  props.error && <div className="Notifications">
    Something went wrong. Try another song. Error code: {props.error}
  </div> || null
));

export default NextButton;
