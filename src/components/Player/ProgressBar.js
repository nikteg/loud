import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Slider from "rc-slider";

import { formatTime } from "../../util";

import { videoSeekTo, videoProgress, videoSeekingStart } from "../../reducers/Video";

import "rc-slider/assets/index.css";

export const CurrentTime = connect(state => ({
  progress: formatTime(state.Video.progress),
}))(props => (
  <div className="Controls-info-progress-time">{props.progress}</div>
));

export const Duration = connect(state => ({
  duration: formatTime(state.Video.duration),
}))(props => (
  <div className="Controls-info-progress-time">{props.duration}</div>
));

class ProgressBar extends React.Component {

  constructor(props) {
    super(props);

    this.seek = this.seek.bind(this);
  }

  seek(e) {
    const node = ReactDOM.findDOMNode(this);

    const { left } = node.getBoundingClientRect();

    const x = e.pageX - left;
    const width = node.offsetWidth;

    const factor = x / width;

    this.props.videoSeekTo(factor);
  }

  render() {
    return (
      <Slider
        onClick={() => console.log("yolo")}
        className="Controls-info-progress-bar"
        tipFormatter={formatTime}
        onBeforeChange={this.props.videoSeekingStart}
        onChange={this.props.videoProgress}
        onAfterChange={this.props.videoSeekTo}
        {...this.props}
      />
    );
  }

}

export default connect(state => ({
  min: 0,
  max: state.Video.duration,
  value: state.Video.progress,
}), { videoSeekTo, videoProgress, videoSeekingStart })(ProgressBar);
