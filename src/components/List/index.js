import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";
import bindClosures from "react-bind-closures";

import { playlistTrackAdd, playlistTrackRemove, playlistCreate } from "../../reducers/Playlist";
import { notificationShow } from "../../reducers/Notification";

import { formatTime, trackSlug } from "../../lib/utils";
import * as Icons from "../../components/Icons";
import Dropdown from "../../components/Dropdown";

import "./style.styl";

export const ListItem = connect((state) => ({
  playlists: state.Playlist.playlists,
  isPlaying: state.Video.state === "play",
  index: state.Video.tracksIndex,
}), {
  playlistTrackAdd,
  playlistTrackRemove,
  notificationShow,
  playlistCreate,
}, (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  isPlaying: stateProps.isPlaying && ownProps.index === stateProps.index && ownProps.isInCurrentPlaylist,
  playlists: stateProps.playlists,
}))(bindClosures({
  dropdownPlaylists(props) {
    const add = { name: "Add to new playlist" };

    if (props.playlists.length > 0) {
      return [add, null, ...props.playlists.map(l => ({ name: <span><Icons.Music />{l.name}</span>, data: l.id }))];
    }

    return [add];
  },
  dropdownActions(props) {
    const add = { name: "Add to queue" };

    if (props.playlist) {
      return [add, null, { name: "Remove from playlist", data: props.track }];
    }

    return [add];
  },
  onDropdownPlaylistsChoose(props, id) {
    if (id) {
      return props.playlistTrackAdd(id, props.track);
    }

    props.playlistCreate(`${props.track.artist} - ${props.track.name}`, [props.track]);
  },
  onDropdownActionsChoose(props, data) {
    if (data) {
      return props.playlistTrackRemove(props.playlist.id, data);
    }

    props.notificationShow("Not implemented yet");
  },
})(props => (
  <li className={cx("ListItem", { active: props.isPlaying })}>
    <label onDoubleClick={props.onPlay}>
      <input className="ListItem-checkbox" type="checkbox" />
      <button className="ListItem-button" onClick={props.onPlay}>
        {props.isPlaying ? <Icons.Pause /> : <Icons.Play />}
      </button>
      <div className="ListItem-title name">{props.track.name}</div>
      <div className="ListItem-title artist">{props.track.artist}</div>
      <div>{formatTime(props.track.duration)}</div>
      <Dropdown icon={<Icons.Plus />} onChoose={props.onDropdownPlaylistsChoose} items={props.dropdownPlaylists()} />
      <Dropdown icon={<Icons.Down />} onChoose={props.onDropdownActionsChoose} items={props.dropdownActions()} />
      <Link className="ListItem-share" to={`/track/${props.track.id}/${trackSlug(props.track)}`}><Icons.Share /></Link>
    </label>
  </li>
)));

const List = (props) => (
  <ul className="List">
    {!props.loading && props.tracks && props.tracks.map((track, i) => (
      <ListItem
        key={`${props.playlist.id}${i}`}
        index={i}
        track={track}
        onPlay={() => props.onPlay(i)}
        isInCurrentPlaylist={props.isInCurrentPlaylist}
        playlist={props.playlist}
      />
    ))}
    {props.loading && <li className="ListItem">Loading...</li>}
  </ul>
);

export default List;
