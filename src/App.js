 import './App.css'; 
import { useState } from "react";


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [turnX,setTurnX] = useState(true);
  const [squares, setSquares] = useState(Array(1).fill(Array(9).fill(null)));

  function handleClick(i) {
    if (squares[squares.length-1][i] || calculateWinner(squares[squares.length-1])) return;
    const nextSquares = squares[squares.length-1].slice();
    nextSquares[i] = turnX ? "X" : "O";
    const newSquares = squares.slice();
    newSquares.push(nextSquares);
    setSquares(newSquares);
    setTurnX(!turnX);
  }
  function goBack(i){
    let newSquares = squares.slice(0,i+1);
    setSquares(newSquares);
    setTurnX(i%2);
  }
  const winner = calculateWinner(squares[squares.length-1]);
  let status = winner ? "Winner: " + winner: "Next player: " + (turnX ? "X" : "O");
  return (
    <>
      <div className='status'>{status}</div>
      {Array(3).fill(0).map((_,j) => (
        <div className="board-row">
          {Array(3).fill(0).map((_, i) => (
            <Square key={3*j+i} value={squares[squares.length-1][3*j+i]} onSquareClick={() => handleClick(3*j+i)} />
          ))}
        </div>
      ))}
      {squares.map((_,i) => (
        <button className='button-state' onClick={() => goBack(i)}>go back to {i}</button>
      ))}
    </>
  );
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
  return null;
}