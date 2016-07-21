import React from "react";
import { connect } from "react-redux";

import PlayPauseButton from "./PlayPauseButton";
import VideoButton from "./VideoButton";
import ProgressBar, { CurrentTime, Duration } from "./ProgressBar";
import VolumeButton from "./VolumeButton";

require("./Player.styl");

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

const Player = connect()((props) => (
  <div className="Player">
    <div className="Controls">
      <div className="Controls-buttons">
        <PrevButton />
        <PlayPauseButton />
        <NextButton />
      </div>
      <div className="Controls-info">
        <div className="Controls-info-progress">
          <CurrentTime />
          <ProgressBar />
          <Duration />
        </div>
      </div>
      <div className="Controls-buttons">
        <VideoButton />
        <VolumeButton />
      </div>
    </div>
  </div>
));

export default Player;
