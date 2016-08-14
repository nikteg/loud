export default function windowTitle({ getState }) {
  return next => action => {
    next(action);

    document.title = (() => {
      const base = "Loud";

      const titles = [
        { path: "/search", getTitle: () => "Search" },
        { path: "/profile", getTitle: () => getState().router.params.username },
        { path: "/list", getTitle: () => {
          const playlist = getState().Playlist.playlists.find(list => list.id === +getState().router.params.id);

          if (playlist) {
            return playlist.name;
          }
        } },
      ];

      if (getState().Video.state === "play") {
        const currentTrack = getState().Playlist.playlist.tracks[getState().Video.playlistIndex];

        return `${currentTrack.artist} - ${currentTrack.name}`;
      }

      for (const { path, getTitle } of titles) {
        if (getState().router.location.pathname.startsWith(path)) {
          const title = getTitle();

          if (title) {
            return `${title} - ${base}`;
          }
        }
      }

      return base;
    })();
  };
}
