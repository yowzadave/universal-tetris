import colors from "./colors.js";
import { boardSize } from "./constants.js";
import { tetromino } from "./tetrominos.js";

function rt(ctx, tet, rotation = 0, x = 0, y = 0) {
  const unit = boardSize.unit;
  const t = tetromino(tet, rotation);
  const size = t.length;

  t.forEach((row, r) => {
    row.forEach((col, c) => {
      const h = size - r + y - 1;
      if (col) {
        ctx.fillStyle = colors[col];
        ctx.strokeStyle = colors.bg;
        ctx.lineWidth = 3;
        ctx.fillRect((c + x) * unit, h * unit, unit, unit);
        ctx.strokeRect((c + x) * unit, h * unit, unit, unit);
      }
    });
  });
}

export function renderTetromino(ctx, tetromino) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  rt(ctx, tetromino);
}

export function render(ctx, board, current, rotation, x, y) {
  const unit = boardSize.unit;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.forEach((row, r) => {
    row.forEach((col, c) => {
      if (col) {
        ctx.fillStyle = colors[col];
        ctx.strokeStyle = colors.bg;
        ctx.lineWidth = 3;
        ctx.fillRect(c * unit, r * unit, unit, unit);
        ctx.strokeRect(c * unit, r * unit, unit, unit);
      }
    });
  });

  rt(ctx, current, rotation, x, y);
}
