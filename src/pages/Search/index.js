import React from "react";
import { connect } from "react-redux";
import bindClosures from "react-bind-closures";

import { videoLoadPlaylist } from "../../reducers/Video";
import List from "../../components/List";

import "./style.styl";

const Search = connect(state => ({
  loading: state.Search.loading,
  error: state.Search.error,
  query: state.Search.query,
  tracks: state.Search.tracks,
  isInCurrentPlaylist: state.Video.playlistId === "search",
}), { videoLoadPlaylist })(bindClosures({
  onPlay(props, index) {
    props.videoLoadPlaylist({ id: "search", tracks: props.tracks }, index);
  },
  trackCount(props) {
    return props.tracks ? props.tracks.length : 0;
  },
})(props => (
  <div className="Search page">
    <div className="Search-title header-title">
      {(props.query !== "" && `Search results for '${props.query}'`) || "Search"}
      <div className="num-tracks">{props.trackCount()}</div>
    </div>
    {!props.loading && props.tracks.length > 0 && <List
      tracks={props.tracks}
      loading={props.loading}
      isInCurrentPlaylist={props.isInCurrentPlaylist}
      onPlay={props.onPlay}
    />}
    {!props.loading && props.tracks.length === 0 && <div className="Search-content content">No results</div>}
    {props.loading && <div className="Search-content content">Loading...</div>}
  </div>
)));

export default Search;
