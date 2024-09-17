export function checkLines(board: number[][]) {
  return board.reduce((lines, row, ri) => {
    if (row.every((col) => col)) lines.push(ri);
    return lines;
  }, []);
}

export function clearLines(board: number[][], lines: number[]) {
  lines.toReversed().forEach((ri) => {
    board.splice(ri, 1);
  });

  board.push(...Array.from({ length: lines.length }, () => Array(10).fill(0)));
}
