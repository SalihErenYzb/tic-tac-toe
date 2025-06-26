
import './App.css'; 
import { useState } from "react";
import Board from "./Board.js"
import { Bot,EasyBot,HardBot,MiddleBot } from './Bot.js';

export default function App(){
  const [inGame,setInGame] = useState(false);
  const [bot,setbot] = useState(null);
  function startGame(bot){
    setbot(bot);
    setInGame(true);
  }
  function stopGame(){
    setInGame(false);
    setbot(null);
  }
  const availableBots = [new EasyBot(),new MiddleBot(), new HardBot()];

  return (
    <div className='game'>
        {inGame ? (
          <div className="game-container">
              <div className="game-controls">
                <button onClick={stopGame}>Go back to menu</button>
              </div>
              <Board bot={bot}/>
          </div>
        ) : (
          <div className="menu">
            <h1>Welcome to tic-tac-toe</h1>
            <button  onClick={() => startGame(null)}>Play With Your Friends</button>
            {availableBots.map(( bot, id ) => (
              <button 
                key={id} 
                onClick={() => startGame(bot)}
              >
                Play Against {bot.name}
              </button>
            ))}
          </div>
        )}
    </div>

  );
}