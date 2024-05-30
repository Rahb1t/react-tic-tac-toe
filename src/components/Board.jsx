import { Square } from "./Square";
import { TURNS } from "../constants";
import { saveGameToStorage } from "../logic/storage";
import confetti from "canvas-confetti";
import { checkWinner, checkEndGame } from "../logic/Board";

export function Board({
  winner,
  setWinner,
  board,
  setBoard,
  turn,
  setTurn,
  resetGame,
}) {
  const updateBoard = (index) => {
    // doesn't update board if it has something
    if (board[index] || winner) return;
    // update the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // save game
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
    // check if there's a winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) setWinner(false); // draw
  };

  return (
    <>
      <button onClick={resetGame}> Game Reset</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </>
  );
}
