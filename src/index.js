import React from "react";
import { render } from "react-dom";

import { applyMiddleware, compose, createStore } from "redux";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { Router, Route, IndexRoute, browserHistory, Link } from "react-router";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";

import Footer from "./components/Footer/Footer";
import { videoLoad, videoProgressTick } from "./reducers/Video";

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

const Welcome = (props) => <div className="Welcome">Welcome to Loud. <Link to="/klIWLlJXplY">Test this</Link></div>;

function configureStore(initialState) {
  const composers = [
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
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

setInterval(() => videoProgressTick()(store.dispatch, store.getState), 500);

const history = syncHistoryWithStore(browserHistory, store);

const root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path=":id" component={Preview} />
      </Route>
    </Router>
  </Provider>
);

render(root, document.getElementById("app"));
