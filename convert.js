const Youtube = require("youtube-api");
const Spotify = require("spotify-web-api-node");
const squel = require("squel");

function time(str) {
  const m = str.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const [_, hours, minutes, seconds] = m;

  return (hours | 0) * 3600 + (minutes | 0) * 60 + (seconds | 0);
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
  "5icQPWnFDC6NwMG3WxHbWA",
  "54eMQtMWx6v3oSO5NQ8eFk",
  "50uaVi1LyFRFh5G31ekOEH",
  "1JUfgsFPWjXT3ZzzV77v5u",
  "68ngtC3pGiTjXcFwxYCJ7Z",
  "11Z2LPIMeL9c2JewVQqm3x",
  "3qfzns5jryamL2L8oiZKJS",
  "6FuGdbjGbdd6dRdDytiTdP",
  "6UxQzqbzPMJsyNiWwMXGsI",
  "2N9Es6fUoyHgyqoOFwj96m",
  "7pxpEfYqCMM4H8tTJUdRwo",
  "15ytCRCtcC4vBpKE0v75YD",
  "6b5uymxUFq8cv2LPm8hUST",
  "1kU76lMtgVz6vvZ3dPyuJk",
  "4Q7fEjeCZgU8oxjbLWrm7L",
  "3e6pMd60bzt4Kd72qmPRfA",
  "2yWhs145kB7QBm5L4F6SF5",
  "5fewE5pYDUDXzAkdNPn4dC",
  "4l3oImI8p6k6YXoGkRuJon",
  "7hrDA2n8BVGLyHra0rBiFd",
  "2EyKwj4tMJY2Ai7LhXP9Ss",
  "5ZnzVZrSja6miEOxZIV8Q6",
  "2WEAygIAmaPDrjWcXKpnYY",
  "0ZG7CssB5lM2ILgJhMGNVE",
  "0fkgNje097R3eszeV59iTI",
  "4ed5Ght2TLCxgRoYNTJ8pV",
  "10oBaGT7m8jMpX41dg8lrX",
  "5369NKuQ1IHLM8mFYOAjwv",
  "6a1DLpMBCk8vxnsqbAQjxK",
  "6Wnj1xQ4gupa1ZnNQEq13H",
  "2UOBqxv5GVMHAV3ef3NZlb",
  "7oBK9lfHxvB9cd9W8MjswT",
  "4aLIXKvoljW1Pf0ZZqLY2s",
  "3sMleqdCDalZ6xsAQe8xuY",
  "717lZxxn53x2B0eucGiD1Z",
  "7GVMQa516ocresqjZ7XrfJ",
  "1bInwFd6cSbvcEDsDqHBBY",
  "3M0azGyGXdRxpQpoVxwwIO",
  "4iFIR2kpNw8yvmZr1o4SJP",
  "3F6mZ61oIQJobfg2qRPK4j",
  "3cSaidFaQ0gbHIh3uNRiKQ",
  "0sLY54A1FeIX94DwO8KK2B",
  "7vZmRkmFIcn6SXah40jN3n",
  "1RDQPsbR7hTKqBt1INYFHW",
  "52VIj0Dst4MxsEzTQyCjl0",
  "2WGa8iiHkdtpXcdeAP7nmo",
  "6K4pVhJMJjZDdm0mIqOluO",
  "1fJKGxYNWqfhemh6wTQvQQ",
  "7sJH9YMJbJBPsXnPtK0Hys",
  "20ztml2STRF7Sq1UaBB6ox",
  // "5QyvmZYiOuK0saTv6J77Yg",
  // "7kbLgu3ZU8wdigWyxtqOAB",
  // "2QO9NYp1GJlHU3lrIgsW4e",
  // "1gCd3CXppXSYCIM4SNAMmR",
  // "3v2jc9yGbSKKgVEn3k51AZ",
  // "38rMZCtAPuRgOuV3pyFDmF",
  // "5UFXAE1QXIGnmALcrQ4DgZ",
  // "2bHpNAMEsB3Wc00y87JTdn",
  // "5diYEPXX1eogo6iEuSgUQw",
  // "4eiTSqoxOWExDu57OSQWgr",
  // "19Oy2pBYfpz7OhraQQgUn8",
  // "6HO10cDh5hVY4JWARqWhH7",
  // "5RH1TvXCPnk8z10KbKCzmW",
  // "1SWex8tlZonAMKH262YQYd",
  // "4oRbtetfRzeik7KJ3JGBhH",
  // "3MXK7jlM09rfJ4mmzBVvzn",
  // "0aMvY2MmWBo7mjVGTBqlut",
  // "4WJqhO1zvtdj5mV8MB3dCm",
  // "5MvnLMIXoDZAcchH0UGb1P",
  // "4aFBzrtYYKrvjjyn3esqXg",
  // "3p8GZk4Lcc02CJSSo9q1WV",
  // "5T2lM2r829axVNboY722j0",
  // "65x4VYXS7D8MLYFQT2yiWA",
  // "5HE9nTNTJQeb0DdDHx7H53",
  // "2wA6QFTkf08csvx0lSdUxK",
  // "0P7lnn81aNwdv2kYWkCFLK",
  // "4iO6QiHMJUr6Mh1L17BMar",
  // "1vPIYyQhm7dC9I50HlZVsw",
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
  .then(res => console.log("\n" + squel.insert()
    .into("tracks")
    .setFieldsRows(res)
    .toString()))
  .catch(err => console.error(err));
