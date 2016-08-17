import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import cx from "classnames";
import { DropTarget } from "react-dnd";

import { playlistCreate, playlistRemove } from "../../reducers/Playlist";
import { notificationShow } from "../../reducers/Notification";

import * as Icons from "../Icons";
import Dropdown from "../Dropdown";

const Playlist = (props) => props.connectDropTarget(
  <li className={cx("Playlists-item Sidebar-item", { active: props.active, isOver: props.isOver })}>
    <Link className="Playlist-item-link" to={`/list/${props.list.id}`}><Icons.Music />{props.list.name}</Link>
    <Dropdown
      icon={<Icons.Down />}
      onChoose={data => {
        if (data === "remove") {
          return props.playlistRemove(props.list.id);
        }

        props.notificationShow("Not implemented yet");
      }}
      items={[{ name: "Rename", data: "rename" }, null, { name: "Remove", data: "remove" }]}
    />
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
    };

    this.onAdd = this.onAdd.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("click", e => {
      if (this.state.adding && e.target !== this.playlist) {
        this.resetInput(e);
      }
    });
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
      this.resetInput(e);
    }
  }

  resetInput(e) {
    e.preventDefault();
    this.playlist.value = "";
    this.setState({ adding: false });
  }

  render() {
    return (
      <ul className="Playlists">
        {!this.props.loading && this.props.playlists.map((list, i) =>
          <PlaylistDropTarget
            key={i}
            list={list}
            active={this.props.selectedPlaylist === list.id}
            playlistRemove={this.props.playlistRemove}
            notificationShow={this.props.notificationShow}
          />
        )}
        {this.props.playlists.length === 0 && <li className="Sidebar-item">Nothing here yet...</li>}
        {this.props.loading && <li className="Sidebar-item">Loading...</li>}
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
}), { playlistCreate, playlistRemove, notificationShow })(Playlists);
