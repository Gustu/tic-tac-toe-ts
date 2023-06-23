export const parsePosition = (position: string): [number, number] | null => {
  try {
    const coords = position.split(",").map((i) => parseInt(i));

    if (coords.length !== 2) {
      return null;
    }

    const [x, y] = coords;

    if (isNaN(x) || isNaN(y)) {
      return null;
    }

    if (x < 0 || x > 2 || y < 0 || y > 2) {
      return null;
    }

    return [x, y];
  } catch (e) {
    return null;
  }
};
