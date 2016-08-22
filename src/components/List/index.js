import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { DragSource } from "react-dnd";
import cx from "classnames";
import bindClosures from "react-bind-closures";

import { playlistTrackAdd, playlistTrackRemove, playlistCreate } from "../../reducers/Playlist";
import { notificationShow } from "../../reducers/Notification";

import { formatTime } from "../../lib/utils";
import * as Icons from "../../components/Icons";
import Dropdown from "../../components/Dropdown";

import "./style.styl";

const trackSource = {
  beginDrag(props, monitor, component) {
    return props.track;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    const track = monitor.getItem();
    const playlist = monitor.getDropResult();

    component.props.playlistTrackAdd(playlist.id, track);
  },
};

function collect(conn, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: conn.dragSource(),
    connectDragPreview: conn.dragPreview(),
  };
}

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
}))(DragSource("TRACK", trackSource, collect)(bindClosures({
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
})(props => props.connectDragSource(
  <li className={cx("ListItem", { active: props.isPlaying })}>
    <button className="ListItem-button" onClick={props.onPlay}>
      {props.isPlaying ? <Icons.Pause /> : <Icons.Play />}
    </button>
    <Link to={`/${props.track.key}`} className="ListItem-title name">{props.track.name}</Link>
    <Link to={`/${props.track.key}`} className="ListItem-title artist">{props.track.artist}</Link>
    <div>{formatTime(props.track.duration)}</div>
    <Dropdown icon={<Icons.Plus />} onChoose={props.onDropdownPlaylistsChoose} items={props.dropdownPlaylists()} />
    <Dropdown icon={<Icons.Down />} onChoose={props.onDropdownActionsChoose} items={props.dropdownActions()} />
  </li>, { dropEffect: "copy" }
))));

const List = (props) => (
  <ul className="List">
    {!props.loading && props.tracks && props.tracks.map((track, i) => (
      <ListItem
        key={i}
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
