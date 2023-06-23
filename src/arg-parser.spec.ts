import { parsePosition } from "./arg-parser";

describe("Arg Parser", () => {
  const testCases = [
    { position: "1,2", expected: [1, 2] },
    { position: "1,5", expected:  null },
    { position: "1,2,3", expected: null },
    { position: "asdad", expected: null },
    { position: "-1", expected: null },
    { position: "-1,0", expected: null },
    { position: "0,-1", expected: null },
    { position: "0,a", expected: null },
    { position: "a,0", expected: null },
    { position: "0.0", expected: null },
  ];

  testCases.forEach(({ position, expected }) => {
    it(`should return ${expected} for ${position}`, () => {
      // given

      // when
      const result = parsePosition(position);

      // then
      expect(result).toEqual(expected);
    });
  });
});
