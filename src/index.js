import React from "react";
import { render } from "react-dom";

import configureStore from "./configureStore";
import Root from "./components/Root";

import {
  videoProgressTick,
  videoPlayPause,
  videoPopup,
  videoPopupToggle,
  videoSeekRelative,
  videoMuteToggle,
  videoListPrev,
  videoListNext,
} from "./reducers/Video";

import "normalize.css";
import "./style/global.styl";

const store = configureStore();

window.redux = store;

setInterval(() => videoProgressTick()(store.dispatch, store.getState), 500);

window.addEventListener("keydown", e => {
  if (e.altKey || e.ctrlKey || e.metaKey) {
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

render(<Root store={store} />, document.getElementById("app"));
