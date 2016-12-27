import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { Actions as UserActions } from "../../reducers/User";

import "./style.styl";

class Profile extends React.Component {
  componentWillMount() {
    this.props.userLoad(this.props.params.username);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.username !== this.props.params.username) {
      this.props.userLoad(nextProps.params.username);
    }
  }

  render() {
    return (
      <div className="Profile page">
        <div className="Profile-title header-title">Profile for {this.props.user && this.props.user.username}</div>
        <div className="Profile-subtitle header-subtitle">Public playlists</div>
        <ul className="Profile-playlists">
          {this.props.user && this.props.user.playlists.map((list, i) =>
            <li key={i}>
              <Link
                to={`/playlist/${list.id}`}
                className="Profile-playlists-name Profile-playlists-title" >{list.name}</Link>
              <Link
                to={`/playlist/${list.id}`}
                className="Profile-playlists-title Profile-playlists-count" >{list.track_count}</Link>
            </li>)}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.User.user,
}), {
  load: UserActions.load,
})(Profile);
