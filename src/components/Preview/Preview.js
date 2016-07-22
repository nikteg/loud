import React from "react";
import { connect } from "react-redux";

import { videoListLoad } from "../../reducers/Video";

import "./Preview.styl";

const Preview = connect(null, { videoListLoad })((props) => (
  <div className="Preview">
    Preview for {props.params.id}.
    Wanna play? Press <a onClick={() => props.videoListLoad([props.params.id])}>here</a>
  </div>
));

export default Preview;
