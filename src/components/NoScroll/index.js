import React from "react";
import { connect } from "react-redux";

import { noScrollDispatch } from "../../reducers/NoScroll";

import "./style.styl";

const NoScroll = connect(state => ({
  enabled: state.NoScroll.enabled,
}), { noScrollDispatch })(props => (
  props.enabled && <div className="NoScroll" onClick={props.noScrollDispatch} />
));

export default NoScroll;
