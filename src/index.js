import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ReduxRouter } from "redux-router";
import crosstab from "crosstab";

import configureStore from "./configureStore";
import routes from "./routes";

import {
  videoProgressTick,
  videoPlayPause,
  videoPopup,
  videoPopupToggle,
  videoSeekRelative,
  videoMuteToggle,
  videoListPrev,
  videoListNext,
  videoPause,
} from "./reducers/Video";

import { authLoginActions } from "./reducers/Auth";

import "normalize.css";
import "./style/global.styl";

const store = configureStore({}, routes);

window.redux = store;

// store.dispatch(playlistsLoad());

if (localStorage.getItem("token") != null) {
  const token = localStorage.getItem("token");
  store.dispatch(authLoginActions.complete(token));
}

setInterval(() => videoProgressTick()(store.dispatch, store.getState), 500);

crosstab.on("PAUSE", () => {
  console.log("got pause event");
  store.dispatch(videoPause());
});

window.addEventListener("keydown", e => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.target !== document.body) {
    return;
  }

  if (e.keyCode === 32 || e.keyCode === 75) { // Space or K
    e.preventDefault();
    store.dispatch(videoPlayPause());
  }

  if (e.keyCode === 27) { // Esc
    e.preventDefault();
    store.dispatch(videoPopup(false));
  }

  if (e.keyCode === 70) { // F
    e.preventDefault();
    store.dispatch(videoPopupToggle());
  }

  if (e.keyCode === 76) { // L
    e.preventDefault();
    store.dispatch(videoSeekRelative(10));
  }

  if (e.keyCode === 74) { // J
    e.preventDefault();
    store.dispatch(videoSeekRelative(-10));
  }

  if (e.keyCode === 77) { // M
    e.preventDefault();
    store.dispatch(videoMuteToggle());
  }

  if (e.keyCode === 66) { // B
    e.preventDefault();
    store.dispatch(videoListPrev());
  }

  if (e.keyCode === 78) { // N
    e.preventDefault();
    store.dispatch(videoListNext());
  }
});

render((
  <Provider store={store}>
    <ReduxRouter>
      {routes}
    </ReduxRouter>
  </Provider>
), document.getElementById("app"));
