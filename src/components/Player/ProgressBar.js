import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { formatTime } from "../../util";

import { videoSeekTo } from "../../reducers/Video";

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
    const x = e.pageX - node.offsetLeft;
    const width = node.offsetWidth;

    const factor = x / width;

    this.props.videoSeekTo(factor);
  }

  render() {
    return (
      <div className="Controls-info-progress-bar" onClick={this.seek}>
        <div className="Controls-info-progress-bar-fill" style={{ width: `${this.props.percent}%` }} />
      </div>
    );
  }

}

export default connect(state => ({
  percent: state.Video.duration > 0 ? Math.min(100, Math.max(0, state.Video.progress / state.Video.duration * 100)) : 0,
}), { videoSeekTo })(ProgressBar);
