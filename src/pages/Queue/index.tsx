import * as React from "react"
import { connect } from "react-redux"

import { ListItem } from "../../components/List"
import { Actions as VideoActions, Selectors as VideoSelectors } from "../../reducers/Video"

import "./style.styl"

class Queue extends React.Component<any, any> {

  constructor(props) {
    super(props)

    this.onPlay = this.onPlay.bind(this)
  }

  onPlay(index) {
    return (e) => {
      e.preventDefault()
      this.props.playPlaylist({ id: this.props.playlistId }, index)
    }
  }

  render() {
    return (
      <div className="Playlist page">
        <div className="Playlist-title header-title">Queue</div>
        <ul className="List">
          {this.props.tracks.map((track, i) => (
            <ListItem
              key={i}
              index={this.props.tracksIndex + i}
              track={track}
              onPlay={this.onPlay(this.props.tracksIndex + i)}
              isInCurrentPlaylist
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default connect((state) => ({
  tracks: VideoSelectors.queuedTracks(state),
  tracksIndex: state.Video.tracksIndex,
  playlistId: state.Video.playlistId,
}), { playPlaylist: VideoActions.playPlaylist })(Queue)
