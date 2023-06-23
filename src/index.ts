import { parsePosition as parsePlayerMove } from "./arg-parser";
import { ask } from "./cli-utils";
import { TicTacToe } from "./game";
import { printTicTacToeBoard } from "./printer";

const startGame = async () => {
  console.log("Welcome to Tic Tac Toe!");
  console.log("To play, enter the coordinates of the cell you want to play");
  console.log("For example, to play the top left cell, enter 0,0");

  const game = new TicTacToe();

  printTicTacToeBoard(game.getBoard());

  let result = null;

  while (!result) {
    const answer = await ask(`${game.getPlayer()} move: `);
    const playerMove = parsePlayerMove(answer);

    if (!playerMove) {
      console.log("Wrong input, try again");
      continue;
    }

    try {
      result = game.play(playerMove);

      printTicTacToeBoard(game.getBoard());
    } catch (e) {
      console.error(e);
    }
  }

  console.log("Game over!");
  console.log("Result: ", result);
};

startGame().then(() => process.exit(0));
