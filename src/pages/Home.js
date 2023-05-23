import React, { useState } from "react";

import { ScoreBoard } from "../components/ScoreBoard";
import { NumberPlayer } from "../components/NumberPlayer";
import { Board } from "../components/Board";
import { RedoButton } from "../components/RedoButton";
import { ResetAndRestart } from "../components/ResetAndRestart";
export const Home = () => {
  const win_combinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [6, 7, 8],
    [2, 5, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6]
  ];

  function getOpponent(player) {
    return player === "X" ? "O" : "X";
  }
  //Limits
  const inf = 1000000000;
  const ninf = -1000000000;

  class MaxNode {
    constructor(state, player, main_player, parent_beta = inf) {
      this.main_player = main_player;
      this.parent_beta = parent_beta;
      this.player = player;
      this.opponent = getOpponent(this.player);
      this.alpha = ninf;
      this.state = [...state];//Deep Copy
      this.final_state = Array(9).fill(null);
      this.n = this.state.length;
      this.createBranches(); //Tree is Created Here
    }
    copyArray(array1, array2) {
      for (let i = 0; i < array1.length; i++) {
        array1[i] = array2[i];
      }
    }

    allDone(state) {
      for (let i = 0; i < 9; i++) {
        if (state[i] === null) {
          return false;
        }
      }
      return true;
    }

    //if player wins then return 1, 1 for opponent wins and 0 if draw
    checkWin(arry, player) {
      let nArr = [];
      let arr = [...arry];
      while (arr.length > 0) {
        nArr.push(arr.splice(0, 3));
      }
      let state = [...nArr];

      for (let i = 0; i < 3; i++) {
        if (state[i][0] === state[i][1] && state[i][1] === state[i][2]) {
          if (state[i][0] === getOpponent(player)) {
            return -1;
          }
          if (state[i][0] === player) {
            return 1;
          }
        }
      }
      for (let i = 0; i < 3; i++) {
        if (state[0][i] === state[1][i] && state[1][i] === state[2][i]) {
          if (state[0][i] === getOpponent(player)) {
            return -1;
          }
          if (state[0][i] === player) {
            return 1;
          }
        }
      }

      //checking diagnols
      //top left - bottom right
      if (state[0][0] === state[1][1] && state[1][1] === state[2][2]) {
        if (state[0][0] === getOpponent(player)) {
          return -1;
        }
        if (state[0][0] === player) {
          return 1;
        }
      }
      //top right - bottom left
      if (state[0][2] === state[1][1] && state[2][0] === state[1][1]) {
        if (state[0][2] === getOpponent(player)) {
          return -1;
        }
        if (state[0][2] === player) {
          return 1;
        }
      }
      return 0;
    }

    createBranches() {
      if (this.allDone(this.state)) {
        this.final_state = [...this.state];
        this.alpha = this.checkWin(this.state, this.main_player);
        return this.alpha;
      }

      let temp = [...this.state];
      for (let i = 0; i < 9; i++) {
        //Pruning happens when current alpha is greater than the parent beta
        if (this.parent_beta < this.alpha) {
          return this.alpha;
        }
        //Exploring the new search trees
        if (temp[i] === null) {
          temp[i] = this.player; //Making New Move

          //Best Case Scenario
          let win_ = this.checkWin(temp, this.main_player);
          if (win_ === 1) {
            this.alpha = 1;
            this.final_state = [...temp];
            temp[i] = null; //Removing the introduced Move
            return this.alpha;
          }

          let minnode = new MinNode(temp,this.opponent,this.main_player,this.alpha);

          if (minnode.beta > this.alpha) {
            this.alpha = minnode.beta;
            this.final_state = [...temp];
          }
          temp[i] = null; //Removing the introduced Move
        }
      }
      return this.alpha;
    }
  }

  class MinNode {
    constructor(state, player, main_player, parent_alpha = ninf) {
      this.main_player = main_player;
      this.parent_alpha = parent_alpha;
      this.player = player;
      this.opponent = getOpponent(this.player);
      this.beta = inf;
      this.state = [...state];
      this.final_state = Array(9).fill(null);
      this.n = this.state.length;
      this.createBranches();
    }
    copyArray(array1, array2) {
      for (let i = 0; i < array1.length; i++) {
        array1[i] = array2[i];
      }
    }

    allDone(state) {
      for (let i = 0; i < 9; i++) {
        if (state[i] === null) {
          return false;
        }
      }
      return true;
    }

    //if player wins then return 1, 1 for opponent wins and 0 if draw
    checkWin(arry, player) {
      let arr = [...arry];
      let nArr = [];
      while (arr.length > 0) {
        nArr.push(arr.splice(0, 3));
      }
      let state = nArr;

      for (let i = 0; i < 3; i++) {
        if (state[i][0] === state[i][1] && state[i][1] === state[i][2]) {
          if (state[i][0] === getOpponent(player)) {
            return -1;
          }
          if (state[i][0] === player) {
            return 1;
          }
        }
      }
      for (let i = 0; i < 3; i++) {
        if (state[0][i] === state[1][i] && state[1][i] === state[2][i]) {
          if (state[0][i] === getOpponent(player)) {
            return -1;
          }
          if (state[0][i] === player) {
            return 1;
          }
        }
      }

      //checking diagnols
      //top left - bottom right
      if (state[0][0] === state[1][1] && state[1][1] === state[2][2]) {
        if (state[0][0] === getOpponent(player)) {
          return -1;
        }
        if (state[0][0] === player) {
          return 1;
        }
      }
      //top right - bottom left
      if (state[0][2] === state[1][1] && state[2][0] === state[1][1]) {
        if (state[0][2] === getOpponent(player)) {
          return -1;
        }
        if (state[0][2] === player) {
          return 1;
        }
      }
      return 0;
    }

    createBranches() {
      if (this.allDone(this.state)) {
        this.final_state = [...this.state];
        this.beta = this.checkWin(this.state, this.main_player);
        return this.beta;
      }

      let temp = [...this.state];
      for (let i = 0; i < 9; i++) {
        //Pruning happens when current beta is less than the parent alpha or alphas of all the alpha nodes
        if (this.parent_alpha > this.beta) {
          return this.beta;
        }
        //Exploring the new search trees
        if (temp[i] === null) {
          temp[i] = this.player; //Making New Move

          let win_ = this.checkWin(temp, this.main_player);
          if (win_ === -1) {
            this.beta = -1;
            this.final_state = [...temp];
            temp[i] = null; //Removing the introduced Move
            return this.beta;
          }

          let maxnode = new MaxNode(
            temp,
            this.opponent,
            this.main_player,
            this.beta
          );

          temp[i] = null; //Removing the introduced Move
          if (maxnode.alpha < this.beta) {
            this.beta = maxnode.alpha;
            this.final_state = [...temp];
          }
        }
      }
      return this.beta;
    }
  }
  const [is_x_playing, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ x_score: 0, o_score: 0 });
  const [is_game_over, setGameOver] = useState(false);
  const [turns, setTurns] = useState(1);
  const [last_board, setLastBoard] = useState(Array(9).fill(null));
  const [is_one_player, setOnePlayer] = useState(false);
  const [next, setNext] = useState(false);

  const mainBoardHandling = (boxIdx) => {
    //2-Player Game
    if (is_one_player === false) {
      setLastBoard(board);
      // Update the board
      const updatedBoard = board.map((value, idx) => {
        if (idx === boxIdx) {
          return is_x_playing ? "X" : "O";
        } else {
          return value;
        }
      });

      //Check for winner and update the score
      let winner = checkForWinner(updatedBoard);

      if (winner) {
        if (winner === "O") {
          let { o_score } = scores;
          o_score += 1;
          setScores({ ...scores, o_score });
        } else {
          let { x_score } = scores;
          x_score += 1;
          setScores({ ...scores, x_score });
        }
        alert(`Winner : ${winner} !! Player - ${winner} won the round!!`);
        //if(is_one_player === true) setXPlaying(true);
        setTimeout(nextRound(), 3000);
        return;
      } else {
        //check if all boxes are filled and there is draw
        if (turns === 9)
          if (is_game_over === false) {
            setTurns(1);
            //if(is_one_player === true) setXPlaying(true);
            setGameOver(true);
            alert(`Tie : The Game is Draw !!`);
            setTimeout(nextRound(), 3000);
            return;
          }
      }

      setBoard(updatedBoard);
      const count = turns + 1;
      setTurns(count);

      //Alternating the player
      setXPlaying(!is_x_playing);
    } 
    //1-Player Game (Human Vs AI)
    else { //Human Vs AI Mode

      if(is_game_over === false){
        //Human (X's Turn)
        if (is_x_playing === true) {
          setLastBoard(board);
          // Update the board
          const updatedBoard = board.map((value, idx) => {
            if (idx === boxIdx) {
              return is_x_playing ? "X" : "O";
            } else {
              return value;
            }
          });

          //Check for winner and update the score
          let winner = checkForWinner(updatedBoard);
          let count = turns;

          if (winner) {
            if (winner === "O") {
              let { o_score } = scores;
              o_score += 1;
              setScores({ ...scores, o_score });
            } else {
              let { x_score } = scores;
              x_score += 1;
              setScores({ ...scores, x_score });
            }
            if(is_game_over === false)
              alert(`Winner : ${winner} !! Player - ${winner} won the round!!`);
            setTurns(1);
            setGameOver(true);
            setXPlaying(true);
            setBoard(Array(9).fill(null));
            setLastBoard(Array(9).fill(null));
            setTimeout(nextRound(), 1000);
            return;
          } else {
            //check if all boxes are filled and there is draw
            if (count >= 9 && allDone(updatedBoard) ) {
              //if (is_game_over === false)
                setTurns(1);
                setXPlaying(true);
                setGameOver(true);
                setBoard(Array(9).fill(null));
                setLastBoard(Array(9).fill(null));
                alert(`Tie : The Game is Draw !!`);
                setTimeout(nextRound(), 1000);
                return;
              }
          }
          

          //AI's Turn

          //Getting the current game configuration/state or tic-tac-toe board matrix
          let temp = [...updatedBoard];
          
          //Create Game Search Tree - MiniMax Algorithm (Alpha-Beta Pruning)
          /* O (AI) is the main player here, and also the root maxnode will play on behalf of Player O
            In Tree, Max Nodes will be player O (Computer) and Min Nodes will represent X (Human)
          */
          // Creating the root maxnode for the Player O (Computer) 
          // Whole game will be monitored on behalf of main player which is O (Computer) here
          // If in any node of the tree if O wins then node returns 1, if O lose then returns -1,
          // If neither win/lose and there are moves to explore then it create new branch
          // If neither win/lose and there are NO moves to explore then node will return 0

          let maxnode = new MaxNode(temp, "O", "O", inf);
            
          //Accessing the best move from the decision tree
          let updatedBoardai = [...maxnode.final_state]; 

          setBoard(updatedBoardai);
          count = count + 2;

          //Alternating the player
          setXPlaying(is_x_playing);
          setNext(false);
          setBoard(updatedBoardai);
          setTurns(count);

          //Check for winner and update the score
          winner = checkForWinner(updatedBoardai);
            if (winner) {
              if (winner === "O") {
                let { o_score } = scores;
                o_score += 1;
                setScores({ ...scores, o_score });
              } else {
                let { x_score } = scores;
                x_score += 1;
                setScores({ ...scores, x_score });
              }
              setGameOver(true);
              setTurns(1);
              setXPlaying(true);
              if(is_game_over === false)
              alert(`Winner : ${winner} !! Player - ${winner} won the round!!`);
              setBoard(Array(9).fill(null));
              setLastBoard(Array(9).fill(null));
              
              setTimeout(nextRound(), 1000);
              return;
            } else {
              //check if all boxes are filled and there is draw
              if (count >= 9 && allDone(updatedBoardai)) {
                  setTurns(1);
                  setXPlaying(true);
                  setGameOver(true);
                  setBoard(Array(9).fill(null));
                  setLastBoard(Array(9).fill(null));
                  alert(`Tie : The Game is Draw !!`);
                  setTimeout(nextRound(), 1000);
                  return;
                }
            }

          }
        }
      }
    };
  

  const allEmpty = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "X" || board[i] === "O") {
        return false;
      }
    }
    return true;
  };

  const allDone = (inp_board) => {
    for (let i = 0; i < inp_board.length; i++) {
      if (!(inp_board[i] === "X" || inp_board[i] === "O")) {
        return false;
      }
    }
    return true;
  };

  const equalArray = (array1, array2) => {
    if (!(array1.length === array2.length)) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (!(array1[i] === array2[i])) {
        return false;
      }
    }
    return true;
  };

  const restartGame = () => {
    let conf_msg = "Do you want to restart the game??";
    if (!window.confirm(conf_msg)) {
      return;
    }
    //if (is_one_player === true) setXPlaying(true);
    setTurns(1);
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setLastBoard(Array(9).fill(null));
    setScores({ x_score: 0, o_score: 0 });
  };

  const resetBoard = () => {
    let conf_msg = "Do you want to reset the Board??";
    if (!window.confirm(conf_msg)) {
      return;
    }
    //if (is_one_player === true) setXPlaying(true);
    setTurns(1);
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setLastBoard(Array(9).fill(null));
  };

  const nextRound = () => {
    setTurns(1);
    if (is_one_player === true) setXPlaying(true);
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setLastBoard(Array(9).fill(null));
  };

  const checkForWinner = (board) => {
    for (let i = 0; i < win_combinations.length; i++) {
      const [x, y, z] = win_combinations[i];
      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setTurns(1);
        setGameOver(true);
        return board[x];
      }
    }
  };
  const redo = () => {
    if (!equalArray(board, last_board)) {
      setTurns(turns - (is_one_player ? 2 : 1));
      setBoard(last_board);
      if (is_one_player === false) {
        setOnePlayer(is_one_player);
        if (!allEmpty()) setXPlaying(!is_x_playing);
      }
    }
  };

  const changeMode = () => {
    setXPlaying(true);
    setOnePlayer(!is_one_player);
    restartGame();
  };
  return (
    <div className="Home">
      <ScoreBoard scores={scores} is_x_playing={is_x_playing} />
      <NumberPlayer mode={is_one_player} changeMode={changeMode} />
      <Board
        board={board}
        one_player = {is_one_player}
        x_playing = {is_x_playing}
        game_over = {is_game_over}
        next_ = {next}
        onClick={is_game_over ? resetBoard : mainBoardHandling}
      />
      <RedoButton redo={redo} />
      <ResetAndRestart resetBoard={resetBoard} restartGame={restartGame} />
    </div>
  );
}


