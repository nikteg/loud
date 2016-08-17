import { applyMiddleware, compose, createStore } from "redux";
import { replace, routerMiddleware, LOCATION_CHANGE } from "react-router-redux";
import { browserHistory } from "react-router";
import thunk from "redux-thunk";
import translator from "redux-action-translator";

import reducers from "./reducers";
import { authLoginActions, authLogoutActions, authToken, authUnauthenticated } from "./reducers/Auth";
import { playlistsLoad } from "./reducers/Playlist";
import { videoError } from "./reducers/Video";
import { notificationShow } from "./reducers/Notification";
import { searchQuery } from "./reducers/Search";

const translation = translator({
  [authLoginActions.complete]: [replace("/"), playlistsLoad()],
  [authToken]: [playlistsLoad()],
  [authLogoutActions.complete]: [replace("/login")],
  [authUnauthenticated]: [replace(`/login?redirect=${window.location.pathname}`)],
  [videoError]: a => [notificationShow(`Video error. Code: ${a.payload}`)],
  [LOCATION_CHANGE]: a => {
    if (a.payload.pathname.startsWith("/search")) {
      return [searchQuery()];
    }

    return [];
  },
});

export default function configureStore(initialState, routes) {
  const composers = [
    applyMiddleware(thunk, routerMiddleware(browserHistory), translation),
  ];

  if (window.devToolsExtension) {
    // https://github.com/zalmoxisus/redux-devtools-extension
    composers.push(window.devToolsExtension({
      // https://github.com/zalmoxisus/redux-devtools-extension/issues/159
      statesFilter: state => {
        if (state.Video.player) {
          return { ...state, Video: { ...state.Video, player: "<<PLAYER>>" } };
        }

        return state;
      },
    }));
  }

  return createStore(reducers, initialState, compose(...composers));
}
