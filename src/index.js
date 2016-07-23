import React from "react";
import { render } from "react-dom";

import { applyMiddleware, compose, createStore } from "redux";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./components/App/App";
import Welcome from "./components/Welcome/Welcome";
import Preview from "./components/Preview/Preview";
import List from "./components/List/List";

import {
  videoProgressTick,
  videoPlayPause,
  videoPopup,
  videoPopupToggle,
  videoSeekRelative,
  videoMuteToggle,
} from "./reducers/Video";

import reducers from "./reducers";

import "normalize.css";
import "./style/global.styl";

function configureStore(initialState) {
  const composers = [
    applyMiddleware(thunk, routerMiddleware(hashHistory)),
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
});

const history = syncHistoryWithStore(hashHistory, store);

const root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path=":id" component={Preview} />
        <Route path="/list/:id" component={List} />
      </Route>
    </Router>
  </Provider>
);

render(root, document.getElementById("app"));