/*
const mainBoardHandling = (boxIdx) => {
    //2-Player Game
    if (is_one_player === false) {
      setLastBoard(board);
      // Update the board
      const updatedBoard = board.map((value, idx) => {
        if (idx === boxIdx) {
          return is_x_playing ? "X" : "O";
        } else {
          return value;
        }
      });

      //Check for winner and update the score
      let winner = checkForWinner(updatedBoard);

      if (winner) {
        if (winner === "O") {
          let { o_score } = scores;
          o_score += 1;
          setScores({ ...scores, o_score });
        } else {
          let { x_score } = scores;
          x_score += 1;
          setScores({ ...scores, x_score });
        }
        alert(`Player - ${winner} won the round ;)`);
        //if(is_one_player === true) setXPlaying(true);
        setTimeout(nextRound(), 3000);
        return;
      } else {
        //check if all boxes are filled and there is draw
        if (turns === 9)
          if (is_game_over === false) {
            setTurns(1);
            //if(is_one_player === true) setXPlaying(true);
            setGameOver(true);
            alert(`Draw :0`);
            setTimeout(nextRound(), 3000);
            return;
          }
      }

      setBoard(updatedBoard);
      const count = turns + 1;
      setTurns(count);

      //Alternating the player
      setXPlaying(!is_x_playing);
    } 
    //1-Player Game (Human Vs AI)
    else {
      if(is_game_over === false){
        //Human (X's Turn)
        if (is_x_playing === true  ) {
          setLastBoard(board);
          // Update the board
          const updatedBoard = board.map((value, idx) => {
            if (idx === boxIdx) {
              return is_x_playing ? "X" : "O";
            } else {
              return value;
            }
          });

          //Check for winner and update the score
          let winner = checkForWinner(updatedBoard);

          if (winner) {
            if (winner === "O") {
              let { o_score } = scores;
              o_score += 1;
              setScores({ ...scores, o_score });
            } else {
              let { x_score } = scores;
              x_score += 1;
              setScores({ ...scores, x_score });
            }
            if(is_game_over === false)
              alert(`Player - ${winner} won the round ;) XX`);
            setTurns(1);
            setGameOver(true);
            setXPlaying(true);
            setBoard(Array(9).fill(null));
            setLastBoard(Array(9).fill(null));
            setTimeout(nextRound(), 1000);
            return;
          } else {
            //check if all boxes are filled and there is draw
            if (turns === 9)
              if (is_game_over === false) {
                setTurns(1);
                setXPlaying(true);
                setGameOver(true);
                setBoard(Array(9).fill(null));
                setLastBoard(Array(9).fill(null));
                alert(`Draw :0`);
                setTimeout(nextRound(), 1000);
                return;
              }
          }

          setBoard(updatedBoard);
          const count = turns + 1;
          setTurns(count);

          //Alternating the player
          setXPlaying(!is_x_playing);

          setNext(true);
        } 
        
        else {
          //AI's Turn
          if (turns !== 9 && is_x_playing === false && next === true) {
            //Getting the current game configuration/state or tic-tac-toe board matrix
            let temp = [...board];

            //Create Game Search Tree - MiniMax Algorithm (Alpha-Beta Pruning)
            /* O (AI) is the main player here, and also the root maxnode will play on behalf of Player O
              In Tree, Max Nodes will be player O (Computer) and Min Nodes will represent X (Human)
            */
            // Creating the root maxnode for the Player O (Computer) 
            // Whole game will be monitored on behalf of main player which is O (Computer) here
            // If in any node of the tree if O wins then node returns 1, if O lose then returns -1,
            // If neither win/lose and there are moves to explore then it create new branch
            // If neither win/lose and there are NO moves to explore then node will return 0

