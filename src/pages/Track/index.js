import React from "react";
import { connect } from "react-redux";

import { Actions as TrackActions } from "../../reducers/Track";
import { Actions as VideoActions } from "../../reducers/Video";
import List from "../../components/List";

import "./style.styl";

class Track extends React.Component {

  constructor(props) {
    super(props);

    this.onPlay = this.onPlay.bind(this);
  }

  componentWillMount() {
    this.props.load(+this.props.params.trackId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.trackId !== this.props.params.trackId) {
      this.props.load(+nextProps.params.trackId);
    }
  }

  onPlay(index) {
    this.props.playPlaylist({ id: "track", tracks: [this.props.track] }, index);
  }

  render() {
    return (
      <div className="Track page">
        <div className="Track-title header-title">
          {!this.props.loading && this.props.track && `${this.props.track.artist} - ${this.props.track.name}`}
        </div>
        {!this.props.loading && <List
          tracks={this.props.track && [this.props.track]}
          loading={this.props.loading}
          isInCurrentPlaylist
          onPlay={this.onPlay}
          playlist={{ id: "track", tracks: [this.props.track] }}
        />}
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.Track.loading,
  track: state.Track.track,
}), {
  playPlaylist: VideoActions.playPlaylist,
  load: TrackActions.load,
})(Track);
