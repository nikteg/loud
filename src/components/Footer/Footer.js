import React from "react";
import { connect } from "react-redux";
import { videoPlayPause, videoProgressTick } from "../../reducers/Video";
import Player from "../Player/Player";

require("./Footer.styl");

const Button = (props) => (
  <button onClick={props.onClick} className="Button">
    <svg viewBox="0 0 16 16">
      {props.path}
    </svg>
  </button>
);

const PlayPauseButton = connect((state, ownProps) => ({
  path: state.Video.state === "play" ? <path d="M2 2h5v12h-5zM9 2h5v12h-5z"></path> : <path d="M3 2l10 6-10 6z"></path>,
}), { videoPlayPause })(props => (
  <Button onClick={props.videoPlayPause} path={props.path} />
));

const Time = connect((state, ownProps) => ({
  progress: Math.floor(state.Video.progress),
}), { videoPlayPause })(props => (
  <span>{props.progress}</span>
));

const Footer = (props) => (
  <div className="Footer">
    <Player />
    <div className="Controls">
      <div className="Controls-buttons">
        <Button path={<path d="M4 14v-12h2v5.5l5-5v11l-5-5v5.5z"></path>} />
        <PlayPauseButton />
        <Button path={<path d="M12 2v12h-2v-5.5l-5 5v-11l5 5v-5.5z"></path>} />
      </div>
      <div className="Controls-info">
        <div className="Controls-info-title">Cool super title</div>
        <Time />
        <div className="Controls-info-progress">
          <div className="Controls-info-progress-bar" style={{ width: "25%" }}></div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
