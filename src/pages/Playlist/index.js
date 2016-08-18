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
  trackCount(props) {
    return props.playlist ? props.playlist.tracks.length : 0;
  },
})(props => (
  <div className="Playlist page">
    <div className="Playlist-title header-title">
      {props.playlist && props.playlist.name}
      <div className="num-tracks">{props.trackCount()}</div>
    </div>
    {props.playlist && props.playlist.tracks.length > 0 && <List
      tracks={props.playlist && props.playlist.tracks}
      loading={props.loading}
      isInCurrentPlaylist={props.isInCurrentPlaylist}
      onPlay={props.onPlay}
      playlist={props.playlist}
    />}
    {props.playlist && props.playlist.tracks.length === 0 && <div className="Playlist-content content">Empty</div>}
  </div>
)));

export default Playlist;
