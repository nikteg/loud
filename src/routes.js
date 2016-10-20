import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
// import Welcome from "./pages/Welcome";
import Track from "./pages/Track";
import Playlist from "./pages/Playlist";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Browse from "./pages/Browse";
import Queue from "./pages/Queue";

import { browseLoad } from "./reducers/Browse";
import { searchQuery } from "./reducers/Search";

export const routes = store => {
  /* eslint-disable no-unused-vars */
  const requireAuth = (nextState, replace) => {
    if (!store.getState().Auth.token) {
      replace(`/login?redirect=${nextState.location.pathname}`);
    }
  };
  /* eslint-enable no-unused-vars */

  const requireUnAuth = (nextState, replace) => {
    if (store.getState().Auth.token) {
      replace("/");
    }
  };

  return (
    <Route>
      <Route path="/login" component={Login} onEnter={requireUnAuth} />
      <Route path="/" component={App}>
        <IndexRoute component={Browse} onEnter={() => {
          store.dispatch(browseLoad());
        }} />
        <Route path="/search" component={Search} onEnter={(nextState) => {
          const query = nextState.location.query.q;

          if (query && store.getState().Search.query !== query) {
            store.dispatch(searchQuery(query));
          }
        }} onChange={(prevState, nextState) => {
          const oldQuery = prevState.location.query.q;
          const query = nextState.location.query.q;

          if (query && oldQuery !== query) {
            store.dispatch(searchQuery(query));
          }
        }} />
        <Route path="/queue" component={Queue} />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/playlist/:playlistId" component={Playlist} />
        <Route path="/track/:trackId/(:trackSlug)" component={Track} />
      </Route>
    </Route>
  );
};

export default routes;
