import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { Provider } from "react-redux";

import App from "./App/App";
import Welcome from "./Welcome/Welcome";
import Preview from "./Preview/Preview";
import List from "./List/List";

export const Root = props => (
  <Provider store={props.store}>
    <Router history={syncHistoryWithStore(hashHistory, props.store)}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path=":id" component={Preview} />
        <Route path="/list/:id" component={List} />
      </Route>
    </Router>
  </Provider>
);

export default Root;
