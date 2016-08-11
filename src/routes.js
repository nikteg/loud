import React from "react";
import { connect } from "react-redux";
import { Route, IndexRoute } from "react-router";
import { replace } from "redux-router";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Preview from "./components/Preview";
import List from "./components/List";
import Login from "./components/Login";


function fnComp(Comp, fn) {
  return class FnComp extends React.Component {
    componentDidMount() {
      fn(this.props);
    }

    componentWillReceiveProps(nextProps) {
      fn(nextProps);
    }

    render() {
      return <Comp {...this.props} />;
    }
  };
}

const WelcomeRedirect = connect(state => ({
  loggedIn: state.Auth.token != null,
}), { replace })(fnComp(Welcome, props => (!props.loggedIn && props.replace("/login"))));

const LoginRedirect = connect(state => ({
  loggedIn: state.Auth.token != null,
}), { replace })(fnComp(Login, props => (props.loggedIn && props.replace("/"))));

export const routes = (
  <Route>
    <Route path="/login" component={LoginRedirect} />
    <Route path="/" component={App}>
      <IndexRoute component={WelcomeRedirect} />
      <Route path=":id" component={Preview} />
      <Route path="/list/:id" component={List} />
    </Route>
  </Route>
);

export default routes;
