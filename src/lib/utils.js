import { createAction } from "redux-actions";

export function createNetworkAction(prefix) {
  return {
    start: createAction(`${prefix}_START`),
    error: createAction(`${prefix}_ERROR`, error => error),
    complete: createAction(`${prefix}_COMPLETE`, res => res),
  };
}
