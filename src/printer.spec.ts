import { Board, EmptyCell } from "./game";
import { printTicTacToeBoard } from "./printer";

describe("Board Printer", () => {
  it("should print a not empty board", () => {
    // given
    console.log = jest.fn();
    const board: Board = [
      ["X", "O", EmptyCell],
      [EmptyCell, "X", "O"],
      ["O", EmptyCell, "X"],
    ];

    // when
    printTicTacToeBoard(board);

    // then
    expect((console.log as any).mock.calls[0][0]).toBe("|X|O| |");
    expect((console.log as any).mock.calls[1][0]).toBe("| |X|O|");
    expect((console.log as any).mock.calls[2][0]).toBe("|O| |X|");
  });

  it("should print an empty board", () => {
    // given
    console.log = jest.fn();
    const board: Board = [
      [EmptyCell, EmptyCell, EmptyCell],
      [EmptyCell, EmptyCell, EmptyCell],
      [EmptyCell, EmptyCell, EmptyCell],
    ];

    // when
    printTicTacToeBoard(board);

    // then
    expect((console.log as any).mock.calls[0][0]).toBe("| | | |");
    expect((console.log as any).mock.calls[1][0]).toBe("| | | |");
    expect((console.log as any).mock.calls[2][0]).toBe("| | | |");
  });
});
