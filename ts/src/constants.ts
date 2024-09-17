const dpi = window.devicePixelRatio;

const boardSize = {
  width: 480,
  height: 960,
  unit: 48,
};

function lineScore(level: number, lines: number) {
  if (lines === 0) return 0;
  if (lines === 1) return 40 * (level + 1);
  if (lines === 2) return 100 * (level + 1);
  if (lines === 3) return 300 * (level + 1);
  if (lines === 4) return 1200 * (level + 1);
  return 0;
}

const baseSpeed = 500;
const speedIncrease = 50;

export { dpi, boardSize, lineScore, baseSpeed, speedIncrease };
