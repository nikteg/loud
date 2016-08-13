import React from "react";
import { connect } from "react-redux";
import Slider from "rc-slider";

import { formatTime } from "../../lib/utils";

import { videoSeekTo, videoProgress, videoSeekingStart } from "../../reducers/Video";

export const CurrentTime = connect(state => ({
  progress: ["init", null].includes(state.Video.state) ? "---:---" : formatTime(state.Video.progress),
}))(props => (
  <div className="Controls-info-progress-time left">{props.progress}</div>
));

export const Duration = connect(state => ({
  duration: ["init", null].includes(state.Video.state) ? "---:---" : formatTime(state.Video.duration),
}))(props => (
  <div className="Controls-info-progress-time right">{props.duration}</div>
));

export default connect(state => ({
  min: 0,
  max: state.Video.duration,
  value: state.Video.progress,
  className: "Controls-info-progress-bar",
  tipFormatter: null,
}), {
  onAfterChange: videoSeekTo,
  onChange: videoProgress,
  onBeforeChange: videoSeekingStart,
})(Slider);
