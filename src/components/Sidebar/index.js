import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { push } from "react-router-redux";
import cx from "classnames";
import bindClosures from "react-bind-closures";

import { authLogout } from "../../reducers/Auth";
import { notificationShow } from "../../reducers/Notification";
import { searchQuery } from "../../reducers/Search";

import * as Icons from "../Icons";
import Playlists from "./Playlists";
import Dropdown from "../Dropdown";
import { Thumbnail } from "../Track";

import "./style.styl";

const Sidebar = bindClosures({
  notImplementedNotification(props) {
    props.notificationShow("Not implemented yet");
  },
  onSearch(props, e) {
    e.preventDefault();

    const query = document.getElementById("search-query").value.trim();
    if (query !== "") {
      props.push(`/search?q=${query}`);
    }
  },
})(props => (
  <div className="Sidebar">
    {!props.loggedIn && <div className="Sidebar-profile">
      <div className="Sidebar-profile-avatar default" />
      <div className="Sidebar-profile-username">Guest</div>
      <Dropdown
        icon={<Icons.Down />}
        onChoose={() => props.push("/login")}
        items={[{ name: <span><Icons.Logout />Logout</span> }]}
      />
    </div>}
    {props.loggedIn && <div className="Sidebar-profile">
      <Link className="Sidebar-profile-avatar" to={`/profile/${props.username}`} />
      <Link className="Sidebar-profile-username" to={`/profile/${props.username}`}>{props.username}</Link>
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
    <form className="Sidebar-search" onSubmit={props.onSearch}>
      <input
        type="text"
        placeholder="Search for music"
        id="search-query"
        defaultValue={props.query}
      />
    </form>
    <div className="Sidebar-nav">
      <div className="Sidebar-subtitle">Navigation</div>
      <ul>
        <li className={cx("Sidebar-item", { active: props.location.pathname === "/" })}>
          <Link to="/"><Icons.Browse />Browse</Link>
        </li>
        <li className={cx("Sidebar-item", { active: props.location.pathname.startsWith("/queue") })}>
          <Link to="/queue"><Icons.Queue />Queue</Link>
        </li>
      </ul>
      {props.loggedIn && <Playlists playlistId={props.params.playlistId} />}
    </div>
    <div className="Sidebar-thumbnail">
      <Thumbnail />
    </div>
  </div>
));

export default connect(state => ({
  username: state.Auth.username,
  loggedIn: state.Auth.token != null,
  query: state.Search.query,
}), { authLogout, notificationShow, push, searchQuery })(Sidebar);
