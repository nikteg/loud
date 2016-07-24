import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import { hashHistory } from "react-router";
import thunk from "redux-thunk";

import reducers from "./reducers";

export default function configureStore(initialState) {
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
