import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import bindClosures from "react-bind-closures";
import cx from "classnames";

import { videoListLoad } from "../../reducers/Video";

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
    props.videoListLoad(props.playlistKey, props.index);
  },
})(props => (
  <li className={cx("ListItem", { active: props.isPlaying })}>
    <button className="ListItem-button" onClick={props.onClick}>
      <svg viewBox="0 0 16 16">
        {props.isPlaying ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" /> : <path d="M4.5 2l10 6-10 6z" />}
      </svg>
    </button>
    <Link to={`/${props.item.id}`} className="ListItem-title">{props.item.name}</Link>
  </li>
)));

const List = connect(state => ({
  playlist: state.Playlist.playlists.get(state.router.params.id),
  playlistKey: state.router.params.id,
  isInCurrentPlaylist: state.Playlist.playlistKey === state.router.params.id,
}))(props => (
  <div className="List page">
    <div className="List-title header-title">Songs</div>
    <ul>
      {[...props.playlist.values()].map((item, i) => (
        <ListItem
          key={i}
          index={i}
          item={item}
          playlistKey={props.playlistKey}
          isInCurrentPlaylist={props.isInCurrentPlaylist}
        />
      ))}
    </ul>
  </div>
));

export default List;
