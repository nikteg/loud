import { browserHistory } from "react-router"
import { push, routerMiddleware } from "react-router-redux"
import { applyMiddleware, compose, createStore } from "redux"
import translator from "redux-action-translator"
import thunk from "redux-thunk"

import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas"

import { Actions as NotificationActions } from "reducers/Notification"
import { Actions as PlaylistActions } from "reducers/Playlist"
import { Actions as SearchActions } from "reducers/Search"
import { Actions as VideoActions } from "reducers/Video"
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from "./actions"
import reducers from "./reducers"

const translation = translator({
  [AUTH_LOGIN.done.type]: [push("/"), PlaylistActions.loadAll()],
  [AUTH_LOGOUT.done.type]: [push("/"), VideoActions.stop()],
  [SearchActions.searchActions.error.toString()]: (a) => [NotificationActions.show(`Search error. ${a.payload}.`)],
  [VideoActions.error.toString()]: (a) => [NotificationActions.show(`Video error. Code: ${a.payload}`)],
})

const errorLogger = () => (next) => (action) => {
  if (action.error) {
    console.group(action.type)
    console.info("Error in action", action)
    console.log(action.payload)
    console.groupEnd()
  }

  return next(action)
}

declare const window: {
  devToolsExtension,
}

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory),
      translation, sagaMiddleware, errorLogger),
    window.devToolsExtension ? window.devToolsExtension({

      // https://github.com/zalmoxisus/redux-devtools-extension/issues/159
      stateSanitizer: (state) => {
        if (state.Video.player) {
          return { ...state, Video: { ...state.Video, player: "<<PLAYER>>" } }
        }

        return state
      },
      actionsBlacklist: ["VIDEO_PROGRESS"],
    }) : (f) => f))

  sagaMiddleware.run(rootSaga)

  return store
}
