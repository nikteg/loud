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
      {!props.loading && props.playlists.map((list, i) =>
        <li key={i} className={cx("Sidebar-item", { active: props.selectedPlaylist === list.id })}>
          <Link to={`/list/${list.id}`}>{list.name}</Link>
        </li>
      )}
      {props.loading && [1, 2, 3, 4].map((v, i) => <li key={i} className="Sidebar-item"><div className="loading" /></li>)}
    </ul>
  </div>
);

export default connect(state => ({
  loading: state.Playlist.loading,
  playlists: state.Playlist.playlists,
  selectedPlaylist: +state.router.params.id,
}))(Sidebar);
