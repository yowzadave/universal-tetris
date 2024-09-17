import colors from "./colors.js";
import { boardSize } from "./constants.js";
import { tetromino } from "./tetrominos.js";

function rt(
  ctx: CanvasRenderingContext2D,
  tet: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  rotation = 0,
  x = 0,
  y = 0,
) {
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

export function renderTetromino(
  ctx: CanvasRenderingContext2D,
  tet: 1 | 2 | 3 | 4 | 5 | 6 | 7,
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  rt(ctx, tet);
}

export function render(
  ctx: CanvasRenderingContext2D,
  board: number[][],
  tet: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  rotation: number,
  x: number,
  y: number,
) {
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

  rt(ctx, tet, rotation, x, y);
}
