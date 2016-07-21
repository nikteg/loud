import React from "react";
import { render } from "react-dom";

import { applyMiddleware, compose, createStore } from "redux";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { Router, Route, IndexRoute, browserHistory, Link } from "react-router";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";

import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { videoLoad, videoProgressTick, videoPlayPause } from "./reducers/Video";

import reducers from "./reducers";

require("normalize.css");
require("./style/global.styl");

const App = (props) => (
  <div className="App">
    <div className="App-wrapper">
      <Sidebar activeItem={props.params.id} />
      <div className="App-wrapper-content">
        {props.children}
      </div>
    </div>
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

const Welcome = (props) => <div className="Welcome">Welcome to Loud. Try playing a playlist in the sidebar.</div>;

const playlist = {
  test: [
    { name: "Audien - Rooms (Audio)", id: "j8QwmTsW-ec" },
    { name: "Biggie Smalls - Hypnotize", id: "Q_5kh91LESE" },
    { name: "Lenx & Denx - Fiesta (Radio Edit)", id: "fHw1VuwnqlY" },
    { name: "Bastille - Good Grief (Don Diablo Remix) | Official Music Video", id: "Iaa03itxNZ0" },
    { name: "Deorro feat. Elvis Crespo - Bailar (Radio Edit)", id: "k5uezBN-ZR0" },
    { name: "Tritonal ft. Chris Ramos & Shanahan - This Is Love (King Arthur Remix)", id: "TAT3gvpiSk8" },
    { name: "Ship Wrek & Zookeepers - Stranded", id: "LNcicU_A55Q" },
    { name: "[Future Bass] - Conro - City Lights (feat. Royal) [Monstercat Release]", id: "amrvJOcaPpo" },
    { name: "JETFIRE & Qulinez ft. Karmatek - I Feel", id: "6Hjpew-RouA" },
    { name: "Vicetone - Nevada (feat. Cozi Zuehlsdorff) [Monstercat Official Music Video]", id: "QqccaHauSKQ" },
  ],
  test2: [
    { name: "Noah Neiman & The Mutints - Never Die", id: "XFo2dUCRsYs" },
    { name: "Promise Land & Luciana - Rebound To The Beat (Official Music Video)", id: "1_y5Fa_Q9h0" },
    { name: "Justin Jay ft Chris Lorenzo - Storm", id: "NE9ZfowSOUw" },
    { name: "Twang Machine", id: "JnYVdH4WB6A" },
    { name: "Caravan Palace - Comics", id: "gaFh71YwZ4Y" },
    { name: "Oliver Heldens feat. RUMORS - Ghost (Official Music Video)", id: "dPnEXx1vwVA" },
    { name: "Vice Feat. Caitlyn Scarlett - Bad Love (ESH Remix)", id: "UG2ZtXJ6mro" },
    { name: "RetroVision - Happy Hour", id: "rhJA1qATcXA" },
  ],
};

const ListItem = connect((state, ownProps) => ({
  path: state.Video.id === ownProps.id && state.Video.state === "play" ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z"></path> : <path d="M4.5 2l10 6-10 6z"></path>,
}), { videoLoad })((props) => (
  <li className="ListItem">
    <button onClick={() => props.videoLoad(props.id, true)} className="ListItem-button">
      <svg viewBox="0 0 16 16">
        {props.path}
      </svg>
    </button>
    <Link to={`/${props.id}`} className="ListItem-title">{props.name}</Link>
  </li>
));

const List = (props) => (
  <div className="List">
    <ul>
      {playlist[props.params.id].map((item, i) => (
        <ListItem key={i} id={item.id} name={item.name} />
      ))}
    </ul>
  </div>
);

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

window.redux = store;

setInterval(() => videoProgressTick()(store.dispatch, store.getState), 500);

window.addEventListener("keydown", e => {
  if (e.keyCode === 32) {
    e.preventDefault();
    store.dispatch(videoPlayPause());
  }
});

const history = syncHistoryWithStore(browserHistory, store);

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
