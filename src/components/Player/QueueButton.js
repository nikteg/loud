import React from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { videoPopupQueueToggle } from "../../reducers/Video";

import * as Icons from "../Icons";

class QueueButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      popup: false,
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();

    this.setState({ popup: !this.state.popup });
  }

  render() {
    return (
      <div className="QueueButton">
        {this.state.popup && <div className="QueueButton-popup">
          <ul>
            {this.props.queue.map((track, i) => {
              if (i === 0) {
                return <li key={i} className="QueueButton-popup-item top">{track.name}</li>;
              }

              return <li key={i} className="QueueButton-popup-item">{track.name}</li>;
            })}
            {this.props.queue.length === 0 && <li className="QueueButton-popup-item">Queue empty</li>}
          </ul>
        </div>}
        <button
          title="Queue"
          onClick={this.onToggle}
          className={cx("Controls-buttons-button", { active: this.state.popup })}
        >
          <Icons.Queue />
        </button>
      </div>
    );
  }

}

export default connect(state => ({
  queue: state.Video.tracks.slice(state.Video.tracksIndex),
}))(QueueButton);
