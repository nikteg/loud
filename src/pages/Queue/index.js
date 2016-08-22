import React from "react";
import { connect } from "react-redux";

import { videoLoadPlaylist } from "../../reducers/Video";
import { ListItem } from "../../components/List";

import "./style.styl";

class Queue extends React.Component {

  constructor(props) {
    super(props);

    this.onPlay = this.onPlay.bind(this);
  }

  onPlay(index) {
    return e => {
      e.preventDefault();
      this.props.videoLoadPlaylist({ id: this.props.playlistId }, index);
    };
  }

  render() {
    return (
      <div className="Playlist page">
        <div className="Playlist-title header-title">Queue</div>
        <ul className="List">
          {this.props.tracks.map((track, i) => (
            <ListItem
              key={i}
              index={this.props.tracksIndex + i}
              track={track}
              onPlay={this.onPlay(this.props.tracksIndex + i)}
              isInCurrentPlaylist
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  tracks: state.Video.tracks.slice(state.Video.tracksIndex),
  tracksIndex: state.Video.tracksIndex,
  playlistId: state.Video.playlistId,
}), { videoLoadPlaylist })(Queue);
