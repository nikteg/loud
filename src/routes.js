import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Preview from "./components/Preview";
import List from "./components/List";
import Login from "./components/Login";

export const routes = (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path=":id" component={Preview} />
      <Route path="/list/:id" component={List} />
    </Route>
  </Route>
);

export default routes;
