import { applyMiddleware, compose, createStore } from "redux";
import { reduxReactRouter, replace } from "redux-router";
import { createHistory } from "history";
import thunk from "redux-thunk";
import translator from "redux-action-translator";

import reducers from "./reducers";
import { authLoginActions, authLogoutActions, authToken } from "./reducers/Auth";
import { playlistsLoad } from "./reducers/Playlist";
import { videoError } from "./reducers/Video";
import { notificationShow } from "./reducers/Notification";

const translation = translator({
  [authLoginActions.complete]: [replace("/"), playlistsLoad()],
  [authToken]: [playlistsLoad()],
  [authLogoutActions.complete]: [replace("/login")],
  [videoError]: a => [notificationShow(`Video error. Code: ${a.payload}`)],
});

export default function configureStore(initialState, routes) {
  const composers = [
    applyMiddleware(thunk, translation),
    reduxReactRouter({
      routes,
      createHistory,
    }),
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

  const store = compose(
    ...composers
  )(createStore)(reducers, initialState);

  return store;
}
