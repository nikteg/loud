import React from "react";
import { connect } from "react-redux";
import { replace } from "redux-router";

import fnComp from "../../lib/fncomp";

import "./style.styl";

const Welcome = (props) => (
  <div className="Welcome page">
    <div className="Welcome-title header-title">Welcome</div>
    <div className="Welcome-content content">Welcome to Loud. Try playing a playlist in the sidebar.</div>
  </div>
);

export default connect(state => ({
  loggedIn: state.Auth.token != null,
}), { replace })(fnComp(Welcome, props => (!props.loggedIn && props.replace("/login"))));

