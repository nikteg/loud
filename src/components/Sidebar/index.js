import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";
import bindClosures from "react-bind-closures";

import { authLogout } from "../../reducers/Auth";
import { notificationShow } from "../../reducers/Notification";

import * as Icons from "../Icons";
import Playlists from "./Playlists";

import "./style.styl";

const Sidebar = bindClosures({
  notImplementedNotification(props) {
    props.notificationShow("Not implemented yet");
  },
})(props => (
  <div className="Sidebar">
    <div className="Sidebar-title header-title"><Link to="/">Loud</Link></div>
    {props.loggedIn && <div className="Sidebar-subtitle">{props.username}</div>}
    {props.loggedIn && <ul>
      <li className={cx("Sidebar-item", { active: props.pathname.startsWith("/profile") })}>
        <Link to={`/profile/${props.username}`}><Icons.User />Profile</Link>
      </li>
      <li className={cx("Sidebar-item", { active: props.pathname.startsWith("/search") })}>
        <Link to="/search"><Icons.Search />All tracks</Link>
      </li>
      <li className="Sidebar-item"><a onClick={props.notImplementedNotification}><Icons.Settings />Settings</a></li>
      <li className="Sidebar-item"><a onClick={props.authLogout}><Icons.Logout />Logout</a></li>
    </ul>}
    {props.loggedIn && <div className="Sidebar-subtitle">Playlists</div>}
    {props.loggedIn && <Playlists />}
  </div>
));

export default connect(state => ({
  username: state.Auth.username,
  loggedIn: state.Auth.token != null,
  pathname: state.router.location.pathname,
}), { authLogout, notificationShow })(Sidebar);
