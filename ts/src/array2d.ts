export default function array2d(width: number, height: number) {
  const arr: number[][] = [];

  for (let i = 0; i < height; i++) {
    arr[i] = [];
    for (let j = 0; j < width; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
