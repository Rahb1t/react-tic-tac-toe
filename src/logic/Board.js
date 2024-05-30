import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
  // we check every posible winner combinatoin
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // X or O
    }
  }
  return null; // there aren't any winner
};

export const checkEndGame = (newBoard) => {
  // we check if there's a draw if there's no more empty spaces on the board
  return newBoard.every((square) => square !== null);
};
