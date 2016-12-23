import { applyMiddleware, compose, createStore } from "redux";
import { replace, routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
import thunk from "redux-thunk";
import translator from "redux-action-translator";

import reducers from "./reducers";
import { authLoginActions, authLogoutActions, authToken, authUnauthenticated } from "./reducers/Auth";
import { playlistsLoad } from "./reducers/Playlist";
import { videoError } from "./reducers/Video";
import { notificationShow } from "./reducers/Notification";
import { searchActions } from "./reducers/Search";

const translation = translator({
  [authLoginActions.complete]: [replace("/"), playlistsLoad()],
  [authToken]: [playlistsLoad()],
  [authLogoutActions.complete]: [replace("/login")],
  [searchActions.error]: a => [notificationShow(`Search error. ${a.payload}.`)],
  [authUnauthenticated]: [replace(`/login?redirect=${window.location.pathname}`),
    notificationShow("Unauthenticated. Please login again.")],
  [videoError]: a => [notificationShow(`Video error. Code: ${a.payload}`)]
});

export default function configureStore(initialState) {
  const composers = [
    applyMiddleware(thunk, routerMiddleware(browserHistory), translation),
  ];

  if (window.devToolsExtension) {
    // https://github.com/zalmoxisus/redux-devtools-extension
    composers.push(window.devToolsExtension({
      // https://github.com/zalmoxisus/redux-devtools-extension/issues/159
      stateSanitizer: (state) => {
        if (state.Video.player) {
          return { ...state, Video: { ...state.Video, player: "<<PLAYER>>" } };
        }

        return state;
      },
    }));
  }

  return createStore(reducers, initialState, compose(...composers));
}
