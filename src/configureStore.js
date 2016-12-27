import { applyMiddleware, compose, createStore } from "redux";
import { replace, routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
import thunk from "redux-thunk";
import translator from "redux-action-translator";

import reducers from "./reducers";
import { Actions as AuthActions } from "./reducers/Auth";
import { Actions as PlaylistActions } from "./reducers/Playlist";
import { Actions as VideoActions } from "./reducers/Video";
import { Actions as NotificationActions } from "./reducers/Notification";
import { Actions as SearchActions } from "./reducers/Search";

const translation = translator({
  [AuthActions.loginActions.complete]: [replace("/"), PlaylistActions.loadAll()],
  [AuthActions.token]: [PlaylistActions.loadAll()],
  [AuthActions.logoutActions.complete]: [replace("/login")],
  [SearchActions.searchActions.error]: a => [NotificationActions.show(`Search error. ${a.payload}.`)],
  [AuthActions.unauthenticated]: [replace(`/login?redirect=${window.location.pathname}`),
    NotificationActions.show("Unauthenticated. Please login again.")],
  [VideoActions.error]: a => [NotificationActions.show(`Video error. Code: ${a.payload}`)]
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
      actionsBlacklist: ["VIDEO_PROGRESS"],
    }));
  }

  return createStore(reducers, initialState, compose(...composers));
}
