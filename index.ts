import { range } from "lodash";

type EmptyCell = " ";
type Player = "X" | "O";
type Cell = EmptyCell | Player;
type Board = Cell[][];
type GameResult = Player | "Draw" | null;

const board: Board = range(0, 3).map((i) => range(0, 3).map((j) => " "));

const printTicTacToeBoard = (board: Board) => {
  board.forEach((row) => {
    console.log("|" + row.join("|") + "|");
  });
};

const getGameResult = (board: Board): GameResult => {
  const rows = board;
  const columns = range(0, 3).map((i) => range(0, 3).map((j) => board[j][i]));
  const diagonals = range(0, 2).map((i) =>
    range(0, 3).map((j) => board[j][j + i * 2])
  );
  const allLines = [...rows, ...columns, ...diagonals];

  const xWon = allLines.some((line) => line.every((cell) => cell === "X"));
  const oWon = allLines.some((line) => line.every((cell) => cell === "O"));

  const canPlay = board.some((row) => row.some((cell) => cell === " "));

  if (xWon) {
    return "X";
  } else if (oWon) {
    return "O";
  } else if (!canPlay) {
    return "Draw";
  } else {
    return null;
  }
};

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const play = (board: Board, player: "X" | "O") => {
  readline.question(`${player} move: `, (input: string) => {
    try {
      const [x, y] = input.split(",").map((i) => parseInt(i));

      if (board[x][y] !== " ") {
        console.log("Invalid move");
        play(board, player);
        return;
      }

      board[x][y] = player;
      printTicTacToeBoard(board);
      const result = getGameResult(board);
      if (result) {
        console.log(`Game result: ${result}`);
        readline.close();
      } else {
        play(board, player === "X" ? "O" : "X");
      }
    } catch (e) {
      console.log("Invalid move");
      play(board, player);
    }
  });
};

console.log("Welcome to Tic Tac Toe!");
console.log("To play, enter the coordinates of the cell you want to play");
console.log("For example, to play the top left cell, enter 0,0");

printTicTacToeBoard(board);

play(board, "X");
