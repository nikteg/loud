import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";

import "./style.styl";

const Sidebar = props => (
  <div className="Sidebar">
    <div className="Sidebar-title header-title"><Link to="/">Loud</Link></div>
    <div className="Sidebar-subtitle">Playlists</div>
    <ul>
      {[...props.playlists].map((item, i) =>
        <li key={i} className={cx("Sidebar-item", { active: props.selectedPlaylist === item })}>
          <Link to={`/list/${item}`}>{item}</Link>
        </li>
      )}
    </ul>
  </div>
);

export default connect(state => ({
  playlists: state.Playlist.playlists.keys(),
  selectedPlaylist: state.router.params.id,
}))(Sidebar);
