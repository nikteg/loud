import React from "react";
import { connect } from "react-redux";

import { videoListNext } from "../../reducers/Video";

const NextButton = connect(state => ({
  active: state.Video.popup,
}), { videoListNext })(props => (
  <button className="Controls-buttons-button" onClick={props.videoListNext}>
    <svg viewBox="0 0 16 16">
      <path d="M12 2v12h-2v-5.5l-5 5v-11l5 5v-5.5z" />
    </svg>
  </button>
));

export default NextButton;
