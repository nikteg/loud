import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { authLogin, authRegister } from "../../reducers/Auth";

import "./style.styl";

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  onLogin(e) {
    e.preventDefault();

    const username = this.username.value;
    const password = this.password.value;

    this.props.authLogin(username, password);
  }

  onRegister(e) {
    e.preventDefault();

    const username = this.username.value;
    const password = this.password.value;

    this.props.authRegister(username, password);
  }

  render() {
    return (
      <div className="Login">
        <form className="Login-form" onSubmit={this.onLogin}>
          <div className="Login-form-title">Loud<em>Music</em><sub>Beta</sub></div>
          <input type="text" placeholder="Username" ref={node => (this.username = node)} />
          <input type="password" placeholder="Password" ref={node => (this.password = node)} />
          <div className="buttons">
            <button type="submit">Login</button>
            <button onClick={this.onRegister}>Register</button>
          </div>
          {this.props.error && <div className="Login-form-status error">{this.props.error}</div>}
          {this.props.loading && <div className="Login-form-status">Loading...</div>}
          <div className="Login-form-or">or</div>
          <Link to="/search">Take a look as guest...</Link>
        </form>
      </div>
    );
  }
}

export default connect(state => ({
  error: state.Auth.error,
  loading: state.Auth.loading,
  loggedIn: state.Auth.token != null,
}), { authLogin, authRegister })(Login);
