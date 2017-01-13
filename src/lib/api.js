import { Actions as AuthActions } from "../reducers/Auth";

let store;

export function setStore(s) {
  store = s;
}

export function dispatch(action) {
  if (store) {
    store.dispatch(action);
  }
}

export function request(route, token, method, params) {
  const options = {};

  options.method = method;

  options.headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    options.headers = Object.assign({
      "Authorization": `Bearer ${token}`,
    }, options.headers);
  }

  if (params) {
    options.body = JSON.stringify(params);
  }

  return fetch(`${process.env.API_URL}${route}`, options).then((res) => res.json()).then((json) => {
    if (json.error) {
      if (json.error === "Unauthenticated") {
        localStorage.removeItem("token");
        dispatch(AuthActions.unauthenticated());
      }

      throw new Error(json.error);
    }

    return json;
  });
}

export function requestWithoutToken(route, method, params) {
  return request(route, null, method, params);
}

// Auth

export function register(username, password) {
  return requestWithoutToken("/auth/register", "POST", { username, password });
}

export function login(username, password) {
  return requestWithoutToken("/auth/login", "POST", { username, password });
}

export function logout(token) {
  return request("/auth/logout", token, "POST", { token });
}

// Playlists

export function getPlaylists(token) {
  return request("/playlists", token, "GET");
}

export function getPlaylist(token, id) {
  return request(`/playlists/${id}`, token, "GET");
}

export function createPlaylist(token, name, tracks) {
  return request("/playlists", token, "POST", { name, tracks });
}

export function updatePlaylist(token, id, name, tracks) {
  return request(`/playlists/${id}`, token, "PATCH", { name, tracks });
}

export function removePlaylist(token, id) {
  return request(`/playlists/${id}`, token, "DELETE");
}

// Search

export function search(token, query) {
  return request("/tracks/search", token, "POST", { query });
}

// Profiles

export function getUser(token, username) {
  return request(`/users/${username}`, token, "GET");
}

// Tracks

export function getTracks(token) {
  return request("/tracks", token, "GET");
}

export function getTrack(token, id) {
  return request(`/tracks/${id}`, token, "GET")
    .then((json) => json.data); // Temporary because of the API format.
}
