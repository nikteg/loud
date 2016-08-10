import React from "react";
import { connect } from "react-redux";

import { authRegister } from "../../reducers/Auth";

import "./style.styl";

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(e) {
    e.preventDefault();

    const username = this.username.value;
    const password = this.password.value;

    this.props.authRegister(username, password);
  }

  render() {
    return (
      <div className="Login">
        <h1 className="Login-title">Login yes yes?</h1>
        <form onSubmit={this.onLogin}>
          <input type="text" ref={node => (this.username = node)} />
          <input type="password" ref={node => (this.password = node)} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default connect(state => ({}), { authRegister })(Login);
