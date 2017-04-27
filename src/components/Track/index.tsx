import cx from "classnames"
import * as React from "react"
import { connect } from "react-redux"

import { TrackActionDropdown, TrackAddDropdown } from "../../components/Dropdown/TrackDropdown"
import * as Icons from "../../components/Icons"

import "./style.styl"

export const ThumbnailSide = connect((state) => ({
  track: state.Video.tracks[state.Video.tracksIndex],
}))((props) => (
  props.track ? <div className="Track ThumbnailSide">
    <div className="ThumbnailSide-image"
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${props.track.key}/hqdefault.jpg)` }} />
    <div className="ThumbnailSide-info">
      <div className="ThumbnailSide-title" title={props.track.name}>{props.track.name}</div>
      <div className="ThumbnailSide-artist" title={props.track.artist}>{props.track.artist}</div>
    </div>
  </div> : <div />
))

export const ThumbnailWithControls = connect((state, ownProps) => ({
  isPlaying: (state.Video.state === "play" &&
    state.Video.tracks[state.Video.tracksIndex] &&
    ownProps.track.id === state.Video.tracks[state.Video.tracksIndex].id),
}))((props) => (
  <div className={cx("Track Thumbnail", { playing: props.isPlaying })}>
    <div className="Thumbnail-image"
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${props.track.key}/hqdefault.jpg)` }}>
      <div className="Thumbnail-hover">
        <button className="Thumbnail-button" onClick={props.onPlay}>
          {props.isPlaying ? <Icons.Pause /> : <Icons.Play />}
        </button>
      </div>
    </div>
    <div className="Thumbnail-controls">
      <div className="Thumbnail-title" title={props.track.name}>{props.track.name}</div>
        <TrackAddDropdown track={props.track} />
        <TrackActionDropdown track={props.track} />
      </div>
    <div className="Thumbnail-artist" title={props.track.artist}>{props.track.artist}</div>
  </div>
))
