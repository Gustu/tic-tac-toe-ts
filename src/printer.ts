import { Board } from "./game";

export const printTicTacToeBoard = (board: Board) => {
  board.forEach((row) => {
    console.log("|" + row.join("|") + "|");
  });
};

