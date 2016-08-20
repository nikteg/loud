const Youtube = require("youtube-api");
const Spotify = require("spotify-web-api-node");
const squel = require("squel");
const readline = require("readline");

function time(str) {
  const m = str.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const [_, hours, minutes, seconds] = m;

  return (hours | 0) * 3600 + (minutes | 0) * 60 + (seconds | 0);
}

/* eslint-disable no-control-regex, quotes, prefer-template */
function escapeString(val) {
  return val.replace(/[\0\n\r\b\t\\'"\x1a]/g, s => {
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
}
/* eslint-enable no-control-regex, quotes, prefer-template */

function chunk(arr, len) {
  const chunks = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

Youtube.authenticate({
  type: "key",
  key: process.env.YOUTUBE_KEY || "",
});

const sp = new Spotify({
  clientId: process.env.SPOTIFY_ID || "",
  clientSecret: process.env.SPOTIFY_SECRET || "",
});

function processInput(ids) {
  console.log("Converting", ids.length, "inputs");

  Promise.all(chunk(ids, 50).map(x => sp.getTracks(x)
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
        key: item && item.id.videoId || null,
        artist: track.artist,
        name: track.name,
      });
    })))))
    .then(tracks => new Promise((resolve, reject) => Youtube.videos.list({
      part: "contentDetails",
      id: tracks.filter(t => {
        const missing = t.key === null;

        if (missing) {
          console.log("Missing", t);
        }

        return !missing;
      }).map(t => t.key).join(","),
      maxResults: 50,
    }, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data.items.map(item => {
        const track = tracks.find(t => t.key === item.id);

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
    })))))
    .then(results => Array.prototype.concat.apply([], results)) // Flatten results array
    .then(res => console.log(`Got ${res.length} results\n${squel.insert()
      .into("tracks")
      .setFieldsRows(res)
      .toString()}`))
    .catch(err => console.error(err));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const input = [];

rl.on("line", line => input.push(line));

rl.on("close", () => {
  const ids = input.map(i => (i.length === 22 ? i : i.slice(-22)));
  processInput(ids);
});
