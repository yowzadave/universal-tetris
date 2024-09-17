export default function overlayArray(
  a: number[][],
  b: number[][],
  x = 0,
  y = 0,
) {
  b.forEach((row, r) => {
    row.forEach((col, c) => {
      if (col) {
        if (a[y + r] === undefined) return;
        if (a[y + r][x + c] === undefined) return;
        a[y + r][x + c] = col;
      }
    });
  });
}
