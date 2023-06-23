import { Board, EmptyCell, GameResult, TicTacToe } from "./game";

describe("Tic Tac Toe", () => {
  it("should play a game", () => {
    // given
    const board: Board = [
      ["X", "O", EmptyCell],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ];
    const game = new TicTacToe(board);

    // when
    const result = game.play([0, 2]);

    // then
    expect(result).toBe("X");
    expect(game.getBoard()).toEqual([
      ["X", "O", "X"],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ]);
  });

  it("should not play twice in the same cell", () => {
    // given
    const board: Board = [
      ["X", "O", EmptyCell],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ];
    const game = new TicTacToe(board);

    // when
    expect(() => game.play([0, 0])).toThrowError("Invalid move");

    // then
    expect(game.getBoard()).toEqual([
      ["X", "O", EmptyCell],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ]);
  });

  it("should not play outside the board", () => {
    // given
    const board: Board = [
      ["X", "O", EmptyCell],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ];
    const game = new TicTacToe(board);

    // when
    expect(() => game.play([0, 3])).toThrowError("Invalid move");

    // then
    expect(game.getBoard()).toEqual([
      ["X", "O", EmptyCell],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ]);
  });

  it("should not play with invalid coordinates", () => {
    // given
    const board: Board = [
      ["X", "O", EmptyCell],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ];
    const game = new TicTacToe(board);

    // when
    expect(() => game.play([0, NaN])).toThrowError("Invalid move");

    // then
    expect(game.getBoard()).toEqual([
      ["X", "O", EmptyCell],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ]);
  });

  describe("Game Result", () => {
    const testCases: {
      board: Board;
      result: GameResult;
    }[] = [
      {
        board: [
          ["X", "O", "X"],
          ["O", "X", "O"],
          ["O", "X", "X"],
        ],
        result: "X",
      },
      {
        board: [
          ["X", "O", "X"],
          ["O", "O", "X"],
          ["O", "X", "X"],
        ],
        result: "X",
      },
      {
        board: [
          ["X", "X", "X"],
          ["O", "O", "X"],
          ["O", "X", "O"],
        ],
        result: "X",
      },
      {
        board: [
          ["X", "O", "X"],
          ["O", "O", " "],
          ["X", "O", "O"],
        ],
        result: "O",
      },
      {
        board: [
          ["X", "O", "X"],
          ["O", " ", " "],
          ["X", " ", "O"],
        ],
        result: null,
      },
      {
        board: [
          [" ", " ", " "],
          [" ", " ", " "],
          [" ", " ", " "],
        ],
        result: null,
      },
      {
        board: [
          ["X", "O", "X"],
          ["O", "O", "X"],
          ["X", "X", "O"],
        ],
        result: "Draw",
      },
    ];

    testCases.forEach(({ board, result }) => {
      const boardString = board.map((row) => row.join(",")).join(" # ");
      it(`should ${boardString} result in ${result}`, () => {
        // given
        const game = new TicTacToe(board);

        // when
        const gameResult = game.getGameResult();

        // then
        expect(gameResult).toBe(result);
      });
    });
  });
});
