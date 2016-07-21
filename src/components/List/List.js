import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { videoLoad } from "../../reducers/Video";

require("./List.styl");

const playlist = {
  test: [
    { name: "Audien - Rooms (Audio)", id: "j8QwmTsW-ec" },
    { name: "Biggie Smalls - Hypnotize", id: "Q_5kh91LESE" },
    { name: "Lenx & Denx - Fiesta (Radio Edit)", id: "fHw1VuwnqlY" },
    { name: "Bastille - Good Grief (Don Diablo Remix) | Official Music Video", id: "Iaa03itxNZ0" },
    { name: "Deorro feat. Elvis Crespo - Bailar (Radio Edit)", id: "k5uezBN-ZR0" },
    { name: "Tritonal ft. Chris Ramos & Shanahan - This Is Love (King Arthur Remix)", id: "TAT3gvpiSk8" },
    { name: "Ship Wrek & Zookeepers - Stranded", id: "LNcicU_A55Q" },
    { name: "[Future Bass] - Conro - City Lights (feat. Royal) [Monstercat Release]", id: "amrvJOcaPpo" },
    { name: "JETFIRE & Qulinez ft. Karmatek - I Feel", id: "6Hjpew-RouA" },
    { name: "Vicetone - Nevada (feat. Cozi Zuehlsdorff) [Monstercat Official Music Video]", id: "QqccaHauSKQ" },
  ],
  test2: [
    { name: "Noah Neiman & The Mutints - Never Die", id: "XFo2dUCRsYs" },
    { name: "Promise Land & Luciana - Rebound To The Beat (Official Music Video)", id: "1_y5Fa_Q9h0" },
    { name: "Justin Jay ft Chris Lorenzo - Storm", id: "NE9ZfowSOUw" },
    { name: "Twang Machine", id: "JnYVdH4WB6A" },
    { name: "Caravan Palace - Comics", id: "gaFh71YwZ4Y" },
    { name: "Oliver Heldens feat. RUMORS - Ghost (Official Music Video)", id: "dPnEXx1vwVA" },
    { name: "Vice Feat. Caitlyn Scarlett - Bad Love (ESH Remix)", id: "UG2ZtXJ6mro" },
    { name: "RetroVision - Happy Hour", id: "rhJA1qATcXA" },
  ],
};

const ListItem = connect((state) => ({
  isPlaying: state.Video.state === "play",
  id: state.Video.id,
}), { videoLoad }, (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  isPlaying: stateProps.isPlaying && ownProps.id === stateProps.id,
}))((props) => (
  <li className="ListItem">
    <button onClick={() => props.videoLoad(props.id, true)} className="ListItem-button">
      <svg viewBox="0 0 16 16">
        {props.isPlaying ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" /> : <path d="M4.5 2l10 6-10 6z" />}
      </svg>
    </button>
    <Link to={`/${props.id}`} className="ListItem-title">{props.name}</Link>
  </li>
));

const List = (props) => (
  <div className="List">
    <ul>
      {playlist[props.params.id].map((item, i) => (
        <ListItem key={item.id} id={item.id} name={item.name} />
      ))}
    </ul>
  </div>
);

export default List;
