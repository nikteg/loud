export function request(route, token, params) {
  const options = {};

  options.method = (params ? "POST" : "GET");

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

  return fetch(`${API_URL}${route}`, options).then(res => res.json()).then(json => {
    if (json.error) {
      throw new Error(json.error);
    }

    return json;
  });
}

export function requestWithoutToken(route, params) {
  return request(route, null, params);
}

// Auth

export function register(username, password) {
  return requestWithoutToken("/auth/register", { username, password });
}

export function login(username, password) {
  return requestWithoutToken("/auth/login", { username, password });
}

export function logout(token) {
  return request("/auth/logout", token, { token });
}

// Playlists

export function getPlaylists(token) {
  return request("/playlists", token);
}

export function getPlaylist(token, id) {
  return request(`/playlists/${id}`, token);
}

export function createPlaylist(token, name, tracks) {
  return request("/playlists", token, { playlists: { name } }); // TODO: Format will be changed
}
