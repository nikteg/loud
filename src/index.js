import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import decode from "jwt-decode";

import configureStore from "./configureStore";
import { setStore as setApiStore } from "./lib/api";
import routes from "./routes";

import { Actions as VideoActions } from "./reducers/Video";

import { Actions as AuthActions } from "./reducers/Auth";
import { titleSelector } from "./reducers";

import "normalize.css";
import "./style/global.styl";

const store = configureStore({});

store.subscribe(() => document.title = titleSelector(store.getState()));

setApiStore(store);

window.redux = store;

// store.dispatch(playlistsLoad());

if (localStorage.getItem("token") != null) {
  const token = localStorage.getItem("token");

  let id, username;

  try {
    ({ id, username } = decode(token));
  } catch (err) {
    localStorage.removeItem("token");
    console.error("Could not decode token", token, err);
    store.dispatch(AuthActions.unauthenticated());
  } finally {
    if (id && username) {
      store.dispatch(AuthActions.token({ id, username, token }));
    }
  }
}

window.addEventListener("keydown", e => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.target.tagName === "INPUT") {
    return;
  }

  if (e.keyCode === 32 || e.keyCode === 75) { // Space or K
    e.preventDefault();
    store.dispatch(VideoActions.playPause());
  }

  if (e.keyCode === 27) { // Esc
    e.preventDefault();
    store.dispatch(VideoActions.popup(false));
  }

  if (e.keyCode === 70) { // F
    e.preventDefault();
    store.dispatch(VideoActions.popupToggle());
  }

  if (e.keyCode === 76) { // L
    e.preventDefault();
    store.dispatch(VideoActions.seekRelative(10));
  }

  if (e.keyCode === 74) { // J
    e.preventDefault();
    store.dispatch(VideoActions.seekRelative(-10));
  }

  if (e.keyCode === 77) { // M
    e.preventDefault();
    store.dispatch(VideoActions.muteToggle());
  }

  if (e.keyCode === 66) { // B
    e.preventDefault();
    store.dispatch(VideoActions.listPrev());
  }

  if (e.keyCode === 78) { // N
    e.preventDefault();
    store.dispatch(VideoActions.listNext());
  }
});

const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      {routes(store)}
    </Router>
  </Provider>
), document.getElementById("app"));
