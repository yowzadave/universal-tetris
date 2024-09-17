import { tetromino } from "./tetrominos.ts";

export function checkCollision(
  board: number[][],
  piece: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  rotation: number,
  x: number,
  y: number,
) {
  const t = tetromino(piece, rotation);
  const size = t.length;

  return t.some((row, r) => {
    return row.some((col, c) => {
      if (!col) return false;

      const h = size - r + y - 1;

      if (h < 0) return true;
      if (h >= 20) return false;

      const l = c + x;

      if (l < 0 || l >= 10) return true;

      const m = board[h][l];

      if (m) return true;
      return false;
    });
  });
}
