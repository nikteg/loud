import React from "react";
import { connect } from "react-redux";
import bindClosures from "react-bind-closures";

import { Actions as VideoActions } from "../../reducers/Video";
import { ThumbnailWithControls } from "../../components/Track";

import "./style.styl";

const Browse = bindClosures({
  onPlay(props, index) {
    props.playPlaylist({ id: "browse", tracks: props.tracks }, index);
  },
})((props) => (
  <div className="Browse page">
    <div className="Browse-title header-title">Browse</div>
    <div className="Browse-content content">
      {props.tracks.map((t, i) =>
        <ThumbnailWithControls track={t} key={i} onPlay={() => props.onPlay(i)} />)}
    </div>
  </div>
));

export default connect(state => ({
  loading: state.Browse.loading,
  tracks: state.Browse.tracks,
}), { playPlaylist: VideoActions.playPlaylist })(Browse);
