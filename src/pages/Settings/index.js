import React from "react";
import { connect } from "react-redux";
import bindClosures from "react-bind-closures";

import { Actions as NotificationActions } from "../../reducers/Notification";
import { Actions as AuthActions } from "../../reducers/Auth";

import "./style.styl";

const _Settings = bindClosures({
  onChangePassword({ notificationShow, updatePassword }, e) {
    e.preventDefault();

    const { passwordOld, password, passwordRepeat } = e.target.elements;

    if (password.value !== passwordRepeat.value) {
      notificationShow("Passwords does not match");

      return;
    }

    updatePassword(passwordOld.value, password.value);
  },
})(({ onChangePassword }) => (
  <div className="Settings page">
    <div className="Settings-title header-title">Settings</div>
    <div className="Settings-subtitle header-subtitle">Change password</div>
    <form className="Settings-form" method="post" onSubmit={onChangePassword}>
      <input
        type="password"
        placeholder="Old password"
        name="passwordOld" />
      <input
        type="password"
        placeholder="New password"
        name="password" />
      <input
        type="password"
        placeholder="Repeat new password"
        name="passwordRepeat" />
      <button type="submit">Change password</button>
    </form>
  </div>
));

const Settings = connect(state => ({
  user: state.User.user,
}), {
  notificationShow: NotificationActions.show,
  updatePassword: AuthActions.updatePassword,
})(_Settings);

export default Settings;
