import React from "react";
import { connect } from "react-redux";

import { playlistLoad } from "../../reducers/Playlist";
import { videoLoadPlaylist } from "../../reducers/Video";
import List from "../../components/List";

import "./style.styl";

class Playlist extends React.Component {

  constructor(props) {
    super(props);

    this.onPlay = this.onPlay.bind(this);
  }

  componentWillMount() {
    this.props.playlistLoad(+this.props.params.playlistId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.playlistId !== this.props.params.playlistId) {
      this.props.playlistLoad(+nextProps.params.playlistId);
    }
  }

  onPlay(index) {
    this.props.videoLoadPlaylist(this.props.playlist, index);
  }

  render() {
    return (
      <div className="Playlist page">
        <div className="Playlist-title header-title">
          {this.props.playlist && this.props.playlist.name}
        </div>
        {this.props.playlist && this.props.playlist.tracks.length > 0 && <List
          tracks={this.props.playlist.tracks}
          loading={this.props.loading}
          isInCurrentPlaylist={+this.props.params.playlistId === this.props.playlistId}
          onPlay={this.onPlay}
          playlist={this.props.playlist}
        />}
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.Playlist.playlistLoading,
  playlist: state.Playlist.playlist,
  playlistId: state.Video.playlistId,
}), { playlistLoad, videoLoadPlaylist })(Playlist);
