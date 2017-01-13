import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";

import { Actions as PlaylistActions } from "../../reducers/Playlist";
import { Actions as NotificationActions } from "../../reducers/Notification";

import * as Icons from "../Icons";
import Dropdown from "../Dropdown";
import Loader from "../Loader";

const Playlist = (props) => (
  <li className={cx("Playlists-item Sidebar-item", { active: props.active, isOver: props.isOver })}>
    <Link className="Playlist-item-link" to={`/playlist/${props.list.id}`}>
      {props.currentlyPlaying ? <Icons.Speaker /> : <Icons.Music />}
      {props.list.name}
    </Link>
    <Dropdown
      icon={<Icons.Down />}
      onChoose={(data) => {
        if (data === "remove") {
          return props.remove(props.list.id);
        }

        if (data === "rename") {
          return props.onRename(props.list);
        }
      }}
      items={[{ name: "Rename", data: "rename" }, null, { name: "Remove", data: "remove" }]}
    />
  </li>
);

const PlaylistRename = (props) => (
  <li className="Playlists-item Sidebar-item">
    <form onSubmit={props.onRename}>
      <Icons.Music />
      <input
        type="text"
        onKeyDown={props.onKeyDown}
        placeholder="Playlist name"
        defaultValue={props.defaultName}
        id="playlist-rename"
      />
    </form>
  </li>
);

class Playlists extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      adding: false,
      renamePlaylist: null,
    };

    this.onAdd = this.onAdd.bind(this);
    this.onAddPlaylist = this.onAddPlaylist.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onRenamePlaylist = this.onRenamePlaylist.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("click", this.onBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.onBodyClick);
  }

  onBodyClick(e) {
    if ((this.state.adding || this.state.renamePlaylist !== null)
      && e.target !== document.getElementById("playlist-rename")) {
      e.preventDefault();
      e.stopPropagation();
      this.resetInput();
    }
  }

  onAdd(e) {
    e.preventDefault();

    this.setState({ adding: true });
    setTimeout(() => document.getElementById("playlist-rename").select(), 0);
  }

  onAddPlaylist(e) {
    e.preventDefault();

    const name = document.getElementById("playlist-rename").value;
    this.props.create(name);
    this.resetInput();
  }

  onRename(playlist) {
    return () => {
      this.setState({ renamePlaylist: playlist });
      setTimeout(() => document.getElementById("playlist-rename").select(), 0);
    };
  }

  onRenamePlaylist(e) {
    e.preventDefault();

    const name = document.getElementById("playlist-rename").value;
    this.props.rename(this.state.renamePlaylist.id, name);
    this.resetInput();
  }

  onKeyDown(e) {
    if (e.keyCode === 27) {
      this.resetInput(e);
    }
  }

  resetInput() {
    document.getElementById("playlist-rename").value = "";
    this.setState({ adding: false, renamePlaylist: null });
  }

  render() {
    return (
      <div className="Playlists">
        <div className="Sidebar-subtitle">
          Playlists
          <a className="Playlists-add" onClick={this.onAdd}><Icons.Plus /></a>
        </div>
        <ul>
          {this.state.adding && <PlaylistRename
            onRename={this.onAddPlaylist}
            onKeyDown={this.onKeyDown}
            defaultName="New playlist"
          />}
          {!this.props.loading && this.props.playlists.map((list, i) => {
            if (this.state.renamePlaylist && this.state.renamePlaylist.id === list.id) {
              return (
                <PlaylistRename
                  key={i}
                  onRename={this.onRenamePlaylist}
                  onKeyDown={this.onKeyDown}
                  defaultName={list.name}
                />
              );
            }

            return (
              <Playlist
                key={i}
                list={list}
                active={+this.props.playlistId === list.id}
                remove={this.props.remove}
                notificationShow={this.props.notificationShow}
                onRename={this.onRename(list)}
                currentlyPlaying={this.props.currentPlaylistId === list.id}
              />
            );
          })}
          {this.props.loading && <li className="Sidebar-item"><Loader show /></li>}
        </ul>
      </div>
    );
  }
}

export default connect((state) => ({
  loading: state.Playlist.playlistsLoading,
  playlists: state.Playlist.playlists,
  currentPlaylistId: state.Video.playlistId,
}), {
  create: PlaylistActions.create,
  remove: PlaylistActions.remove,
  rename: PlaylistActions.rename,
  notificationShow: NotificationActions.show,
})(Playlists);
