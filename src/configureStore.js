import { applyMiddleware, compose, createStore } from "redux";
import { push, routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
import thunk from "redux-thunk";
import translator from "redux-action-translator";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

import reducers from "./reducers";
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from "./actions";
import { Actions as PlaylistActions } from "./reducers/Playlist";
import { Actions as VideoActions } from "./reducers/Video";
import { Actions as NotificationActions } from "./reducers/Notification";
import { Actions as SearchActions } from "./reducers/Search";

const translation = translator({
  [AUTH_LOGIN.complete]: [push("/"), PlaylistActions.loadAll()],
  [AUTH_LOGOUT.complete]: [push("/"), VideoActions.stop()],
  [SearchActions.searchActions.error]: (a) => [NotificationActions.show(`Search error. ${a.payload}.`)],
  [VideoActions.error]: (a) => [NotificationActions.show(`Video error. Code: ${a.payload}`)],
});

const errorLogger = () => (next) => (action) => {
  if (action.error) {
    console.group(action.type);
    console.info("Error in action", action);
    console.log(action.payload);
    console.groupEnd(action.type);
  }

  return next(action);
};

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const composers = [
    applyMiddleware(thunk, routerMiddleware(browserHistory), translation, sagaMiddleware, errorLogger),
  ];

  if (window.devToolsExtension) {
    // https://github.com/zalmoxisus/redux-devtools-extension
    composers.push(window.devToolsExtension({
      // https://github.com/zalmoxisus/redux-devtools-extension/issues/159
      stateSanitizer: (state) => {
        if (state.Video.player) {
          return { ...state, Video: { ...state.Video, player: "<<PLAYER>>" } };
        }

        return state;
      },
      actionsBlacklist: ["VIDEO_PROGRESS"],
    }));
  }

  const store = createStore(reducers, initialState, compose(...composers));
  sagaMiddleware.run(rootSaga);

  return store;
}
