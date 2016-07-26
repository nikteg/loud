import { createAction, handleActions } from "redux-actions";
// import { ROUTER_DID_CHANGE } from "redux-router/lib/constants";

export const playlistSelect = createAction("PLAYLIST_SELECT", key => key);

export default handleActions({
  [playlistSelect]: (state, action) => ({
    ...state,
    playlistKey: action.payload,
    playlist: state.playlists.get(action.payload) || [],
  }),
}, {
  playlists: new Map([
    ["test", [
      { id: "j8QwmTsW-ec", name: "Audien - Rooms (Audio)" },
      { id: "Q_5kh91LESE", name: "Biggie Smalls - Hypnotize" },
      { id: "fHw1VuwnqlY", name: "Lenx & Denx - Fiesta (Radio Edit)" },
      { id: "Iaa03itxNZ0", name: "Bastille - Good Grief (Don Diablo Remix) | Official Music Video" },
      { id: "k5uezBN-ZR0", name: "Deorro feat. Elvis Crespo - Bailar (Radio Edit)" },
      { id: "TAT3gvpiSk8", name: "Tritonal ft. Chris Ramos & Shanahan - This Is Love (King Arthur Remix)" },
      { id: "LNcicU_A55Q", name: "Ship Wrek & Zookeepers - Stranded" },
      { id: "amrvJOcaPpo", name: "[Future Bass] - Conro - City Lights (feat. Royal) [Monstercat Release]" },
      { id: "6Hjpew-RouA", name: "JETFIRE & Qulinez ft. Karmatek - I Feel" },
      { id: "QqccaHauSKQ", name: "Vicetone - Nevada (feat. Cozi Zuehlsdorff) [Monstercat Official Music Video]" },
    ]],
    ["test2", [
      { id: "XFo2dUCRsYs", name: "Noah Neiman & The Mutints - Never Die" },
      { id: "1_y5Fa_Q9h0", name: "Promise Land & Luciana - Rebound To The Beat (Official Music Video)" },
      { id: "NE9ZfowSOUw", name: "Justin Jay ft Chris Lorenzo - Storm" },
      { id: "JnYVdH4WB6A", name: "Twang Machine" },
      { id: "gaFh71YwZ4Y", name: "Caravan Palace - Comics" },
      { id: "dPnEXx1vwVA", name: "Oliver Heldens feat. RUMORS - Ghost (Official Music Video)" },
      { id: "UG2ZtXJ6mro", name: "Vice Feat. Caitlyn Scarlett - Bad Love (ESH Remix)" },
      { id: "rhJA1qATcXA", name: "RetroVision - Happy Hour" },
    ]],
  ]),
  playlistKey: "null",
  playlist: [],
});
