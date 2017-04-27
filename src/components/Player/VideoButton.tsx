import cx from "classnames"
import * as React from "react"
import { connect } from "react-redux"

import { Actions as VideoActions } from "../../reducers/Video"

/* eslint-disable max-len */
const icon = <path d="M15.331 2.502c-2.244-0.323-4.724-0.502-7.331-0.502s-5.087 0.179-7.331 0.502c-0.43 1.683-0.669 3.543-0.669 5.498s0.239 3.815 0.669 5.498c2.244 0.323 4.724 0.502 7.331 0.502s5.087-0.179 7.331-0.502c0.43-1.683 0.669-3.543 0.669-5.498s-0.239-3.815-0.669-5.498zM6 11v-6l5 3-5 3z" />
/* eslint-enable max-len */

const VideoButton = connect((state) => ({
  active: state.Video.popup,
}), { popupToggle: VideoActions.popupToggle })((props) => (
  <button
    title="Video"
    onClick={props.popupToggle}
    className={cx("Controls-buttons-button", { active: props.active })}
  >
    <svg viewBox="0 0 16 16">
      {icon}
    </svg>
  </button>
))

export default VideoButton
