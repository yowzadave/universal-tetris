const t = [
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
];

const o = [
  [
    [0, 0, 0, 0],
    [0, 2, 2, 0],
    [0, 2, 2, 0],
    [0, 0, 0, 0],
  ],
];

const l1 = [
  [
    [0, 0, 0],
    [3, 3, 3],
    [3, 0, 0],
  ],
  [
    [3, 3, 0],
    [0, 3, 0],
    [0, 3, 0],
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3],
  ],
];

const l2 = [
  [
    [0, 0, 0],
    [4, 4, 4],
    [0, 0, 4],
  ],
  [
    [0, 4, 0],
    [0, 4, 0],
    [4, 4, 0],
  ],
  [
    [4, 0, 0],
    [4, 4, 4],
    [0, 0, 0],
  ],
  [
    [0, 4, 4],
    [0, 4, 0],
    [0, 4, 0],
  ],
];

const s1 = [
  [
    [0, 0, 0],
    [0, 5, 5],
    [5, 5, 0],
  ],
  [
    [0, 5, 0],
    [0, 5, 5],
    [0, 0, 5],
  ],
];

const s2 = [
  [
    [0, 0, 0],
    [6, 6, 0],
    [0, 6, 6],
  ],
  [
    [0, 0, 6],
    [0, 6, 6],
    [0, 6, 0],
  ],
];

const i = [
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [7, 7, 7, 7],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 7, 0],
    [0, 0, 7, 0],
    [0, 0, 7, 0],
    [0, 0, 7, 0],
  ],
];

type Tetrominos = [
  null,
  number[][][],
  number[][][],
  number[][][],
  number[][][],
  number[][][],
  number[][][],
  number[][][],
];
const tetrominos: Tetrominos = [null, t, o, l1, l2, s1, s2, i];

function tetromino(type: 1 | 2 | 3 | 4 | 5 | 6 | 7, rotation: number) {
  const tet = tetrominos[type];
  const index =
    rotation >= 0
      ? rotation % tet.length
      : Math.abs(rotation + tet.length) % tet.length;
  return tet[index];
}

export { tetromino };
