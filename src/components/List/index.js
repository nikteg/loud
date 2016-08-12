import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import bindClosures from "react-bind-closures";
import cx from "classnames";

import { videoListLoad } from "../../reducers/Video";

import { formatTime } from "../../util";

import "./style.styl";

const ListItem = connect((state) => ({
  isPlaying: state.Video.state === "play",
  index: state.Video.playlistIndex,
}), { videoListLoad }, (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  isPlaying: stateProps.isPlaying && ownProps.index === stateProps.index && ownProps.isInCurrentPlaylist,
}))(bindClosures({
  onClick(props) {
    props.videoListLoad(props.playlistId, props.index);
  },
})(props => (
  <li className={cx("ListItem", { active: props.isPlaying })}>
    <button className="ListItem-button" onClick={props.onClick}>
      <svg viewBox="0 0 16 16">
        {props.isPlaying ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" /> : <path d="M4.5 2l10 6-10 6z" />}
      </svg>
    </button>
    <Link to={`/${props.track.key}`} className="ListItem-title">{props.track.artist} - {props.track.name}</Link>
    <div>{formatTime(props.track.duration)}</div>
  </li>
)));

const List = connect(state => ({
  loading: state.Playlist.loading,
  playlist: state.Playlist.playlists.find(list => list.id === +state.router.params.id),
  isInCurrentPlaylist: state.Playlist.playlist.id === +state.router.params.id,
}))(props => (
  <div className="List page">
    <div className="List-title header-title">Songs</div>
    <ul>
      {!props.loading && props.playlist && props.playlist.tracks.map((track, i) => (
        <ListItem
          key={i}
          index={i}
          track={track}
          playlistId={props.playlist.id}
          isInCurrentPlaylist={props.isInCurrentPlaylist}
        />
      ))}
      {props.loading && [1, 2, 3, 4].map((v, i) => <li key={i} className="ListItem"><div className="loading" /></li>)}
    </ul>
  </div>
));

export default List;
