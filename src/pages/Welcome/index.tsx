import * as React from "react";
import { connect } from "react-redux";

import "./style.styl";

const Welcome = (props) => (
  <div className="Welcome page">
    <div className="Welcome-title header-title">Welcome</div>
    <div className="Welcome-content content">Welcome to Loud. Try searching for music in the sidebar.</div>
  </div>
);

export default connect((state) => ({
  loggedIn: state.Auth.token != null,
}))(Welcome);
