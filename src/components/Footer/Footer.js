import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { videoPlayPause, videoSeekTo, videoMuteToggle, videoVolumeSet } from "../../reducers/Video";
import { formatTime } from "../../util";

import Player from "../Player/Player";

require("./Footer.styl");

const PlayPauseButton = connect((state, ownProps) => ({
  path: state.Video.state === "play" ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z"></path> : <path d="M4.5 2l10 6-10 6z"></path>,
}), { videoPlayPause })(props => (
  <button onClick={props.videoPlayPause} className="Controls-buttons-button PlayPauseButton">
    <svg viewBox="0 0 16 16">
      {props.path}
    </svg>
  </button>
));

const PrevButton = (props) => (
  <button onClick={props.onClick} className="Controls-buttons-button">
    <svg viewBox="0 0 16 16">
      <path d="M4 14v-12h2v5.5l5-5v11l-5-5v5.5z" />
    </svg>
  </button>
);

const NextButton = (props) => (
  <button onClick={props.onClick} className="Controls-buttons-button">
    <svg viewBox="0 0 16 16">
      <path d="M12 2v12h-2v-5.5l-5 5v-11l5 5v-5.5z" />
    </svg>
  </button>
);

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

const ProgressBarConnected = connect((state, ownProps) => ({
  percent: state.Video.duration > 0 ? state.Video.progress / state.Video.duration * 100 : 0,
}), { videoSeekTo })(ProgressBar);

const Progress = connect((state, ownProps) => ({
  progress: formatTime(state.Video.progress),
}))(props => (
  <div className="Controls-info-progress-time">{props.progress}</div>
));

const Duration = connect((state, ownProps) => ({
  duration: formatTime(state.Video.duration),
}))(props => (
  <div className="Controls-info-progress-time">{props.duration}</div>
));

class Volume extends React.Component {

  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.setVolume = this.setVolume.bind(this);

    this.volumeSlider = null;
  }

  onMouseEnter() {

  }

  setVolume(e) {
    const node = ReactDOM.findDOMNode(this.volumeSlider);

    const { top } = node.getBoundingClientRect();

    const height = node.offsetHeight;
    const y = height - (e.pageY - top);

    const factor = y / height;
    this.props.videoVolumeSet(factor * 100);
  }

  render() {
    return (
      <div className="Volume">
        <div className="Volume-popup">
          <div className="Volume-popup-slider" onClick={this.setVolume} ref={node => this.volumeSlider = node}>
            <div className="Volume-popup-slider-fill" style={{ height: `${this.props.percent}%`}} />
          </div>
        </div>
        <button onClick={this.props.videoMuteToggle} className="Controls-buttons-button" onMouseEnter={this.onMouseEnter}>
          {this.props.icon}
        </button>
      </div>
    );
  }

}

const VolumeConnected = connect((state, ownProps) => {
  const iconHigh = (
    <svg viewBox="0 0 17 16">
      <path d="M13.907 14.407c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 1.369-1.369 2.123-3.19 2.123-5.127s-0.754-3.757-2.123-5.127c-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.653 1.653 2.563 3.85 2.563 6.187s-0.91 4.534-2.563 6.187c-0.146 0.146-0.338 0.22-0.53 0.22zM11.243 12.993c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 2.047-2.047 2.047-5.378 0-7.425-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773c-0.146 0.146-0.338 0.22-0.53 0.22v0zM8.578 11.578c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 1.267-1.267 1.267-3.329 0-4.596-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.852 1.852 1.852 4.865 0 6.718-0.146 0.146-0.338 0.22-0.53 0.22z" />
      <path d="M6.5 15c-0.13 0-0.258-0.051-0.354-0.146l-3.854-3.854h-1.793c-0.276 0-0.5-0.224-0.5-0.5v-5c0-0.276 0.224-0.5 0.5-0.5h1.793l3.854-3.854c0.143-0.143 0.358-0.186 0.545-0.108s0.309 0.26 0.309 0.462v13c0 0.202-0.122 0.385-0.309 0.462-0.062 0.026-0.127 0.038-0.191 0.038z" />
    </svg>
  );

  const iconMedium = (
    <svg viewBox="0 0 17 16">
      <path d="M11.243 12.993c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 2.047-2.047 2.047-5.378 0-7.425-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773c-0.146 0.146-0.338 0.22-0.53 0.22v0zM8.578 11.578c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 1.267-1.267 1.267-3.329 0-4.596-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.852 1.852 1.852 4.865 0 6.718-0.146 0.146-0.338 0.22-0.53 0.22z" />
      <path d="M6.5 15c-0.13 0-0.258-0.051-0.354-0.146l-3.854-3.854h-1.793c-0.276 0-0.5-0.224-0.5-0.5v-5c0-0.276 0.224-0.5 0.5-0.5h1.793l3.854-3.854c0.143-0.143 0.358-0.186 0.545-0.108s0.309 0.26 0.309 0.462v13c0 0.202-0.122 0.385-0.309 0.462-0.062 0.026-0.127 0.038-0.191 0.038z" />
    </svg>
  );

  const iconLow = (
    <svg viewBox="0 0 17 16">
      <path d="M8.578 11.578c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 1.267-1.267 1.267-3.329 0-4.596-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.852 1.852 1.852 4.865 0 6.718-0.146 0.146-0.338 0.22-0.53 0.22z" />
      <path d="M6.5 15c-0.13 0-0.258-0.051-0.354-0.146l-3.854-3.854h-1.793c-0.276 0-0.5-0.224-0.5-0.5v-5c0-0.276 0.224-0.5 0.5-0.5h1.793l3.854-3.854c0.143-0.143 0.358-0.186 0.545-0.108s0.309 0.26 0.309 0.462v13c0 0.202-0.122 0.385-0.309 0.462-0.062 0.026-0.127 0.038-0.191 0.038z" />
    </svg>
  );

  const iconMute = (
    <svg viewBox="0 0 17 16">
      <path d="M15 9.674v1.326h-1.326l-1.674-1.674-1.674 1.674h-1.326v-1.326l1.674-1.674-1.674-1.674v-1.326h1.326l1.674 1.674 1.674-1.674h1.326v1.326l-1.674 1.674 1.674 1.674z" />
      <path d="M6.5 15c-0.13 0-0.258-0.051-0.354-0.146l-3.854-3.854h-1.793c-0.276 0-0.5-0.224-0.5-0.5v-5c0-0.276 0.224-0.5 0.5-0.5h1.793l3.854-3.854c0.143-0.143 0.358-0.186 0.545-0.108s0.309 0.26 0.309 0.462v13c0 0.202-0.122 0.385-0.309 0.462-0.062 0.026-0.127 0.038-0.191 0.038z" />
    </svg>
  );

  let icon = iconLow;

  if (state.Video.volume > 75) {
    icon = iconHigh;
  } else if (state.Video.volume > 25) {
    icon = iconMedium;
  }

  if (state.Video.muted) {
    icon = iconMute;
  }

  const percent = state.Video.muted ? 0 : state.Video.volume;

  return {
    icon,
    percent,
  };
}, { videoMuteToggle, videoVolumeSet })(Volume);

const Footer = (props) => (
  <div className="Footer">
    <Player />
    <div className="Controls">
      <div className="Controls-buttons">
        <PrevButton />
        <PlayPauseButton />
        <NextButton />
      </div>
      <div className="Controls-info">
        <div className="Controls-info-progress">
          <Progress />
          <ProgressBarConnected />
          <Duration />
        </div>
      </div>
      <div className="Controls-buttons">
        <VolumeConnected />
      </div>
    </div>
  </div>
);

export default Footer;
