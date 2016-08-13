import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Preview from "./components/Preview";
import List from "./components/List";
import Login from "./components/Login";
import Profile from "./components/Profile";

export const routes = (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/list/:id" component={List} />
      <Route path=":id" component={Preview} />
    </Route>
  </Route>
);

export default routes;
