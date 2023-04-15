import React from "react";

import "./Box.css";

export const Box = ({ value, onClick }) => {
  let style = "box";
  if (value === "X") {
    style = "box x";
  }
  if (value === "O") {
    style = "box o";
  }
  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  );
};

//<button className={style} onClick={onClick}>{value}</button>
