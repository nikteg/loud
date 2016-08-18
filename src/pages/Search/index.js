import React from "react";
import { connect } from "react-redux";
import bindClosures from "react-bind-closures";

import { videoQueueLoad } from "../../reducers/Video";
import List from "../../components/List";

import "./style.styl";

const Search = connect((state, ownProps) => ({
  loading: false,
  tracks: state.Search.tracks,
  isInCurrentPlaylist: state.Playlist.playlistId === -1,
}), { videoQueueLoad })(bindClosures({
  onPlay(props, index) {
    props.videoQueueLoad(props.tracks, index);
  },
})(props => (
  <div className="List page">
    <div className="List-title header-title">All tracks</div>
    <List
      tracks={props.tracks}
      loading={props.loading}
      isInCurrentPlaylist={props.isInCurrentPlaylist}
      onPlay={props.onPlay}
    />
  </div>
)));

export default Search;
