import * as React from "react"

import LoginPopup from "components/LoginPopup"
import Notifications from "components/Notifications"
import Player from "components/Player"
import Sidebar from "components/Sidebar"
import Video from "components/Video"

import "./style.styl"

class App extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <LoginPopup />
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
    )
  }
}

export default App
