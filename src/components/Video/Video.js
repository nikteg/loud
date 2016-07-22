import React from "react";
import { connect } from "react-redux";
import { videoInit, videoStatePlay, videoStatePause, videoStateEnd, videoStateError } from "../../reducers/Video";
import cx from "classnames";

import YouTube from "react-youtube";

import "./Video.styl";

const Video = (props) => (
  <div className={cx("Video", { none: !props.show })}>
    <div className="Video-content">
      <YouTube
        opts={{
          playerVars: {
            rel: 0,
          },
        }}
        videoId={props.id}
        onReady={e => props.videoInit(e.target)}
        onPlay={props.videoStatePlay}
        onPause={props.videoStatePause}
        onEnd={props.videoStateEnd}
        onError={e => props.videoStateError(e.data)}
      />
    </div>
  </div>
);

export default connect(state => ({
  show: state.Video.popup,
}), { videoInit, videoStatePlay, videoStatePause, videoStateEnd, videoStateError })(Video);
