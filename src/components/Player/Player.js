import React from "react";
import { connect } from "react-redux";
import { videoInit, videoStatePlay, videoStatePause, videoStateEnd, videoStateError } from "../../reducers/Video";
import cx from "classnames";

import YouTube from "react-youtube";

require("./Player.styl");

const Player = (props) => (
  <div className={cx("Player", { none: !props.show })}>
    <div className="Player-content">
      <YouTube
        opts={{
          playerVars: {
            rel: 0,
          },
        }}
        videoId={props.id}
        onReady={(e) => props.videoInit(e.target)}
        onPlay={props.videoStatePlay}
        onPause={props.videoStatePause}
        onEnd={props.videoStateEnd}
        onError={props.videoStateError}
      />
    </div>
  </div>
);

export default connect((state, ownProps) => ({
  show: state.Video.popup,
}), { videoInit, videoStatePlay, videoStatePause, videoStateEnd, videoStateError })(Player);
