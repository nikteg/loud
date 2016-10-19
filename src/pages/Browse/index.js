import React from "react";
import { connect } from "react-redux";
import bindClosures from "react-bind-closures";

import { videoLoadPlaylist } from "../../reducers/Video";
import { Thumbnail } from "../../components/Track";

import "./style.styl";

const Browse = bindClosures({
  onPlay(props, index) {
    // TODO: This loads the 149 first tracks.
    props.videoLoadPlaylist({ id: "browse", tracks: props.tracks.slice(0, 145) }, index);
  }
})((props) => (
  <div className="Browse page">
    <div className="Browse-title header-title">Browse</div>
    <div className="Browse-content content">
      {props.tracks.map((t, i) => <Thumbnail track={t} key={i} onPlay={() => props.onPlay(i)} />)}
    </div>
  </div>
));

export default connect(state => ({
  loading: state.Browse.loading,
  tracks: state.Browse.tracks,
}), { videoLoadPlaylist })(Browse);
