export default function overlayArray(a, b, x = 0, y = 0) {
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
