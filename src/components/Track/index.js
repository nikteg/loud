import React from "react";
import { connect } from "react-redux";
import cx from "classnames";

import * as Icons from "../../components/Icons";
import Dropdown from "../../components/Dropdown";

import "./style.styl";

export const Thumbnail = connect(state => ({
  track: state.Video.tracks[state.Video.tracksIndex],
}))((props) => (
  props.track ? <div className={cx("Track Thumbnail", { "playing": props.isPlaying })}>
    <div className="Thumbnail-image"
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${props.track.key}/hqdefault.jpg)` }} />
    <div className="Thumbnail-title">{props.track.name}</div>
    <div className="Thumbnail-artist">{props.track.artist}</div>
  </div> : <div />
));

export const ThumbnailWithControls = connect(state => ({
  isPlaying: state.Video.state === "play",
  track: state.Video.tracks[state.Video.tracksIndex],
}), {}, (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  isPlaying: stateProps.isPlaying && stateProps.track && ownProps.track.id === stateProps.track.id,
}))((props) => (
  <div className={cx("Track Thumbnail", { "playing": props.isPlaying })}>
    <div className="Thumbnail-image"
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${props.track.key}/hqdefault.jpg)` }}>
      <div className="Thumbnail-hover">
        <button className="Thumbnail-button" onClick={props.onPlay}>
          {props.isPlaying ? <Icons.Pause /> : <Icons.Play />}
        </button>
      </div>
    </div>
    <div className="Thumbnail-controls">
      <div className="Thumbnail-title">{props.track.name}</div>
      <Dropdown icon={<Icons.Plus />} items={[{ name: "Nothing here yet" }]} onChoose={function () {}} />
      <Dropdown icon={<Icons.Down />} items={[{ name: "Nothing here yet" }]} onChoose={function () {}} />
    </div>
    <div className="Thumbnail-artist">{props.track.artist}</div>
  </div>
));
