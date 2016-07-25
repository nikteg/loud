import React from "react";
import { Link } from "react-router";
import cx from "classnames";

import "./style.styl";

const playlists = ["test", "test2"];

const Sidebar = (props) => (
  <div className="Sidebar">
    <div className="Sidebar-title header-title"><Link to="/">Loud</Link></div>
    <div className="Sidebar-subtitle">Playlists</div>
    <ul>
      {playlists.map((item, i) => (
        <li key={i} className={cx("Sidebar-item", { active: props.activeItem === item })}>
          <Link to={`/list/${item}`}>{item}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
