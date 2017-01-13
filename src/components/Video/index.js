import React from "react";
import { connect } from "react-redux";
import { Actions as VideoActions } from "../../reducers/Video";
import cx from "classnames";

import YouTube from "react-youtube";

import "./style.styl";

export const Video = (props) => (
  <div className={cx("Video", { "none": !props.show })}>
    <div className="Video-content">
      <YouTube
        opts={{
          playerVars: {
            rel: 0,
            controls: 0,
            showinfo: 0,
            disablekb: 1,
          },
        }}
        videoId={props.id}
        onReady={(e) => props.ready(e.target)}
        onPlay={props.statePlay}
        onPause={props.statePause}
        onEnd={props.stateEnd}
        onError={(e) => props.stateError(e.data)}
      />
    </div>
  </div>
);

export default connect((state) => ({
  show: state.Video.popup,
}), {
  ready: VideoActions.ready,
  statePlay: VideoActions.statePlay,
  statePause: VideoActions.statePause,
  stateEnd: VideoActions.stateEnd,
  stateError: VideoActions.stateError,
})(Video);
