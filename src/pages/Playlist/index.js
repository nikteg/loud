import React from "react";
import { connect } from "react-redux";
import bindClosures from "react-bind-closures";

import { Actions as VideoActions } from "../../reducers/Video";
import List from "../../components/List";

import "./style.styl";

const _Playlist = bindClosures({
  onPlay({ playPlaylist, playlist }, index) {
    playPlaylist(playlist, index);
  },
})(({ playlist, loading, playlistId, onPlay, params }) => (
  <div className="Playlist page">
    <div className="Playlist-title header-title">
      {playlist && playlist.name}
    </div>
    {playlist && playlist.tracks.length > 0 && <List
      tracks={playlist.tracks}
      loading={loading}
      isInCurrentPlaylist={+params.playlistId === playlistId}
      onPlay={onPlay}
      playlist={playlist}
    />}
  </div>
));

 const Playlist = connect((state) => ({
  loading: state.Playlist.playlistLoading,
  playlist: state.Playlist.playlist,
  playlistId: state.Video.playlistId,
}), {
  playPlaylist: VideoActions.playPlaylist,
})(_Playlist);

export default Playlist;
