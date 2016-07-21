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

import { videoProgressTick, videoPlayPause } from "./reducers/Video";

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
  if (e.keyCode === 32) {
    e.preventDefault();
    store.dispatch(videoPlayPause());
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
