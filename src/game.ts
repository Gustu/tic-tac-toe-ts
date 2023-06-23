import { range } from "lodash";

export const EmptyCell = " " as const;

export type Player = "X" | "O";
export type Cell = typeof EmptyCell | Player;
export type Board = Cell[][];
export type GameResult = Player | "Draw" | null;
export type PlayerMove = [number, number];

export class TicTacToe {
  private readonly board: Board;
  private player: Player;

  constructor(board?: Board, player?: Player) {
    this.board =
      board ?? range(0, 3).map((i) => range(0, 3).map((j) => EmptyCell));
    this.player = player ?? "X";
  }

  private changePlayer() {
    this.player = this.player === "X" ? "O" : "X";
  }

  play(playerMove: PlayerMove) {
    const [x, y] = playerMove;

    if (this.board[x][y] !== EmptyCell) {
      throw new Error("Invalid move");
    }

    this.board[x][y] = this.player === "X" ? "X" : "O";

    this.changePlayer();

    return this.getGameResult();
  }

  getPlayer(): Player {
    return this.player;
  }

  getBoard(): Board {
    return this.board;
  }

  getGameResult(): GameResult {
    const rows = this.board;
    const columns = range(0, 3).map((i) =>
      range(0, 3).map((j) => this.board[j][i])
    );
    const diagonals = range(0, 2).map((i) =>
      range(0, 3).map((j) => this.board[j][j + i * 2])
    );
    const allLines = [...rows, ...columns, ...diagonals];

    const xWon = allLines.some((line) => line.every((cell) => cell === "X"));
    const oWon = allLines.some((line) => line.every((cell) => cell === "O"));

    const canPlay = this.board.some((row) => row.some((cell) => cell === " "));

    if (xWon) {
      return "X";
    } else if (oWon) {
      return "O";
    } else if (!canPlay) {
      return "Draw";
    } else {
      return null;
    }
  }
}
