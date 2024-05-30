import { useState } from "react";
import { TURNS } from "./constants";
import { WinnerModal } from "./components/WinnerModal";
import { Board } from "./components/Board";
import { resetGameStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  // null = no winner, false = draw
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>

      <Board
        winner={winner}
        setWinner={setWinner}
        board={board}
        setBoard={setBoard}
        turn={turn}
        setTurn={setTurn}
        resetGame={resetGame}
      />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
