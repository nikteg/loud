import React from "react";
import { connect } from "react-redux";
import { videoInit, videoState } from "../../reducers/Video";

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
    onPlay={() => props.videoState("play")}
    onPause={() => props.videoState("pause")}
    onEnd={() => props.videoState("end")}
    onError={() => props.videoState("error")}
  />
);

export default connect(null, { videoInit, videoState })(Player);
