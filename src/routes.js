import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Track from "./pages/Track";
import Playlist from "./pages/Playlist";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Browse from "./pages/Browse";
import Queue from "./pages/Queue";

import { browseLoad } from "./reducers/Browse";
import { searchQuery } from "./reducers/Search";

/* eslint-disable no-unused-vars */
function onRequireAuthenticated(store, nextState, replace) {
  if (!store.getState().Auth.token) {
    replace(`/login?redirect=${nextState.location.pathname}`);
  }
}
/* eslint-enable no-unused-vars */

function onRequireUnauthenticated(store, nextState, replace) {
  if (store.getState().Auth.token) {
    replace("/");
  }
}

function onSearchRouteChange(store, nextState, prevState) {
  const query = nextState.location.query.q;

  if (!query) {
    return;
  }

  if (prevState) {
    const prevQuery = prevState.location.query.q;

    if (prevQuery === query) {
      return;
    }
  }

  if (store.getState().Search.query === query) {
    return;
  }

  store.dispatch(searchQuery(query));
}

function onBrowseRouteEnter(store) {
  store.dispatch(browseLoad());
}

export default function routes(store) {
  return (
    <Route>
      <Route path="/login" component={Login}
        onEnter={(nextState, replace) => onRequireUnauthenticated(store, nextState, replace)} />
      <Route path="/" component={App}>
        <IndexRoute component={Browse}
          onEnter={() => onBrowseRouteEnter(store)} />
        <Route path="/search" component={Search}
          onEnter={(nextState) => onSearchRouteChange(store, nextState)}
          onChange={(prevState, nextState) => onSearchRouteChange(store, nextState, prevState)} />
        <Route path="/queue" component={Queue} />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/playlist/:playlistId" component={Playlist} />
        <Route path="/track/:trackId/(:trackSlug)" component={Track} />
      </Route>
    </Route>
  );
};
