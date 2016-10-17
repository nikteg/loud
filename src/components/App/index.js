import React from "react";

import Sidebar from "../Sidebar";
import Player from "../Player";
import Video from "../Video";
import Notifications from "../Notifications";

import "./style.styl";

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Video />
        <div className="App-wrapper">
          <Notifications />
          <Sidebar
            params={this.props.params}
            location={this.props.location}
            activeItem={this.props.params.id}
          />
          <div className="App-wrapper-content">
            {this.props.children}
          </div>
        </div>
        <Player />
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

App.propTypes = {
  children: React.PropTypes.node,
  params: React.PropTypes.object,
};

export default App;
