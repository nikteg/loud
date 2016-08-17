import React from "react";
import { connect } from "react-redux";

import { videoLoad } from "../../reducers/Video";

import "./style.styl";

const Preview = connect(null, { videoLoad })((props) => (
  <div className="Preview page">
    <div className="Preview-title header-title">Preview for {props.params.id}</div>
    <div className="Preview-content content">
      Wanna play? Press <a onClick={() => props.videoLoad(props.params.id)}>here</a>
    </div>
  </div>
));

export default Preview;