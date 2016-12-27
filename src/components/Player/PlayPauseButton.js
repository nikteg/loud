import React from "react";
import { connect } from "react-redux";

import { Actions as VideoActions } from "../../reducers/Video";

const PlayPauseButton = connect(state => ({
  isPlaying: state.Video.state === "play",
}), { playPause: VideoActions.playPause })(props => (
  <button onClick={props.playPause} className="Controls-buttons-button PlayPauseButton">
    <svg viewBox="0 0 16 16">
      {props.isPlaying ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" /> : <path d="M4.5 2l10 6-10 6z" />}
    </svg>
  </button>
));

export default PlayPauseButton;
