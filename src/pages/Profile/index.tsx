import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import "./style.styl"

const _Profile = (props) => (
  <div className="Profile page">
    <div className="Profile-title header-title">Profile for {props.user && props.user.username}</div>
    <div className="Profile-subtitle header-subtitle">Public playlists</div>
    <ul className="Profile-playlists">
      {props.user && props.user.playlists.map((list, i) =>
        <li key={i}>
          <Link
            to={`/playlist/${list.id}`}
            className="Profile-playlists-name Profile-playlists-title" >{list.name}</Link>
          <Link
            to={`/playlist/${list.id}`}
            className="Profile-playlists-title Profile-playlists-count" >{list.track_count}</Link>
        </li>)}
    </ul>
  </div>
)

const Profile = connect((state) => ({
  user: state.User.user,
}))(_Profile)

export default Profile
