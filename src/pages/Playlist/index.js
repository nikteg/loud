import React from "react";
import { connect } from "react-redux";
import bindClosures from "react-bind-closures";

import { videoListLoad } from "../../reducers/Video";
import List from "../../components/List";

import "./style.styl";

const Playlist = connect((state, ownProps) => ({
  loading: state.Playlist.loading,
  playlists: state.Playlist.playlists,
  playlist: state.Playlist.playlist,
}), { videoListLoad }, (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  loading: stateProps.loading,
  playlist: stateProps.playlists.find(list => list.id === +ownProps.params.playlistId),
  isInCurrentPlaylist: stateProps.playlist.id === +ownProps.params.playlistId,
}))(bindClosures({
  onPlay(props, index) {
    props.videoListLoad(props.playlist.id, index);
  },
})(props => (
  <div className="List page">
    <div className="List-title header-title">{props.playlist && props.playlist.name}</div>
    <List
      tracks={props.playlist && props.playlist.tracks}
      loading={props.loading}
      isInCurrentPlaylist={props.isInCurrentPlaylist}
      onPlay={props.onPlay}
      playlist={props.playlist}
    />
  </div>
)));

export default Playlist;
