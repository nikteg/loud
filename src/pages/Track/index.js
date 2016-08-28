import React from "react";
import { connect } from "react-redux";

import { trackLoad } from "../../reducers/Track";
import { videoLoadPlaylist } from "../../reducers/Video";
import List from "../../components/List";

import "./style.styl";

class Track extends React.Component {

  constructor(props) {
    super(props);

    this.onPlay = this.onPlay.bind(this);
  }

  componentWillMount() {
    this.props.trackLoad(+this.props.params.trackId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.trackId !== this.props.params.trackId) {
      this.props.trackLoad(+nextProps.params.trackId);
    }
  }

  onPlay(index) {
    this.props.videoLoadPlaylist({ id: "track", tracks: [this.props.track] }, index);
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
          onPlay={this.props.onPlay}
          playlist={{ id: "track", tracks: [this.props.track] }}
        />}
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.Track.loading,
  track: state.Track.track,
}), { videoLoadPlaylist, trackLoad })(Track);
