import React from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { noScrollSetCallback } from "../../reducers/NoScroll";

import "./style.styl";

const DROPDOWN_ELEMENT_WIDTH = 128;
const DROPDOWN_ELEMENT_HEIGHT = 30;

class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      anchor: "top-right",
      position: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
    };

    this.onClick = this.onClick.bind(this);
    this.onChoose = this.onChoose.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.state.show) {
      this.props.noScrollSetCallback();
      this.setState({ show: false });
    } else {
      const { top, bottom, left, right } = this.dropdownButtonEl.getBoundingClientRect();
      let anchorVertical = "top";
      let anchorHorizontal = "left";
      let position = { top: bottom, left };


      if (right + DROPDOWN_ELEMENT_WIDTH > document.body.clientWidth) {
        anchorHorizontal = "right";
        position = { ...position, right: document.body.clientWidth - right, left: undefined };
      }

      const height = this.props.items.reduce((sum) => (sum + DROPDOWN_ELEMENT_HEIGHT), 0);

      if (bottom + height > document.body.clientHeight) {
        anchorVertical = "bottom";
        position = { ...position, bottom: document.body.clientHeight - top, top: undefined };
      }

      const anchor = `${anchorVertical}-${anchorHorizontal}`;

      this.props.noScrollSetCallback(() => {
        this.setState({ show: false });
      });

      this.setState({ show: true, anchor, position });
    }
  }

  onChoose(data) {
    return e => {
      this.props.onChoose(data);
      this.onClick(e);
    };
  }

  render() {
    return (
      <div className={cx("Dropdown", this.state.anchor, { "active": this.state.show })}>
        <a className="Dropdown-button" onClick={this.onClick}
          ref={node => this.dropdownButtonEl = node}>{this.props.icon}</a>
        {this.state.show && <ul style={this.state.position}>
          {this.props.items.map((item, i) => {
            if (item) {
              return <li key={i}><a onClick={this.onChoose(item.data)}>{item.name}</a></li>;
            }

            return <li key={i} className="seperator" />;
          })}
        </ul>}
      </div>
    );
  }
}

export default connect(undefined, { noScrollSetCallback })(Dropdown);
