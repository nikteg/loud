import React from "react";
import { connect } from "react-redux";
import { videoInit, videoStatePlay, videoStatePause, videoStateEnd, videoStateError } from "../../reducers/Video";

import YouTube from "react-youtube";

require("./Player.styl");

const Player = (props) => (
  <YouTube
    opts={{
      playerVars: {
        controls: 0,
        rel: 0,
        showinfo: 0,
      },
    }}
    className="Player"
    videoId={props.id}
    onReady={(e) => props.videoInit(e.target)}
    onPlay={props.videoStatePlay}
    onPause={props.videoStatePause}
    onEnd={props.videoStateEnd}
    onError={props.videoStateError}
  />
);

export default connect(null, { videoInit, videoStatePlay, videoStatePause, videoStateEnd, videoStateError })(Player);
