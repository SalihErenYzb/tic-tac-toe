 import './App.css'; 
import { useEffect, useState } from "react";


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// settings: 0 => human, 1 => easy, 2 => hard
export default function Board({settings}) {
  const [turnX,setTurnX] = useState(true);
  // holds all states from start of the game
  const [states, setStates] = useState(Array(1).fill(Array(9).fill(null)));

  function handleClick(i) {
    if (states[states.length-1][i] || calculateWinner(states[states.length-1])) return;
    const nextSquares = states[states.length-1].slice();
    nextSquares[i] = turnX ? "X" : "O";
    setStates([...states,nextSquares]);
    setTurnX(!turnX);
  }
  useEffect(() => {
    // calculate bot move and move it
    console.log("USEEFFEFCT CALLLLLED");
    let squares = states[states.length-1];
    if (!turnX && settings && !calculateWinner(squares)) {
      console.log(states);
      let hard = calComputerMoveHard(squares,turnX);
      const computerMove = (settings == 1) ? calComputerMoveEasy(squares,turnX) : hard[0];
      console.log("Computer move:", hard,computerMove);
      const nextSquares = squares.slice();
      nextSquares[computerMove] = turnX ? "X" : "O";
      setStates([...states, nextSquares]);
      setTurnX(!turnX);
    }
  },[turnX])
  function goBack(i){
    let newSquares = states.slice(0,i+1);
    setStates(newSquares);
    setTurnX((i+1)%2);
  }
  const winner = calculateWinner(states[states.length-1]);
  let status = winner ? "Winner: " + winner: "Next player: " + (turnX ? "X" : "O");
  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        {Array(3).fill(0).map((_,j) => (
            <div className="board-row">
            {Array(3).fill(0).map((_, i) => (
                <Square key={3*j+i} value={states[states.length-1][3*j+i]} onSquareClick={() => handleClick(3*j+i)} />
            ))}
            </div>
        ))}
      </div>
      <div className='history'>
        {states.map((_,i) => (
            <button className='button-state' onClick={() => goBack(i)}>go back to {i}</button>
        ))}
      </div>
    </>
  );
}
function isFull(squares){
  for (let i = 0; i < squares.length; i++){
    if (!squares[i]) {
      return false;
    }
  }
  return true;
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (isFull(squares)) return "Draw";
  return null;
}
function calComputerMoveEasy(squares,turnX) {
  // For this just return the first non-null square
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      return i;
    }
  }
}

function calComputerMoveHard(squares,turnX) {
  // DFS function that returns the ideal move for the computer
  // assumes
//   console.log(squares,turnX);
  // if game is over just return no move to play and loosing [-1,-1]
  if (calculateWinner(squares) !== "Draw" && calculateWinner(squares)){ // not draw and not null
    return [-1,-1];
  }
  // indexes that draw or loose
  let draw = -1;
  let loose = -1;
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      let res = calComputerMoveHard(squares.map((v, j) => j === i ? (turnX ? "X" : "O") : v), !turnX);
      // if there is winning index play it directly
      
      if (res[1] === -1) {
        return [i, 1];
      }else if (res[1] === 0){
        draw = i;
      }else{
        loose = i;
      }
    }
  }
  // if no winning try to draw
  if (draw !== -1){
    return [draw,0];
  }
  if (loose !== -1){
    return [loose,-1];
  }
  return [-1,0];
}
