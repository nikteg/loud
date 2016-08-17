import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Welcome from "./pages/Welcome";
import Preview from "./pages/Preview";
import List from "./pages/List";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

export const routes = (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/search" component={Search} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/list/:id" component={List} />
      <Route path=":id" component={Preview} />
    </Route>
  </Route>
);

export default routes;
