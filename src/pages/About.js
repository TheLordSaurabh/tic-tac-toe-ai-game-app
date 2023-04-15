import React from "react";
import "./About.css";

export const About = () => {
  return (
    <div className = "About">
      <div className="about">
        <h3>
          Tic-Tac-Toe Game (Web Application) made using React Js. It has a
          special Human vs Computer Mode in which User can play against the
          Computer. This feature is implemented using one of the AI Methods
          (Game Tree Search - Mini-Max Algorithm with Alpha-Beta Pruning)
        </h3>
      </div>
      <div className="about">
        <h3>
          Fun Fact : It's impossible to win against the inbuilt AI. You either
          lose the match or there is a tie.
        </h3>
      </div>
    </div>
  );
}
