import React from "react";
import { render } from "react-dom";

import { applyMiddleware, compose, createStore } from "redux";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { Router, Route, browserHistory } from "react-router";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";

import Footer from "./components/Footer/Footer";
import { videoLoad } from "./reducers/Video";

import reducers from "./reducers";

require("normalize.css");
require("./style/global.styl");

const App = (props) => (
  <div className="wrapper">
    <div className="Header"></div>
    {props.children}
    <Footer />
  </div>
);

const Preview = connect((state, ownProps) => ({
  id: ownProps.params.id,
}), { videoLoad })((props) => (
  <div className="Preview">
    Preview for {props.id}.
    Wanna play? Press <a onClick={() => props.videoLoad(props.id)}>here</a>
  </div>
));

function configureStore(initialState) {
  const composers = [
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
  ];

  if (window.devToolsExtension) {
    // https://github.com/zalmoxisus/redux-devtools-extension
    composers.push(window.devToolsExtension());
  }

  const store = compose(
    ...composers
  )(createStore)(reducers, initialState);

  return store;
}

const store = configureStore();

window.leif = store;

const history = syncHistoryWithStore(browserHistory, store);

const root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path=":id" component={Preview} />
      </Route>
    </Router>
  </Provider>
);

render(root, document.getElementById("app"));