/*

            let maxnode = new MaxNode(temp, "O", "O", inf);
            
            //Accessing the best move from the decision tree
            const updatedBoardai = [...maxnode.final_state]; 

            const count = turns + 1;
            setTurns(count);
            //Check for winner and update the score
            const winner = checkForWinner(updatedBoardai);
            setNext(false);
            if (winner) {
              if (winner === "O") {
                let { o_score } = scores;
                o_score += 1;
                setScores({ ...scores, o_score });
              } else {
                let { x_score } = scores;
                x_score += 1;
                setScores({ ...scores, x_score });
              }
              setGameOver(true);
              setTurns(1);
              setXPlaying(true);
              if(is_game_over === false && is_x_playing === false && !isEmpty(board) ){
                alert(`Player - ${winner} won the round ;)OO`+board.toString());
              }
              setBoard(Array(9).fill(null));
              setLastBoard(Array(9).fill(null));
              
              setTimeout(nextRound(), 1000);
              return;
            } else {
              //check if all boxes are filled and there is draw
              if (turns === 9)
                if (is_game_over === false) {
                  setTurns(1);
                  setXPlaying(true);
                  setGameOver(true);
                  setBoard(Array(9).fill(null));
                  setLastBoard(Array(9).fill(null));
                  alert(`Draw :0AI`);
                  setTimeout(nextRound(), 1000);
                  return;
                }
            }

            setBoard(updatedBoardai);
            setTurns(turns + 1);

            //Alternating the player
            setXPlaying(!is_x_playing);
            
          }
        }
      }
    }
  };

*/