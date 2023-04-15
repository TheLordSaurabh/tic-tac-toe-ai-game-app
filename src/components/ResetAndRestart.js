import React from "react";

import "./ResetAndRestart.css";

export const ResetAndRestart = ({ resetBoard, restartGame }) => {
  return (
    <div className="ResetAndRestart">
      <div className="center_div">
        <div className="btn_div">
          <button className="rbtn" onClick={resetBoard}>
            Reset
          </button>
          <button className="rbtn" onClick={restartGame}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};
