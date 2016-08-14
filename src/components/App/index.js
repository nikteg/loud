import React from "react";

import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import Sidebar from "../Sidebar";
import Player from "../Player";
import Video from "../Video";
import Notifications from "../Notifications";

import "./style.styl";

const App = (props) => (
  <div className="App">
    <Video />
    <div className="App-wrapper">
      <Notifications />
      <Sidebar activeItem={props.params.id} />
      <div className="App-wrapper-content">
        {props.children}
      </div>
    </div>
    <Player />
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
  params: React.PropTypes.object,
};

export default DragDropContext(HTML5Backend)(App);
