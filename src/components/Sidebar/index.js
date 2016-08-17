import React from "react";
import { connect } from "react-redux";
import { push } from "redux-router";
import { Link } from "react-router";
import cx from "classnames";
import bindClosures from "react-bind-closures";

import { authLogout } from "../../reducers/Auth";
import { notificationShow } from "../../reducers/Notification";

import * as Icons from "../Icons";
import Playlists from "./Playlists";
import Dropdown from "../Dropdown";

import "./style.styl";

const Sidebar = bindClosures({
  notImplementedNotification(props) {
    props.notificationShow("Not implemented yet");
  },
})(props => (
  <div className="Sidebar">
    {!props.loggedIn && <div className="Sidebar-profile">
      <div className="Sidebar-profile-avatar default" />
      <div className="Sidebar-profile-username">Guest</div>
      <Dropdown
        icon={<Icons.Down />}
        onChoose={() => props.push("/login")}
        items={[{ name: "Login" }]}
      />
    </div>}
    {props.loggedIn && <div className="Sidebar-profile">
      <div className="Sidebar-profile-avatar" />
      <div className="Sidebar-profile-username">{props.username}</div>
      <Dropdown
        icon={<Icons.Down />}
        onChoose={data => {
          if (data === "profile") {
            return props.push(`/profile/${props.username}`);
          }

          if (data === "logout") {
            return props.authLogout();
          }

          props.notificationShow("Not implemented yet");
        }}
        items={[
          { name: <span><Icons.User />Profile</span>, data: "profile" },
          { name: <span><Icons.Settings />Settings</span>, data: "settings" },
          null,
          { name: <span><Icons.Logout />Logout</span>, data: "logout" },
        ]}
      />
    </div>}
    <div className="Sidebar-subtitle">Navigation</div>
    <ul>
      <li className={cx("Sidebar-item", { active: props.pathname.startsWith("/search") })}>
        <Link to="/search"><Icons.Search />All tracks</Link>
      </li>
    </ul>
    {props.loggedIn && <div className="Sidebar-subtitle">Playlists</div>}
    {props.loggedIn && <Playlists />}
  </div>
));

export default connect(state => ({
  username: state.Auth.username,
  loggedIn: state.Auth.token != null,
  pathname: state.router.location.pathname,
}), { authLogout, notificationShow, push })(Sidebar);
