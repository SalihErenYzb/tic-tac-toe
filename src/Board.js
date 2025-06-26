
import './App.css'; 
import { useState } from "react";
import { calculateWinner } from "./utils";


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
        console.log("Clicked square:", i);
        if (states[states.length-1][i] || calculateWinner(states[states.length-1]) || !turnX) return;
        
        const nextSquares = states[states.length-1].slice();
        nextSquares[i] = turnX ? "X" : "O";
        const nextTurnX = !turnX;
        
        setStates(states => [...states, nextSquares]);
        setTurnX(turnX => !turnX);
        
        if (bot && !calculateWinner(nextSquares)) {
            // put time out for bot to make a move
            setTimeout(() => {
                handleBotMovement(nextSquares, nextTurnX);
            }, 500); // 500ms delay for bot's move

            // handleBotMovement(nextSquares, nextTurnX);
        }
    }

    function goBack(i){
        const newSquares = states.slice(0,i+1);
        setStates(newSquares);
        setTurnX((i+1)%2);
        if (bot && i%2) {
            // make a timeout for 
            setTimeout(() => {
                handleBotMovement(newSquares[newSquares.length-1], (i+1)%2);
            }, 500); // 500ms delay for bot's move
        }
    }
    console.log("Current states:", states);
    const winner = calculateWinner(states[states.length-1]);
    const status = winner ? "Winner: " + winner: "Next player: " + (turnX ? "X" : "O");
    const lastState = states[states.length-1];
    return (
        <div className='board-container'>
            <div className='status'>{status}</div>
            <div className='board'>
                {/* This maps directly to a grid instead of using row divs */}
                {lastState.map((value, i) => (
                    <Square key={i} value={value} onSquareClick={() => handleClick(i)} />
                ))}
            </div>
            <div className='history-buttons'>
                {states.map((_, i) => (
                    // Using i as key is fine here since the list only grows
                    <button key={i} className='button-state' onClick={() => goBack(i)}>
                        {i === 0 ? "Go to game start" : `Go to move #${i}`}
                    </button>
                ))}
            </div>
        </div>
    );
}
