import React from "react";
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
  }

  onClick(e) {
    if (e.target.className === "Dropdown-link") {
      return true;
    }

    e.preventDefault();

    if (this.state.dropdown) {
      document.body.removeEventListener("click", this.onClick);

      this.setState({ dropdown: false });
    } else {
      document.body.addEventListener("click", this.onClick);

      this.setState({ dropdown: true });
    }

    return true;
  }

  onChoose(data) {
    return e => {
      document.body.removeEventListener("click", this.onClick);
      this.props.onChoose(data);
      this.setState({ dropdown: false });
    };
  }

  render() {
    return (
      <div className={cx("Dropdown", { "active": this.state.dropdown })}>
        <a className="Dropdown-button" onClick={this.onClick}>{this.props.icon}</a>
        {this.state.dropdown && <ul>
          {this.props.items.map((item, i) => {
            if (item) {
              return <li key={i}><a onClick={this.onChoose(item.data)} className="Dropdown-link">{item.name}</a></li>;
            }

            return <li key={i} className="seperator" />;
          })}
        </ul>}
      </div>
    );
  }
}
