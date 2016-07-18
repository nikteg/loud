import React from "react";
import { connect } from "react-redux";

require("./Player.styl");

const Player = (props) => <div className="Player">Am a player with id {props.id}</div>;

export default connect((state, ownProps) => ({
  id: ownProps.params.id,
}))(Player);
