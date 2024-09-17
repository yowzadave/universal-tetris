export default function array2d(w, h) {
  const arr = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
