import React from "react";
import { connect } from "react-redux";
import bindClosures from "react-bind-closures";
import { createSelector } from "reselect";

import { Actions as PlaylistActions } from "../../reducers/Playlist";

import * as Icons from "../../components/Icons";
import Dropdown from "./";

const playlistsDropdownItems = createSelector([
  (state) => state.Playlist.playlists,
], (playlists) => playlists.map((playlist) => ({
  name: <span><Icons.Music />{playlist.name}</span>,
  data: playlist.id,
})));

const _TrackAddDropdown = bindClosures({
  onChoose({ track, addToPlaylist, createPlaylist }, id) {
    if (id) {
      addToPlaylist(id, track);

      return;
    }

    createPlaylist(`${track.artist} - ${track.name}`, [track]);
  },
  items({ playlists }) {
    return [{ name: "Add to new playlist..." }, null, ...playlists];
  },
})(({ onChoose, items }) => (
  <Dropdown icon={<Icons.Plus />} onChoose={onChoose} items={items()} />
));

export const TrackAddDropdown = connect((state) => ({
  playlists: playlistsDropdownItems(state),
}), {
  addToPlaylist: PlaylistActions.trackAdd,
  createPlaylist: PlaylistActions.create,
})(_TrackAddDropdown);

const _TrackActionDropdown = bindClosures({
  onChoose(props, data) {
    alert("Not implemented");
  },
  items(props) {
    return [{ name: "Add to queue..." }];
  },
})(({ onChoose, items }) => (
  <Dropdown icon={<Icons.Down />} onChoose={onChoose} items={items()} />
));

export const TrackActionDropdown = connect()(_TrackActionDropdown);