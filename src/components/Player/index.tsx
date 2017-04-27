import * as React from "react"
import { connect } from "react-redux"

import NextButton from "./NextButton"
import PlayPauseButton from "./PlayPauseButton"
import PrevButton from "./PrevButton"
import ProgressBar, { CurrentTime, Duration } from "./ProgressBar"
import VideoButton from "./VideoButton"
import VolumeButton from "./VolumeButton"

import "./style.styl"

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
))

export default Player
