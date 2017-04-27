import * as React from "react"
import { connect } from "react-redux"

import { hideLoginPopup, login, register } from "../../actions"

import "./style.styl"

class Form extends React.Component<any, any> {
  username: HTMLInputElement
  password: HTMLInputElement

  constructor(props) {
    super(props)

    this.onLogin = this.onLogin.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }

  onLogin(e) {
    e.preventDefault()

    const username = this.username.value
    const password = this.password.value

    this.props.login(username, password)
  }

  onRegister(e) {
    e.preventDefault()

    const username = this.username.value
    const password = this.password.value

    this.props.register(username, password)
  }

  render() {
    return (
      <div className="LoginForm">
        <form className="LoginForm-form" onSubmit={this.onLogin}>
          <div className="LoginForm-form-title">Loud<em>Music</em><sub>Beta</sub></div>
          <input
            type="text"
            placeholder="Username"
            defaultValue={this.props.username}
            ref={(node) => (this.username = node)} />
          <input
            type="password"
            placeholder="Password"
            ref={(node) => (this.password = node)} />
          <div className="buttons">
            <button type="submit">Login</button>
            <button onClick={this.onRegister}>Register</button>
          </div>
          {this.props.error && <div className="LoginForm-form-status error">{this.props.error.message}</div>}
          {this.props.loading && <div className="LoginForm-form-status">Loading...</div>}
        </form>
      </div>
    )
  }
}

const LoginForm = connect((state) => ({
  error: state.Auth.error,
  loading: state.Auth.loading,
  loggedIn: state.Auth.token != null,
  username: state.Auth.username,
}), {
  login,
  register,
})(Form)

const LoginPopup = connect((state) => ({
  popup: state.Auth.popup,
}), {
  hideLoginPopup,
})((props) => (
  props.popup && <div className="LoginPopup">
    <div className="LoginPopup-overlay" onClick={props.hideLoginPopup} />
    <LoginForm />
  </div>
))

export default LoginPopup
