import React from "react";
import { connect } from "react-redux";
import { videoPlayPause } from "../../reducers/Video";
import Player from "../Player/Player";

require("./Footer.styl");

const PlayPause = connect((state, ownProps) => ({
  label: state.Video.state === "play" ? "Pause" : "Play",
}), { videoPlayPause })(props => (
  <button onClick={props.videoPlayPause}>{props.label}</button>
));

const Footer = (props) => (
  <div className="Footer">
    <Player />
    <PlayPause />
  </div>
);

export default Footer;
