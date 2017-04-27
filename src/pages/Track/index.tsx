import * as React from "react"
import bindClosures from "react-bind-closures"
import { connect } from "react-redux"

import List from "../../components/List"
import { Actions as VideoActions } from "../../reducers/Video"

import "./style.styl"

const _Track = bindClosures({
  onPlay({ playPlaylist, playlist }, index) {
    playPlaylist(playlist, index)
  },
})(({ track, loading, playlist, onPlay }) => (
  <div className="Track page">
    <div className="Track-title header-title">
      {!loading && track && `${track.artist} - ${track.name}`}
    </div>
    {!loading && <List
      tracks={playlist.tracks}
      loading={loading}
      isInCurrentPlaylist
      onPlay={onPlay}
      playlist={playlist}
    />}
  </div>
))

function generatePlaylist(track) {
  if (!track) {
    return "track"
  }

  return { id: `track-${track.key}`, tracks: [track] }
}

const Track = connect((state) => ({
  loading: state.Track.loading,
  track: state.Track.track,
  playlist: generatePlaylist(state.Track.track),
}), {
  playPlaylist: VideoActions.playPlaylist,
})(_Track)

export default Track
