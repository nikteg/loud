import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";
import { DropTarget } from "react-dnd";

import { playlistCreate, playlistRemove, playlistRename } from "../../reducers/Playlist";
import { notificationShow } from "../../reducers/Notification";

import * as Icons from "../Icons";
import Dropdown from "../Dropdown";
import Loader from "../Loader";

const Playlist = (props) => props.connectDropTarget(
  <li className={cx("Playlists-item Sidebar-item", { active: props.active, isOver: props.isOver })}>
    <Link className="Playlist-item-link" to={`/playlist/${props.list.id}`}><Icons.Music />{props.list.name}</Link>
    <Dropdown
      icon={<Icons.Down />}
      onChoose={data => {
        if (data === "remove") {
          return props.playlistRemove(props.list.id);
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

const trackTarget = {
  drop(props, monitor, component) {
    return { id: props.list.id };
  },
};

function collect(conn, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: conn.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

const PlaylistDropTarget = DropTarget("TRACK", trackTarget, collect)(Playlist);

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
    this.props.playlistCreate(name);
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
    this.props.playlistRename(this.state.renamePlaylist.id, name);
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
        <div className="Sidebar-subtitle">Playlists<a className="Playlists-add" onClick={this.onAdd}><Icons.Plus /></a></div>
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
              <PlaylistDropTarget
                key={i}
                list={list}
                active={+this.props.playlistId === list.id}
                playlistRemove={this.props.playlistRemove}
                notificationShow={this.props.notificationShow}
                onRename={this.onRename(list)}
              />
            );
          })}
          {this.props.loading && <li className="Sidebar-item"><Loader show /></li>}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.Playlist.playlistsLoading,
  playlists: state.Playlist.playlists,
}), { playlistCreate, playlistRemove, playlistRename, notificationShow })(Playlists);
