 import './App.css'; 
import { useState } from "react";
import { calculateWinner } from "./utils";
import { BotRegistry } from './Bot.js';


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board({bot}) {
    const [turnX,setTurnX] = useState(true);
    // holds all states from start of the game
    const [states, setStates] = useState(Array(1).fill(Array(9).fill(null)));

    function handleBotMovement(currentSquares, currentTurnX) {
        const computerMove = bot.calculateMove(currentSquares, currentTurnX);
        console.log("Computer move:", computerMove);
        
        const nextSquares = currentSquares.slice();
        nextSquares[computerMove] = currentTurnX ? "X" : "O";
        setStates(states => [...states, nextSquares]);
        setTurnX(turnX => !turnX);
    }

    function handleClick(i) {
        if (states[states.length-1][i] || calculateWinner(states[states.length-1])) return;
        
        const nextSquares = states[states.length-1].slice();
        nextSquares[i] = turnX ? "X" : "O";
        const nextTurnX = !turnX;
        
        setStates(states => [...states, nextSquares]);
        setTurnX(turnX => !turnX);
        
        if (bot && !calculateWinner(nextSquares)) {
            handleBotMovement(nextSquares, nextTurnX);
        }
    }

    function goBack(i){
        const newSquares = states.slice(0,i+1);
        setStates(newSquares);
        setTurnX((i+1)%2);
    }
    const winner = calculateWinner(states[states.length-1]);
    const status = winner ? "Winner: " + winner: "Next player: " + (turnX ? "X" : "O");
    const lastState = states[states.length-1];
    return (
        <div className='board-container'>
        <div className='status'>{status}</div>
        <div className='board'>
            {Array(3).fill(0).map((_,j) => (
                <div className="board-row">
                {Array(3).fill(0).map((_, i) => (
                    <Square key={3*j+i} value={lastState[3*j+i]} onSquareClick={() => handleClick(3*j+i)} />
                ))}
                </div>
            ))}
        </div>
        <div className='history-buttons'>
            {states.map((_,i) => (
                <button className='button-state' onClick={() => goBack(i)}>go back to {i}</button>
            ))}
        </div>
        </div>
    );
}
