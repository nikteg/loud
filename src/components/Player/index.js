import React from "react";
import { connect } from "react-redux";

import PlayPauseButton from "./PlayPauseButton";
import VideoButton from "./VideoButton";
import ProgressBar, { CurrentTime, Duration } from "./ProgressBar";
import VolumeButton from "./VolumeButton";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import QueueButton from "./QueueButton";

import "./style.styl";

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
        <QueueButton />
        <VolumeButton />
      </div>
    </div>
  </div>
));

export default Player;
