import React from "react";

import "./style.styl";

export default function Loader(props) {
  return (
    props.show && <div className="Loader" />
  );
}
