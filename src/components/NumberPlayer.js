import React from "react";

import "./NumberPlayer.css";

export const NumberPlayer = ({ mode, changeMode }) => {
  const text =
    mode === true ? "Change to 2 Player Mode?" : "Change to Human Vs AI Mode?";
  const val = mode === true ? "2-Player" : "1-Player";
  return (
    <button className="rbtn" onClick={changeMode} value={val}>
      {text}
    </button>
  );
};
