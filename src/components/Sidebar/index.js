import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";
import bindClosures from "react-bind-closures";

import { authLogout } from "../../reducers/Auth";

import * as Icons from "../Icons";

import "./style.styl";

const Sidebar = bindClosures({
  onLogout(props) {
    props.authLogout(props.token);
  },
})(props => (
  <div className="Sidebar">
    <div className="Sidebar-title header-title"><Link to="/">Loud</Link></div>
    {props.loggedIn && <div className="Sidebar-subtitle">{props.username}</div>}
    {props.loggedIn && <ul>
      <li className="Sidebar-item"><a><Icons.User />Profile</a></li>
      <li className="Sidebar-item"><a><Icons.Settings />Settings</a></li>
      <li className="Sidebar-item"><a onClick={props.onLogout}><Icons.Logout />Logout</a></li>
    </ul>}
    <div className="Sidebar-subtitle">Playlists</div>
    <ul>
      {!props.loading && props.playlists.map((list, i) =>
        <li key={i} className={cx("Sidebar-item", { active: props.selectedPlaylist === list.id })}>
          <Link to={`/list/${list.id}`}>{list.name}</Link>
        </li>
      )}
      {props.playlists.length === 0 && <li className="Sidebar-item">Nothing here yet...</li>}
      {props.loading && [1, 2, 3, 4].map((v, i) => <li key={i} className="Sidebar-item"><div className="loading" /></li>)}
    </ul>
  </div>
));

export default connect(state => ({
  loading: state.Playlist.loading,
  playlists: state.Playlist.playlists,
  selectedPlaylist: +state.router.params.id,
  username: state.Auth.username,
  loggedIn: state.Auth.token != null,
  token: state.Auth.token,
}), { authLogout })(Sidebar);
