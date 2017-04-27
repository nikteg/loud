import * as React from "react";
import { Route, IndexRoute } from "react-router";

import App from "components/App";
import Track from "pages/Track";
import Playlist from "pages/Playlist";
import Profile from "pages/Profile";
import Search from "pages/Search";
import Browse from "pages/Browse";
import Queue from "pages/Queue";

import { Actions as BrowseActions } from "reducers/Browse";
import { Actions as SearchActions } from "reducers/Search";
import { Actions as UserActions } from "reducers/User";
import { Actions as PlaylistActions } from "reducers/Playlist";
import { Actions as TrackActions } from "reducers/Track";

// function onRequireAuthenticated(store, nextState, replace) {
//   if (!store.getState().Auth.token) {
//     replace(`/login?redirect=${nextState.location.pathname}`);
//   }
// }

// function onRequireUnauthenticated(store, nextState, replace) {
//   if (store.getState().Auth.token) {
//     replace("/");
//   }
// }

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

  store.dispatch(SearchActions.search(query));
}

function onBrowseRouteEnter(store) {
  store.dispatch(BrowseActions.load());
}

function onUserRouteEnter(store, nextState) {
  store.dispatch(UserActions.load(nextState.params.username));
}

function onPlaylistRouteEnter(store, nextState) {
  store.dispatch(PlaylistActions.load(+nextState.params.playlistId));
}

function onTrackRouteEnter(store, nextState) {
  store.dispatch(TrackActions.load(+nextState.params.trackId));
}

export default function routes(store) {
  return (
    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Browse}
          onEnter={() => onBrowseRouteEnter(store)} />
        <Route path="/search" component={Search}
          onEnter={(nextState) => onSearchRouteChange(store, nextState, undefined)}
          onChange={(prevState, nextState) => onSearchRouteChange(store, nextState, prevState)} />
        <Route path="/queue" component={Queue} />
        <Route path="/profile/:username" component={Profile}
          onEnter={(nextState) => onUserRouteEnter(store, nextState)} />
        <Route path="/playlist/:playlistId" component={Playlist}
          onEnter={(nextState) => onPlaylistRouteEnter(store, nextState)} />
        <Route path="/track/:trackId/(:trackSlug)" component={Track}
          onEnter={(nextState) => onTrackRouteEnter(store, nextState)} />
      </Route>
    </Route>
  );
};
