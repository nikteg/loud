import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";

import { playlistCreate, playlistRemove } from "../../reducers/Playlist";

import * as Icons from "../Icons";

class Playlists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      adding: false,
    };

    this.onAdd = this.onAdd.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onAdd(e) {
    e.preventDefault();

    if (this.state.adding) {
      const name = this.playlist.value;

      this.setState({ adding: false });

      return this.props.playlistCreate(name);
    }

    this.setState({ adding: true });
    setTimeout(() => this.playlist.focus(), 0);
  }

  onKeyDown(e) {
    if (e.keyCode === 27) {
      e.target.value = "";
      this.setState({ adding: false });
    }
  }

  onRemove(id) {
    return () => this.props.playlistRemove(id);
  }

  render() {
    return (
      <ul className="Playlists">
        {!this.props.loading && this.props.playlists.map((list, i) =>
          <li key={i} className={cx("Playlists-item Sidebar-item", { active: this.props.selectedPlaylist === list.id })}>
            <Link className="Playlist-item-link" to={`/list/${list.id}`}>{list.name}</Link>
            <a className="Playlist-item-remove" onClick={this.onRemove(list.id)}><Icons.Bin /></a>
          </li>
        )}
        {this.props.playlists.length === 0 && <li className="Sidebar-item">Nothing here yet...</li>}
        {this.props.loading && [1, 2, 3, 4].map((v, i) =>
          <li key={i} className="Sidebar-item"><div className="loading" /></li>)}
        <li className="Sidebar-item">
          {!this.state.adding && <a onClick={this.onAdd}><Icons.Plus />Add playlist</a>}
          {this.state.adding && <form onSubmit={this.onAdd}>
            <input type="text" ref={node => (this.playlist = node)} onKeyDown={this.onKeyDown} placeholder="Playlist name" />
          </form>}
        </li>
      </ul>
    );
  }
}

export default connect(state => ({
  loading: state.Playlist.loading,
  playlists: state.Playlist.playlists,
  selectedPlaylist: +state.router.params.id,
}), { playlistCreate, playlistRemove })(Playlists);
