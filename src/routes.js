import React from "react";
import { connect } from "react-redux";
import { Route, IndexRoute } from "react-router";
import { replace } from "redux-router";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Preview from "./components/Preview";
import List from "./components/List";
import Login from "./components/Login";


function requireAuth(Comp) {
  class Auth extends React.Component {
    componentDidMount() {
      if (!this.props.loggedIn) {
        this.props.replace("/login");
      }
    }

    // maybe check auth in WillReceiveProps

    render() {
      return this.props.loggedIn && <Comp {...this.props} />;
    }
  }

  return connect(state => ({ loggedIn: state.Auth.token }), { replace })(Auth);
}

export const routes = (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/" component={App}>
      <IndexRoute component={requireAuth(Welcome)} />
      <Route path=":id" component={Preview} />
      <Route path="/list/:id" component={List} />
    </Route>
  </Route>
);

export default routes;
