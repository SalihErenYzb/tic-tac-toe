import { isFull,calculateWinner } from "./utils";



export class Bot {
  constructor(name, description) {
    this.name = name;
  }
  // Override this method
  calculateMove(squares, isPlayerX) {
    throw new Error("calculateMove must be implemented by subclass");
  }
}
 

// make first possible move
export class EasyBot extends Bot {
  constructor() {
    super("Easy Bot");
  }

  calculateMove(squares, isPlayerX) {
    // Return the first available square
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        return i;
      }
    }
    return -1;
  }
}

// if a move is winning, play it else if a move is drawing, play it else randmo
export class MiddleBot extends Bot {
  constructor() {
    super("Middle Bot");
  }

  calculateMove(squares, isPlayerX) {
    let draw = -1;
    let loose = -1;
    const char = isPlayerX ? "X" : "O";
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const newSquares = squares.map((v, j) => j === i ? (isPlayerX ? "X" : "O") : v);
        const res = calculateWinner(newSquares);
        
        if (res === char) {
          return i;
        } else if (res === "Draw") {
          draw = i;
        } else {
          loose = i;
        }
      }
    }

    if (draw !== -1) {
      return draw;
    }
    return loose;
  }
}


export class HardBot extends Bot {
  constructor() {
    super("Hard Bot");
  }

  calculateMove(squares, isPlayerX) {
    const result = this.minimax(squares, isPlayerX);
    return result[0];
  }

  minimax(squares, turnX) {
    // Check if game is over
    const winner = calculateWinner(squares);
    if (winner !== null) {
      const isDraw = winner === "Draw";
      return [-1, isDraw ? 0 : -1];
    }

    let draw = -1;
    let loose = -1;

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const newSquares = squares.map((v, j) => j === i ? (turnX ? "X" : "O") : v);
        const res = this.minimax(newSquares, !turnX);
        
        if (res[1] === -1) {
          return [i, 1];
        } else if (res[1] === 0) {
          draw = i;
        } else {
          loose = i;
        }
      }
    }

    if (draw !== -1) {
      return [draw, 0];
    }
    return [loose, -1];
  }
}
