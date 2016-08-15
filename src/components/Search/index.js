import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import bindClosures from "react-bind-closures";
import { DragSource } from "react-dnd";
import cx from "classnames";

import { videoQueueLoad } from "../../reducers/Video";
import { playlistTrackAdd } from "../../reducers/Playlist";
import { notificationShow } from "../../reducers/Notification";

import { formatTime } from "../../lib/utils";
import * as Icons from "../Icons";
import Dropdown from "../Dropdown";

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

    console.log(track, playlist);
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

const ListItem = connect((state) => ({
  playlists: state.Playlist.playlists,
  isPlaying: state.Video.state === "play",
  index: state.Video.playlistIndex,
}), { videoQueueLoad, playlistTrackAdd, notificationShow }, (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  isPlaying: stateProps.isPlaying && ownProps.index === stateProps.index && ownProps.isInCurrentPlaylist,
  playlists: stateProps.playlists,
}))(DragSource("TRACK", trackSource, collect)(bindClosures({
  onClick(props) {
    props.videoQueueLoad(props.tracks, props.index);
  },
})(props => props.connectDragSource(
  <li className={cx("ListItem", { active: props.isPlaying })}>
    <button className="ListItem-button" onClick={props.onClick}>
      <svg viewBox="0 0 16 16">
        {props.isPlaying ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" /> : <path d="M4.5 2l10 6-10 6z" />}
      </svg>
    </button>
    <Link to={`/${props.track.key}`} className="ListItem-title">{props.track.artist} - {props.track.name}</Link>
    <div>{formatTime(props.track.duration)}</div>
    <Dropdown
      icon={<Icons.Plus />}
      onChoose={id => {
        if (id) {
          return props.playlistTrackAdd(id, props.track);
        }

        props.playlistCreate(`${props.track.artist} - ${props.track.name}`, [props.track]);
      }}
      items={props.playlists.map(list => ({ name: list.name, data: list.id })).concat([null, { name: "Add to new playlist" }])}
    />
    <Dropdown
      icon={<Icons.Down />}
      onChoose={() => props.notificationShow("Not implemented yet")}
      items={[{ name: "Add to queue" }, null, { name: "Remove from playlist", data: props.track }]}
    />
  </li>, { dropEffect: "copy" }
))));

const Search = connect(state => ({
  loading: false,
  tracks: state.Search.tracks,
  isInCurrentPlaylist: state.Playlist.playlistId === -1,
}))((props) => (
  <div className="Search page">
    <div className="Search-title header-title">All tracks</div>
    <ul>
      {!props.loading && props.tracks.map((track, i) => (
        <ListItem
          key={i}
          index={i}
          track={track}
          tracks={props.tracks}
          isInCurrentPlaylist={props.isInCurrentPlaylist}
        />
      ))}
      {!props.loading && props.tracks.length === 0 && <li className="ListItem">Nothing here yet...</li>}
      {props.loading && [1, 2, 3, 4].map((v, i) => <li key={i} className="ListItem"><div className="loading" /></li>)}
    </ul>
  </div>
));

export default Search;
