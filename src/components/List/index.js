import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";

import { Actions as PlaylistActions } from "../../reducers/Playlist";
import { Actions as NotificationActions } from "../../reducers/Notification";

import { formatTime, trackSlug } from "../../lib/utils";
import * as Icons from "../../components/Icons";
import { TrackAddDropdown, TrackActionDropdown } from "../../components/Dropdown/TrackDropdown";

import "./style.styl";

export const ListItem = connect((state) => ({
  playlists: state.Playlist.playlists,
  isPlaying: state.Video.state === "play",
  index: state.Video.tracksIndex,
}), {
  trackAdd: PlaylistActions.trackAdd,
  trackRemove: PlaylistActions.trackRemove,
  create: PlaylistActions.create,
  notificationShow: NotificationActions.show,
}, (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  isPlaying: stateProps.isPlaying && ownProps.index === stateProps.index && ownProps.isInCurrentPlaylist,
  playlists: stateProps.playlists,
}))((props) => (
  <li className={cx("ListItem", { active: props.isPlaying })}>
    <label>
      <input className="ListItem-checkbox" type="checkbox" />
      <button className="ListItem-button" onClick={props.onPlay}>
        {props.isPlaying ? <Icons.Pause /> : <Icons.Play />}
      </button>
      <div className="ListItem-title name">{props.track.name}</div>
      <div className="ListItem-title artist">{props.track.artist}</div>
      <div>{formatTime(props.track.duration)}</div>
      <TrackAddDropdown track={props.track} />
      <TrackActionDropdown track={props.track} />
      <Link className="ListItem-share" to={`/track/${props.track.id}/${trackSlug(props.track)}`}><Icons.Share /></Link>
    </label>
  </li>
));

const List = (props) => (
  <ul className="List">
    {!props.loading && props.tracks && props.tracks.map((track, i) => (
      <ListItem
        key={`${props.playlist && props.playlist.id}${i}`}
        index={i}
        track={track}
        onPlay={(e) => {
          e.preventDefault();
          props.onPlay(i);
        }}
        isInCurrentPlaylist={props.isInCurrentPlaylist}
        playlist={props.playlist}
      />
    ))}
    {props.loading && <li className="ListItem">Loading...</li>}
  </ul>
);

export default List;
