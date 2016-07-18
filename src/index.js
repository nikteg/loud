import React from "react";
import { render } from "react-dom";

import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from "react-router-redux";
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";

import YouTube from "react-youtube";

import Player from "./components/Player/Player";

require("normalize.css");
require("./style/global.styl");

const Example1 = () => <YouTube videoId="2g811Eo7K8U" />;
const Example2 = () => <YouTube videoId="BdPosNHFWk4" />;

const App = (props) => <div className="app">{props.children}</div>;

const routes = (
  <Route path="/" component={Example1}>
    <Route path="lol" component={Example2} />
  </Route>
);

const reducer = combineReducers({
  routing: routerReducer,
  //app: rootReducer, //you can combine all your other reducers under a single namespace like so
});

function configureStore(initialState) {
  const composers = [
    applyMiddleware(routerMiddleware(browserHistory)),
  ];

  if (window.devToolsExtension) {
    // https://github.com/zalmoxisus/redux-devtools-extension
    composers.push(window.devToolsExtension());
  }

  const store = compose(
    ...composers
  )(createStore)(reducer, initialState);

  return store;
}

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="player/:id" component={Player} />
        <Route path="bar" component={Example2} />
      </Route>
    </Router>
  </Provider>
);

render(root, document.getElementById("app"));
