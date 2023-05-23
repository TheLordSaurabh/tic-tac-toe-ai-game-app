import React from "react";
import "./About.css";

export const About = () => {
  return (
    <div className = "About">
      <div className="about">
        <h4>
          Tic-Tac-Toe Game (Web Application) made using React Js.<br></br> 
          It has aspecial Human vs Computer Mode in which User can play against the
          Computer. <br></br>
          This feature is implemented using one of the AI Methods
          (Mini-Max Algorithm with Alpha-Beta Pruning)
        </h4>
      </div>
      <div className="about">
        <h4>
          Fun Fact : It's impossible to win against the inbuilt AI. You either
          lose the match or there is a tie.
        </h4>
      </div>
    </div>
  );
}
