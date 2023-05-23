import React from "react";

import { Box } from "./Box";
import "./Board.css";

const isEmpty = (mat) =>{
  for(let i = 0; i < mat.length; i++){
    if(mat[i]!=null){
      return false;
    }
  }
  return true;
}

export const Board = ({ board,next_,one_player, x_playing, game_over, onClick }) => {
  let next = ((one_player===true)&&(x_playing===false)&&(game_over ===false)&&(next_===true)&&(!isEmpty(board)))?true:false;
  if( next === true) {
    onClick();
    return (<div></div>);
  }
  else{
    return (
      <div className="board">
        {board.map((value, idx) => {
          return (
            <Box
              value={value}
              onClick={() => {
                if(value === null)onClick(idx);
              }}
            />
          );
        })}
      </div>
    );
  }

};
