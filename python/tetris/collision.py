from tetris.tetrominos import tetromino


def collision(board, tet, rotation, x, y):
    t = tetromino(tet, rotation)
    size = len(t)

    for r, row in enumerate(t):
        for c, col in enumerate(row):
            if col == 0:
                continue

            h = size - r + y - 1

            if h < 0:  # Is piece below board?
                return True

            l = c + x

            if l < 0 or l >= 10:  # Is piece to the left or right?
                return True

            if 0 <= h < 20 and 0 <= l < 10:
                if board[h][l] != 0:
                    return True

    return False
