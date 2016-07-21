import React from "react";
import { connect } from "react-redux";

import { videoLoad } from "../../reducers/Video";

import "./Preview.styl";

const Preview = connect(null, { videoLoad })((props) => (
  <div className="Preview">
    Preview for {props.params.id}.
    Wanna play? Press <a onClick={() => props.videoLoad(props.params.id)}>here</a>
  </div>
));

export default Preview;
