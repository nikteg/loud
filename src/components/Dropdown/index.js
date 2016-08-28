import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import "./style.styl";

export default class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onChoose = this.onChoose.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.state.dropdown) {
      document.body.removeEventListener("click", this.onBodyClick);
      this.setState({ dropdown: false });
    } else {
      document.body.addEventListener("click", this.onBodyClick);
      this.setState({ dropdown: true });
    }
  }

  onBodyClick(e) {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      document.body.removeEventListener("click", this.onBodyClick);
      this.setState({ dropdown: false });
      e.preventDefault();
      e.stopPropagation();
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
      <div className={cx("Dropdown", { "active": this.state.dropdown })}>
        <a className="Dropdown-button" onClick={this.onClick}>{this.props.icon}</a>
        {this.state.dropdown && <ul>
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
