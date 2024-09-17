import { tetromino } from "./tetrominos.js";

export function checkCollision(board, tet, rotation, x, y) {
  const t = tetromino(tet, rotation);
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
