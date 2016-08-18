const Youtube = require("youtube-api");
const Spotify = require("spotify-web-api-node");
const squel = require("squel");

function time(str) {
  const m = str.match(/(\d+)M(\d+)S/);

  const [_, minutes, seconds] = m;

  return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
}

function artistName(title) {
  return title.split(" - ").map(s => s.trim());
}

function escapeString(val) {
  val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, s => {
    switch (s) {
      case "\0":
        return "\\0";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\b":
        return "\\b";
      case "\t":
        return "\\t";
      case "\x1a":
        return "\\Z";
      case "'":
        return "''";
      case '"':
        return '""';
      default:
        return "\\" + s;
    }
  });

  return val;
}

Youtube.authenticate({
  type: "key",
  key: process.env.YOUTUBE_KEY || "",
});

const sp = new Spotify({
  clientId: process.env.SPOTIFY_ID || "",
  clientSecret: process.env.SPOTIFY_SECRET || "",
});

const ids = [
  "7Ktv8bQUjZt0rr16qgB4h2",
  "23L5CiUhw2jV1OIMwthR3S",
  "5BIjJP1zlOa3iY65RSkXkr",
  "12mGwph2YzDIlChtq3EdXP",
  "1DMjHWLTn2adWTlvRWFRHX",
  "4SN6lrnjMbxCP5gv6Kdv4W",
  "0jV2HSzU144aRkPJ198PpC",
  "558dmcqBAPeA7q4GvaunHy",
  "65sl2r11jL24d45nJa7CYr",
  "5DgZ5uQmCuLLkZhDnI5YKI",
  "2NpCp7UTgReqxSDlziI9A1",
  "6jHFpBtdFgxjpCkJpIVfAS",
  "0DBE3yeqV3exhYv6rG0C6w",
  "2QtUFjtiqu0dQsHzxMQA72",
  "648JcXIBXOgO4Tz2cIj9vm",
  "1yInsvKbKrDHP59jQRhjKP",
  "0FOOUOoRByaS21U4ugSAxJ",
  "2lweusZXHxg30xywFKuoo2",
  "3zGnmBVqExzsr6T9AttZIe",
  "0HJBrdktMripVW4LkyM7Ch",
  "64HH8QusEYZYm3wZEplgn9",
  "5dSFlPDHjAuYU1apyrRgqV",
  "1KxpxksJCa4IbaLeM7MsjZ",
  "3GiN9yJB8t7mlbJk0EAq68",
  "528D0o9LY71zQbjEL1vkwr",
  "7wT8K8VyhtJZeei3eS6kcP",
  "2ZCMqo7JeI7XtWTUy9W0VH",
  "0jPU39bL0SrCmYc1RwbFkX",
  "7Ct0Q46k5PkXzYiNE5D2dn",
  "6zocM6REm0LnGYxul6p4oe",
  "79IZKAygtVmTcVnJ2mlaIS",
  "13HEIb4DeOsMN8x8SxhzN8",
  "3x0S58XYhXuGhy5k7IW9u5",
  "1G8yVHxDLlEjDAt02Dfbmi",
  "2POSuQsl1kR3kqaJIuLooH",
  "1sZnQFDHBNr3BRa89NnKo9",
  "7zsXy7vlHdItvUSH8EwQss",
  "2I0Q1wxFRdnDYtG6Q8W47S",
  "0icXJsRd0hU7mAgNuulESd",
  "4g3zYgAu9aqljVDQziTX8c",
  "3jmxVk1zqPoUpXLKr7MJfw",
  "2qFxaqBT4rHl3Nzs4mgUE7",
  "149kdyQwLdqHBjXbbNS7FY",
  "3BOzUXGMEmPU2F84fD4GO8",
  "7cakSyQJf4SAjyqdSUO9p1",
  "6OqCKehHh5tTNSZYh8bS8B",
  "20UdW4qyeOmKa9YaOcv9WX",
  "04xv54hUEufXk0GVTSQ5C9",
  "3YlrH4ydAKkxuej6F4Nnkl",
  "6NSjdFYF2zxgQ7UvsKoRxy",
];

sp.getTracks(ids)
  .then(data => data.body.tracks)
  .then(tracks => tracks.map(t => ({
    name: t.name,
    artist: t.artists.map(a => a.name).join(", "),
  })))
  .then(tracks => Promise.all(tracks.map(track => new Promise((resolve, reject) => Youtube.search.list({
    part: "snippet",
    maxResults: 1,
    q: [track.artist, track.name].join(" "),
    type: "video",
  }, (err, data) => {
    if (err) {
      console.error(err);
      return reject(err);
    }

    const item = data.items[0];

    resolve({
      key: item.id.videoId,
      artist: track.artist,
      name: track.name,
    });
  })))))
  .then(tracks => new Promise((resolve, reject) => Youtube.videos.list({
    part: "contentDetails",
    id: tracks.map(t => t.key).join(","),
    maxResults: 50,
  }, (err, data) => {
    if (err) {
      return reject(err);
    }

    resolve(data.items.map(item => {
      const track = tracks.find(t => t.key == item.id);

      return {
        key: item.id,
        artist: escapeString(track.artist),
        name: escapeString(track.name),
        duration: time(item.contentDetails.duration),
      };
    }));
  })))
  .then(res => res.map(r => Object.assign(r, {
    inserted_at: squel.str("NOW()"),
    updated_at: squel.str("NOW()"),
  })))
  .then(res => console.log(squel.insert()
    .into("tracks")
    .setFieldsRows(res)
    .toString()))
  .catch(err => console.error(err));
