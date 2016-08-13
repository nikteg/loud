import React from "react";
import { connect } from "react-redux";

import "./style.styl";

const Profile = connect()((props) => (
  <div className="Profile page">
    <div className="Profile-title header-title">Profile</div>
    <div className="Profile-content content">
      Well this is empty
    </div>
  </div>
));

export default Profile;
