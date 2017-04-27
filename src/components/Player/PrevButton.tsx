import * as React from "react";
import { connect } from "react-redux";

import { Actions as VideoActions } from "../../reducers/Video";

const PrevButton = connect((state) => ({
  active: state.Video.popup,
}), { listPrev: VideoActions.listPrev })((props) => (
  <button className="Controls-buttons-button" onClick={props.listPrev}>
    <svg viewBox="0 0 16 16">
      <path d="M4 14v-12h2v5.5l5-5v11l-5-5v5.5z" />
    </svg>
  </button>
));

export default PrevButton;
