import array2d from "./array2d.js";
import overlayArray from "./overlay-array.js";
import { checkCollision } from "./check-collision.js";
import { checkLines, clearLines } from "./check-lines.js";
import { tetromino } from "./tetrominos.js";
import { render, renderTetromino } from "./render.js";
import { updateInfo } from "./update-info.js";
import {
  dpi,
  boardSize,
  lineScore,
  baseSpeed,
  speedIncrease,
} from "./constants.js";

// Define initial game state
let board = array2d(10, 20);
let current = Math.floor(Math.random() * 7) + 1;
let y = 19;
let x = 3;
let rotation = 0;
let next = Math.floor(Math.random() * 7) + 1;
let lines = 0;
let level = 0;
let score = 0;

let keyLeft = false;
let keyRight = false;
let keyDown = false;
let keyUp = false;
let keyZ = false;
let keyX = false;

function reset() {
  board = array2d(10, 20);
  current = Math.floor(Math.random() * 7) + 1;
  y = 19;
  x = 3;
  rotation = 0;
  next = Math.floor(Math.random() * 7) + 1;
  lines = 0;
  level = 0;
  score = 0;
}

export function setupTetris(element) {
  const playarea = element.querySelector("#playarea");
  boardSize.width = playarea.clientWidth * dpi;
  boardSize.height = playarea.clientHeight * dpi;
  boardSize.unit = boardSize.width / 10;

  // Set up playarea canvas
  const canvas = element.querySelector("#playarea-canvas");
  canvas.width = boardSize.width;
  canvas.height = boardSize.height;
  const ctx = canvas.getContext("2d");
  ctx.transform(1, 0, 0, -1, 0, canvas.height);

  // Set up canvas for "next" tetromino
  const nextCanvas = element.querySelector("#next-canvas");
  nextCanvas.width = boardSize.unit * 4;
  nextCanvas.height = boardSize.unit * 4;
  const nextCtx = nextCanvas.getContext("2d");
  nextCtx.transform(1, 0, 0, -1, 0, nextCanvas.height);

  // Get info elements
  const linesEl = element.querySelector("#lines-value");
  const levelEl = element.querySelector("#level-value");
  const scoreEl = element.querySelector("#score-value");

  // Set up event listeners
  window.addEventListener("keydown", (event) => {
    if (
      ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "z", "x"].includes(
        event.key
      )
    ) {
      event.preventDefault();
    }
    if (event.key === "ArrowLeft") keyLeft = true;
    else if (event.key === "ArrowRight") keyRight = true;
    else if (event.key === "ArrowDown") keyDown = true;
    else if (event.key === "ArrowUp") keyUp = true;
    else if (event.key === "z") keyZ = true;
    else if (event.key === "x") keyX = true;
  });

  // Track elapsed time
  let tick = baseSpeed;
  let lastTick;

  // Main game loop
  function loop(timestamp) {
    tick =
      baseSpeed - Math.min(level * speedIncrease, baseSpeed - speedIncrease);

    if (lastTick === undefined) {
      lastTick = timestamp;
    }

    // presumptive next position of tetromino
    let nextX = x;
    let nextY = y;
    let nextRot = rotation;

    if (keyLeft && !keyRight) {
      nextX -= 1;
    } else if (keyRight && !keyLeft) {
      nextX += 1;
    }

    if (keyUp || keyZ) {
      nextRot += 1;
    } else if (keyX) {
      nextRot -= 1;
    }

    const collided = checkCollision(board, current, nextRot, nextX, nextY);

    if (collided) {
      nextX = x;
      nextRot = rotation;
    }

    // Check for tetromino landing
    if (keyDown || timestamp - lastTick > tick) {
      lastTick = timestamp;

      const stuck = checkCollision(board, current, rotation, nextX, nextY - 1);

      if (stuck) {
        if (y >= 19) {
          // Game over
          const button = document.createElement("button");
          button.textContent = "Play Again";
          button.classList.add("play-again-button");
          button.addEventListener("click", () => {
            button.remove();
            reset();
            requestAnimationFrame(loop);
          });
          playarea.appendChild(button);
          return;
        }

        const t = tetromino(current, rotation).toReversed();
        overlayArray(board, t, x, y);
        const l = checkLines(board);

        if (l.length) {
          lines += l.length;
          level = Math.floor(lines / 10);
          clearLines(board, l);
          score += lineScore(level, l.length);
        }

        current = next;
        next = Math.floor(Math.random() * 7) + 1;

        nextY = 19;
        nextX = 3;
        nextRot = 0;
      } else {
        nextY -= 1;
      }
    }

    x = nextX;
    y = nextY;
    rotation = nextRot;

    render(ctx, board, current, rotation, x, y);
    renderTetromino(nextCtx, next);
    updateInfo(linesEl, lines);
    updateInfo(levelEl, level);
    updateInfo(scoreEl, score);

    keyLeft = false;
    keyRight = false;
    keyDown = false;
    keyUp = false;
    keyZ = false;
    keyX = false;

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
