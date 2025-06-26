import './App.css'; 
import { useState } from "react";
import Board from "./Board.js"

export default function App(){
  const [inGame,setInGame] = useState(false);
  const [settings,setSettings] = useState(null);
  function startGame(settings){
    setSettings(settings);
    setInGame(true);
  }
  function stopGame(){
    setInGame(false);
    setSettings(null);
  }
  return (
    <div className='game'>
        {inGame ? (
          <div>
            <button className='buttonx' onClick={stopGame}>Go back to menu</button>
            <Board settings={settings}/>
          </div>
        ) : (
          <div>
            <h1>Welcome to tic-tac-toe</h1>
            <button className='buttonx' onClick={() => startGame(0)}>Play With Your Friends</button>
            <button className='buttonx' onClick={() => startGame(1)}>Play Against Easy Bot</button>
            <button className='buttonx' onClick={() => startGame(2)}>Play Against Hard Bot</button>
          </div>
        )}
    </div>

  );
}